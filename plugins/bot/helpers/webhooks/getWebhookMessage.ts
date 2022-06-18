import { Bot } from "../../bot.ts";
import { DiscordMessage } from "../../deps.ts";

export interface GetWebhookMessageOptions {
  threadId: bigint;
}

/** Returns a previously-sent webhook message from the same token. Returns a message object on success. */
export async function getWebhookMessage(
  bot: Bot,
  webhookId: bigint,
  webhookToken: string,
  messageId: bigint,
  options?: GetWebhookMessageOptions,
) {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "GET",
    bot.constants.routes.WEBHOOK_MESSAGE(webhookId, webhookToken, messageId, options),
  );

  return bot.transformers.message(bot, result);
}
