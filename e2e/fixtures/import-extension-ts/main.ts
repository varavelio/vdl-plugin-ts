import { assertFileContains, assertFileExists } from "../../helpers/index.ts";

assertFileExists("./gen/index.ts");
assertFileExists("./gen/enums.ts");
assertFileExists("./gen/types.ts");
assertFileExists("./gen/constants.ts");

assertFileContains("./gen/index.ts", 'export * from "./enums.ts";');
assertFileContains("./gen/index.ts", 'export * from "./types.ts";');
assertFileContains("./gen/index.ts", 'export * from "./constants.ts";');
