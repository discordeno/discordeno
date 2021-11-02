import { Bot } from "../../../src/bot.ts";
import { assertExists } from "../../deps.ts";

export async function getUserTests(bot: Bot, t: Deno.TestContext) {
  const user = await bot.helpers.getUser(bot.id);
  assertExists(user);

  assertExists(bot.transformers.user(bot, user));
}
