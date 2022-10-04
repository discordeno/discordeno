import type { Bot } from "../../bot.ts";
import { BigString } from "../../types/shared.ts";

/**
 * Deletes a permission override for a user or role in a channel.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel to delete the permission override of.
 * @param overwriteId - The ID of the permission override to delete.
 *
 * @remarks
 * Requires the `MANAGE_ROLES` permission.
 *
 * Fires a _Channel Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#delete-channel-permission}
 */
export async function deleteChannelPermissionOverride(
  bot: Bot,
  channelId: BigString,
  overwriteId: BigString,
  reason?: string,
): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.CHANNEL_OVERWRITE(channelId, overwriteId),
    reason ? { reason } : undefined,
  );
}
