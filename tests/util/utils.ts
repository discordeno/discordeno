import { hasProperty, delay } from "../../src/util/utils.ts";
import { assertEquals } from "../deps.ts";

// hasProperty

const obj = { prop: "lts372005" };
Deno.test({
  name: "[utils] hasProperty does HAVE property",
  fn() {
    assertEquals(hasProperty(obj, "prop"), true);
  },
});
Deno.test({
  name: "[utils] hasProperty does NOT HAVE property",
  fn() {
    assertEquals(hasProperty(obj, "lts372005"), false);
  },
});

// delay

Deno.test({
  name: "[utils] delay 2000 ms",
  async fn() {
    const before = Date.now();
    await delay(2000);
    const after = Date.now();
    assertEquals(after - before >= 2000, true);
  },
});
