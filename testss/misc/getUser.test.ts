import { assertEquals, assertExists } from "../deps.ts";
import { loadBot } from "../mod.ts";

Deno.test({
  name: "[User] get a user and transform",
  fn: async (t) => {
    const bot = loadBot();
    const user = await bot.helpers.getUser(bot.id);
    assertExists(user?.id);
    assertEquals(user.id, bot.id);
  },
});
