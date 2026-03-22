import type { Field, TypeRef } from "@varavel/vdl-plugin-sdk";
import { renderAnnotationSetExpression } from "./metadata-annotations";

/**
 * Renders a recursive metadata description for any VDL type reference.
 */
export function renderMetadataTypeRefExpression(typeRef: TypeRef): string {
  switch (typeRef.kind) {
    case "primitive":
      return `{ kind: ${JSON.stringify(typeRef.kind)}, name: ${JSON.stringify(typeRef.primitiveName)} }`;
    case "type":
      return `{ kind: ${JSON.stringify(typeRef.kind)}, name: ${JSON.stringify(typeRef.typeName)} }`;
    case "enum":
      return `{ kind: ${JSON.stringify(typeRef.kind)}, name: ${JSON.stringify(typeRef.enumName)} }`;
    case "array":
      return `{ kind: ${JSON.stringify(typeRef.kind)}, arrayDims: ${String(typeRef.arrayDims ?? 1)}, element: ${renderMetadataTypeRefExpression(typeRef.arrayType as TypeRef)} }`;
    case "map":
      return `{ kind: ${JSON.stringify(typeRef.kind)}, element: ${renderMetadataTypeRefExpression(typeRef.mapType as TypeRef)} }`;
    case "object":
      return `{ kind: ${JSON.stringify(typeRef.kind)}, fields: ${renderMetadataFieldMapExpression(typeRef.objectFields ?? [])} }`;
    default:
      return `{ kind: ${JSON.stringify(typeRef.kind)} }`;
  }
}

function renderMetadataFieldMapExpression(fields: Field[]): string {
  /**
   * Field maps keep object metadata lookup-friendly while preserving the nested
   * type information needed for further traversal.
   */
  if (fields.length === 0) {
    return "{}";
  }

  return `{ ${fields
    .map(
      (field) =>
        `${JSON.stringify(field.name)}: { name: ${JSON.stringify(field.name)}, optional: ${String(field.optional)}, annotations: ${renderAnnotationSetExpression(field.annotations)}, type: ${renderMetadataTypeRefExpression(field.typeRef)} }`,
    )
    .join(", ")} }`;
}
