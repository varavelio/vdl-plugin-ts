import { assertFileContains, assertFileExists } from "../../helpers/index.ts";

assertFileExists("./gen/index.ts");
assertFileExists("./gen/enums.ts");
assertFileExists("./gen/types.ts");
assertFileExists("./gen/constants.ts");

assertFileContains("./gen/index.ts", 'export * from "./enums.js";');
assertFileContains("./gen/index.ts", 'export * from "./types.js";');
assertFileContains("./gen/index.ts", 'export * from "./constants.js";');
