import { newGenerator } from "@varavel/gen";
import { irb } from "@varavel/vdl-plugin-sdk/testing";
import { describe, expect, it } from "vitest";
import { getDeprecatedMessage, writeDocComment } from "./comments";

describe("comments", () => {
  it("extracts an explicit deprecated message", () => {
    expect(
      getDeprecatedMessage([
        irb.annotation(
          "deprecated",
          irb.stringLiteral("Use NewThing instead."),
        ),
      ]),
    ).toBe("Use NewThing instead.");
  });

  it("falls back to the generic deprecated message", () => {
    expect(getDeprecatedMessage([irb.annotation("deprecated")])).toBe(
      "This symbol is deprecated and should not be used in new code.",
    );
  });

  it("writes docs, fallback text, and deprecation lines together", () => {
    const g = newGenerator().withSpaces(2);

    writeDocComment(g, {
      doc: "Line one\nLine two",
      annotations: [
        irb.annotation("deprecated", irb.stringLiteral("Use X instead.")),
      ],
    });

    expect(g.toString()).toContain(" * Line one");
    expect(g.toString()).toContain(" * Line two");
    expect(g.toString()).toContain(" * @deprecated Use X instead.");

    const fallbackGenerator = newGenerator().withSpaces(2);
    writeDocComment(fallbackGenerator, {
      fallback: "Fallback text",
    });

    expect(fallbackGenerator.toString()).toContain(" * Fallback text");
  });
});
