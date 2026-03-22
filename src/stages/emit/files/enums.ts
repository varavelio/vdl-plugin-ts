import { newGenerator } from "@varavel/gen";
import type { EnumDef, PluginOutputFile } from "@varavel/vdl-plugin-sdk";
import {
  buildDocCommentLines,
  writeDocComment,
} from "../../../shared/comments";
import { renderTypeScriptFile } from "../../../shared/render-ts-file";
import type { GeneratorContext } from "../../model/types";

/**
 * Emits the `enums.ts` module containing generated enum unions and runtime
 * helpers.
 */
export function generateEnumsFile(
  context: GeneratorContext,
): PluginOutputFile | undefined {
  if (context.schema.enums.length === 0) {
    return undefined;
  }

  const g = newGenerator().withSpaces(2);

  for (let index = 0; index < context.schema.enums.length; index += 1) {
    renderEnum(g, context.schema.enums[index] as EnumDef);

    if (index < context.schema.enums.length - 1) {
      g.break();
    }
  }

  g.break();
  renderEnumRuntimeHelpers(g);

  return {
    path: "enums.ts",
    content: renderTypeScriptFile(g.toString()),
  };
}

function renderEnum(
  g: ReturnType<typeof newGenerator>,
  enumDef: EnumDef,
): void {
  /**
   * Each enum emits its full public API in one contiguous block so generated
   * output reads top-to-bottom without jumping between helpers.
   */
  writeDocComment(
    g,
    buildDocCommentLines({
      doc: enumDef.doc,
      annotations: enumDef.annotations,
      fallback: `${enumDef.name} declares a generated VDL enum.`,
    }),
  );

  if (enumDef.members.length === 0) {
    g.line(`export type ${enumDef.name} = never;`);
  } else {
    g.line(
      `export type ${enumDef.name} = ${enumDef.members
        .map((member) => renderEnumMemberLiteral(member.value))
        .join(" | ")};`,
    );
  }
  g.break();

  g.line(
    `export const ${enumDef.name}List: ${enumDef.name}[] = [${enumDef.members
      .map((member) => renderEnumMemberLiteral(member.value))
      .join(", ")}];`,
  );
  g.break();

  g.line(
    `export function is${enumDef.name}(input: unknown): input is ${enumDef.name} {`,
  );
  g.block(() => {
    g.line(`return ${enumDef.name}List.includes(input as ${enumDef.name});`);
  });
  g.line("}");
  g.break();

  g.line(
    `export function hydrate${enumDef.name}(input: ${enumDef.name}): ${enumDef.name} {`,
  );
  g.block(() => {
    g.line("return input;");
  });
  g.line("}");
  g.break();

  g.line(
    `export function validate${enumDef.name}(input: unknown, path = ${JSON.stringify(enumDef.name)}): string | null {`,
  );
  g.block(() => {
    g.line(`if (!is${enumDef.name}(input)) {`);
    g.block(() => {
      g.line(
        `return \`\${path}: invalid enum value '\${String(input)}' for ${enumDef.name}\`;`,
      );
    });
    g.line("}");
    g.line("return null;");
  });
  g.line("}");
  g.break();

  g.line(
    `export function from${enumDef.name}Unknown(input: unknown): ${enumDef.name} {`,
  );
  g.block(() => {
    g.line(`const error = validate${enumDef.name}(input);`);
    g.line("if (error !== null) {");
    g.block(() => {
      g.line("throw new Error(error);");
    });
    g.line("}");
    g.line(`return hydrate${enumDef.name}(input as ${enumDef.name});`);
  });
  g.line("}");
  g.break();

  g.line(
    `export function from${enumDef.name}String(json: string): ${enumDef.name} {`,
  );
  g.block(() => {
    g.line(
      `return fromUnknownEnumJson(json, validate${enumDef.name}, hydrate${enumDef.name});`,
    );
  });
  g.line("}");
  g.break();

  g.line(`export const ${enumDef.name}Codec = {`);
  g.block(() => {
    g.line(`fromUnknown: from${enumDef.name}Unknown,`);
    g.line(`fromString: from${enumDef.name}String,`);
    g.line(`validate: validate${enumDef.name},`);
    g.line(`hydrate: hydrate${enumDef.name},`);
  });
  g.line("} as const;");
  g.break();

  g.line(
    `export function get${enumDef.name}Values(): readonly ${enumDef.name}[] {`,
  );
  g.block(() => {
    g.line(`return ${enumDef.name}List;`);
  });
  g.line("}");
  g.break();
}

function renderEnumRuntimeHelpers(g: ReturnType<typeof newGenerator>): void {
  /**
   * File-local helpers keep parsing logic consistent across every generated
   * enum without introducing another generated runtime module.
   */
  g.line("function fromUnknownEnumJson<T>(");
  g.block(() => {
    g.line("json: string,");
    g.line("validate: (input: unknown, path?: string) => string | null,");
    g.line("hydrate: (input: T) => T,");
  });
  g.line(") : T {");
  g.block(() => {
    g.line("const input = parseEnumJson(json);");
    g.line("const error = validate(input);");
    g.line("if (error !== null) {");
    g.block(() => {
      g.line("throw new Error(error);");
    });
    g.line("}");
    g.line("return hydrate(input as T);");
  });
  g.line("}");
  g.break();

  g.line("function parseEnumJson(json: string): unknown {");
  g.block(() => {
    g.line("try {");
    g.block(() => {
      g.line("return JSON.parse(json);");
    });
    g.line("} catch (error) {");
    g.block(() => {
      g.line(
        "const message = error instanceof Error ? error.message : String(error);",
      );
      g.line(`throw new Error(\`Invalid JSON input: \${message}\`);`);
    });
    g.line("}");
  });
  g.line("}");
}

function renderEnumMemberLiteral(
  value: EnumDef["members"][number]["value"],
): string {
  /**
   * Enum unions are represented by plain scalar literals, so member rendering
   * only needs to format strings and integers.
   */
  if (value.kind === "string") {
    return JSON.stringify(value.stringValue);
  }

  return String(value.intValue);
}
