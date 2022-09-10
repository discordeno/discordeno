import type { Bot } from "../../../bot.ts";
import { BigString } from "../../../types/shared.ts";

/**
 * Adds a member to a thread.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the thread to add the member to.
 * @param userId - The user ID of the member to add to the thread.
 *
 * @remarks
 * Requires the ability to send messages in the thread.
 * Requires the thread not be archived.
 *
 * Fires a _Thread Members Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#add-thread-member}
 */
export async function addThreadMember(bot: Bot, channelId: BigString, userId: BigString): Promise<void> {
  return await bot.rest.runMethod<void>(bot.rest, "PUT", bot.constants.routes.THREAD_USER(channelId, userId));
}
