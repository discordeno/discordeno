import { validateLength } from "../../util/validateLength.ts";
import { assertEquals } from "../deps.ts";

Deno.test({
  name: "[utils] Validate length is too low",
  fn() {
    assertEquals(validateLength("test", { min: 5 }), false);
  },
});

Deno.test({
  name: "[utils] Validate length is too high",
  fn() {
    assertEquals(validateLength("test", { max: 3 }), false);
  },
});

Deno.test({
  name: "[utils] Validate length is NOT just right in between.",
  fn() {
    assertEquals(validateLength("test", { min: 5, max: 3 }), false);
  },
});

Deno.test({
  name: "[utils] Validate length is NOT too low",
  fn() {
    assertEquals(validateLength("test", { min: 3 }), true);
  },
});

Deno.test({
  name: "[utils] Validate length is NOT too high",
  fn() {
    assertEquals(validateLength("test", { max: 5 }), true);
  },
});

Deno.test({
  name: "[utils] Validate length is just right in between.",
  fn() {
    assertEquals(validateLength("test", { min: 3, max: 6 }), true);
  },
});
