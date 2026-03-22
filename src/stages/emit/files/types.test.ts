import { irb } from "@varavel/vdl-plugin-sdk/testing";
import { describe, expect, it } from "vitest";
import { createGeneratorContext } from "../../model/build-context";
import { generateTypesFile } from "./types";

describe("generateTypesFile", () => {
  it("renders named types, enum imports, validators, and hydrators", () => {
    const result = createGeneratorContext({
      input: irb.pluginInput({
        ir: irb.schema({
          enums: [
            irb.enumDef("Status", "string", [
              irb.enumMember("Ready", irb.stringLiteral("ready")),
            ]),
          ],
          types: [
            irb.typeDef(
              "Payload",
              irb.objectType([
                irb.field("createdAt", irb.primitiveType("datetime")),
                irb.field("status", irb.enumType("Status", "string")),
              ]),
            ),
          ],
        }),
      }),
      generatorOptions: {
        genConsts: true,
        genMeta: true,
        importExtension: "ts",
      },
    });

    const file = generateTypesFile(expectContext(result.context));

    expect(file?.content).toContain(
      'import { type Status, hydrateStatus, validateStatus } from "./enums.ts";',
    );
    expect(file?.content).toContain("createdAt: Date;");
    expect(file?.content).toContain("export function hydratePayload");
    expect(file?.content).toContain("export function validatePayload");
    expect(file?.content).toContain("export function fromPayloadString");
    expect(file?.content).not.toContain("export function fromPayloadUnknown");
    expect(file?.content).not.toContain("export const PayloadCodec");
  });
});

function expectContext<T>(value: T | undefined): T {
  expect(value).toBeDefined();
  return value as T;
}
