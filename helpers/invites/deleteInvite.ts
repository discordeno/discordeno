import type { Bot } from "../../bot.ts";

/** Deletes an invite for the given code. Requires `MANAGE_CHANNELS` or `MANAGE_GUILD` permission */
export async function deleteInvite(bot: Bot, inviteCode: string): Promise<void> {
  return void await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.INVITE(inviteCode));
}
