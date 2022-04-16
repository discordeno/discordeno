import { bot } from "./mod.ts";
import { memoryBenchmarks } from "../benchmarks/index.ts";
import { sanitizeMode } from "./constants.ts";

Deno.test({
  name: "[Memory] Benchmark memory tests",
  async fn() {
    await memoryBenchmarks(bot, {
      log: true,
      table: true,
    });
  },
  ...sanitizeMode,
});
