import * as irb from "@varavel/vdl-plugin-sdk/testing";
import { describe, expect, it } from "vitest";
import { createGeneratorContext } from "../../model/build-context";
import { generateTypesFile } from "./types";

describe("generateTypesFile", () => {
  it("renders merged type namespaces with enum namespace imports", () => {
    const context = createGeneratorContext({
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
        strict: true,
        importExtension: "ts",
      },
    });

    const file = generateTypesFile(context);

    expect(file?.content).toContain('import { Status } from "./enums.ts";');
    expect(file?.content).toContain("createdAt: Date;");
    expect(file?.content).toContain("export const Payload = {");
    expect(file?.content).toContain("parse(json: string): Payload {");
    expect(file?.content).toContain("const error = Payload.validate(input);");
    expect(file?.content).toContain(
      "Performs structural validation for Payload (required field presence and basic type shape only); it does not enforce business rules.",
    );
    expect(file?.content).toContain("const _vdl = {");
    expect(file?.content).toContain("recordEntries<TValue>");
    expect(file?.content).toContain("mapRecord<TInput, TOutput>");
    expect(file?.content).toContain("status: Status.hydrate(input.status),");
    expect(file?.content).not.toContain("Object.entries(");
    expect(file?.content).not.toContain("Object.fromEntries(");
    expect(file?.content).not.toContain("export function validatePayload");
  });

  it("omits type validate helpers when strict mode is disabled", () => {
    const context = createGeneratorContext({
      input: irb.pluginInput({
        ir: irb.schema({
          types: [
            irb.typeDef(
              "Payload",
              irb.objectType([
                irb.field("createdAt", irb.primitiveType("datetime")),
              ]),
            ),
          ],
        }),
      }),
      generatorOptions: {
        genConsts: true,
        strict: false,
        importExtension: "ts",
      },
    });

    const file = generateTypesFile(context);

    expect(file?.content).toContain("parse(json: string): Payload {");
    expect(file?.content).not.toContain(
      "const error = Payload.validate(input);",
    );
    expect(file?.content).not.toContain("validate(input: unknown");
  });
});
