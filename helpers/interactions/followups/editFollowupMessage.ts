import { Bot } from "../../../bot.ts";
import { Message } from "../../../transformers/message.ts";
import { DiscordMessage } from "../../../types/discord.ts";
import { EditWebhookMessage } from "../../webhooks/editWebhookMessage.ts";

/** Edits a followup message for an Interaction. Functions the same as edit webhook message, however this uses your interaction token instead of bot token. Does not support ephemeral followups. */
export async function editFollowupMessage(
  bot: Bot,
  interactionToken: string,
  messageId: bigint,
  options: EditWebhookMessage,
): Promise<Message> {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "PATCH",
    bot.constants.routes.WEBHOOK_MESSAGE(bot.applicationId, interactionToken, messageId),
    {
      content: options.content,
      embeds: options.embeds?.map((embed) => bot.transformers.reverse.embed(bot, embed)),
      file: options.file,
      allowed_mentions: options.allowedMentions
        ? bot.transformers.reverse.allowedMentions(bot, options.allowedMentions)
        : undefined,
      attachments: options.attachments?.map((attachment) => bot.transformers.reverse.attachment(bot, attachment)),
      components: options.components?.map((component) => bot.transformers.reverse.component(bot, component)),
      message_id: messageId?.toString(),
    },
  );

  return bot.transformers.message(bot, result);
}
