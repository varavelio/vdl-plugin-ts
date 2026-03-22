import { newGenerator } from "@varavel/gen";
import type { PluginOutputFile } from "@varavel/vdl-plugin-sdk";
import { renderTypeScriptFile } from "../../../shared/render-ts-file";
import type { GeneratorContext } from "../../model/types";
import {
  renderAnnotationSetExpression,
  renderMetadataValueExpression,
} from "./metadata-annotations";
import { renderMetadataSupportTypes } from "./metadata-runtime";
import { renderMetadataTypeRefExpression } from "./metadata-types";

/**
 * Emits runtime metadata for types, enums, and constants.
 */
export function generateMetadataFile(
  context: GeneratorContext,
): PluginOutputFile | undefined {
  if (!context.options.genMeta) {
    return undefined;
  }

  const g = newGenerator().withSpaces(2);
  renderMetadataSupportTypes(g);
  g.break();

  g.line("/**");
  g.line(" * Metadata describing the generated VDL schema.");
  g.line(" */");
  g.line("export const VDLMetadata: VDLSchemaMetadata = {");
  g.block(() => {
    g.line("types: {");
    g.block(() => {
      for (const typeDef of context.exportedTypes) {
        g.line(`${JSON.stringify(typeDef.name)}: {`);
        g.block(() => {
          g.line(`name: ${JSON.stringify(typeDef.name)},`);
          g.line(
            `annotations: ${renderAnnotationSetExpression(typeDef.annotations)},`,
          );
          g.line(`type: ${renderMetadataTypeRefExpression(typeDef.typeRef)},`);
        });
        g.line("},");
      }
    });
    g.line("},");
    g.line("enums: {");
    g.block(() => {
      for (const enumDef of context.schema.enums) {
        g.line(`${JSON.stringify(enumDef.name)}: {`);
        g.block(() => {
          g.line(`name: ${JSON.stringify(enumDef.name)},`);
          g.line(`enumType: ${JSON.stringify(enumDef.enumType)},`);
          g.line(
            `annotations: ${renderAnnotationSetExpression(enumDef.annotations)},`,
          );
          g.line("members: {");
          g.block(() => {
            for (const member of enumDef.members) {
              g.line(`${JSON.stringify(member.name)}: {`);
              g.block(() => {
                g.line(`name: ${JSON.stringify(member.name)},`);
                g.line(
                  `value: ${renderMetadataValueExpression(member.value)},`,
                );
                g.line(
                  `annotations: ${renderAnnotationSetExpression(member.annotations)},`,
                );
              });
              g.line("},");
            }
          });
          g.line("},");
        });
        g.line("},");
      }
    });
    g.line("},");
    g.line("constants: {");
    g.block(() => {
      for (const constant of context.constants) {
        g.line(`${JSON.stringify(constant.def.name)}: {`);
        g.block(() => {
          g.line(`name: ${JSON.stringify(constant.def.name)},`);
          g.line(
            `annotations: ${renderAnnotationSetExpression(constant.def.annotations)},`,
          );
          g.line(`type: ${renderMetadataTypeRefExpression(constant.typeRef)},`);
        });
        g.line("},");
      }
    });
    g.line("},");
  });
  g.line("};");

  return {
    path: "metadata.ts",
    content: renderTypeScriptFile(g.toString()),
  };
}
