import type { Bot } from "../../bot.ts";

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
 * @see {@link https://discord.com/developers/docs/resources/channel#delete-channel-permission}
 */
export async function deleteChannelPermissionOverride(bot: Bot, channelId: bigint, overwriteId: bigint): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.CHANNEL_OVERWRITE(channelId, overwriteId),
  );
}
