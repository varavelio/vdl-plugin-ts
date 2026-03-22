import { irb } from "@varavel/vdl-plugin-sdk/testing";
import { describe, expect, it } from "vitest";
import { generate } from "./generate";

describe("generate", () => {
  it("emits enums, types, constants, metadata, and an index barrel", () => {
    const result = generate(
      irb.pluginInput({
        options: {
          importExtension: "ts",
        },
        ir: irb.schema({
          enums: [
            irb.enumDef("DeliveryState", "string", [
              irb.enumMember("Unknown", irb.stringLiteral("unknown")),
              irb.enumMember("Pending", irb.stringLiteral("pending")),
            ]),
          ],
          constants: [
            irb.constantDef("apiVersion", irb.stringLiteral("1.0.0")),
          ],
          types: [
            irb.typeDef("UserId", irb.primitiveType("string")),
            irb.typeDef(
              "User",
              irb.objectType([
                irb.field("id", irb.namedType("UserId")),
                irb.field("createdAt", irb.primitiveType("datetime")),
                irb.field(
                  "address",
                  irb.objectType([
                    irb.field("city", irb.primitiveType("string")),
                  ]),
                ),
                irb.field("state", irb.enumType("DeliveryState", "string")),
              ]),
            ),
          ],
        }),
      }),
    );

    expect(result.errors).toBeUndefined();
    expect(result.files?.map((file) => file.path)).toEqual([
      "enums.ts",
      "types.ts",
      "constants.ts",
      "metadata.ts",
      "index.ts",
    ]);

    const enums = fileContent(result, "enums.ts");
    expect(enums).toContain(
      'export type DeliveryState = "unknown" | "pending";',
    );
    expect(enums).toContain("export const DeliveryState = {");
    expect(enums).toContain("parse(json: string): DeliveryState {");

    const types = fileContent(result, "types.ts");
    expect(types).toContain('import { DeliveryState } from "./enums.ts";');
    expect(types).toContain("export type User = {");
    expect(types).toContain("createdAt: Date;");
    expect(types).toContain("export const User = {");
    expect(types).toContain("parse(json: string): User {");

    const constants = fileContent(result, "constants.ts");
    expect(constants).toContain('export const apiVersion = "1.0.0";');

    const metadata = fileContent(result, "metadata.ts");
    expect(metadata).toContain("export type VDLSchemaMetadata = {");
    expect(metadata).toContain('"User": {');
    expect(metadata).toContain('"DeliveryState": {');

    const index = fileContent(result, "index.ts");
    expect(index).toContain('export * from "./enums.ts";');
    expect(index).toContain('export * from "./metadata.ts";');
  });

  it("omits constants and metadata when disabled", () => {
    const result = generate(
      irb.pluginInput({
        options: {
          genConsts: "false",
          genMeta: "false",
        },
        ir: irb.schema({
          types: [irb.typeDef("Payload", irb.objectType([]))],
          constants: [
            irb.constantDef("apiVersion", irb.stringLiteral("1.0.0")),
          ],
        }),
      }),
    );

    expect(result.errors).toBeUndefined();
    expect(result.files?.map((file) => file.path)).toEqual([
      "types.ts",
      "index.ts",
    ]);
  });

  it("emits only metadata and index for an empty schema", () => {
    const result = generate(irb.pluginInput());

    expect(result.errors).toBeUndefined();
    expect(result.files?.map((file) => file.path)).toEqual([
      "metadata.ts",
      "index.ts",
    ]);
  });
});

function fileContent(
  result: ReturnType<typeof generate>,
  path: string,
): string {
  const file = result.files?.find((entry) => entry.path === path);
  expect(file).toBeDefined();
  return file?.content ?? "";
}
