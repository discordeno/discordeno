import type { Bot } from "../../../bot.ts";
import { BigString } from "../../../types/shared.ts";

/**
 * Removes a member from a thread.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the thread to remove the thread member of.
 * @param userId - The user ID of the thread member to remove.
 *
 * @remarks
 * If the thread is of type {@link ChannelTypes.GuildPrivateThread}, requires to be the creator of the thread.
 * Otherwise, requires the `MANAGE_THREADS` permission.
 *
 * Requires the thread not be archived.
 *
 * Fires a _Thread Members Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#remove-thread-member}
 */
export async function removeThreadMember(bot: Bot, channelId: BigString, userId: BigString): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.THREAD_USER(channelId, userId),
  );
}
