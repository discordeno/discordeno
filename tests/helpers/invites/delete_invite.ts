import { Bot } from "../../../src/bot.ts";
import { assertExists } from "../../deps.ts";

export async function deleteInviteTest(bot: Bot, channelId: bigint, t: Deno.TestContext) {
  const invite = await bot.helpers.createInvite(channelId, {
    maxAge: 86400,
    maxUses: 0,
    temporary: false,
    unique: false,
  });

  // Assertions
  assertExists(invite);

  const deletedInvite = await bot.helpers.deleteInvite(channelId, invite.code);

  // Assertions
  assertExists(deletedInvite);
}
