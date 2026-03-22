import type { newGenerator } from "@varavel/gen";

/**
 * Emits the TypeScript support types and helper functions used by generated
 * metadata.
 */
export function renderMetadataSupportTypes(
  g: ReturnType<typeof newGenerator>,
): void {
  g.line("/**");
  g.line(" * A single annotation entry preserved in generated metadata.");
  g.line(" */");
  g.line("export type VDLAnnotation = {");
  g.block(() => {
    g.line("name: string;");
    g.line("value: unknown;");
  });
  g.line("};");
  g.break();

  g.line("/**");
  g.line(
    " * Annotation collection that preserves order and fast lookup access.",
  );
  g.line(" */");
  g.line("export type VDLAnnotationSet = {");
  g.block(() => {
    g.line("list: VDLAnnotation[];");
    g.line("byName: Record<string, unknown>;");
  });
  g.line("};");
  g.break();

  g.line(
    "export function hasAnnotation(set: VDLAnnotationSet, name: string): boolean {",
  );
  g.block(() => {
    g.line("return Object.prototype.hasOwnProperty.call(set.byName, name);");
  });
  g.line("}");
  g.break();

  g.line(
    "export function getAnnotationValue<T = unknown>(set: VDLAnnotationSet, name: string): T | undefined {",
  );
  g.block(() => {
    g.line("return set.byName[name] as T | undefined;");
  });
  g.line("}");
  g.break();

  g.line("/**");
  g.line(" * Recursive description of a generated VDL type.");
  g.line(" */");
  g.line("export type VDLTypeRef = {");
  g.block(() => {
    g.line("kind: string;");
    g.line("name?: string;");
    g.line("arrayDims?: number;");
    g.line("element?: VDLTypeRef;");
    g.line("fields?: Record<string, VDLFieldMetadata>;");
  });
  g.line("};");
  g.break();

  g.line("/**");
  g.line(" * Metadata describing a generated field.");
  g.line(" */");
  g.line("export type VDLFieldMetadata = {");
  g.block(() => {
    g.line("name: string;");
    g.line("optional: boolean;");
    g.line("annotations: VDLAnnotationSet;");
    g.line("type: VDLTypeRef;");
  });
  g.line("};");
  g.break();

  g.line("/**");
  g.line(" * Metadata describing a generated named type.");
  g.line(" */");
  g.line("export type VDLTypeMetadata = {");
  g.block(() => {
    g.line("name: string;");
    g.line("annotations: VDLAnnotationSet;");
    g.line("type: VDLTypeRef;");
  });
  g.line("};");
  g.break();

  g.line("/**");
  g.line(" * Metadata describing a generated enum member.");
  g.line(" */");
  g.line("export type VDLEnumMemberMetadata = {");
  g.block(() => {
    g.line("name: string;");
    g.line("value: unknown;");
    g.line("annotations: VDLAnnotationSet;");
  });
  g.line("};");
  g.break();

  g.line("/**");
  g.line(" * Metadata describing a generated enum.");
  g.line(" */");
  g.line("export type VDLEnumMetadata = {");
  g.block(() => {
    g.line("name: string;");
    g.line('enumType: "string" | "int";');
    g.line("annotations: VDLAnnotationSet;");
    g.line("members: Record<string, VDLEnumMemberMetadata>;");
  });
  g.line("};");
  g.break();

  g.line("/**");
  g.line(" * Metadata describing a generated constant.");
  g.line(" */");
  g.line("export type VDLConstantMetadata = {");
  g.block(() => {
    g.line("name: string;");
    g.line("annotations: VDLAnnotationSet;");
    g.line("type: VDLTypeRef;");
  });
  g.line("};");
  g.break();

  g.line("/**");
  g.line(" * Root metadata object for the generated schema.");
  g.line(" */");
  g.line("export type VDLSchemaMetadata = {");
  g.block(() => {
    g.line("types: Record<string, VDLTypeMetadata>;");
    g.line("enums: Record<string, VDLEnumMetadata>;");
    g.line("constants: Record<string, VDLConstantMetadata>;");
  });
  g.line("};");
  g.break();

  g.line(
    "export function getTypeMetadata(name: string): VDLTypeMetadata | undefined {",
  );
  g.block(() => {
    g.line("return VDLMetadata.types[name];");
  });
  g.line("}");
  g.break();

  g.line(
    "export function getEnumMetadata(name: string): VDLEnumMetadata | undefined {",
  );
  g.block(() => {
    g.line("return VDLMetadata.enums[name];");
  });
  g.line("}");
  g.break();

  g.line(
    "export function getConstantMetadata(name: string): VDLConstantMetadata | undefined {",
  );
  g.block(() => {
    g.line("return VDLMetadata.constants[name];");
  });
  g.line("}");
  g.break();

  g.line(
    "export function getFieldMetadata(source: VDLTypeMetadata | VDLTypeRef, name: string): VDLFieldMetadata | undefined {",
  );
  g.block(() => {
    g.line('const typeRef = "type" in source ? source.type : source;');
    g.line("if (typeRef.fields?.[name]) {");
    g.block(() => {
      g.line("return typeRef.fields[name];");
    });
    g.line("}");
    g.line('if (typeRef.kind === "type" && typeRef.name) {');
    g.block(() => {
      g.line("return VDLMetadata.types[typeRef.name]?.type.fields?.[name];");
    });
    g.line("}");
    g.line("return undefined;");
  });
  g.line("}");
  g.break();

  g.line(
    "export function getEnumMemberMetadata(enumName: string, memberName: string): VDLEnumMemberMetadata | undefined {",
  );
  g.block(() => {
    g.line("return VDLMetadata.enums[enumName]?.members[memberName];");
  });
  g.line("}");
}
