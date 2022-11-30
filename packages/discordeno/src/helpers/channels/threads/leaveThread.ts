import type { Bot } from "../../../bot.ts";
import { BigString } from "../../../types/shared.ts";

/**
 * Removes the bot user from a thread.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the thread to remove the bot user from.
 *
 * @remarks
 * Requires the thread not be archived.
 *
 * Fires a _Thread Members Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#leave-thread}
 */
export async function leaveThread(bot: Bot, channelId: BigString): Promise<void> {
  return await bot.rest.runMethod<void>(bot.rest, "DELETE", bot.constants.routes.THREAD_ME(channelId));
}
