import {
  assertFileContains,
  assertValidationOk,
  expectFailure,
} from "../../helpers/index.ts";
import * as gen from "./gen/index.ts";

assertFileContains("./gen/enums.ts", "export type Nothing = never;");

assertValidationOk(gen.Wrapper.validate({}, "Wrapper"));

expectFailure(
  () =>
    gen.Wrapper.parse(
      JSON.stringify({
        value: "anything",
      }),
    ),
  'Wrapper.value: invalid value "anything" for Nothing enum',
);
