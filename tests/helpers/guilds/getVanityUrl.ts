import { Bot } from "../../../src/bot.ts";
import { assertExists, assertEquals } from "../../deps.ts";

export async function getVanityURLTests(bot: Bot, guildId: bigint, t: Deno.TestContext) {
  await bot.utils.requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

  // TODO: VANITY IS BROKEN ATM
  return;
  // const fetchedVanityURL = await bot.helpers.getVanityURL(guildId);

  // console.log("fetched", fetchedVanityURL);
  // // Assertions
  // assertExists(fetchedVanityURL);
  // assertEquals(fetchedVanityURL.code, null);
}
