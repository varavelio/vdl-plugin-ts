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

const payload = gen.PresencePayload.parse(
  JSON.stringify({
    emptyText: "",
    zeroCount: 0,
    disabled: false,
  }),
);

misc.assert(payload.emptyText === "", "empty string must stay valid");
misc.assert(payload.zeroCount === 0, "zero int must stay valid");
misc.assert(payload.disabled === false, "false bool must stay valid");
misc.assert(
  gen.PresencePayload.validate(payload, "PresencePayload") === null,
  "roundtrip validation should pass",
);

misc.assert(
  gen.PresencePayload.validate(
    { zeroCount: 0, disabled: false },
    "PresencePayload",
  ) === "PresencePayload.emptyText: required field is missing",
  "required field presence validation mismatch",
);

expectFailure(
  () =>
    gen.PresencePayload.parse(
      JSON.stringify({ emptyText: "ok", zeroCount: "0", disabled: false }),
    ),
  "PresencePayload.zeroCount: expected number, got string",
);
