import * as strings from "@varavel/vdl-plugin-sdk/utils/strings";

/**
 * Derives the generated type name for an inline object nested under a parent
 * named type.
 */
export function toInlineTypeName(
  parentTypeName: string,
  fieldName: string,
): string {
  return `${parentTypeName}${strings.pascalCase(fieldName)}`;
}

/**
 * Checks whether a property name can be emitted without quotes.
 */
export function isIdentifierName(value: string): boolean {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(value);
}

/**
 * Renders a property key in declaration position.
 *
 * If the property name is a valid identifier, it is returned as-is. Otherwise, it
 * is rendered as a string literal (with quotes) to ensure valid syntax.
 */
export function renderPropertyName(value: string): string {
  return isIdentifierName(value) ? value : JSON.stringify(value);
}

/**
 * Renders property access against a record-like expression.
 */
export function renderRecordAccess(
  recordExpression: string,
  key: string,
): string {
  return `${recordExpression}[${JSON.stringify(key)}]`;
}
