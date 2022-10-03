import type { Bot } from "../../../bot.ts";
import { InteractionCallbackData } from "../../../mod.ts";
import { Message } from "../../../transformers/message.ts";
import { DiscordMessage } from "../../../types/discord.ts";
import { BigString, InteractionResponseTypes } from "../../../types/shared.ts";

/**
 * Edits a follow-up message to an interaction.
 *
 * @param bot - The bot instance to use to make the request.
 * @param token - The interaction token to use, provided in the original interaction.
 * @param messageId - The ID of the message to edit.
 * @param options - The parameters for the edit of the message.
 * @returns An instance of the edited {@link Message}.
 *
 * @remarks
 * Unlike `editMessage()`, this endpoint allows the bot user to act without needing to see the channel the message is in.
 *
 * Does not support ephemeral follow-up messages due to these being stateless.
 *
 * Fires a _Message Update_ event.
 *
 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message}
 */
export async function editFollowupMessage(
  bot: Bot,
  token: string,
  messageId: BigString,
  options: InteractionCallbackData,
): Promise<Message> {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "PATCH",
    bot.constants.routes.WEBHOOK_MESSAGE(bot.applicationId, token, messageId),
    {
      messageId: messageId.toString(),
      ...bot.transformers.reverse.interactionResponse(bot, {
        type: InteractionResponseTypes.UpdateMessage,
        data: options,
      }).data,
      file: options.file,
    },
  );

  return bot.transformers.message(bot, result);
}
