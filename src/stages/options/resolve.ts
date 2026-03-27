import type { PluginInput, PluginOutputError } from "@varavel/vdl-plugin-sdk";
import * as options from "@varavel/vdl-plugin-sdk/utils/options";
import {
  IMPORT_EXTENSION_VALUES,
  type ImportExtension,
} from "../../shared/imports";
import type { GeneratorOptions } from "../model/types";

/**
 * Resolves user-facing plugin options into a typed generator configuration.
 */
export function resolveGeneratorOptions(input: PluginInput): {
  options?: GeneratorOptions;
  errors: PluginOutputError[];
} {
  const genConsts = options.getOptionBool(input.options, "genConsts", true);
  const strict = options.getOptionBool(input.options, "strict", true);
  const importExtension = options.getOptionEnum(
    input.options,
    "importExtension",
    IMPORT_EXTENSION_VALUES,
    "js",
  ) as ImportExtension;

  return {
    errors: [],
    options: {
      genConsts,
      strict,
      importExtension,
    },
  };
}
