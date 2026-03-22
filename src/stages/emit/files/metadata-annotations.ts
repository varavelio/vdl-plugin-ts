import type { Annotation, LiteralValue } from "@varavel/vdl-plugin-sdk";

/**
 * Renders an annotation set literal for the generated metadata module.
 */
export function renderAnnotationSetExpression(
  annotations: Annotation[],
): string {
  if (annotations.length === 0) {
    return "{ list: [], byName: {} }";
  }

  const byNameEntries = new Map<string, string>();
  for (const annotation of annotations) {
    byNameEntries.set(
      annotation.name,
      renderMetadataValueExpression(annotation.argument),
    );
  }

  return `{
    list: [${annotations
      .map(
        (annotation) =>
          `{ name: ${JSON.stringify(annotation.name)}, value: ${renderMetadataValueExpression(annotation.argument)} }`,
      )
      .join(", ")}],
    byName: { ${[...byNameEntries.entries()]
      .map(([name, value]) => `${JSON.stringify(name)}: ${value}`)
      .join(", ")} }
  }`;
}

/**
 * Renders a metadata-friendly JavaScript value expression from a VDL literal.
 */
export function renderMetadataValueExpression(
  value: LiteralValue | undefined,
): string {
  if (!value) {
    return "undefined";
  }

  switch (value.kind) {
    case "string":
      return JSON.stringify(value.stringValue);
    case "int":
      return String(value.intValue);
    case "float":
      return String(value.floatValue);
    case "bool":
      return String(value.boolValue);
    case "array":
      return `[${(value.arrayItems ?? [])
        .map((item) => renderMetadataValueExpression(item))
        .join(", ")}]`;
    case "object":
      return `{ ${(value.objectEntries ?? [])
        .map(
          (entry) =>
            `${JSON.stringify(entry.key)}: ${renderMetadataValueExpression(entry.value)}`,
        )
        .join(", ")} }`;
    default:
      return "undefined";
  }
}
