import type {
  ConstantDef,
  EnumDef,
  IrSchema,
  TypeDef,
  TypeRef,
} from "@varavel/vdl-plugin-sdk";
import type { ImportExtension } from "../../shared/imports";

/**
 * Resolved configuration that drives TypeScript generation.
 */
export interface GeneratorOptions {
  /** Whether to emit `constants.ts` when constants exist. */
  genConsts: boolean;
  /** Whether generated parse helpers should enforce runtime validation. */
  strict: boolean;
  /** Import extension strategy for generated internal imports. */
  importExtension: ImportExtension;
}

/**
 * Describes a constant together with the best available type reference.
 */
export interface ConstantDescriptor {
  /** Original VDL constant definition. */
  def: ConstantDef;
  /** Resolved or inferred type used to render the constant. */
  typeRef: TypeRef;
}

/**
 * Unified context consumed by all emitters.
 */
export interface GeneratorContext {
  /** Normalized schema after anonymous-type hoisting. */
  schema: IrSchema;
  /** Resolved generator options. */
  options: GeneratorOptions;
  /** Fast lookup of named types by VDL name. */
  typeDefsByName: Map<string, TypeDef>;
  /** Fast lookup of enums by VDL name. */
  enumDefsByName: Map<string, EnumDef>;
  /** Public types emitted to `types.ts`. */
  exportedTypes: TypeDef[];
  /** Resolved constants with inferred type information. */
  constants: ConstantDescriptor[];
}
