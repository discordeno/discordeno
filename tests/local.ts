import { snowflakeToBigint } from "../mod.ts";
import { assertEquals } from "./deps.ts";

Deno.test("[Local Test] - snowflakeToBigint ", async (t) => {
  const text = "130136895395987456";
  const big = 130136895395987456n;

  assertEquals(big, snowflakeToBigint(text));
});
