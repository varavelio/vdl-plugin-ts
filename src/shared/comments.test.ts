import { irb } from "@varavel/vdl-plugin-sdk/testing";
import { describe, expect, it } from "vitest";
import { buildDocCommentLines, getDeprecatedMessage } from "./comments";

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

  it("combines docs, fallback text, and deprecation lines", () => {
    expect(
      buildDocCommentLines({
        doc: "Line one\nLine two",
        annotations: [
          irb.annotation("deprecated", irb.stringLiteral("Use X instead.")),
        ],
      }),
    ).toEqual(["Line one", "Line two", "", "@deprecated Use X instead."]);

    expect(
      buildDocCommentLines({
        fallback: "Fallback text",
      }),
    ).toEqual(["Fallback text"]);
  });
});
