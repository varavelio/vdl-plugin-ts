import { newGenerator } from "@varavel/gen";
import type {
  Field,
  PluginOutputFile,
  TypeDef,
  TypeRef,
} from "@varavel/vdl-plugin-sdk";
import {
  buildDocCommentLines,
  writeDocComment,
} from "../../../shared/comments";
import { formatImportPath } from "../../../shared/imports";
import {
  isIdentifierName,
  renderPropertyName,
  renderRecordAccess,
} from "../../../shared/naming";
import { renderTypeScriptFile } from "../../../shared/render-ts-file";
import {
  getArrayItemType,
  renderTypeScriptType,
} from "../../../shared/ts-types";
import type { GeneratorContext } from "../../model/types";

/**
 * Emits generated named types together with runtime validation and hydration
 * helpers.
 */
export function generateTypesFile(
  context: GeneratorContext,
): PluginOutputFile | undefined {
  if (context.exportedTypes.length === 0) {
    return undefined;
  }

  const g = newGenerator().withSpaces(2);

  if (context.schema.enums.length > 0) {
    const importItems: string[] = [];
    for (const enumDef of context.schema.enums) {
      importItems.push(
        `type ${enumDef.name}`,
        `hydrate${enumDef.name}`,
        `validate${enumDef.name}`,
      );
    }
    g.line(
      `import { ${importItems.join(", ")} } from ${JSON.stringify(formatImportPath("./enums", context.options.importExtension))};`,
    );
    g.break();
  }

  for (let index = 0; index < context.exportedTypes.length; index += 1) {
    renderNamedType(g, context.exportedTypes[index] as TypeDef, context);

    if (index < context.exportedTypes.length - 1) {
      g.break();
    }
  }

  g.break();
  renderRuntimeHelpers(g);

  return {
    path: "types.ts",
    content: renderTypeScriptFile(g.toString()),
  };
}

function renderNamedType(
  g: ReturnType<typeof newGenerator>,
  typeDef: TypeDef,
  context: GeneratorContext,
): void {
  /**
   * Keeping one type declaration and all of its runtime helpers together makes
   * the generated file easier to read and debug.
   */
  writeDocComment(
    g,
    buildDocCommentLines({
      doc: typeDef.doc,
      annotations: typeDef.annotations,
      fallback:
        typeDef.typeRef.kind === "object"
          ? `${typeDef.name} represents a generated VDL object.`
          : `${typeDef.name} represents a generated VDL type alias.`,
    }),
  );
  renderTypeDeclaration(g, typeDef, context);
  g.break();
  renderHydrateFunction(g, typeDef);
  g.break();
  renderValidateFunction(g, typeDef);
  g.break();
  renderFromStringFunction(g, typeDef);
}

function renderTypeDeclaration(
  g: ReturnType<typeof newGenerator>,
  typeDef: TypeDef,
  context: GeneratorContext,
): void {
  /**
   * Named objects preserve field names exactly, while aliases delegate to the
   * shared TypeScript type renderer.
   */
  if (typeDef.typeRef.kind !== "object") {
    g.line(
      `export type ${typeDef.name} = ${renderTypeScriptType(typeDef.typeRef, context)};`,
    );
    return;
  }

  g.line(`export type ${typeDef.name} = {`);
  g.block(() => {
    for (const field of typeDef.typeRef.objectFields ?? []) {
      writeDocComment(
        g,
        buildDocCommentLines({
          doc: field.doc,
          annotations: field.annotations,
        }),
      );
      g.line(
        `${renderPropertyName(field.name)}${field.optional ? "?" : ""}: ${renderTypeScriptType(field.typeRef, context)};`,
      );
    }
  });
  g.line("};");
}

function renderHydrateFunction(
  g: ReturnType<typeof newGenerator>,
  typeDef: TypeDef,
): void {
  /**
   * Hydration is separate from validation so parsed data can be transformed
   * into final runtime shapes such as `Date` instances.
   */
  g.line(
    `export function hydrate${typeDef.name}(input: ${typeDef.name}): ${typeDef.name} {`,
  );
  g.block(() => {
    g.line(`return ${renderHydrationExpression(typeDef.typeRef, "input", 0)};`);
  });
  g.line("}");
}

function renderValidateFunction(
  g: ReturnType<typeof newGenerator>,
  typeDef: TypeDef,
): void {
  /**
   * Validators operate on `unknown` input to match how TypeScript applications
   * typically handle parsed JSON.
   */
  g.line(
    `export function validate${typeDef.name}(input: unknown, path = ${JSON.stringify(typeDef.name)}): string | null {`,
  );
  g.block(() => {
    writeValidationStatements(g, {
      typeRef: typeDef.typeRef,
      valueExpression: "input",
      pathExpression: "path",
      depth: 0,
    });
    g.line("return null;");
  });
  g.line("}");
}

function renderFromStringFunction(
  g: ReturnType<typeof newGenerator>,
  typeDef: TypeDef,
): void {
  /**
   * `fromXString` mirrors the no-unmarshal TypeScript workflow by explicitly
   * parsing, validating, and hydrating JSON text.
   */
  g.line(
    `export function from${typeDef.name}String(json: string): ${typeDef.name} {`,
  );
  g.block(() => {
    g.line("const input = parseJson(json);");
    g.line(`const error = validate${typeDef.name}(input);`);
    g.line("if (error !== null) {");
    g.block(() => {
      g.line("throw new Error(error);");
    });
    g.line("}");
    g.line(`return hydrate${typeDef.name}(input as ${typeDef.name});`);
  });
  g.line("}");
}

function renderHydrationExpression(
  typeRef: TypeRef,
  valueExpression: string,
  depth: number,
): string {
  /**
   * Recursive expression generation keeps the emitted hydrate functions simple
   * while still handling nested maps, arrays, enums, and dates.
   */
  switch (typeRef.kind) {
    case "primitive":
      return typeRef.primitiveName === "datetime"
        ? `hydrateDateInput(${valueExpression})`
        : valueExpression;
    case "enum":
      return `hydrate${typeRef.enumName}(${valueExpression})`;
    case "type":
      return `hydrate${typeRef.typeName}(${valueExpression})`;
    case "array": {
      const itemName = `item${depth}`;
      return `${valueExpression}.map((${itemName}) => ${renderHydrationExpression(getArrayItemType(typeRef), itemName, depth + 1)})`;
    }
    case "map": {
      const keyName = `key${depth}`;
      const mapValueName = `value${depth}`;
      return `Object.fromEntries(Object.entries(${valueExpression}).map(([${keyName}, ${mapValueName}]) => [${keyName}, ${renderHydrationExpression(typeRef.mapType as TypeRef, mapValueName, depth + 1)}]))`;
    }
    case "object": {
      if ((typeRef.objectFields ?? []).length === 0) {
        return "{}";
      }

      const objectGenerator = newGenerator().withSpaces(2);
      objectGenerator.line("{");
      objectGenerator.block(() => {
        for (const field of typeRef.objectFields ?? []) {
          const accessExpression = renderValueAccess(
            valueExpression,
            field.name,
          );
          const hydratedValue = renderHydrationExpression(
            field.typeRef,
            accessExpression,
            depth + 1,
          );
          const finalValue = field.optional
            ? `${accessExpression} === undefined ? undefined : ${hydratedValue}`
            : hydratedValue;

          objectGenerator.line(
            `${renderPropertyName(field.name)}: ${finalValue},`,
          );
        }
      });
      objectGenerator.line("}");

      return objectGenerator.toString().trim();
    }
    default:
      return valueExpression;
  }
}

function writeValidationStatements(
  g: ReturnType<typeof newGenerator>,
  options: {
    typeRef: TypeRef;
    valueExpression: string;
    pathExpression: string;
    depth: number;
  },
): void {
  /**
   * Validation statements mirror the type tree so generated error paths map
   * naturally back to the original schema structure.
   */
  switch (options.typeRef.kind) {
    case "primitive":
      writePrimitiveValidation(
        g,
        options.typeRef,
        options.valueExpression,
        options.pathExpression,
      );
      return;
    case "enum":
      g.line(`{`);
      g.block(() => {
        g.line(
          `const error = validate${options.typeRef.enumName}(${options.valueExpression}, ${options.pathExpression});`,
        );
        g.line("if (error !== null) {");
        g.block(() => {
          g.line("return error;");
        });
        g.line("}");
      });
      g.line("}");
      return;
    case "type":
      g.line(`{`);
      g.block(() => {
        g.line(
          `const error = validate${options.typeRef.typeName}(${options.valueExpression}, ${options.pathExpression});`,
        );
        g.line("if (error !== null) {");
        g.block(() => {
          g.line("return error;");
        });
        g.line("}");
      });
      g.line("}");
      return;
    case "array": {
      const itemType = getArrayItemType(options.typeRef);
      const indexName = `index${options.depth}`;
      const itemPathName = `itemPath${options.depth}`;

      g.line(`if (!Array.isArray(${options.valueExpression})) {`);
      g.block(() => {
        g.line(
          `return \`\${${options.pathExpression}}: expected array, got \${describeValue(${options.valueExpression})}\`;`,
        );
      });
      g.line("}");
      g.line(
        `for (let ${indexName} = 0; ${indexName} < ${options.valueExpression}.length; ${indexName} += 1) {`,
      );
      g.block(() => {
        g.line(
          `const ${itemPathName} = \`\${${options.pathExpression}}[\${${indexName}}]\`;`,
        );
        writeValidationStatements(g, {
          typeRef: itemType,
          valueExpression: `${options.valueExpression}[${indexName}]`,
          pathExpression: itemPathName,
          depth: options.depth + 1,
        });
      });
      g.line("}");
      return;
    }
    case "map": {
      const keyName = `key${options.depth}`;
      const valueName = `value${options.depth}`;
      const valuePathName = `valuePath${options.depth}`;

      g.line(`if (!isRecord(${options.valueExpression})) {`);
      g.block(() => {
        g.line(
          `return \`\${${options.pathExpression}}: expected object, got \${describeValue(${options.valueExpression})}\`;`,
        );
      });
      g.line("}");
      g.line(
        `for (const [${keyName}, ${valueName}] of Object.entries(${options.valueExpression})) {`,
      );
      g.block(() => {
        g.line(
          `const ${valuePathName} = \`\${${options.pathExpression}}[\${JSON.stringify(${keyName})}]\`;`,
        );
        writeValidationStatements(g, {
          typeRef: typeRefMapValue(options.typeRef),
          valueExpression: valueName,
          pathExpression: valuePathName,
          depth: options.depth + 1,
        });
      });
      g.line("}");
      return;
    }
    case "object": {
      const recordName = `record${options.depth}`;
      g.line(`if (!isRecord(${options.valueExpression})) {`);
      g.block(() => {
        g.line(
          `return \`\${${options.pathExpression}}: expected object, got \${describeValue(${options.valueExpression})}\`;`,
        );
      });
      g.line("}");
      g.line(
        `const ${recordName} = ${options.valueExpression} as Record<string, unknown>;`,
      );

      for (
        let fieldIndex = 0;
        fieldIndex < (options.typeRef.objectFields ?? []).length;
        fieldIndex += 1
      ) {
        const field = options.typeRef.objectFields?.[fieldIndex] as Field;
        const fieldPathName = `fieldPath${options.depth}_${fieldIndex}`;
        const fieldValueExpression = renderRecordAccess(recordName, field.name);

        g.line(
          `const ${fieldPathName} = \`\${${options.pathExpression}}.${field.name}\`;`,
        );

        if (!field.optional) {
          g.line(
            `if (!hasOwn(${recordName}, ${JSON.stringify(field.name)}) || ${fieldValueExpression} === undefined) {`,
          );
          g.block(() => {
            g.line(
              `return \`\${${fieldPathName}}: required field is missing\`;`,
            );
          });
          g.line("}");
          writeValidationStatements(g, {
            typeRef: field.typeRef,
            valueExpression: fieldValueExpression,
            pathExpression: fieldPathName,
            depth: options.depth + 1,
          });
          continue;
        }

        g.line(
          `if (hasOwn(${recordName}, ${JSON.stringify(field.name)}) && ${fieldValueExpression} !== undefined) {`,
        );
        g.block(() => {
          writeValidationStatements(g, {
            typeRef: field.typeRef,
            valueExpression: fieldValueExpression,
            pathExpression: fieldPathName,
            depth: options.depth + 1,
          });
        });
        g.line("}");
      }
      return;
    }
    default:
      return;
  }
}

function writePrimitiveValidation(
  g: ReturnType<typeof newGenerator>,
  typeRef: TypeRef,
  valueExpression: string,
  pathExpression: string,
): void {
  /**
   * Primitive validation focuses on user-facing value categories rather than on
   * internal JavaScript implementation details.
   */
  switch (typeRef.primitiveName) {
    case "string":
      g.line(`if (typeof ${valueExpression} !== "string") {`);
      g.block(() => {
        g.line(
          `return \`\${${pathExpression}}: expected string, got \${describeValue(${valueExpression})}\`;`,
        );
      });
      g.line("}");
      return;
    case "int":
    case "float":
      g.line(
        `if (typeof ${valueExpression} !== "number" || !Number.isFinite(${valueExpression})) {`,
      );
      g.block(() => {
        g.line(
          `return \`\${${pathExpression}}: expected number, got \${describeValue(${valueExpression})}\`;`,
        );
      });
      g.line("}");
      return;
    case "bool":
      g.line(`if (typeof ${valueExpression} !== "boolean") {`);
      g.block(() => {
        g.line(
          `return \`\${${pathExpression}}: expected boolean, got \${describeValue(${valueExpression})}\`;`,
        );
      });
      g.line("}");
      return;
    case "datetime":
      g.line(`if (!isValidDateInput(${valueExpression})) {`);
      g.block(() => {
        g.line(
          `return \`\${${pathExpression}}: expected datetime string or Date, got \${describeValue(${valueExpression})}\`;`,
        );
      });
      g.line("}");
      return;
    default:
      return;
  }
}

function renderRuntimeHelpers(g: ReturnType<typeof newGenerator>): void {
  /**
   * File-local helpers keep the generated runtime self-sufficient without a
   * separate shared support module.
   */
  g.line("function parseJson(json: string): unknown {");
  g.block(() => {
    g.line("try {");
    g.block(() => {
      g.line("return JSON.parse(json);");
    });
    g.line("} catch (error) {");
    g.block(() => {
      g.line(
        "const message = error instanceof Error ? error.message : String(error);",
      );
      g.line(`throw new Error(\`Invalid JSON input: \${message}\`);`);
    });
    g.line("}");
  });
  g.line("}");
  g.break();

  g.line(
    "function isRecord(value: unknown): value is Record<string, unknown> {",
  );
  g.block(() => {
    g.line(
      'return typeof value === "object" && value !== null && !Array.isArray(value) && !(value instanceof Date);',
    );
  });
  g.line("}");
  g.break();

  g.line(
    "function hasOwn(record: Record<string, unknown>, key: string): boolean {",
  );
  g.block(() => {
    g.line("return Object.prototype.hasOwnProperty.call(record, key);");
  });
  g.line("}");
  g.break();

  g.line("function describeValue(value: unknown): string {");
  g.block(() => {
    g.line("if (value === null) {");
    g.block(() => {
      g.line('return "null";');
    });
    g.line("}");
    g.line("if (Array.isArray(value)) {");
    g.block(() => {
      g.line('return "array";');
    });
    g.line("}");
    g.line("if (value instanceof Date) {");
    g.block(() => {
      g.line('return "Date";');
    });
    g.line("}");
    g.line("return typeof value;");
  });
  g.line("}");
  g.break();

  g.line("function isValidDateInput(value: unknown): value is string | Date {");
  g.block(() => {
    g.line("if (value instanceof Date) {");
    g.block(() => {
      g.line("return !Number.isNaN(value.getTime());");
    });
    g.line("}");
    g.line('if (typeof value !== "string") {');
    g.block(() => {
      g.line("return false;");
    });
    g.line("}");
    g.line("return !Number.isNaN(new Date(value).getTime());");
  });
  g.line("}");
  g.break();

  g.line("function hydrateDateInput(value: string | Date): Date {");
  g.block(() => {
    g.line(
      "return value instanceof Date ? new Date(value.getTime()) : new Date(value);",
    );
  });
  g.line("}");
}

function typeRefMapValue(typeRef: TypeRef): TypeRef {
  /**
   * Pulling the map value cast into one helper keeps recursive validation code
   * easier to scan.
   */
  return typeRef.mapType as TypeRef;
}

function renderValueAccess(expression: string, key: string): string {
  /**
   * Dot access is preferred for readability, with bracket access reserved for
   * field names that are not valid identifiers.
   */
  return isIdentifierName(key)
    ? `${expression}.${key}`
    : renderRecordAccess(expression, key);
}
