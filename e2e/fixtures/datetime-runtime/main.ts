import {
  assert,
  assertFileContains,
  expectFailure,
} from "../../helpers/index.ts";
import * as gen from "./gen/index.ts";

const schedule = gen.Schedule.parse(
  JSON.stringify({
    startsAt: "2026-01-01T00:00:00.000Z",
    checkpoints: ["2026-01-01T01:00:00.000Z"],
    byId: { one: "2026-01-01T02:00:00.000Z" },
  }),
);

assert(schedule.startsAt instanceof Date, "datetime field hydration failed");
assert(
  schedule.checkpoints[0] instanceof Date,
  "datetime array hydration failed",
);
assert(schedule.byId.one instanceof Date, "datetime map hydration failed");

const hydrated = gen.Schedule.hydrate({
  startsAt: new Date("2026-01-01T00:00:00.000Z"),
  checkpoints: [new Date("2026-01-01T01:00:00.000Z")],
  byId: { one: new Date("2026-01-01T02:00:00.000Z") },
});
assert(
  hydrated.startsAt !== schedule.startsAt,
  "datetime hydration must return fresh Date instances",
);

expectFailure(
  () =>
    gen.Schedule.parse(
      JSON.stringify({
        startsAt: "invalid",
        checkpoints: ["2026-01-01T01:00:00.000Z"],
        byId: { one: "2026-01-01T02:00:00.000Z" },
      }),
    ),
  "Schedule.startsAt: expected datetime string or Date, got string",
);

assertFileContains(
  "./gen/types.ts",
  "expected datetime string or Date, got ${_vdl.describeValue",
);
