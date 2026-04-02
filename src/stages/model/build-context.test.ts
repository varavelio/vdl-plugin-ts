import * as irb from "@varavel/vdl-plugin-sdk/testing";
import { describe, expect, it } from "vitest";
import { createGeneratorContext } from "./build-context";

describe("createGeneratorContext", () => {
  it("hoists nested inline object types and excludes synthetic constant helpers", () => {
    const context = createGeneratorContext({
      input: irb.pluginInput({
        ir: irb.schema({
          types: [
            irb.typeDef("$ConstapiVersion", irb.primitiveType("string")),
            irb.typeDef(
              "Envelope",
              irb.objectType([
                irb.field(
                  "payload",
                  irb.objectType([
                    irb.field("id", irb.primitiveType("string")),
                  ]),
                ),
              ]),
            ),
          ],
          constants: [
            irb.constantDef("apiVersion", irb.stringLiteral("1.0.0")),
          ],
        }),
      }),
      generatorOptions: {
        genConsts: true,
        strict: true,
        importExtension: "js",
      },
    });

    expect(context.exportedTypes.map((typeDef) => typeDef.name)).toEqual([
      "Envelope",
      "EnvelopePayload",
    ]);
    expect(context.constants[0]?.typeRef.kind).toBe("primitive");
  });

  it("infers constant object types when no synthetic constant helper type exists", () => {
    const context = createGeneratorContext({
      input: irb.pluginInput({
        ir: irb.schema({
          constants: [
            irb.constantDef(
              "labels",
              irb.objectLiteral({
                env: irb.stringLiteral("prod"),
                region: irb.stringLiteral("eu"),
              }),
            ),
          ],
        }),
      }),
      generatorOptions: {
        genConsts: true,
        strict: true,
        importExtension: "js",
      },
    });

    expect(context.constants[0]?.typeRef.kind).toBe("object");
    expect(
      context.constants[0]?.typeRef.objectFields?.map((field) => field.name),
    ).toEqual(["env", "region"]);
  });
});
