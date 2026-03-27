import * as irb from "@varavel/vdl-plugin-sdk/testing";
import { describe, expect, it } from "vitest";
import { resolveGeneratorOptions } from "./resolve";

describe("resolveGeneratorOptions", () => {
  it("resolves defaults", () => {
    const result = resolveGeneratorOptions(irb.pluginInput());

    expect(result.errors).toEqual([]);
    expect(result.options).toEqual({
      genConsts: true,
      strict: true,
      importExtension: "js",
    });
  });

  it("parses booleans and import extension", () => {
    const result = resolveGeneratorOptions(
      irb.pluginInput({
        options: {
          genConsts: "off",
          strict: "false",
          importExtension: "ts",
        },
      }),
    );

    expect(result.errors).toEqual([]);
    expect(result.options).toEqual({
      genConsts: false,
      strict: false,
      importExtension: "ts",
    });
  });

  it("falls back to the default import extension when the value is invalid", () => {
    const result = resolveGeneratorOptions(
      irb.pluginInput({
        options: {
          importExtension: "esm",
        },
      }),
    );

    expect(result.errors).toEqual([]);
    expect(result.options?.importExtension).toBe("js");
  });
});
