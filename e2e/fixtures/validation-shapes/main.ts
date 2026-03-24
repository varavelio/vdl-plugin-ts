import { expectFailure } from "../../helpers/index.ts";
import * as gen from "./gen/index.ts";

expectFailure(
  () =>
    gen.ShapeProbe.parse(
      JSON.stringify({
        count: null,
        ratio: 1,
        enabled: true,
        title: "ok",
        nested: { id: "n" },
        values: [1],
        labels: { a: "b" },
      }),
    ),
  "ShapeProbe.count: expected number, got null",
);

expectFailure(
  () =>
    gen.ShapeProbe.parse(
      JSON.stringify({
        count: 1,
        ratio: Number.NaN,
        enabled: true,
        title: "ok",
        nested: { id: "n" },
        values: [1],
        labels: { a: "b" },
      }),
    ),
  "ShapeProbe.ratio: expected number, got null",
);

expectFailure(
  () =>
    gen.ShapeProbe.parse(
      JSON.stringify({
        count: 1,
        ratio: 1,
        enabled: "yes",
        title: "ok",
        nested: { id: "n" },
        values: [1],
        labels: { a: "b" },
      }),
    ),
  "ShapeProbe.enabled: expected boolean, got string",
);

expectFailure(
  () =>
    gen.ShapeProbe.parse(
      JSON.stringify({
        count: 1,
        ratio: 1,
        enabled: true,
        title: [],
        nested: { id: "n" },
        values: [1],
        labels: { a: "b" },
      }),
    ),
  "ShapeProbe.title: expected string, got array",
);

expectFailure(
  () =>
    gen.ShapeProbe.parse(
      JSON.stringify({
        count: 1,
        ratio: 1,
        enabled: true,
        title: "ok",
        nested: [],
        values: [1],
        labels: { a: "b" },
      }),
    ),
  "ShapeProbe.nested: expected object, got array",
);

expectFailure(
  () =>
    gen.ShapeProbe.parse(
      JSON.stringify({
        count: 1,
        ratio: 1,
        enabled: true,
        title: "ok",
        nested: { id: "n" },
        values: {},
        labels: { a: "b" },
      }),
    ),
  "ShapeProbe.values: expected array, got object",
);

expectFailure(
  () =>
    gen.ShapeProbe.parse(
      JSON.stringify({
        count: 1,
        ratio: 1,
        enabled: true,
        title: "ok",
        nested: { id: "n" },
        values: [1],
        labels: ["x"],
      }),
    ),
  "ShapeProbe.labels: expected object, got array",
);
