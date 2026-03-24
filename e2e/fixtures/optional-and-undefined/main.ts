import {
  assert,
  assertValidationOk,
  expectFailure,
} from "../../helpers/index.ts";
import * as gen from "./gen/index.ts";

const parsed = gen.OptionalEnvelope.parse(JSON.stringify({ name: "ok" }));
assert(parsed.note === undefined, "optional scalar should stay undefined");
assert(parsed.tags === undefined, "optional array should stay undefined");
assert(parsed.metadata === undefined, "optional map should stay undefined");

assertValidationOk(
  gen.OptionalEnvelope.validate(
    {
      name: "ok",
      note: undefined,
      tags: undefined,
      metadata: undefined,
    },
    "OptionalEnvelope",
  ),
);

expectFailure(
  () =>
    gen.OptionalEnvelope.parse(
      JSON.stringify({
        name: "ok",
        note: 123,
      }),
    ),
  "OptionalEnvelope.note: expected string, got number",
);
