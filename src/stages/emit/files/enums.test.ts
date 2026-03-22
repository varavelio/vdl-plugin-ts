import { irb } from "@varavel/vdl-plugin-sdk/testing";
import { describe, expect, it } from "vitest";
import { createGeneratorContext } from "../../model/build-context";
import { generateEnumsFile } from "./enums";

describe("generateEnumsFile", () => {
  it("renders enum unions and runtime helpers", () => {
    const result = createGeneratorContext({
      input: irb.pluginInput({
        ir: irb.schema({
          enums: [
            irb.enumDef("Priority", "int", [
              irb.enumMember("Low", irb.intLiteral(1)),
              irb.enumMember("High", irb.intLiteral(2)),
            ]),
          ],
        }),
      }),
      generatorOptions: {
        genConsts: true,
        genMeta: true,
        importExtension: "js",
      },
    });

    const file = generateEnumsFile(expectContext(result.context));

    expect(file?.content).toContain("export type Priority = 1 | 2;");
    expect(file?.content).toContain("export function validatePriority");
    expect(file?.content).toContain("export function fromPriorityString");
  });
});

function expectContext<T>(value: T | undefined): T {
  expect(value).toBeDefined();
  return value as T;
}
