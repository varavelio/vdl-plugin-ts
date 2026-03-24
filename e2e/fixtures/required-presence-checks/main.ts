import { assert, expectFailure } from "../../helpers/index.ts";
import * as gen from "./gen/index.ts";

const payload = gen.PresencePayload.parse(
  JSON.stringify({
    emptyText: "",
    zeroCount: 0,
    disabled: false,
  }),
);

assert(payload.emptyText === "", "empty string must stay valid");
assert(payload.zeroCount === 0, "zero int must stay valid");
assert(payload.disabled === false, "false bool must stay valid");
assert(
  gen.PresencePayload.validate(payload, "PresencePayload") === null,
  "roundtrip validation should pass",
);

assert(
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
