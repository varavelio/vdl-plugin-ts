import { newGenerator } from "@varavel/gen";
import type { EnumDef, PluginOutputFile } from "@varavel/vdl-plugin-sdk";
import { writeDocComment } from "../../../shared/comments";
import { renderPropertyName } from "../../../shared/naming";
import { renderTypeScriptFile } from "../../../shared/render-ts-file";
import type { GeneratorContext } from "../../model/types";

/**
 * Emits the `enums.ts` module containing generated enum namespaces and runtime
 * helpers.
 */
export function generateEnumsFile(
  context: GeneratorContext,
): PluginOutputFile | undefined {
  if (context.schema.enums.length === 0) {
    return undefined;
  }

  const g = newGenerator().withSpaces(2);

  for (const enumDef of context.schema.enums) {
    renderEnum(g, enumDef, context.options.strict);
    g.break();
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
  strict: boolean,
): void {
  /**
   * Each enum is emitted as a merged type plus const namespace so consumers get
   * a compact surface with predictable IntelliSense.
   */
  writeDocComment(g, {
    doc: enumDef.doc,
    annotations: enumDef.annotations,
    fallback: `${enumDef.name} declares a generated VDL enum.`,
  });

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

  writeDocComment(g, {
    fallback: `${enumDef.name} exposes the generated enum values and runtime helpers for ${enumDef.name}.`,
  });
  g.line(`export const ${enumDef.name} = {`);
  g.block(() => {
    renderEnumMembers(g, enumDef);
    g.break();

    writeDocComment(g, {
      fallback: `Returns every declared ${enumDef.name} value in definition order.`,
    });
    g.line(`values(): ${enumDef.name}[] {`);
    g.block(() => {
      g.line(`return ${renderEnumValuesExpression(enumDef)};`);
    });
    g.line("},");
    g.break();

    writeDocComment(g, {
      fallback: strict
        ? `Parses a JSON string into a validated and hydrated ${enumDef.name} value.`
        : `Parses a JSON string and hydrates it as ${enumDef.name} without runtime validation.`,
    });
    g.line(`parse(json: string): ${enumDef.name} {`);
    g.block(() => {
      g.line("const input = _vdl.parseJson(json);");
      if (strict) {
        g.line(`const error = ${enumDef.name}.validate(input);`);
        g.line("if (error !== null) {");
        g.block(() => {
          g.line("throw new Error(error);");
        });
        g.line("}");
      }
      g.line(`return ${enumDef.name}.hydrate(input as ${enumDef.name});`);
    });
    g.line("},");

    if (strict) {
      g.break();
      writeDocComment(g, {
        fallback: `Performs structural enum validation only (membership in ${enumDef.name}); it does not enforce business rules.`,
      });
      g.line(
        `validate(input: unknown, path = ${JSON.stringify(enumDef.name)}): string | null {`,
      );
      g.block(() => {
        g.line(`if (!_vdl.arrayIncludes(${enumDef.name}.values(), input)) {`);
        g.block(() => {
          g.line(
            `return \`\${path}: invalid value "\${String(input)}" for ${enumDef.name} enum\`;`,
          );
        });
        g.line("}");
        g.line("return null;");
      });
      g.line("},");
      g.break();
    } else {
      g.break();
    }

    writeDocComment(g, {
      fallback: `Hydrates a validated ${enumDef.name} value. Enums return the input unchanged to keep the generated API uniform.`,
    });
    g.line(`hydrate(input: ${enumDef.name}): ${enumDef.name} {`);
    g.block(() => {
      g.line("return input;");
    });
    g.line("},");
  });
  g.line("} as const;");
}

function renderEnumMembers(
  g: ReturnType<typeof newGenerator>,
  enumDef: EnumDef,
): void {
  /**
   * Enum member literals live on the namespace object so consumers can use
   * value access and runtime helpers from one exported symbol.
   */
  for (const [index, member] of enumDef.members.entries()) {
    writeDocComment(g, {
      doc: member.doc,
      annotations: member.annotations,
      fallback: `Represents the ${member.name} member of the ${enumDef.name} enum.`,
    });
    g.line(
      `${renderPropertyName(member.name)}: ${renderEnumMemberLiteral(member.value)} as ${enumDef.name},`,
    );
    if (index < enumDef.members.length - 1) {
      g.break();
    }
  }
}

function renderEnumRuntimeHelpers(g: ReturnType<typeof newGenerator>): void {
  /**
   * File-local helpers keep parsing logic consistent across every generated
   * enum namespace without introducing another generated runtime module.
   */
  writeDocComment(g, {
    fallback:
      "Internal helpers shared by the generated enum namespaces in this file.",
  });
  g.line("const _vdl = {");
  g.block(() => {
    writeDocComment(g, {
      fallback:
        "Parses JSON text and wraps syntax failures in a stable generated error message.",
    });
    g.line("parseJson(json: string): unknown {");
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
    g.line("},");
    g.break();

    writeDocComment(g, {
      fallback:
        "Checks whether an array contains a value using strict equality.",
    });
    g.line(
      "arrayIncludes<TValue>(values: TValue[], value: unknown): value is TValue {",
    );
    g.block(() => {
      g.line("for (let index = 0; index < values.length; index += 1) {");
      g.block(() => {
        g.line("if (values[index] === value) {");
        g.block(() => {
          g.line("return true;");
        });
        g.line("}");
      });
      g.line("}");
      g.line("return false;");
    });
    g.line("},");
  });
  g.line("} as const;");
}

function renderEnumValuesExpression(enumDef: EnumDef): string {
  /**
   * Enum namespaces expose values through a method instead of a sibling helper
   * constant so generated top-level names stay minimal.
   */
  return `[${enumDef.members.map((member) => renderEnumMemberLiteral(member.value)).join(", ")}]`;
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
