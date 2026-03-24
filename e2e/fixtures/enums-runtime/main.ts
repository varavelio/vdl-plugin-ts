import { assert, expectFailure } from "../../helpers/index.ts";
import * as gen from "./gen/index.ts";

assert(
  gen.DeliveryState.validate("pending", "DeliveryState") === null,
  "string enum validation failed",
);
assert(
  gen.DeliveryState.parse(JSON.stringify("in-transit")) === "in-transit",
  "string enum parse failed",
);
assert(
  gen.DeliveryState.validate("ghost", "DeliveryState") ===
    'DeliveryState: invalid value "ghost" for DeliveryState enum',
  "string enum validation mismatch",
);
assert(gen.DeliveryState.Pending === "pending", "enum member value mismatch");
assert(gen.DeliveryState.values().length === 3, "enum values list mismatch");
assert(
  gen.Priority.validate(9, "Priority") === null,
  "int enum validation failed",
);
assert(gen.Priority.High === 9, "int enum member value mismatch");
assert(gen.Priority.parse(JSON.stringify(9)) === 9, "int enum parse failed");

expectFailure(
  () => gen.Priority.parse(JSON.stringify(2)),
  'Priority: invalid value "2" for Priority enum',
);
