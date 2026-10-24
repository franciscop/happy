// Barebones smoke test, not a full suite
import { describe, expect, it } from "bun:test";
import { analyze, build, lint, test } from "./src/index.js";

describe("happy", () => {
  it("reads the package.json", async () => {
    const { pkg } = await analyze();
    expect(pkg.name).toBe("@franciscop/happy");
  });

  it("defines the tasks", () => {
    expect(build().title).toBe("Building project");
    expect(lint().title).toBe("Linting");
    expect(test().title).toBe("Testing project");
  });
});
