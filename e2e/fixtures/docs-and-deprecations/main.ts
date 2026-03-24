import {
  assert,
  assertFileContains,
  assertFileExists,
} from "../../helpers/index.ts";
import * as gen from "./gen/index.ts";

assertFileExists("./gen/enums.ts");
assertFileExists("./gen/types.ts");
assertFileExists("./gen/constants.ts");

assert(
  gen.Payload.parse(JSON.stringify({ name: "n", status: "ready" })).name ===
    "n",
  "payload parse failed",
);

assertFileContains("./gen/enums.ts", "* Status models delivery lifecycle.");
assertFileContains(
  "./gen/enums.ts",
  "* @deprecated Use LifecycleStatus instead.",
);
assertFileContains(
  "./gen/enums.ts",
  "* @deprecated This symbol is deprecated and should not be used in new code.",
);

assertFileContains("./gen/types.ts", "* Payload describes an API payload.");
assertFileContains(
  "./gen/types.ts",
  "* @deprecated This symbol is deprecated and should not be used in new code.",
);
assertFileContains("./gen/types.ts", "* @deprecated Use displayName instead.");

assertFileContains(
  "./gen/constants.ts",
  "* API version returned by this service.",
);
assertFileContains(
  "./gen/constants.ts",
  "* @deprecated Use apiVersionV2 instead.",
);
