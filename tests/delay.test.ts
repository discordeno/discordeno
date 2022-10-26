import { delay } from "../mod.ts";
import { assertEquals } from "./deps.ts";

Deno.test({
  name: "[utils] delay 2000 ms",
  async fn(t) {
    const before = Date.now();
    await delay(2000);
    const after = Date.now();
    assertEquals(after - before >= 2000, true);
  },
});
