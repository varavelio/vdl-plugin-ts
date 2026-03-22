import { newGenerator } from "@varavel/gen";
import { strings } from "@varavel/vdl-plugin-sdk/utils";

/**
 * Wraps a generated TypeScript module body with stable whitespace handling.
 */
export function renderTypeScriptFile(body: string): string {
  const g = newGenerator().withSpaces(2);
  const trimmedBody = body.trim();

  if (trimmedBody.length > 0) {
    g.raw(trimmedBody);
    g.break();
  }

  return `${strings.limitBlankLines(g.toString(), 1)}\n`;
}
