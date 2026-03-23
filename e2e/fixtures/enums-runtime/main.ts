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

misc.assert(
  gen.DeliveryState.validate("pending", "DeliveryState") === null,
  "string enum validation failed",
);
misc.assert(
  gen.DeliveryState.parse(JSON.stringify("in-transit")) === "in-transit",
  "string enum parse failed",
);
misc.assert(
  gen.DeliveryState.validate("ghost", "DeliveryState") ===
    'DeliveryState: invalid value "ghost" for DeliveryState enum',
  "string enum validation mismatch",
);
misc.assert(
  gen.DeliveryState.Pending === "pending",
  "enum member value mismatch",
);
misc.assert(
  gen.DeliveryState.values().length === 3,
  "enum values list mismatch",
);
misc.assert(
  gen.Priority.validate(9, "Priority") === null,
  "int enum validation failed",
);
misc.assert(gen.Priority.High === 9, "int enum member value mismatch");
misc.assert(
  gen.Priority.parse(JSON.stringify(9)) === 9,
  "int enum parse failed",
);

expectFailure(
  () => gen.Priority.parse(JSON.stringify(2)),
  'Priority: invalid value "2" for Priority enum',
);
