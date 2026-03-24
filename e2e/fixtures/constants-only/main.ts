import {
  assert,
  assertFileContains,
  assertFileExists,
  assertFileNotExists,
} from "../../helpers/index.ts";
import * as gen from "./gen/index.ts";

assert(gen.apiVersion === "2.0.0", "string constant output failed");
assert(gen.featureEnabled === false, "bool constant output failed");

assertFileExists("./gen/constants.ts");
assertFileExists("./gen/index.ts");
assertFileNotExists("./gen/enums.ts");
assertFileNotExists("./gen/types.ts");
assertFileContains("./gen/index.ts", 'export * from "./constants.ts";');
