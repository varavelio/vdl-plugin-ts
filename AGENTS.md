# VDL TypeScript Plugin

## Summary

VDL is the open-source cross-language definition engine for modern stacks. Define your data structures, APIs, contracts, and generate type-safe code for your backend and frontend instantly.

This project contains the VDL TypeScript generator plugin. It consumes the validated VDL IR and emits TypeScript runtime modules for types, enums, and constants.

To create the plugin, we are using the VDL Plugin SDK. It is IMPERATIVE that you download and read the manual for using the SDK BEFORE starting ANY task, as it defines and explains many important things. It is also important that you use the manual information when writing tests or any utility code, as it contains helpers that should be used whenever possible to avoid duplicating code and keep the code of all VDL plugins in a similar way.

VDL Plugin SDK manual URL (download and read it): https://vdl-plugin-sdk.varavel.com/llms.txt

## Maintaining this Document

After completing any task, review this file and update it if you made structural changes or discovered patterns worth documenting. Only add information that helps understand how to work with the project. Avoid implementation details, file listings, or trivial changes. This is a general guide, not a changelog.

When updating this document, do so with the context of the entire document in mind; do not simply add new sections at the end, but place them where they make the most sense within the context of the document.

## Architecture & Organization

### Core Flow

- `src/index.ts`: SDK-facing entrypoint created with `definePlugin(...)`.
- `src/generate.ts`: pure orchestration entrypoint.
- `src/stages/options/resolve.ts`: parses `genConsts`, `strict`, and `importExtension`.
- `src/stages/model/build-context.ts`: hoists anonymous types, infers constant types, and prepares the generator context.
- `src/stages/emit/generate-files.ts`: emits files in deterministic order.

### Generated Surface

- `enums.ts`: enum unions plus merged namespace objects that expose enum values plus `parse` / `hydrate`; `validate` is emitted only when `strict` is enabled.
- `types.ts`: named types plus merged namespace objects that expose `parse` / `hydrate`; `validate` is emitted only when `strict` is enabled.
- `constants.ts`: optional constant emission.
- `index.ts`: barrel exports.

### Shared Helpers

- `src/shared/comments.ts`: doc and deprecation rendering.
- `src/shared/errors.ts`: generation error helpers and conversion to plugin diagnostics.
- `src/shared/imports.ts`: internal import-extension policy.
- `src/shared/naming.ts`: inline type naming plus property helpers.
- `src/shared/ts-types.ts`: TypeScript type rendering and alias resolution helpers.
- `src/shared/ts-literals.ts`: constant literal rendering.

## Working Notes

- Keep implementations aligned with SDK patterns from the manual.
- Prefer SDK utilities over custom helpers when the SDK already provides the behavior.
- The incoming IR is already semantically validated. Plugin-side validation should focus on TypeScript generation concerns.
- `datetime` values must validate from JSON strings and hydrate to real `Date` instances.
- Required-field validation must use presence checks, not truthiness checks.
- `strict` defaults to `true`; when set to `false`, generated `parse` helpers skip validation and runtime `validate` methods are not emitted.
- Generated types and enums should prefer declaration merging (`export type X` + `export const X`) over loose top-level helper exports.
- Generated runtime code must stay compatible with ES6 library baselines; avoid emitting APIs like `Object.entries`, `Object.fromEntries`, or `Array.prototype.includes` directly in generated files.
- When a newer runtime convenience would simplify generated code, prefer local `_vdl` helper methods that implement equivalent ES6-safe behavior.
- E2E fixtures should stay focused: one fixture folder per behavior cluster, each with a small `main.ts` assertion script.
- E2E fixture assertions should use shared helpers from `e2e/helpers/index.ts` (including error assertions and generated-file checks) instead of redefining local helpers in each fixture.
- Keep the E2E matrix broad: cover includes/spreads, nested map/array/object combinations, doc/deprecation emission, option fallbacks, output-file presence/absence checks, and a fixture that type-checks generated output with `tsc --noEmit` under an ES6-only `tsconfig`.
- Trust the IR provided by VDL directly. Do not duplicate compiler cleanup steps for duplicate object fields or similar guarantees inside the plugin.
- The current SDK IR surface used by this generator is focused on constants, enums, and types. RPC generation is intentionally out of scope for this version.
