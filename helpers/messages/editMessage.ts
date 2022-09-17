import type { Bot } from "../../bot.ts";
import { Attachment } from "../../transformers/attachment.ts";
import { Embed } from "../../transformers/embed.ts";
import { Message } from "../../transformers/message.ts";
import { DiscordMessage } from "../../types/discord.ts";
import { AllowedMentions, FileContent, MessageComponents } from "../../types/discordeno.ts";
import { BigString } from "../../types/shared.ts";

/**
 * Edits a message.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel to edit the message in.
 * @param messageId - The IDs of the message to edit.
 * @param options - The parameters for the edit of the message.
 * @returns An instance of the edited {@link Message}.
 *
 * @remarks
 * If editing another user's message:
 * - Requires the `MANAGE_MESSAGES` permission.
 * - Only the {@link EditMessage.flags | flags} property of the {@link options} object parameter can be edited.
 *
 * Fires a _Message Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#edit-message}
 */
export async function editMessage(
  bot: Bot,
  channelId: BigString,
  messageId: BigString,
  options: EditMessage,
): Promise<Message> {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "PATCH",
    bot.constants.routes.CHANNEL_MESSAGE(channelId, messageId),
    {
      content: options.content,
      embeds: options.embeds?.map((embed) => bot.transformers.reverse.embed(bot, embed)),
      allowed_mentions: options.allowedMentions
        ? bot.transformers.reverse.allowedMentions(bot, options.allowedMentions)
        : undefined,
      attachments: options.attachments?.map((attachment) => bot.transformers.reverse.attachment(bot, attachment)),
      file: options.file,
      components: options.components?.map((component) => bot.transformers.reverse.component(bot, component)),
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
