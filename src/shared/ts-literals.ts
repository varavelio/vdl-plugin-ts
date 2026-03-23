import type { LiteralValue, TypeRef } from "@varavel/vdl-plugin-sdk";
import type { GeneratorContext } from "../stages/model/types";
import { expectValue, fail } from "./errors";
import { getArrayItemType, resolveNonAliasTypeRef } from "./ts-types";

/**
 * Renders a VDL literal as a TypeScript value expression for generated
 * constants.
 */
export function renderLiteralValueExpression(
  typeRef: TypeRef,
  literal: LiteralValue,
  context: GeneratorContext,
): string {
  return renderLiteralValue(typeRef, literal, context, 0);
}

function renderLiteralValue(
  typeRef: TypeRef,
  literal: LiteralValue,
  context: GeneratorContext,
  depth: number,
): string {
  const resolvedTypeRef =
    typeRef.kind === "type"
      ? resolveNonAliasTypeRef(typeRef, context)
      : typeRef;

  switch (resolvedTypeRef.kind) {
    case "primitive":
      return renderPrimitiveLiteral(resolvedTypeRef.primitiveName, literal);
    case "enum":
      return renderEnumLiteral(literal);
    case "type":
      fail(
        "Named aliases should have been resolved before rendering literals.",
      );
      return "";
    case "array":
      return renderArrayLiteral(resolvedTypeRef, literal, context, depth);
    case "map":
      return renderMapLiteral(resolvedTypeRef, literal, context, depth);
    case "object":
      return renderObjectLiteral(resolvedTypeRef, literal, context, depth);
    default:
      fail(
        `Unsupported VDL literal type kind ${JSON.stringify(resolvedTypeRef.kind)}.`,
      );
      return "";
  }
}

function renderPrimitiveLiteral(
  primitiveName: TypeRef["primitiveName"],
  literal: LiteralValue,
): string {
  /**
   * Primitive literal rendering stays close to JavaScript syntax while making
   * datetimes explicit `Date` constructions.
   */
  switch (primitiveName) {
    case "string":
      return JSON.stringify(
        expectValue(literal.stringValue, "Expected a string literal value."),
      );
    case "int":
      return String(
        expectValue(literal.intValue, "Expected an int literal value."),
      );
    case "float":
      return String(
        expectValue(literal.floatValue, "Expected a float literal value."),
      );
    case "bool":
      return String(
        expectValue(literal.boolValue, "Expected a bool literal value."),
      );
    case "datetime": {
      if (literal.kind !== "string") {
        fail(
          "Datetime literals must be backed by strings in generated TypeScript constants.",
        );
      }

      const stringValue = expectValue(
        literal.stringValue,
        "Expected a string-backed datetime literal.",
      );

      return `new Date(${JSON.stringify(stringValue)})`;
    }
    default:
      fail("Encountered an unsupported primitive literal type.");
      return "";
  }
}

function renderEnumLiteral(literal: LiteralValue): string {
  /**
   * Enum literals are emitted as their scalar value because generated enums are
   * represented by union types.
   */
  switch (literal.kind) {
    case "string":
      return JSON.stringify(
        expectValue(
          literal.stringValue,
          "Expected a string enum literal value.",
        ),
      );
    case "int":
      return String(
        expectValue(literal.intValue, "Expected an int enum literal value."),
      );
    default:
      fail("Enum literals must be string or int values.");
      return "";
  }
}

function renderArrayLiteral(
  typeRef: TypeRef,
  literal: LiteralValue,
  context: GeneratorContext,
  depth: number,
): string {
  /**
   * Array constants reuse the nested literal renderer for each element.
   */
  const items = literal.arrayItems ?? [];
  const itemType = getArrayItemType(typeRef);

  if (items.length === 0) {
    return "[]";
  }

  return [
    "[",
    items
      .map((item) =>
        indentLiteral(
          renderLiteralValue(itemType, item, context, depth + 1),
          depth + 1,
        ),
      )
      .join(",\n"),
    `${indent(depth)}]`,
  ].join("\n");
}

function renderMapLiteral(
  typeRef: TypeRef,
  literal: LiteralValue,
  context: GeneratorContext,
  depth: number,
): string {
  /**
   * VDL maps compile to string-keyed records, so object literal syntax is the
   * natural constant representation.
   */
  const entries = literal.objectEntries ?? [];
  const valueType = expectValue(
    typeRef.mapType,
    "Encountered a map type reference without a value type.",
  );

  if (entries.length === 0) {
    return "{}";
  }

  return [
    "{",
    entries
      .map((entry) =>
        renderObjectEntry(
          entry.key,
          renderLiteralValue(valueType, entry.value, context, depth + 1),
          depth + 1,
        ),
      )
      .join(",\n"),
    `${indent(depth)}}`,
  ].join("\n");
}

function renderObjectLiteral(
  typeRef: TypeRef,
  literal: LiteralValue,
  context: GeneratorContext,
  depth: number,
): string {
  /**
   * Object literal rendering validates field membership while trusting the IR's
   * cleaned declaration order.
   */
  const fields = new Map(
    (typeRef.objectFields ?? []).map((field) => [field.name, field]),
  );
  const entries = literal.objectEntries ?? [];
  const renderedEntries: string[] = [];

  for (const entry of entries) {
    const field = fields.get(entry.key);
    if (!field) {
      fail(
        `Object literal contains unknown field ${JSON.stringify(entry.key)}.`,
      );
    }

    renderedEntries.push(
      renderObjectEntry(
        entry.key,
        renderLiteralValue(field.typeRef, entry.value, context, depth + 1),
        depth + 1,
      ),
    );
  }

  const missingRequiredField = (typeRef.objectFields ?? []).find(
    (field) =>
      !field.optional && !entries.some((entry) => entry.key === field.name),
  );

  if (missingRequiredField) {
    fail(
      `Object literal is missing required field ${JSON.stringify(missingRequiredField.name)}.`,
    );
  }

  if (renderedEntries.length === 0) {
    return "{}";
  }

  return ["{", renderedEntries.join(",\n"), `${indent(depth)}}`].join("\n");
}

function renderObjectEntry(key: string, value: string, depth: number): string {
  /**
   * Object and map entries keep the property key on the first line while
   * allowing nested array or object values to span multiple readable lines.
   */
  const lines = value.split("\n");
  const [firstLine, ...restLines] = lines;

  return [
    `${indent(depth)}${JSON.stringify(key)}: ${firstLine}`,
    ...restLines,
  ].join("\n");
}

function indentLiteral(value: string, depth: number): string {
  /**
   * Multiline literal rendering uses deterministic two-space indentation so the
   * emitted constants stay readable without a formatter pass.
   */
  return value
    .split("\n")
    .map((line) => `${indent(depth)}${line}`)
    .join("\n");
}

function indent(depth: number): string {
  /**
   * Literal indentation matches the two-space style used across generated
   * TypeScript files.
   */
  return "  ".repeat(depth);
}
