import { Bot } from "../../../bot.ts";
import { assertExists } from "../../deps.ts";

export async function getChannelInvitesTest(channelId: bigint) {
  const invite = await bot.helpers.createInvite(channelId, {
    maxAge: 86400,
    maxUses: 0,
    temporary: false,
    unique: true,
  });

  // Assertions
  assertExists(invite);

  const secondInvite = await bot.helpers.createInvite(channelId, {
    maxAge: 0,
    maxUses: 2,
    temporary: true,
    unique: true,
  });

  // Assertions
  assertExists(secondInvite);

  const invites = await bot.helpers.getChannelInvites(channelId);

  if (invites.size < 2) {
    throw new Error("The function getChannelInvites didn't return all the invites");
  }
}
