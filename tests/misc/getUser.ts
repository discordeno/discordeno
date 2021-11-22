import { assertExists } from "../deps.ts";
import { bot } from "../mod.ts";

Deno.test({
  name: "[User] get a user and transform",
  fn: async (t) => {
    const user = await bot.helpers.getUser(bot.id);
    assertExists(user);

    assertExists(bot.transformers.user(bot, user));
  },
});
