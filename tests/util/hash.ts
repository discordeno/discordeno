import { iconHashToBigInt, iconBigintToHash } from "../../src/util/hash.ts";
import { assertEquals } from "../deps.ts";
const iconHash = "4bbb271a13f7195031adcc06a2d867ce";
const iconBigInt = 3843769888406823508519992434416504301518n;
const a_iconHash = "a_4bbb271a13f7195031adcc06a2d867ce";
const a_iconBigInt = 3503487521485885045056617826984736090062n;
Deno.test({
  name: "[utils] icon hash to bigint",
  fn() {
    assertEquals(iconHashToBigInt(iconHash), iconBigInt);
  },
});
Deno.test({
  name: "[utils] icon bigint to hash",
  fn() {
    assertEquals(iconBigintToHash(iconBigInt), iconHash);
  },
});
Deno.test({
  name: "[utils] icon hash to bigint a_ (animated)",
  fn() {
    assertEquals(iconHashToBigInt(a_iconHash), a_iconBigInt);
  },
});
Deno.test({
  name: "[utils] icon bigint to hash a_ (animated)",
  fn() {
    assertEquals(iconBigintToHash(a_iconBigInt), a_iconHash);
  },
});
