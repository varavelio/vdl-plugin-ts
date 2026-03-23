import { misc } from "@varavel/vdl-plugin-sdk/utils";
import * as gen from "./gen/index.ts";

const parsed = gen.Payload.parse(
  JSON.stringify({
    status: "ghost",
    createdAt: "not-a-date",
  }),
);

misc.assert(
  parsed.status === ("ghost" as unknown as typeof parsed.status),
  "strict=false should not enforce enum validation inside parse",
);
misc.assert(
  parsed.createdAt instanceof Date,
  "strict=false parse should still hydrate datetime fields",
);
