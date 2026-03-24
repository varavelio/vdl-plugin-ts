import { assert, expectFailure } from "../../helpers/index.ts";
import * as gen from "./gen/index.ts";

const container = gen.Container.parse(
  JSON.stringify({
    items: {
      alpha: { nested: "A" },
      beta: { nested: "B" },
    },
  }),
);

assert(container.items.alpha.nested === "A", "map object hydration failed");
assert(
  container.items.beta.nested === "B",
  "second map object hydration failed",
);

expectFailure(
  () =>
    gen.Container.parse(
      JSON.stringify({
        items: {
          alpha: {},
        },
      }),
    ),
  'Container.items["alpha"].nested: required field is missing',
);
