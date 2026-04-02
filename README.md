<p align="center">
  <img
    src="https://raw.githubusercontent.com/varavelio/vdl/9cb8432f972f986ba91ffa1e4fe82220a8aa373f/assets/png/vdl.png"
    alt="VDL logo"
    width="130"
  />
</p>

<h1 align="center">VDL TypeScript Plugin</h1>

<p align="center">
  Generate TypeScript <strong>types</strong>, <strong>enums</strong>, and <strong>constants</strong> from VDL.
</p>

This plugin is focused on data models only (types/enums/constants).

## Quick Start

1. Add the plugin to your `vdl.config.vdl`:

```vdl
const config = {
  version 1
  plugins [
    {
      src "varavelio/vdl-plugin-ts@v0.1.4"
      schema "./schema.vdl"
      outDir "./gen"
    }
  ]
}
```

2. Run your normal VDL generation command (example: `vdl generate`).

3. Check generated files in `./gen`:

- `types.ts`
- `enums.ts`
- `index.ts`
- `constants.ts` (only if constants exist and `genConsts` is enabled)

## Plugin Options

All options are optional.

| Option            | Type                     | Default  | What it changes                                                                                                                                 |
| ----------------- | ------------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `genConsts`       | `boolean`                | `"true"` | Emits `constants.ts` when your schema has constants. If `false`, `constants.ts` is never generated.                                             |
| `strict`          | `boolean`                | `"true"` | Enables runtime validation in `parse(...)` and emits `validate(...)`. If `false`, validation code is omitted and `parse(...)` skips validation. |
| `importExtension` | `"none" \| "js" \| "ts"` | `"js"`   | Controls import paths in generated files: `"js"` for `.js`, `"ts"` for `.ts`, `"none"` for extensionless imports.                               |

Example with all options:

```vdl
const config = {
  version 1
  plugins [
    {
      src "varavelio/vdl-plugin-ts@v0.1.4"
      schema "./schema.vdl"
      outDir "./gen"
      options {
        genConsts "true"
        strict "true"
        importExtension "ts"
      }
    }
  ]
}
```

## Runtime Behavior

- `datetime` values are parsed from JSON strings and hydrated to real `Date` instances.
- Required fields are validated by presence, so `false`, `0`, and `""` are treated as valid values.
- Types and enums expose consistent runtime helpers like `parse(...)` and `hydrate(...)`.
- `validate(...)` is generated only when `strict: true`.

## License

This plugin is released under the MIT License. See [LICENSE](LICENSE).
