import { assert, expectFailure } from "../../helpers/index.ts";
import * as gen from "./gen/index.ts";

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
assert(config.mode === "off", "enum parsing mismatch");
assert(config.startedAt instanceof Date, "datetime hydration mismatch");
