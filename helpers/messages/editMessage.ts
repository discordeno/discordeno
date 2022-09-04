import type { Bot } from "../../bot.ts";
import { Attachment } from "../../transformers/attachment.ts";
import { Embed } from "../../transformers/embed.ts";
import { Message } from "../../transformers/message.ts";
import { DiscordMessage } from "../../types/discord.ts";
import { AllowedMentions, FileContent, MessageComponents } from "../../types/discordeno.ts";

/** Edit the message. */
export async function editMessage(
  bot: Bot,
  channelId: bigint,
  messageId: bigint,
  content: EditMessage,
): Promise<Message> {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "PATCH",
    bot.constants.routes.CHANNEL_MESSAGE(channelId, messageId),
    {
      content: content.content,
      embeds: content.embeds?.map((embed) => bot.transformers.reverse.embed(bot, embed)),
      allowed_mentions: content.allowedMentions
        ? bot.transformers.reverse.allowedMentions(bot, content.allowedMentions)
        : undefined,
      attachments: content.attachments?.map((attachment) => bot.transformers.reverse.attachment(bot, attachment)),
      file: content.file,
      components: content.components?.map((component) => bot.transformers.reverse.component(bot, component)),
    },
  );

  return bot.transformers.message(bot, result);
}

/** https://discord.com/developers/docs/resources/channel#edit-message-json-params */
export interface EditMessage {
  /** The new message contents (up to 2000 characters) */
  content?: string | null;
  /** Embedded `rich` content (up to 6000 characters) */
  embeds?: Embed[] | null;
  /** Edit the flags of the message (only `SUPPRESS_EMBEDS` can currently be set/unset) */
  flags?: 4 | null;
  /** The contents of the file being sent/edited */
  file?: FileContent | FileContent[] | null;
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions;
  /** When specified (adding new attachments), attachments which are not provided in this list will be removed. */
  attachments?: Attachment[];
  /** The components you would like to have sent in this message */
  components?: MessageComponents;
}
