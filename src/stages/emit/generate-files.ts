import type { PluginOutputFile } from "@varavel/vdl-plugin-sdk";
import * as arrays from "@varavel/vdl-plugin-sdk/utils/arrays";
import type { GeneratorContext } from "../model/types";
import { generateConstantsFile } from "./files/constants";
import { generateEnumsFile } from "./files/enums";
import { generateIndexFile } from "./files/index";
import { generateTypesFile } from "./files/types";

/**
 * Emits all generated TypeScript files in a fixed, deterministic order.
 */
export function generateFiles(context: GeneratorContext): PluginOutputFile[] {
  return arrays.compact([
    generateEnumsFile(context),
    generateTypesFile(context),
    generateConstantsFile(context),
    generateIndexFile(context),
  ]);
}
