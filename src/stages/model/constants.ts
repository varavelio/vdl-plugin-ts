import type {
  ConstantDef,
  Field,
  LiteralValue,
  ObjectEntry,
  TypeDef,
  TypeRef,
} from "@varavel/vdl-plugin-sdk";
import { fail } from "@varavel/vdl-plugin-sdk";
import * as strings from "@varavel/vdl-plugin-sdk/utils/strings";
import type { ConstantDescriptor } from "./types";

/**
 * Resolves the best available type information for every VDL constant.
 */
export function buildConstantDescriptors(options: {
  schema: { constants: ConstantDef[]; types: TypeDef[] };
}): ConstantDescriptor[] {
  const inferredTypes = new Map<string, TypeRef>();

  for (const typeDef of options.schema.types) {
    if (!typeDef.name.startsWith("$Const") || typeDef.name.length <= 6) {
      continue;
    }

    inferredTypes.set(toConstLookupKey(typeDef.name.slice(6)), typeDef.typeRef);
  }

  const constants: ConstantDescriptor[] = [];

  for (const constant of options.schema.constants) {
    const inferredType = inferredTypes.get(toConstLookupKey(constant.name));
    if (inferredType) {
      constants.push({ def: constant, typeRef: inferredType });
      continue;
    }

    const inference = inferTypeRefFromLiteral(constant.value);
    if (!inference.typeRef) {
      fail(
        `Could not infer a TypeScript type for constant ${JSON.stringify(constant.name)}: ${inference.error ?? "unknown inference failure"}`,
        constant.position,
      );
    }

    constants.push({
      def: constant,
      typeRef: inference.typeRef,
    });
  }

  return constants;
}

function inferTypeRefFromLiteral(literal: LiteralValue): {
  typeRef?: TypeRef;
  error?: string;
} {
  /**
   * Constant descriptors fall back to literal inference when the schema does
   * not include a synthetic `$Const...` helper type for the current constant.
   */
  switch (literal.kind) {
    case "string":
      return { typeRef: { kind: "primitive", primitiveName: "string" } };
    case "int":
      return { typeRef: { kind: "primitive", primitiveName: "int" } };
    case "float":
      return { typeRef: { kind: "primitive", primitiveName: "float" } };
    case "bool":
      return { typeRef: { kind: "primitive", primitiveName: "bool" } };
    case "array":
      return inferArrayTypeRef(literal.arrayItems ?? []);
    case "object":
      return inferObjectTypeRef(literal.objectEntries ?? []);
    default:
      return { error: "unsupported literal kind" };
  }
}

function inferArrayTypeRef(items: LiteralValue[]): {
  typeRef?: TypeRef;
  error?: string;
} {
  /**
   * Array inference requires a non-empty array with one structurally stable
   * element type across every item.
   */
  if (items.length === 0) {
    return {
      error:
        "array literals cannot be empty when no declared constant type is available",
    };
  }

  const first = items[0];
  if (!first) {
    return { error: "encountered an undefined array item literal" };
  }

  const firstInference = inferTypeRefFromLiteral(first);
  if (!firstInference.typeRef) {
    return firstInference;
  }

  for (let index = 1; index < items.length; index += 1) {
    const candidateItem = items[index];
    if (!candidateItem) {
      return { error: "encountered an undefined array item literal" };
    }

    const candidate = inferTypeRefFromLiteral(candidateItem);
    if (!candidate.typeRef) {
      return candidate;
    }

    if (!areTypeRefsEquivalent(firstInference.typeRef, candidate.typeRef)) {
      return {
        error: `array literal item at index ${String(index)} does not match the inferred element type`,
      };
    }
  }

  return {
    typeRef: {
      kind: "array",
      arrayDims: 1,
      arrayType: firstInference.typeRef,
    },
  };
}

function inferObjectTypeRef(entries: ObjectEntry[]): {
  typeRef?: TypeRef;
  error?: string;
} {
  /**
   * Object inference preserves the IR entry order and treats every inferred
   * field as required.
   */
  const fields: Field[] = [];

  for (const entry of entries) {
    const inference = inferTypeRefFromLiteral(entry.value);
    if (!inference.typeRef) {
      return inference;
    }

    fields.push({
      position: entry.position,
      name: entry.key,
      doc: undefined,
      optional: false,
      annotations: [],
      typeRef: inference.typeRef,
    });
  }

  return {
    typeRef: {
      kind: "object",
      objectFields: fields,
    },
  };
}

function areTypeRefsEquivalent(left: TypeRef, right: TypeRef): boolean {
  /**
   * Structural comparison keeps array inference readable by extracting the
   * compatibility check into one helper.
   */
  if (left.kind !== right.kind) {
    return false;
  }

  switch (left.kind) {
    case "primitive":
      return left.primitiveName === right.primitiveName;
    case "type":
      return left.typeName === right.typeName;
    case "enum":
      return (
        left.enumName === right.enumName && left.enumType === right.enumType
      );
    case "array":
      return (
        (left.arrayDims ?? 1) === (right.arrayDims ?? 1) &&
        areTypeRefsEquivalent(
          left.arrayType as TypeRef,
          right.arrayType as TypeRef,
        )
      );
    case "map":
      return areTypeRefsEquivalent(
        left.mapType as TypeRef,
        right.mapType as TypeRef,
      );
    case "object": {
      const leftFields = left.objectFields ?? [];
      const rightFields = right.objectFields ?? [];

      if (leftFields.length !== rightFields.length) {
        return false;
      }

      for (let index = 0; index < leftFields.length; index += 1) {
        const leftField = leftFields[index];
        const rightField = rightFields[index];

        if (!leftField || !rightField) {
          return false;
        }

        if (
          leftField.name !== rightField.name ||
          leftField.optional !== rightField.optional ||
          !areTypeRefsEquivalent(leftField.typeRef, rightField.typeRef)
        ) {
          return false;
        }
      }

      return true;
    }
    default:
      return false;
  }
}

function toConstLookupKey(name: string): string {
  /**
   * `$Const...` helper names are matched case-insensitively using the SDK word
   * tokenizer so schema casing differences do not matter.
   */
  return strings.words(name).join("").toLowerCase();
}
