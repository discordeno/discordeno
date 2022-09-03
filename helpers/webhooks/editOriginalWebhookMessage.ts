import type { Bot } from "../../bot.ts";
import { Message } from "../../transformers/message.ts";
import { DiscordMessage } from "../../types/discord.ts";
import { InteractionCallbackData, InteractionResponseTypes } from "../../types/mod.ts";

export async function editOriginalWebhookMessage(
  bot: Bot,
  id: bigint,
  token: string,
  options: InteractionCallbackData & { threadId?: bigint },
): Promise<Message> {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "PATCH",
    bot.constants.routes.WEBHOOK_MESSAGE_ORIGINAL(id, token, options),
    bot.transformers.reverse.interactionResponse(bot, {
      type: InteractionResponseTypes.UpdateMessage,
      data: options,
    }).data,
  );

  return bot.transformers.message(bot, result);
}
