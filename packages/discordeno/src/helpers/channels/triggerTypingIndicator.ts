import type { Bot } from "../../bot.ts";
import { BigString } from "../../types/shared.ts";

export const startTyping = triggerTypingIndicator;

/**
 * Triggers a typing indicator for the bot user.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel in which to trigger the typing indicator.
 *
 * @remarks
 * Generally, bots should _not_ use this route.
 *
 * Fires a _Typing Start_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#trigger-typing-indicator}
 */
export async function triggerTypingIndicator(bot: Bot, channelId: BigString): Promise<void> {
  return await bot.rest.runMethod<void>(bot.rest, "POST", bot.constants.routes.CHANNEL_TYPING(channelId));
}
