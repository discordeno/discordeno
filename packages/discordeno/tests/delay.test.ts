import { delay } from "../mod.ts";
import { assertEquals } from "./deps.ts";

Deno.test({
  name: "[utils] delay 2000 ms",
  ignore: Deno.env.get("TEST_ENV") === "INTEGRATION",
  async fn(t) {
    const before = Date.now();
    await delay(2000);
    const after = Date.now();
    assertEquals(after - before >= 2000, true);
  },
});
