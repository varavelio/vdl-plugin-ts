import { assert } from "../../helpers/index.ts";
import * as gen from "./gen/index.ts";

assert(
  gen.launchedAt === "2026-01-03T00:00:00.000Z",
  "date-like scalar constant mismatch",
);
assert(
  gen.checkpoints[0] === "2026-01-01T00:00:00.000Z",
  "date-like array constant mismatch",
);
assert(
  gen.byId.one === "2026-02-01T00:00:00.000Z",
  "date-like map constant mismatch",
);
