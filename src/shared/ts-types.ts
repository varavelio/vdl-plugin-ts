import { newGenerator } from "@varavel/gen";
import type {
  Field,
  PrimitiveType,
  TypeDef,
  TypeRef,
} from "@varavel/vdl-plugin-sdk";
import { assert, fail } from "@varavel/vdl-plugin-sdk";
import type { GeneratorContext } from "../stages/model/types";
import { renderPropertyName } from "./naming";

/**
 * Maps VDL primitive names to their generated TypeScript counterparts.
 */
export function renderPrimitiveType(
  primitiveName: PrimitiveType | undefined,
): string {
  switch (primitiveName) {
    case "string":
      return "string";
    case "int":
    case "float":
      return "number";
    case "bool":
      return "boolean";
    case "datetime":
      return "Date";
    default:
      fail(
        "Encountered a primitive type reference without a valid primitive name.",
      );
  }
}

/**
 * Renders any VDL type reference as a TypeScript type expression.
 */
export function renderTypeScriptType(
  typeRef: TypeRef,
  context: GeneratorContext,
): string {
  switch (typeRef.kind) {
    case "primitive":
      return renderPrimitiveType(typeRef.primitiveName);
    case "type":
      return requiredValue(
        typeRef.typeName,
        "Encountered a named type reference without a type name.",
      );
    case "enum":
      return requiredValue(
        typeRef.enumName,
        "Encountered an enum reference without an enum name.",
      );
    case "array":
      return `${renderTypeScriptType(getArrayItemType(typeRef), context)}[]`;
    case "map":
      return `Record<string, ${renderTypeScriptType(requiredValue(typeRef.mapType, "Encountered a map type reference without a value type."), context)}>`;
    case "object":
      return renderInlineObjectType(typeRef.objectFields ?? [], context);
    default:
      fail(`Unsupported VDL type kind ${JSON.stringify(typeRef.kind)}.`);
  }
}

/**
 * Resolves a named type reference to its underlying type definition.
 */
export function resolveNamedType(
  typeRef: TypeRef,
  context: GeneratorContext,
  visited = new Set<string>(),
): TypeDef {
  const typeName = requiredValue(
    typeRef.typeName,
    "Encountered a named type reference without a type name.",
  );

  if (visited.has(typeName)) {
    fail(`Detected a type cycle while resolving ${JSON.stringify(typeName)}.`);
  }

  visited.add(typeName);
  return requiredValue(
    context.typeDefsByName.get(typeName),
    `Unknown VDL type reference ${JSON.stringify(typeName)}.`,
  );
}

/**
 * Resolves a type reference until it is no longer a named alias.
 */
export function resolveNonAliasTypeRef(
  typeRef: TypeRef,
  context: GeneratorContext,
  visited = new Set<string>(),
): TypeRef {
  if (typeRef.kind !== "type") {
    return typeRef;
  }

  const typeDef = resolveNamedType(typeRef, context, visited);
  return resolveNonAliasTypeRef(typeDef.typeRef, context, visited);
}

/**
 * Returns the element type for a single array nesting level.
 */
export function getArrayItemType(typeRef: TypeRef): TypeRef {
  const arrayDims = typeRef.arrayDims ?? 1;
  const arrayType = requiredValue(
    typeRef.arrayType,
    "Encountered an array type reference without an element type.",
  );

  if (arrayDims === 1) {
    return arrayType;
  }

  return {
    kind: "array",
    arrayDims: arrayDims - 1,
    arrayType,
  };
}

function renderInlineObjectType(
  fields: Field[],
  context: GeneratorContext,
): string {
  /**
   * Inline object aliases are rendered as object literals because they already
   * represent their final TypeScript surface.
   */
  if (fields.length === 0) {
    return "Record<string, never>";
  }

  const g = newGenerator().withSpaces(2);
  g.line("{");
  g.block(() => {
    for (const field of fields) {
      const optionalSuffix = field.optional ? "?" : "";
      g.line(
        `${renderPropertyName(field.name)}${optionalSuffix}: ${renderTypeScriptType(field.typeRef, context)};`,
      );
    }
  });
  g.line("}");

  return g.toString().trim();
}

function requiredValue<T>(value: T | null | undefined, message: string): T {
  assert(value !== null && value !== undefined, message);
  return value;
}
