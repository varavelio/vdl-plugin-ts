import { assert } from "../../helpers/index.ts";
import * as gen from "./gen/index.ts";

const userId = gen.UserId.parse(JSON.stringify("user-1"));
assert(userId === "user-1", "primitive alias parse failed");

const userIds = gen.UserIds.parse(JSON.stringify(["user-1", "user-2"]));
assert(userIds.length === 2, "array alias parse failed");

const labelsInput = { env: "prod", region: "eu" };
assert(
  gen.Labels.validate(labelsInput, "Labels") === null,
  "map alias validation failed",
);
const labels = gen.Labels.hydrate(labelsInput);
assert(labels.region === "eu", "map alias parse failed");

const createdAt = gen.CreatedAt.parse(
  JSON.stringify("2026-01-01T00:00:00.000Z"),
);
assert(createdAt instanceof Date, "datetime alias hydration failed");

const account = gen.Account.parse(
  JSON.stringify({
    id: "user-1",
    createdAt: "2026-01-01T00:00:00.000Z",
    labels: { env: "prod" },
    history: ["2026-01-02T00:00:00.000Z"],
  }),
);

assert(account.createdAt instanceof Date, "object datetime hydration failed");
assert(account.history[0] instanceof Date, "array datetime hydration failed");
assert(
  gen.UserIds.validate(["user-1", 2], "UserIds") ===
    "UserIds[1]: expected string, got number",
  "array validation path mismatch",
);
