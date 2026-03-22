import { newGenerator } from "@varavel/gen";
import type { PluginOutputFile } from "@varavel/vdl-plugin-sdk";
import {
  buildDocCommentLines,
  writeDocComment,
} from "../../../shared/comments";
import { renderTypeScriptFile } from "../../../shared/render-ts-file";
import { renderLiteralValueExpression } from "../../../shared/ts-literals";
import type { GeneratorContext } from "../../model/types";

/**
 * Emits generated constants when constant emission is enabled.
 */
export function generateConstantsFile(
  context: GeneratorContext,
): PluginOutputFile | undefined {
  if (!context.options.genConsts || context.constants.length === 0) {
    return undefined;
  }
  const g = newGenerator().withSpaces(2);

  for (let index = 0; index < context.constants.length; index += 1) {
    const constant = context.constants[index];
    if (!constant) {
      continue;
    }

    writeDocComment(
      g,
      buildDocCommentLines({
        doc: constant.def.doc,
        annotations: constant.def.annotations,
        fallback: `${constant.def.name} holds a generated VDL constant.`,
      }),
    );
    g.line(
      `export const ${constant.def.name} = ${renderLiteralValueExpression(constant.typeRef, constant.def.value, context)};`,
    );

    if (index < context.constants.length - 1) {
      g.break();
    }
  }

  return {
    path: "constants.ts",
    content: renderTypeScriptFile(g.toString()),
  };
}
