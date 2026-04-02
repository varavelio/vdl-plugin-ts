import type { PluginInput, PluginOutput } from "@varavel/vdl-plugin-sdk";
import { generateFiles } from "./stages/emit/generate-files";
import { createGeneratorContext } from "./stages/model/build-context";
import { resolveGeneratorOptions } from "./stages/options/resolve";

/**
 * Runs the complete VDL-to-TypeScript generation pipeline.
 *
 * The pipeline is intentionally staged so each phase has one clear concern:
 * option resolution, schema modeling, and final file emission.
 */
export function generate(input: PluginInput): PluginOutput {
  // Setup & Validation (Fail Fast)
  const generatorOptions = resolveGeneratorOptions(input);

  // Context Initialization
  const context = createGeneratorContext({ input, generatorOptions });

  // File Emission
  const files = generateFiles(context);

  return { files };
}
