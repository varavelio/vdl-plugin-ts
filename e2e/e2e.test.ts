import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";

const repoRoot = resolve(__dirname, "..");
const fixturesDir = resolve(__dirname, "fixtures");
const localVdlBin = resolve(repoRoot, "node_modules/.bin/vdl");
const localTscBin = resolve(repoRoot, "node_modules/.bin/tsc");

// All generated files must type-check under a strict ES6-only baseline.
const tscArgs = [
  "--noEmit",
  "--moduleResolution",
  "bundler",
  "--module",
  "esnext",
  "--target",
  "es6",
  "--lib",
  "es6",
  "--strict",
  "--allowImportingTsExtensions",
  "--skipLibCheck",
] as const;

const fixtures = listFixtures(fixturesDir);

describe("VDL Plugin TS e2e", () => {
  // Build once so every fixture consumes the current local plugin bundle.
  beforeAll(() => {
    runCommand("npm", ["run", "build"], repoRoot, "pipe");
  });

  it.each(fixtures)("compiles fixture: %s", (fixtureName) => {
    const fixturePath = join(fixturesDir, fixtureName);

    // Pipeline per fixture: clean -> generate -> snapshot -> typecheck -> runtime.
    cleanGeneratedOutput(fixturePath);
    runFixtureGeneration(fixturePath);
    const generatedFiles = collectTypeScriptFiles(
      join(fixturePath, "gen"),
      fixturePath,
    );

    expect(generatedFiles.length).toBeGreaterThan(0);

    for (const filePath of generatedFiles) {
      const content = readFileSync(
        resolveFixturePath(fixturePath, filePath),
        "utf-8",
      )
        .trim()
        .split("\n")
        .slice(3)
        .join("\n")
        .trim();
      expect(content).toMatchSnapshot(toSnapshotKey(filePath));
    }

    runFixtureTypeCheck(fixturePath, generatedFiles);
    runFixtureRuntime(fixturePath);
  });
});

function listFixtures(rootDir: string): string[] {
  // A directory is considered a runnable fixture only when it has its own config.
  return readdirSync(rootDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => existsSync(join(rootDir, name, "vdl.config.vdl")))
    .sort();
}

function cleanGeneratedOutput(fixturePath: string): void {
  const generatedRoot = join(fixturePath, "gen");
  if (existsSync(generatedRoot)) {
    rmSync(generatedRoot, { recursive: true, force: true });
  }
}

function runFixtureGeneration(fixturePath: string): void {
  runCommand(localVdlBin, ["generate"], fixturePath, "pipe");
}

function runFixtureTypeCheck(
  fixturePath: string,
  generatedFiles: string[],
): void {
  if (generatedFiles.length === 0) {
    return;
  }

  // Type-check only generated files to validate the plugin output surface itself.
  runCommand(localTscBin, [...generatedFiles, ...tscArgs], fixturePath, "pipe");
}

function runFixtureRuntime(fixturePath: string): void {
  // Runtime assertions are optional and live in fixture-local main.ts files.
  if (!existsSync(join(fixturePath, "main.ts"))) {
    return;
  }

  runCommand("node", ["main.ts"], fixturePath, "inherit");
}

function collectTypeScriptFiles(
  rootDir: string,
  fixturePath: string,
): string[] {
  if (!existsSync(rootDir)) {
    return [];
  }

  const files: string[] = [];
  const pendingDirs = [rootDir];

  while (pendingDirs.length > 0) {
    const currentDir = pendingDirs.pop();
    if (!currentDir) {
      continue;
    }

    for (const entry of readdirSync(currentDir, { withFileTypes: true })) {
      const absolutePath = join(currentDir, entry.name);

      if (entry.isDirectory()) {
        pendingDirs.push(absolutePath);
        continue;
      }

      if (entry.isFile() && entry.name.endsWith(".ts")) {
        files.push(`./${relative(fixturePath, absolutePath)}`);
      }
    }
  }

  return files.sort();
}

function resolveFixturePath(
  fixturePath: string,
  fixtureRelativePath: string,
): string {
  return join(fixturePath, fixtureRelativePath.replace(/^\.\//, ""));
}

function toSnapshotKey(fixtureRelativePath: string): string {
  return fixtureRelativePath.replace(/^\.\/gen\//, "");
}

function runCommand(
  command: string,
  args: readonly string[],
  cwd: string,
  stdio: "inherit" | "pipe",
): void {
  // Centralized process execution keeps command behavior consistent across stages.
  execFileSync(command, [...args], { cwd, stdio });
}
