import type { PluginOutputFile } from "@varavel/vdl-plugin-sdk";
import { renderExportAll } from "../../../shared/imports";
import { renderTypeScriptFile } from "../../../shared/render-ts-file";
import type { GeneratorContext } from "../../model/types";

/**
 * Emits the top-level barrel file for the generated TypeScript surface.
 */
export function generateIndexFile(context: GeneratorContext): PluginOutputFile {
  const lines: string[] = [];

  if (context.schema.enums.length > 0) {
    lines.push(renderExportAll("./enums", context.options.importExtension));
  }

  if (context.exportedTypes.length > 0) {
    lines.push(renderExportAll("./types", context.options.importExtension));
  }

  if (context.options.genConsts && context.constants.length > 0) {
    lines.push(renderExportAll("./constants", context.options.importExtension));
  }

  if (context.options.genMeta) {
    lines.push(renderExportAll("./metadata", context.options.importExtension));
  }

  if (lines.length === 0) {
    lines.push("export {};");
  }

  return {
    path: "index.ts",
    content: renderTypeScriptFile(lines.join("\n")),
  };
}
