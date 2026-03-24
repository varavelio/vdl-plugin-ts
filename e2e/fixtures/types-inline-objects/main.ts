import {
  assert,
  assertValidationOk,
  expectFailure,
} from "../../helpers/index.ts";
import * as gen from "./gen/index.ts";

const envelope = gen.Envelope.parse(
  JSON.stringify({
    item: { label: "alpha", enabled: false },
    items: [{ code: "A" }],
    lookup: { first: { id: "1" } },
    nested: { child: { note: "ready" } },
  }),
);

assert(envelope.item.enabled === false, "optional inline bool mismatch");
assert(envelope.lookup.first.id === "1", "inline map hydration mismatch");

const inlineItem: gen.EnvelopeItem = { label: "beta" };
assert(inlineItem.label === "beta", "hoisted inline type missing");

expectFailure(
  () =>
    assertValidationOk(
      gen.Envelope.validate(
        {
          item: {},
          items: [{ code: "A" }],
          lookup: { first: { id: "1" } },
          nested: { child: {} },
        },
        "Envelope",
      ),
    ),
  "Envelope.item.label: required field is missing",
);

expectFailure(
  () =>
    assertValidationOk(
      gen.Envelope.validate(
        {
          item: { label: "alpha" },
          items: [{}],
          lookup: { first: { id: "1" } },
          nested: { child: {} },
        },
        "Envelope",
      ),
    ),
  "Envelope.items[0].code: required field is missing",
);

expectFailure(
  () =>
    assertValidationOk(
      gen.Envelope.validate(
        {
          item: { label: "alpha" },
          items: [{ code: "A" }],
          lookup: { first: {} },
          nested: { child: {} },
        },
        "Envelope",
      ),
    ),
  'Envelope.lookup["first"].id: required field is missing',
);
