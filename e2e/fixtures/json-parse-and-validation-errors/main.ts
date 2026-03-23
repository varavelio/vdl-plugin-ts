import { misc } from "@varavel/vdl-plugin-sdk/utils";
import * as gen from "./gen/index.ts";

function expectFailure(run: () => unknown, expected: string): void {
  let didThrow = false;

  try {
    run();
  } catch (error) {
    didThrow = true;
    const message = error instanceof Error ? error.message : String(error);
    misc.assert(
      message.includes(expected),
      `Expected ${JSON.stringify(message)} to include ${JSON.stringify(expected)}`,
    );
  }

  misc.assert(
    didThrow,
    `Expected failure containing ${JSON.stringify(expected)}`,
  );
}

expectFailure(() => gen.Mode.parse("{"), "Invalid JSON input:");
expectFailure(() => gen.ServiceConfig.parse("{"), "Invalid JSON input:");

expectFailure(
  () =>
    gen.ServiceConfig.parse(
      JSON.stringify({
        mode: "unknown",
        startedAt: "2026-01-01T00:00:00.000Z",
      }),
    ),
  'ServiceConfig.mode: invalid value "unknown" for Mode enum',
);

expectFailure(
  () =>
    gen.ServiceConfig.parse(JSON.stringify({ mode: "on", startedAt: "oops" })),
  "ServiceConfig.startedAt: expected datetime string or Date, got string",
);

const config = gen.ServiceConfig.parse(
  JSON.stringify({ mode: "off", startedAt: "2026-01-01T00:00:00.000Z" }),
);
misc.assert(config.mode === "off", "enum parsing mismatch");
misc.assert(config.startedAt instanceof Date, "datetime hydration mismatch");
