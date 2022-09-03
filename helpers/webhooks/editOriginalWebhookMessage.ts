import type { Bot } from "../../bot.ts";
import { Message } from "../../transformers/message.ts";
import { DiscordMessage } from "../../types/discord.ts";
import { EditWebhookMessage, transformEditWebhookMessage } from "./editWebhookMessage.ts";

export async function editOriginalWebhookMessage(
  bot: Bot,
  id: bigint,
  token: string,
  options: EditWebhookMessage & { threadId?: bigint },
): Promise<Message> {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "PATCH",
    bot.constants.routes.WEBHOOK_MESSAGE_ORIGINAL(id, token, options),
    transformEditWebhookMessage(bot, options),
  );

  return bot.transformers.message(bot, result);
}
