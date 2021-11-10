import { Bot } from "../../../src/bot.ts";
import { assertExists, assertEquals } from "../../deps.ts";

export async function getVanityURLTests(bot: Bot, guildId: bigint, t: Deno.TestContext) {
  // TODO: VANITY IS BROKEN ATM FROM DISCORDS SIDE
  return;
  // const fetchedVanityURL = await bot.helpers.getVanityURL(guildId);

  // console.log("fetched", fetchedVanityURL);
  // // Assertions
  // assertExists(fetchedVanityURL);
  // assertEquals(fetchedVanityURL.code, null);
}
