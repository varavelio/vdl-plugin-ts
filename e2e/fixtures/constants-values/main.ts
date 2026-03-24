import { assert } from "../../helpers/index.ts";
import * as gen from "./gen/index.ts";

assert(gen.apiVersion === "1.2.3", "string constant mismatch");
assert(gen.maxItems === 2147483647, "int constant mismatch");
assert(gen.ratio === 3.5, "float constant mismatch");
assert(gen.featureEnabled === true, "bool constant mismatch");
assert(gen.labels.env === "prod", "object constant mismatch");
assert(gen.versions[1] === "1.1.0", "array constant mismatch");
assert(gen.matrix[0][1] === 2, "matrix constant mismatch");
assert(gen.buildInfo.tags[0] === "ts", "nested constant mismatch");
assert(gen.defaultStatus === "active", "enum constant mismatch");
assert(gen.copiedStatus === gen.defaultStatus, "constant reference mismatch");
