import type { PluginInput } from "@varavel/vdl-plugin-sdk";
import * as ir from "@varavel/vdl-plugin-sdk/utils/ir";
import { buildConstantDescriptors } from "./constants";
import type { GeneratorContext, GeneratorOptions } from "./types";

/**
 * Builds the normalized generation context consumed by TypeScript emitters.
 */
export function createGeneratorContext(options: {
  input: PluginInput;
  generatorOptions: GeneratorOptions;
}): GeneratorContext {
  const schema = ir.hoistAnonymousTypes(options.input.ir);
  const constants = buildConstantDescriptors({ schema });
  const typeDefsByName = new Map(
    schema.types.map((typeDef) => [typeDef.name, typeDef]),
  );
  const enumDefsByName = new Map(
    schema.enums.map((enumDef) => [enumDef.name, enumDef]),
  );
  const exportedTypes = schema.types.filter(
    (typeDef) => !typeDef.name.startsWith("$Const"),
  );

  return {
    schema,
    options: options.generatorOptions,
    typeDefsByName,
    enumDefsByName,
    exportedTypes,
    constants,
  };
}
