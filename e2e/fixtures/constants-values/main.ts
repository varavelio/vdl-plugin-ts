import { misc } from "@varavel/vdl-plugin-sdk/utils";
import * as gen from "./gen/index.ts";

misc.assert(gen.apiVersion === "1.2.3", "string constant mismatch");
misc.assert(gen.maxItems === 2147483647, "int constant mismatch");
misc.assert(gen.ratio === 3.5, "float constant mismatch");
misc.assert(gen.featureEnabled === true, "bool constant mismatch");
misc.assert(gen.labels.env === "prod", "object constant mismatch");
misc.assert(gen.versions[1] === "1.1.0", "array constant mismatch");
misc.assert(gen.matrix[0][1] === 2, "matrix constant mismatch");
misc.assert(gen.buildInfo.tags[0] === "ts", "nested constant mismatch");
misc.assert(gen.defaultStatus === "active", "enum constant mismatch");
misc.assert(
  gen.copiedStatus === gen.defaultStatus,
  "constant reference mismatch",
);
