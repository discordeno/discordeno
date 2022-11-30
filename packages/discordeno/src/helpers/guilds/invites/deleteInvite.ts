import type { Bot } from "../../../bot.ts";

/**
 * Deletes an invite to a channel.
 *
 * @param bot - The bot instance to use to make the request.
 * @param inviteCode - The invite code of the invite to delete.
 *
 * @remarks
 * Requires the `MANAGE_CHANNELS` permission.
 *
 * Fires an _Invite Delete_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#delete-channel-invite}
 */
export async function deleteInvite(bot: Bot, inviteCode: string, reason?: string): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.INVITE(inviteCode),
    reason ? { reason } : undefined,
  );
}
