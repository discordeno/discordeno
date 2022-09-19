import type { Bot } from "../../bot.ts";
import { Message } from "../../transformers/message.ts";
import { DiscordMessage } from "../../types/discord.ts";
import { InteractionCallbackData } from "../../types/discordeno.ts";
import { BigString, InteractionResponseTypes } from "../../types/shared.ts";

/**
 * Edits a webhook message.
 *
 * @param bot - The bot instance to use to make the request.
 * @param webhookId - The ID of the webhook to edit the message of.
 * @param token - The webhook token, used to edit the message.
 * @param messageId - The ID of the message to edit.
 * @param options - The parameters for the edit of the message.
 * @returns An instance of the edited {@link Message}.
 *
 * @remarks
 * Fires a _Message Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/webhook#edit-webhook-message}
 */
export async function editWebhookMessage(
  bot: Bot,
  webhookId: BigString,
  token: string,
  messageId: BigString,
  options: InteractionCallbackData & { threadId?: BigString },
): Promise<Message> {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "PATCH",
    bot.constants.routes.WEBHOOK_MESSAGE(webhookId, token, messageId, options),
    {
      ...bot.transformers.reverse.interactionResponse(bot, {
        type: InteractionResponseTypes.UpdateMessage,
        data: options,
      }).data,
      file: options.file,
    },
  );

  return bot.transformers.message(bot, result);
}
