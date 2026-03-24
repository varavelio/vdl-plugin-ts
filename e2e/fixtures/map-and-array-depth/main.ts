import { assert, expectFailure } from "../../helpers/index.ts";
import * as gen from "./gen/index.ts";

const complex = gen.Complex.parse(
  JSON.stringify({
    matrix: [[1, 2], [3]],
    bucket: {
      alpha: ["x", "y"],
    },
    layered: {
      zoneA: {
        child: ["off", "on"],
      },
    },
  }),
);

assert(complex.matrix[0][1] === 2, "nested array hydration failed");
assert(complex.bucket.alpha[1] === "y", "map of array hydration failed");
assert(
  complex.layered.zoneA.child[1] === "on",
  "nested map and enum array hydration failed",
);

expectFailure(
  () =>
    gen.Complex.parse(
      JSON.stringify({
        matrix: [[1]],
        bucket: { alpha: ["ok", 2] },
        layered: { zoneA: { child: ["on"] } },
      }),
    ),
  'Complex.bucket["alpha"][1]: expected string, got number',
);

expectFailure(
  () =>
    gen.Complex.parse(
      JSON.stringify({
        matrix: [[1]],
        bucket: { alpha: ["ok"] },
        layered: { zoneA: { child: ["invalid"] } },
      }),
    ),
  'Complex.layered["zoneA"]["child"][0]: invalid value "invalid" for Flag enum',
);
