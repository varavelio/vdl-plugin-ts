import type { Generator } from "@varavel/gen";
import type { Annotation } from "@varavel/vdl-plugin-sdk";
import { ir } from "@varavel/vdl-plugin-sdk/utils";

const DEFAULT_DEPRECATED_MESSAGE =
  "This symbol is deprecated and should not be used in new code.";

/**
 * Extracts the effective deprecation message from an annotation list.
 */
export function getDeprecatedMessage(
  annotations: Annotation[] | undefined,
): string | undefined {
  const deprecated = ir.getAnnotation(annotations, "deprecated");
  if (!deprecated) {
    return undefined;
  }

  const argument = ir.getAnnotationArg(annotations, "deprecated");
  const unwrapped = argument ? ir.unwrapLiteral<unknown>(argument) : undefined;

  if (typeof unwrapped === "string" && unwrapped.trim().length > 0) {
    return unwrapped;
  }

  return DEFAULT_DEPRECATED_MESSAGE;
}

/**
 * Builds JSDoc lines from documentation text and annotations.
 */
export function buildDocCommentLines(options: {
  doc?: string;
  annotations?: Annotation[];
  fallback?: string;
}): string[] {
  const lines = (options.doc ?? options.fallback)?.split("\n") ?? [];
  const deprecatedMessage = getDeprecatedMessage(options.annotations);

  if (!deprecatedMessage) return lines;
  if (lines.length === 0) return [`@deprecated ${deprecatedMessage}`];

  return [...lines, "", `@deprecated ${deprecatedMessage}`];
}

/**
 * Writes a JSDoc block when at least one line is available.
 */
export function writeDocComment(g: Generator, lines: string[]): void {
  if (lines.length === 0) return;

  g.line("/**");
  for (const line of lines) {
    g.line(` * ${line}`.replace(/[\t ]+$/u, ""));
  }
  g.line(" */");
}
