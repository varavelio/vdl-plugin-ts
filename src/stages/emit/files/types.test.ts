import { irb } from "@varavel/vdl-plugin-sdk/testing";
import { describe, expect, it } from "vitest";
import { createGeneratorContext } from "../../model/build-context";
import { generateTypesFile } from "./types";

describe("generateTypesFile", () => {
  it("renders merged type namespaces with enum namespace imports", () => {
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

    expect(file?.content).toContain('import { Status } from "./enums.ts";');
    expect(file?.content).toContain("createdAt: Date;");
    expect(file?.content).toContain("export const Payload = {");
    expect(file?.content).toContain("parse(json: string): Payload {");
    expect(file?.content).toContain(
      "const vdl_error = Payload.validate(vdl_input);",
    );
    expect(file?.content).toContain("status: Status.hydrate(input.status),");
    expect(file?.content).not.toContain("export function validatePayload");
  });
});

function expectContext<T>(value: T | undefined): T {
  expect(value).toBeDefined();
  return value as T;
}
