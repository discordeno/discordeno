import type { Bot } from "../../bot.ts";
import { Attachment } from "../../transformers/attachment.ts";
import { Embed } from "../../transformers/embed.ts";
import { Message } from "../../transformers/message.ts";
import { DiscordMessage } from "../../types/discord.ts";
import { AllowedMentions, FileContent, MessageComponents } from "../../types/discordeno.ts";

export async function editWebhookMessage(
  bot: Bot,
  webhookId: bigint,
  webhookToken: string,
  options: EditWebhookMessage & { messageId?: bigint; threadId?: bigint },
): Promise<Message> {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "PATCH",
    options.messageId
      ? bot.constants.routes.WEBHOOK_MESSAGE(webhookId, webhookToken, options.messageId, options)
      : bot.constants.routes.WEBHOOK_MESSAGE_ORIGINAL(webhookId, webhookToken, options),
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

  return bot.transformers.message(bot, result);
}

/** https://discord.com/developers/docs/resources/webhook#edit-webhook-message-jsonform-params */
export interface EditWebhookMessage {
  /** The message contents (up to 2000 characters) */
  content?: string;
  /** Embedded `rich` content */
  embeds?: Embed[];
  /** The contents of the file being sent/edited */
  file?: FileContent | FileContent[];
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions;
  /** Attached files to keep */
  attachments?: Attachment[];
  /** The components you would like to have sent in this message */
  components?: MessageComponents;
}
