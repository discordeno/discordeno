import type { Bot } from "../../bot.ts";
import { Attachment } from "../../transformers/attachment.ts";
import { Embed } from "../../transformers/embed.ts";
import { Message } from "../../transformers/message.ts";
import { DiscordMessage } from "../../types/discord.ts";
import { AllowedMentions, FileContent, InteractionCallbackData, MessageComponents } from "../../types/discordeno.ts";
import { InteractionResponseTypes, MessageComponentTypes } from "../../types/shared.ts";

export async function editWebhookMessage(
  bot: Bot,
  id: bigint,
  token: string,
  messageId: bigint,
  options: InteractionCallbackData & { threadId?: bigint },
): Promise<Message> {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "PATCH",
    bot.constants.routes.WEBHOOK_MESSAGE(id, token, messageId, options),
    bot.transformers.reverse.interactionResponse(bot, {
      type: InteractionResponseTypes.UpdateMessage,
      data: options,
    }).data,
  );

  return bot.transformers.message(bot, result);
}