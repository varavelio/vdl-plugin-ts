import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import * as misc from "@varavel/vdl-plugin-sdk/utils/misc";

/**
 * Asserts that a condition is truthy.
 */
export function assert(condition: unknown, message: string): asserts condition {
  misc.assert(Boolean(condition), message);
}

/**
 * Asserts that a callback throws and that the error message contains the expected text.
 */
export function expectFailure(run: () => unknown, expected: string): void {
  let didThrow = false;

  try {
    run();
  } catch (error) {
    didThrow = true;
    const message = error instanceof Error ? error.message : String(error);
    assert(
      message.includes(expected),
      `Expected ${JSON.stringify(message)} to include ${JSON.stringify(expected)}`,
    );
  }

  assert(didThrow, `Expected failure containing ${JSON.stringify(expected)}`);
}

/**
 * Asserts that a validation result is successful.
 */
export function assertValidationOk(error: string | null): void {
  assert(error === null, error ?? "Expected validation to pass");
}

/**
 * Asserts that a file exists.
 */
export function assertFileExists(path: string): void {
  assert(
    existsSync(resolve(process.cwd(), path)),
    `Expected file to exist: ${path}`,
  );
}

/**
 * Asserts that a file does not exist.
 */
export function assertFileNotExists(path: string): void {
  assert(
    !existsSync(resolve(process.cwd(), path)),
    `Expected file not to exist: ${path}`,
  );
}

/**
 * Asserts that a file contains the expected string.
 */
export function assertFileContains(path: string, value: string): void {
  assertFileExists(path);
  const content = readFileSync(resolve(process.cwd(), path), "utf-8");
  assert(
    content.includes(value),
    `Expected file ${path} to contain ${JSON.stringify(value)}`,
  );
}

/**
 * Asserts that a file does not contain the given string.
 */
export function assertFileNotContains(path: string, value: string): void {
  assertFileExists(path);
  const content = readFileSync(resolve(process.cwd(), path), "utf-8");
  assert(
    !content.includes(value),
    `Expected file ${path} not to contain ${JSON.stringify(value)}`,
  );
}
