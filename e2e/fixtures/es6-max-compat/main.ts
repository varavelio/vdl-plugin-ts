import { execSync } from "node:child_process";
import { assert } from "../../helpers/index.ts";
import * as gen from "./gen/index.ts";

const payload = gen.Payload.parse(
  JSON.stringify({
    profile: {
      name: "Ada",
      active: true,
      age: 30,
      score: 9.5,
      createdAt: "2026-01-01T00:00:00.000Z",
      role: "viewer",
      priority: 1,
      aliases: {
        a: "A",
      },
      history: {
        first: ["2026-01-01T00:00:00.000Z", "2026-01-02T00:00:00.000Z"],
      },
      sessions: [
        {
          id: "s1",
          startedAt: "2026-01-03T00:00:00.000Z",
          tags: ["a", "b"],
        },
      ],
      nested: {
        note: "ok",
        flags: [true, false],
      },
    },
    byId: {},
    grid: [],
    roleHistory: {
      default: ["viewer", "admin"],
    },
  }),
);

assert(payload.profile.createdAt instanceof Date, "datetime hydration failed");
assert(
  payload.profile.history.first[0] instanceof Date,
  "map array datetime hydration failed",
);
assert(
  payload.profile.sessions[0].startedAt instanceof Date,
  "nested hydration failed",
);

execSync("npx tsc --project ./tsconfig.es6.json --noEmit", {
  cwd: process.cwd(),
  stdio: "pipe",
});
