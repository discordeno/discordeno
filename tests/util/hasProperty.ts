import { hasProperty } from "../../src/util/utils.ts";
import { assertEquals } from "../deps.ts";
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
