import {
  assert,
  assertFileContains,
  assertFileExists,
  assertFileNotExists,
} from "../../helpers/index.ts";
import * as gen from "./gen/index.ts";

assert(
  gen.Payload.parse(JSON.stringify({ status: "ready" })).status === "ready",
  "type generation failed when optional outputs disabled",
);
assert(
  gen.Status.validate("ready", "Status") === null,
  "enum generation failed when optional outputs disabled",
);

assertFileExists("./gen/enums.ts");
assertFileExists("./gen/types.ts");
assertFileExists("./gen/index.ts");
assertFileNotExists("./gen/constants.ts");
assertFileContains("./gen/index.ts", 'export * from "./enums.ts";');
assertFileContains("./gen/index.ts", 'export * from "./types.ts";');
