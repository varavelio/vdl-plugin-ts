import { irb } from "@varavel/vdl-plugin-sdk/testing";
import { describe, expect, it } from "vitest";
import { createGeneratorContext } from "../../model/build-context";
import { generateEnumsFile } from "./enums";

describe("generateEnumsFile", () => {
  it("renders merged enum namespaces with values and helpers", () => {
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
    expect(file?.content).toContain("export const Priority = {");
    expect(file?.content).toContain("Low: 1 as Priority,");
    expect(file?.content).toContain("values(): Priority[] {");
    expect(file?.content).toContain("return [1, 2];");
    expect(file?.content).toContain("parse(json: string): Priority {");
    expect(file?.content).toContain(
      "const vdl_error = Priority.validate(vdl_input);",
    );
    expect(file?.content).toContain(
      ["invalid value '", "{String(input)}' for Priority enum"].join("$"),
    );
    expect(file?.content).not.toContain("export function validatePriority");
    expect(file?.content).not.toContain("const PriorityValues");
  });
});

function expectContext<T>(value: T | undefined): T {
  expect(value).toBeDefined();
  return value as T;
}
