import { irb } from "@varavel/vdl-plugin-sdk/testing";
import { describe, expect, it } from "vitest";
import { createGeneratorContext } from "../../model/build-context";
import { generateMetadataFile } from "./metadata";

describe("generateMetadataFile", () => {
  it("renders metadata helpers and schema metadata", () => {
    const result = createGeneratorContext({
      input: irb.pluginInput({
        ir: irb.schema({
          enums: [
            irb.enumDef("Status", "string", [
              irb.enumMember("Ready", irb.stringLiteral("ready"), {
                annotations: [irb.annotation("default")],
              }),
            ]),
          ],
          types: [
            irb.typeDef(
              "Product",
              irb.objectType([
                irb.field("name", irb.primitiveType("string"), {
                  annotations: [irb.annotation("searchable")],
                }),
              ]),
              {
                annotations: [
                  irb.annotation("resource", irb.stringLiteral("catalog")),
                ],
              },
            ),
          ],
          constants: [
            irb.constantDef("apiVersion", irb.stringLiteral("1.0.0")),
          ],
        }),
      }),
      generatorOptions: {
        genConsts: true,
        genMeta: true,
        importExtension: "js",
      },
    });

    const file = generateMetadataFile(expectContext(result.context));

    expect(file?.content).toContain("export type VDLSchemaMetadata = {");
    expect(file?.content).toContain("export function getFieldMetadata");
    expect(file?.content).toContain('"Product": {');
    expect(file?.content).toContain('"Status": {');
    expect(file?.content).toContain('"apiVersion": {');
  });
});

function expectContext<T>(value: T | undefined): T {
  expect(value).toBeDefined();
  return value as T;
}
