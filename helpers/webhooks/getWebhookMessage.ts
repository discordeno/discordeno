import type { Bot } from "../../bot.ts";
import { DiscordMessage } from "../../types/discord.ts";

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
  let url = bot.constants.endpoints.WEBHOOK_MESSAGE(webhookId, webhookToken, messageId);

  // QUERY PARAMS
  if (options?.threadId) {
    url += `?thread_id=${options.threadId}`;
  }

  const result = await bot.rest.runMethod<DiscordMessage>(bot.rest, "GET", url);

  return bot.transformers.message(bot, result);
}
