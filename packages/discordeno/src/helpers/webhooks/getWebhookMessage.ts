import type { Bot } from "../../bot.ts";
import { Message } from "../../transformers/message.ts";
import { DiscordMessage } from "../../types/discord.ts";
import { BigString } from "../../types/shared.ts";

export interface GetWebhookMessageOptions {
  threadId: BigString;
}

/**
 * Gets a webhook message by its ID.
 *
 * @param bot - The bot instance to use to make the request.
 * @param webhookId - The ID of the webhook to get a message of.
 * @param token - The webhook token, used to get webhook messages.
 * @param messageId - the ID of the webhook message to get.
 * @param options - The parameters for the fetching of the message.
 * @returns An instance of {@link Message}.
 *
 * @see {@link https://discord.com/developers/docs/resources/webhook#get-webhook-message}
 */
export async function getWebhookMessage(
  bot: Bot,
  webhookId: BigString,
  token: string,
  messageId: BigString,
  options?: GetWebhookMessageOptions,
): Promise<Message> {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "GET",
    bot.constants.routes.WEBHOOK_MESSAGE(webhookId, token, messageId, options),
  );

  return bot.transformers.message(bot, result);
}
