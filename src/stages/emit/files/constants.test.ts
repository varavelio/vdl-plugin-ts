import { irb } from "@varavel/vdl-plugin-sdk/testing";
import { describe, expect, it } from "vitest";
import { createGeneratorContext } from "../../model/build-context";
import { generateConstantsFile } from "./constants";

describe("generateConstantsFile", () => {
  it("renders constants with inferred TypeScript types", () => {
    const result = createGeneratorContext({
      input: irb.pluginInput({
        ir: irb.schema({
          enums: [
            irb.enumDef("Status", "string", [
              irb.enumMember("Active", irb.stringLiteral("active")),
            ]),
          ],
          types: [
            irb.typeDef(
              "$ConstdefaultStatus",
              irb.enumType("Status", "string"),
            ),
          ],
          constants: [
            irb.constantDef("apiVersion", irb.stringLiteral("1.0.0")),
            irb.constantDef("defaultStatus", irb.stringLiteral("active")),
          ],
        }),
      }),
      generatorOptions: {
        genConsts: true,
        genMeta: true,
        importExtension: "ts",
      },
    });

    const file = generateConstantsFile(expectContext(result.context));

    expect(file?.content).toContain(
      'export const apiVersion = "1.0.0" as const;',
    );
    expect(file?.content).not.toContain(
      'import type { Status } from "./enums.ts";',
    );
    expect(file?.content).toContain(
      'export const defaultStatus = "active" as const;',
    );
  });
});

function expectContext<T>(value: T | undefined): T {
  expect(value).toBeDefined();
  return value as T;
}
