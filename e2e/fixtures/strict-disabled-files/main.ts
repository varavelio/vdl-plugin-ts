import {
  assert,
  assertFileContains,
  assertFileNotContains,
} from "../../helpers/index.ts";
import * as gen from "./gen/index.ts";

const parsed = gen.Payload.parse(
  JSON.stringify({
    status: "unknown",
    createdAt: "not-a-date",
  }),
);

assert(
  parsed.status === ("unknown" as unknown as typeof parsed.status),
  "strict=false should keep enum values without validation",
);
assert(
  parsed.createdAt instanceof Date,
  "strict=false should still hydrate dates",
);

assertFileContains("./gen/types.ts", "parse(json: string): Payload {");
assertFileNotContains("./gen/types.ts", "validate(input: unknown");
assertFileNotContains(
  "./gen/types.ts",
  "const error = Payload.validate(input);",
);

assertFileContains("./gen/enums.ts", "parse(json: string): Status {");
assertFileNotContains("./gen/enums.ts", "validate(input: unknown");
assertFileNotContains(
  "./gen/enums.ts",
  "const error = Status.validate(input);",
);
