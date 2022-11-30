import { assertEquals, assertExists } from "../deps.ts";
import { loadBot } from "../mod.ts";

Deno.test({
  name: "[User] get a user and transform",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();
    const user = await bot.helpers.getUser(bot.id);
    assertExists(user?.id);
    assertEquals(user.id, bot.id);
  },
});
