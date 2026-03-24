import {
  assertFileContains,
  assertFileExists,
  assertFileNotExists,
} from "../../helpers/index.ts";

assertFileExists("./gen/index.ts");
assertFileNotExists("./gen/types.ts");
assertFileNotExists("./gen/enums.ts");
assertFileNotExists("./gen/constants.ts");
assertFileContains("./gen/index.ts", "export {};");
