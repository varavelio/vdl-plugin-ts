import { definePlugin } from "@varavel/vdl-plugin-sdk";
import { generate as generateOutput } from "./generate";

/**
 * SDK-facing entrypoint for the VDL TypeScript plugin.
 *
 * The actual generation pipeline lives in `./generate` so it can stay a pure,
 * testable function from `PluginInput` to `PluginOutput`.
 */
export const generate = definePlugin((input) => generateOutput(input));
