import { bigintToSnowflake, snowflakeToBigint } from "../../src/util/bigint.ts";
import { assertEquals, assertNotEquals } from "../deps.ts";

Deno.test("[Local Test] - snowflakeToBigint ", () => {
  const text = "130136895395987456";
  const big = 130136895395987456n;
  const result = snowflakeToBigint(text);

  assertEquals(big, result);
  assertNotEquals(text, result);
});

Deno.test("[Local Test] - bigIntToSnowflake", () => {
  const text = "130136895395987456";
  const big = 130136895395987456n;
  const result = bigintToSnowflake(big);

  assertEquals(text, result);
  assertNotEquals(big, result);
});
