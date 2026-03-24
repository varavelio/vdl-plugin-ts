import { assert, assertFileContains } from "../../helpers/index.ts";
import * as gen from "./gen/index.ts";

const user = gen.User.parse(
  JSON.stringify({
    id: "u1",
    role: "admin",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-02T00:00:00.000Z",
  }),
);

assert(
  user.createdAt instanceof Date,
  "include spread datetime hydration failed",
);
assert(user.role === "admin", "enum spread parse failed");
assert(gen.defaultRole === "admin", "enum constant reference failed");
assert(gen.mergedInfo.source === "api", "object spread override failed");
assert(gen.mergedInfo.roles[1] === "admin", "object spread array merge failed");

assertFileContains(
  "./gen/enums.ts",
  'export type AllRole = "viewer" | "editor" | "admin";',
);
