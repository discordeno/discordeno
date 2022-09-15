import type { Bot } from "../../../bot.ts";
import { Message } from "../../../transformers/message.ts";
import { DiscordMessage } from "../../../types/discord.ts";
import { BigString } from "../../../types/shared.ts";

/**
 * Gets a follow-up message to an interaction by the ID of the message.
 *
 * @param bot - The bot instance to use to make the request.
 * @param token - The interaction token to use, provided in the original interaction.
 * @param messageId - The ID of the message to get.
 * @returns An instance of {@link Message}.
 *
 * @remarks
 * Unlike `getMessage()`, this endpoint allows the bot user to act without:
 * - Needing to be able to see the contents of the channel that the message is in. (`READ_MESSAGES` permission.)
 * - Requiring the `MESSAGE_CONTENT` intent.
 *
 * Does not support ephemeral follow-up messages due to these being stateless.
 *
 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#get-followup-message}
 */
export async function getFollowupMessage(bot: Bot, token: string, messageId: BigString): Promise<Message> {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "GET",
    bot.constants.routes.INTERACTION_ID_TOKEN_MESSAGE_ID(bot.applicationId, token, messageId),
  );

  return bot.transformers.message(bot, result);
}
