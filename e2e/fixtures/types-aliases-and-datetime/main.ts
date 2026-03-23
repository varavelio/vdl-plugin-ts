import { misc } from "@varavel/vdl-plugin-sdk/utils";
import * as gen from "./gen/index.ts";

const userId = gen.UserId.parse(JSON.stringify("user-1"));
misc.assert(userId === "user-1", "primitive alias parse failed");

const userIds = gen.UserIds.parse(JSON.stringify(["user-1", "user-2"]));
misc.assert(userIds.length === 2, "array alias parse failed");

const labelsInput = { env: "prod", region: "eu" };
misc.assert(
  gen.Labels.validate(labelsInput, "Labels") === null,
  "map alias validation failed",
);
const labels = gen.Labels.hydrate(labelsInput);
misc.assert(labels.region === "eu", "map alias parse failed");

const createdAt = gen.CreatedAt.parse(
  JSON.stringify("2026-01-01T00:00:00.000Z"),
);
misc.assert(createdAt instanceof Date, "datetime alias hydration failed");

const account = gen.Account.parse(
  JSON.stringify({
    id: "user-1",
    createdAt: "2026-01-01T00:00:00.000Z",
    labels: { env: "prod" },
    history: ["2026-01-02T00:00:00.000Z"],
  }),
);

misc.assert(
  account.createdAt instanceof Date,
  "object datetime hydration failed",
);
misc.assert(
  account.history[0] instanceof Date,
  "array datetime hydration failed",
);
misc.assert(
  gen.UserIds.validate(["user-1", 2], "UserIds") ===
    "UserIds[1]: expected string, got number",
  "array validation path mismatch",
);
