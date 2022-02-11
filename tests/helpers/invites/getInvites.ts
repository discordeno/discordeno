import { Bot } from "../../../bot.ts";
import { assertEquals, assertExists } from "../../deps.ts";

export async function getInvitesTest(bot: Bot, channelId: bigint, guildId: bigint, t: Deno.TestContext) {
  const invite = await bot.helpers.createInvite(channelId, {
    maxAge: 86400,
    maxUses: 0,
    temporary: false,
    unique: false,
  });

  // Assertions
  assertExists(invite);

  const fetchedInvites = await bot.helpers.getInvites(guildId);

  assertExists(fetchedInvites);

  if (fetchedInvites.size === 0) {
    throw new Error("The function getInvites didn't return any invites");
  }
}
