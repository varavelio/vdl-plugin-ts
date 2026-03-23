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

const envelope = gen.Envelope.parse(
  JSON.stringify({
    item: { label: "alpha", enabled: false },
    items: [{ code: "A" }],
    lookup: { first: { id: "1" } },
    nested: { child: { note: "ready" } },
  }),
);

misc.assert(envelope.item.enabled === false, "optional inline bool mismatch");
misc.assert(envelope.lookup.first.id === "1", "inline map hydration mismatch");

const inlineItem: gen.EnvelopeItem = { label: "beta" };
misc.assert(inlineItem.label === "beta", "hoisted inline type missing");

expectFailure(
  () =>
    ensureValidEnvelope({
      item: {},
      items: [{ code: "A" }],
      lookup: { first: { id: "1" } },
      nested: { child: {} },
    }),
  "Envelope.item.label: required field is missing",
);

expectFailure(
  () =>
    ensureValidEnvelope({
      item: { label: "alpha" },
      items: [{}],
      lookup: { first: { id: "1" } },
      nested: { child: {} },
    }),
  "Envelope.items[0].code: required field is missing",
);

expectFailure(
  () =>
    ensureValidEnvelope({
      item: { label: "alpha" },
      items: [{ code: "A" }],
      lookup: { first: {} },
      nested: { child: {} },
    }),
  'Envelope.lookup["first"].id: required field is missing',
);

function ensureValidEnvelope(input: unknown): void {
  const error = gen.Envelope.validate(input, "Envelope");
  if (error !== null) {
    throw new Error(error);
  }
}
