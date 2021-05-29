import { cache } from "../src/cache.ts";

// Exit the Deno process once all tests are done.
Deno.test({
  name: "[chache] Stop all sweepers manually.",
  fn() {
    // clear all the sweeper intervals
    for (const c of Object.values(cache)) {
      if (!(c instanceof Map)) continue;

      c.stopSweeper();
    }
  },
});
