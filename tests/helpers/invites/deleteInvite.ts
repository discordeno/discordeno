import { Bot } from "../../../src/bot.ts";
import { assertExists } from "../../deps.ts";

export async function deleteInviteTest(channelId: bigint) {
  const invite = await bot.helpers.createInvite(channelId, {
    maxAge: 86400,
    maxUses: 0,
    temporary: false,
    unique: false,
  });

  // Assertions
  assertExists(invite);

  const deletedInvite = await bot.helpers.deleteInvite(invite.code);

  // Assertions
  assertExists(deletedInvite);
}
