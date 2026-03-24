import { newGenerator } from "@varavel/gen";
import type {
  Field,
  PluginOutputFile,
  TypeDef,
  TypeRef,
} from "@varavel/vdl-plugin-sdk";
import { writeDocComment } from "../../../shared/comments";
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
 * Emits generated named types together with merged runtime namespaces.
 */
export function generateTypesFile(
  context: GeneratorContext,
): PluginOutputFile | undefined {
  if (context.exportedTypes.length === 0) {
    return undefined;
  }

  const g = newGenerator().withSpaces(2);

  if (context.schema.enums.length > 0) {
    g.line(
      `import { ${context.schema.enums.map((enumDef) => enumDef.name).join(", ")} } from ${JSON.stringify(formatImportPath("./enums", context.options.importExtension))};`,
    );
    g.break();
  }

  for (const typeDef of context.exportedTypes) {
    renderNamedType(g, typeDef, context);
    g.break();
  }

  g.break();
  renderRuntimeHelpers(g, context.options.strict);

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
   * Each generated model is emitted as a merged type plus const namespace so
   * consumers get one stable symbol for type information and runtime helpers.
   */
  writeDocComment(g, {
    doc: typeDef.doc,
    annotations: typeDef.annotations,
    fallback:
      typeDef.typeRef.kind === "object"
        ? `${typeDef.name} represents a generated VDL object.`
        : `${typeDef.name} represents a generated VDL type alias.`,
  });
  renderTypeDeclaration(g, typeDef, context);
  g.break();

  writeDocComment(g, {
    fallback: `${typeDef.name} exposes the generated runtime helpers for ${typeDef.name}.`,
  });
  renderTypeNamespace(g, typeDef, context.options.strict);
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
      writeDocComment(g, {
        doc: field.doc,
        annotations: field.annotations,
      });
      g.line(
        `${renderPropertyName(field.name)}${field.optional ? "?" : ""}: ${renderTypeScriptType(field.typeRef, context)};`,
      );
    }
  });
  g.line("};");
}

function renderTypeNamespace(
  g: ReturnType<typeof newGenerator>,
  typeDef: TypeDef,
  strict: boolean,
): void {
  /**
   * The namespace object keeps parsing, validation, and hydration methods under
   * the same exported symbol as the model type.
   */
  g.line(`export const ${typeDef.name} = {`);
  g.block(() => {
    writeDocComment(g, {
      fallback: strict
        ? `Parses a JSON string into a validated and hydrated ${typeDef.name} value.`
        : `Parses a JSON string and hydrates it as ${typeDef.name} without runtime validation.`,
    });
    g.line(`parse(json: string): ${typeDef.name} {`);
    g.block(() => {
      g.line("const input = _vdl.parseJson(json);");
      if (strict) {
        g.line(`const error = ${typeDef.name}.validate(input);`);
        g.line("if (error !== null) {");
        g.block(() => {
          g.line("throw new Error(error);");
        });
        g.line("}");
      }
      g.line(`return ${typeDef.name}.hydrate(input as ${typeDef.name});`);
    });
    g.line("},");

    if (strict) {
      g.break();
      writeDocComment(g, {
        fallback: `Performs structural validation for ${typeDef.name} (required field presence and basic type shape only); it does not enforce business rules.`,
      });
      g.line(
        `validate(input: unknown, path = ${JSON.stringify(typeDef.name)}): string | null {`,
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
      g.line("},");
      g.break();
    } else {
      g.break();
    }

    writeDocComment(g, {
      fallback: `Hydrates a validated ${typeDef.name} value into its runtime representation.`,
    });
    g.line(`hydrate(input: ${typeDef.name}): ${typeDef.name} {`);
    g.block(() => {
      g.line(
        `return ${renderHydrationExpression(typeDef.typeRef, "input", 0)};`,
      );
    });
    g.line("},");
  });
  g.line("} as const;");
}

function renderHydrationExpression(
  typeRef: TypeRef,
  valueExpression: string,
  depth: number,
): string {
  /**
   * Recursive expression generation keeps the emitted hydrate methods compact
   * while still handling nested maps, arrays, enums, and dates.
   */
  switch (typeRef.kind) {
    case "primitive":
      return typeRef.primitiveName === "datetime"
        ? `_vdl.hydrateDateInput(${valueExpression})`
        : valueExpression;
    case "enum":
      return `${typeRef.enumName}.hydrate(${valueExpression})`;
    case "type":
      return `${typeRef.typeName}.hydrate(${valueExpression})`;
    case "array": {
      const itemName = `item${depth}`;
      return `${valueExpression}.map((${itemName}) => ${renderHydrationExpression(getArrayItemType(typeRef), itemName, depth + 1)})`;
    }
    case "map": {
      const mapValueName = `value${depth}`;
      const keyName = `key${depth}`;
      return `_vdl.mapRecord(${valueExpression}, (${mapValueName}, ${keyName}) => ${renderHydrationExpression(typeRef.mapType as TypeRef, mapValueName, depth + 1)})`;
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
      g.line("{");
      g.block(() => {
        g.line(
          `const error = ${options.typeRef.enumName}.validate(${options.valueExpression}, ${options.pathExpression});`,
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
      g.line("{");
      g.block(() => {
        g.line(
          `const error = ${options.typeRef.typeName}.validate(${options.valueExpression}, ${options.pathExpression});`,
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
          `return \`\${${options.pathExpression}}: expected array, got \${_vdl.describeValue(${options.valueExpression})}\`;`,
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
      const entryName = `entry${options.depth}`;

      g.line(`if (!_vdl.isRecord(${options.valueExpression})) {`);
      g.block(() => {
        g.line(
          `return \`\${${options.pathExpression}}: expected object, got \${_vdl.describeValue(${options.valueExpression})}\`;`,
        );
      });
      g.line("}");
      g.line(
        `for (const ${entryName} of _vdl.recordEntries(${options.valueExpression})) {`,
      );
      g.block(() => {
        g.line(`const ${keyName} = ${entryName}[0];`);
        g.line(`const ${valueName} = ${entryName}[1];`);
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
      g.line(`if (!_vdl.isRecord(${options.valueExpression})) {`);
      g.block(() => {
        g.line(
          `return \`\${${options.pathExpression}}: expected object, got \${_vdl.describeValue(${options.valueExpression})}\`;`,
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
            `if (!_vdl.hasOwn(${recordName}, ${JSON.stringify(field.name)}) || ${fieldValueExpression} === undefined) {`,
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
          `if (_vdl.hasOwn(${recordName}, ${JSON.stringify(field.name)}) && ${fieldValueExpression} !== undefined) {`,
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
          `return \`\${${pathExpression}}: expected string, got \${_vdl.describeValue(${valueExpression})}\`;`,
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
          `return \`\${${pathExpression}}: expected number, got \${_vdl.describeValue(${valueExpression})}\`;`,
        );
      });
      g.line("}");
      return;
    case "bool":
      g.line(`if (typeof ${valueExpression} !== "boolean") {`);
      g.block(() => {
        g.line(
          `return \`\${${pathExpression}}: expected boolean, got \${_vdl.describeValue(${valueExpression})}\`;`,
        );
      });
      g.line("}");
      return;
    case "datetime":
      g.line(`if (!_vdl.isValidDateInput(${valueExpression})) {`);
      g.block(() => {
        g.line(
          `return \`\${${pathExpression}}: expected datetime string or Date, got \${_vdl.describeValue(${valueExpression})}\`;`,
        );
      });
      g.line("}");
      return;
    default:
      return;
  }
}

function renderRuntimeHelpers(
  g: ReturnType<typeof newGenerator>,
  strict: boolean,
): void {
  /**
   * File-local helpers keep the generated runtime self-sufficient without a
   * separate shared support module.
   */
  writeDocComment(g, {
    fallback:
      "Internal helpers shared by the generated runtime namespaces in this file.",
  });
  g.line("const _vdl = {");
  g.block(() => {
    writeDocComment(g, {
      fallback:
        "Parses JSON text and wraps syntax failures in a stable generated error message.",
    });
    g.line("parseJson(json: string): unknown {");
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
    g.line("},");
    g.break();

    writeDocComment(g, {
      fallback:
        "Returns own enumerable entries from a record in insertion order.",
    });
    g.line(
      "recordEntries<TValue>(record: Record<string, TValue>): Array<[string, TValue]> {",
    );
    g.block(() => {
      g.line("const entries: Array<[string, TValue]> = [];");
      g.line("for (const key in record) {");
      g.block(() => {
        g.line("if (Object.prototype.hasOwnProperty.call(record, key)) {");
        g.block(() => {
          g.line("entries.push([key, record[key]]);");
        });
        g.line("}");
      });
      g.line("}");
      g.line("return entries;");
    });
    g.line("},");
    g.break();

    writeDocComment(g, {
      fallback: "Creates a new record by mapping every own enumerable value.",
    });
    g.line(
      "mapRecord<TInput, TOutput>(record: Record<string, TInput>, mapValue: (value: TInput, key: string) => TOutput): Record<string, TOutput> {",
    );
    g.block(() => {
      g.line("const output: Record<string, TOutput> = {};");
      g.line("for (const key in record) {");
      g.block(() => {
        g.line("if (Object.prototype.hasOwnProperty.call(record, key)) {");
        g.block(() => {
          g.line("output[key] = mapValue(record[key], key);");
        });
        g.line("}");
      });
      g.line("}");
      g.line("return output;");
    });
    g.line("},");
    g.break();

    if (strict) {
      writeDocComment(g, {
        fallback:
          "Checks whether a value can be validated as a plain object record.",
      });
      g.line("isRecord(value: unknown): value is Record<string, unknown> {");
      g.block(() => {
        g.line(
          'return typeof value === "object" && value !== null && !Array.isArray(value) && !(value instanceof Date);',
        );
      });
      g.line("},");
      g.break();

      writeDocComment(g, {
        fallback:
          "Checks whether a record defines a property directly on the current object.",
      });
      g.line("hasOwn(record: Record<string, unknown>, key: string): boolean {");
      g.block(() => {
        g.line("return Object.prototype.hasOwnProperty.call(record, key);");
      });
      g.line("},");
      g.break();

      writeDocComment(g, {
        fallback:
          "Describes an input value using the categories reported by generated validation errors.",
      });
      g.line("describeValue(value: unknown): string {");
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
      g.line("},");
      g.break();

      writeDocComment(g, {
        fallback:
          "Checks whether an input can be hydrated into a valid Date instance.",
      });
      g.line("isValidDateInput(value: unknown): value is string | Date {");
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
      g.line("},");
      g.break();
    }

    writeDocComment(g, {
      fallback: "Hydrates a string or Date input into a fresh Date instance.",
    });
    g.line("hydrateDateInput(value: string | Date): Date {");
    g.block(() => {
      g.line(
        "return value instanceof Date ? new Date(value.getTime()) : new Date(value);",
      );
    });
    g.line("},");
  });
  g.line("} as const;");
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
