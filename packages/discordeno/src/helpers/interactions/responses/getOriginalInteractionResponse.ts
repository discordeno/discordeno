import type { Bot } from "../../../bot.ts";
import { Message } from "../../../transformers/message.ts";
import { DiscordMessage } from "../../../types/discord.ts";

/**
 * Gets the initial message response to an interaction.
 *
 * @param bot - The bot instance to use to make the request.
 * @param token - The interaction token to use, provided in the original interaction.
 * @returns An instance of {@link Message}.
 *
 * @remarks
 * Unlike `getMessage()`, this endpoint allows the bot user to act without:
 * - Needing to be able to see the contents of the channel that the message is in. (`READ_MESSAGES` permission.)
 * - Requiring the `MESSAGE_CONTENT` intent.
 *
 * Does not support ephemeral follow-up messages due to these being stateless.
 *
 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#get-original-interaction-response}
 */
export async function getOriginalInteractionResponse(bot: Bot, token: string): Promise<Message> {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "GET",
    bot.constants.routes.INTERACTION_ORIGINAL_ID_TOKEN(bot.applicationId, token),
  );

  return bot.transformers.message(bot, result);
}
