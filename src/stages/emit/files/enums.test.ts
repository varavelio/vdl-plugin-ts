import * as irb from "@varavel/vdl-plugin-sdk/testing";
import { describe, expect, it } from "vitest";
import { createGeneratorContext } from "../../model/build-context";
import { generateEnumsFile } from "./enums";

describe("generateEnumsFile", () => {
  it("renders merged enum namespaces with values and helpers", () => {
    const context = createGeneratorContext({
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
        strict: true,
        importExtension: "js",
      },
    });

    const file = generateEnumsFile(context);

    expect(file?.content).toContain("export type Priority = 1 | 2;");
    expect(file?.content).toContain("export const Priority = {");
    expect(file?.content).toContain("Low: 1 as Priority,");
    expect(file?.content).toContain("values(): Priority[] {");
    expect(file?.content).toContain("return [1, 2];");
    expect(file?.content).toContain("parse(json: string): Priority {");
    expect(file?.content).toContain("const error = Priority.validate(input);");
    expect(file?.content).toContain(
      "Performs structural enum validation only (membership in Priority); it does not enforce business rules.",
    );
    expect(file?.content).toContain(
      ['invalid value "', '{String(input)}" for Priority enum'].join("$"),
    );
    expect(file?.content).not.toContain("export function validatePriority");
    expect(file?.content).not.toContain("const PriorityValues");
    expect(file?.content).toContain("const _vdl = {");
    expect(file?.content).toContain("arrayIncludes<TValue>");
    expect(file?.content).not.toContain(".includes(");
  });

  it("omits enum validate helpers when strict mode is disabled", () => {
    const context = createGeneratorContext({
      input: irb.pluginInput({
        ir: irb.schema({
          enums: [
            irb.enumDef("Mode", "string", [
              irb.enumMember("On", irb.stringLiteral("on")),
              irb.enumMember("Off", irb.stringLiteral("off")),
            ]),
          ],
        }),
      }),
      generatorOptions: {
        genConsts: true,
        strict: false,
        importExtension: "js",
      },
    });

    const file = generateEnumsFile(context);

    expect(file?.content).toContain("parse(json: string): Mode {");
    expect(file?.content).not.toContain("const error = Mode.validate(input);");
    expect(file?.content).not.toContain("validate(input: unknown");
  });
});
