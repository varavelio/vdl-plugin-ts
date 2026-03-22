import { newGenerator } from "@varavel/gen";
import type { PluginOutputFile, TypeRef } from "@varavel/vdl-plugin-sdk";
import {
  buildDocCommentLines,
  writeDocComment,
} from "../../../shared/comments";
import { formatImportPath } from "../../../shared/imports";
import { renderTypeScriptFile } from "../../../shared/render-ts-file";
import { renderLiteralValueExpression } from "../../../shared/ts-literals";
import { renderTypeScriptType } from "../../../shared/ts-types";
import type { GeneratorContext } from "../../model/types";

/**
 * Emits generated constants when constant emission is enabled.
 */
export function generateConstantsFile(
  context: GeneratorContext,
): PluginOutputFile | undefined {
  if (!context.options.genConsts || context.constants.length === 0) {
    return undefined;
  }

  const typeImports = collectReferencedTypeNames(
    context.constants.map((constant) => constant.typeRef),
  );
  const enumImports = collectReferencedEnumNames(
    context.constants.map((constant) => constant.typeRef),
  );
  const g = newGenerator().withSpaces(2);

  if (enumImports.length > 0) {
    g.line(
      `import type { ${enumImports.join(", ")} } from ${JSON.stringify(formatImportPath("./enums", context.options.importExtension))};`,
    );
  }

  if (typeImports.length > 0) {
    g.line(
      `import type { ${typeImports.join(", ")} } from ${JSON.stringify(formatImportPath("./types", context.options.importExtension))};`,
    );
  }

  if (enumImports.length > 0 || typeImports.length > 0) {
    g.break();
  }

  for (let index = 0; index < context.constants.length; index += 1) {
    const constant = context.constants[index];
    if (!constant) {
      continue;
    }

    writeDocComment(
      g,
      buildDocCommentLines({
        doc: constant.def.doc,
        annotations: constant.def.annotations,
        fallback: `${constant.def.name} holds a generated VDL constant.`,
      }),
    );
    g.line(
      `export const ${constant.def.name}: ${renderTypeScriptType(constant.typeRef, context)} = ${renderLiteralValueExpression(constant.typeRef, constant.def.value, context)};`,
    );

    if (index < context.constants.length - 1) {
      g.break();
    }
  }

  return {
    path: "constants.ts",
    content: renderTypeScriptFile(g.toString()),
  };
}

function collectReferencedTypeNames(typeRefs: TypeRef[]): string[] {
  /**
   * Type imports are gathered up front so emitted import lists remain sorted
   * and easy to inspect.
   */
  const names = new Set<string>();

  for (const typeRef of typeRefs) {
    appendReferencedTypeNames(typeRef, names);
  }

  return [...names].sort((left, right) => left.localeCompare(right));
}

function appendReferencedTypeNames(typeRef: TypeRef, names: Set<string>): void {
  /**
   * Named type references may appear anywhere inside a constant type tree.
   */
  switch (typeRef.kind) {
    case "type":
      if (typeRef.typeName) {
        names.add(typeRef.typeName);
      }
      return;
    case "array":
      if (typeRef.arrayType) {
        appendReferencedTypeNames(typeRef.arrayType, names);
      }
      return;
    case "map":
      if (typeRef.mapType) {
        appendReferencedTypeNames(typeRef.mapType, names);
      }
      return;
    case "object":
      for (const field of typeRef.objectFields ?? []) {
        appendReferencedTypeNames(field.typeRef, names);
      }
      return;
    default:
      return;
  }
}

function collectReferencedEnumNames(typeRefs: TypeRef[]): string[] {
  /**
   * Enum imports are collected separately because they come from `enums.ts`
   * rather than `types.ts`.
   */
  const names = new Set<string>();

  for (const typeRef of typeRefs) {
    appendReferencedEnumNames(typeRef, names);
  }

  return [...names].sort((left, right) => left.localeCompare(right));
}

function appendReferencedEnumNames(typeRef: TypeRef, names: Set<string>): void {
  /**
   * Enum references can also be nested inside arrays, maps, or inline object
   * fields.
   */
  switch (typeRef.kind) {
    case "enum":
      if (typeRef.enumName) {
        names.add(typeRef.enumName);
      }
      return;
    case "array":
      if (typeRef.arrayType) {
        appendReferencedEnumNames(typeRef.arrayType, names);
      }
      return;
    case "map":
      if (typeRef.mapType) {
        appendReferencedEnumNames(typeRef.mapType, names);
      }
      return;
    case "object":
      for (const field of typeRef.objectFields ?? []) {
        appendReferencedEnumNames(field.typeRef, names);
      }
      return;
    default:
      return;
  }
}
