import type { PluginInput, PluginOutputError } from "@varavel/vdl-plugin-sdk";
import { ir } from "@varavel/vdl-plugin-sdk/utils";
import { buildConstantDescriptors } from "./constants";
import type { GeneratorContext, GeneratorOptions } from "./types";

/**
 * Builds the normalized generation context consumed by TypeScript emitters.
 */
export function createGeneratorContext(options: {
  input: PluginInput;
  generatorOptions: GeneratorOptions;
}): { context?: GeneratorContext; errors: PluginOutputError[] } {
  const schema = ir.hoistAnonymousTypes(options.input.ir);
  const constantResult = buildConstantDescriptors({ schema });
  const typeDefsByName = new Map(
    schema.types.map((typeDef) => [typeDef.name, typeDef]),
  );
  const enumDefsByName = new Map(
    schema.enums.map((enumDef) => [enumDef.name, enumDef]),
  );
  const exportedTypes = schema.types.filter(
    (typeDef) => !typeDef.name.startsWith("$Const"),
  );

  const errors = [...constantResult.errors];

  if (errors.length > 0) {
    return {
      errors,
    };
  }

  return {
    errors: [],
    context: {
      schema,
      options: options.generatorOptions,
      typeDefsByName,
      enumDefsByName,
      exportedTypes,
      constants: constantResult.constants,
    },
  };
}
