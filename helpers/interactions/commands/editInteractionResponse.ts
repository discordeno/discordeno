import type { Bot } from "../../../bot.ts";
import { Message } from "../../../transformers/message.ts";
import { DiscordMessage } from "../../../types/discord.ts";
import { EditWebhookMessage } from "../../webhooks/editWebhookMessage.ts";

/** To edit your response to a application command. If a messageId is not provided it will default to editing the original response. */
export async function editInteractionResponse(
  bot: Bot,
  token: string,
  options: EditWebhookMessage & {
    /** Id of the message you want to edit if undefined the initial response message will be edited */
    messageId?: bigint;
  },
): Promise<Message | undefined> {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "PATCH",
    options.messageId
      ? bot.constants.routes.WEBHOOK_MESSAGE(bot.applicationId, token, options.messageId)
      : bot.constants.routes.INTERACTION_ORIGINAL_ID_TOKEN(bot.applicationId, token),
    {
      content: options.content,
      embeds: options.embeds?.map((embed) => bot.transformers.reverse.embed(bot, embed)),
      file: options.file,
      allowed_mentions: options.allowedMentions
        ? bot.transformers.reverse.allowedMentions(bot, options.allowedMentions)
        : undefined,
      attachments: options.attachments?.map((attachment) => bot.transformers.reverse.attachment(bot, attachment)),
      components: options.components?.map((component) => bot.transformers.reverse.component(bot, component)),
      message_id: options.messageId?.toString(),
    },
  );

  // If the original message was edited, this will not return a message
  if (!options.messageId) return;

  return bot.transformers.message(bot, result);
}
