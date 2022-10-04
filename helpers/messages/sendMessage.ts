import type { Bot } from "../../bot.ts";
import { Embed } from "../../transformers/embed.ts";
import { Message } from "../../transformers/message.ts";
import { DiscordMessage } from "../../types/discord.ts";
import { AllowedMentions, FileContent, MessageComponents } from "../../types/mod.ts";
import { BigString, MessageComponentTypes } from "../../types/shared.ts";

/**
 * Sends a message to a channel.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel to send the message in.
 * @param options - The parameters for the creation of the message.
 * @returns An instance of the created {@link Message}.
 *
 * @remarks
 * Requires that the bot user be able to see the contents of the channel the message is to be sent in.
 *
 * If sending a message to a guild channel:
 * - Requires the `SEND_MESSAGES` permission.
 *
 * If sending a TTS message:
 * - Requires the `SEND_TTS_MESSAGES` permission.
 *
 * If sending a message as a reply to another message:
 * - Requires the `READ_MESSAGE_HISTORY` permission.
 * - The message being replied to cannot be a system message.
 *
 * ⚠️ The maximum size of a request (accounting for any attachments and message content) for bot users is _8 MiB_.
 *
 * Fires a _Message Create_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#create-message}
 */
export async function sendMessage(bot: Bot, channelId: BigString, options: CreateMessage): Promise<Message> {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "POST",
    bot.constants.routes.CHANNEL_MESSAGES(channelId),
    {
      content: options.content,
      nonce: options.nonce,
      tts: options.tts,
      embeds: options.embeds?.map((embed) => bot.transformers.reverse.embed(bot, embed)),
      allowed_mentions: options.allowedMentions
        ? {
          parse: options.allowedMentions?.parse,
          roles: options.allowedMentions?.roles?.map((id) => id.toString()),
          users: options.allowedMentions?.users?.map((id) => id.toString()),
          replied_user: options.allowedMentions?.repliedUser,
        }
        : undefined,
      file: options.file,
      components: options.components?.map((component) => ({
        type: component.type,
        components: component.components.map((subComponent) => {
          if (subComponent.type === MessageComponentTypes.InputText) {
            return {
              type: subComponent.type,
              style: subComponent.style,
              custom_id: subComponent.customId,
              label: subComponent.label,
              placeholder: subComponent.placeholder,
              min_length: subComponent.minLength ?? subComponent.required === false ? 0 : subComponent.minLength,
              max_length: subComponent.maxLength,
            };
          }

          if (subComponent.type === MessageComponentTypes.SelectMenu) {
            return {
              type: subComponent.type,
              custom_id: subComponent.customId,
              placeholder: subComponent.placeholder,
              min_values: subComponent.minValues,
              max_values: subComponent.maxValues,
              disabled: "disabled" in subComponent ? subComponent.disabled : undefined,
              options: subComponent.options.map((option) => ({
                label: option.label,
                value: option.value,
                description: option.description,
                emoji: option.emoji
                  ? {
                    id: option.emoji.id?.toString(),
                    name: option.emoji.name,
                    animated: option.emoji.animated,
                  }
                  : undefined,
                default: option.default,
              })),
            };
          }

          return {
            type: subComponent.type,
            custom_id: subComponent.customId,
            label: subComponent.label,
            style: subComponent.style,
            emoji: "emoji" in subComponent && subComponent.emoji
              ? {
                id: subComponent.emoji.id?.toString(),
                name: subComponent.emoji.name,
                animated: subComponent.emoji.animated,
              }
              : undefined,
            url: "url" in subComponent ? subComponent.url : undefined,
            disabled: "disabled" in subComponent ? subComponent.disabled : undefined,
          };
        }),
      })),
      ...(options.messageReference?.messageId
        ? {
          message_reference: {
            message_id: options.messageReference.messageId.toString(),
            channel_id: options.messageReference.channelId?.toString(),
            guild_id: options.messageReference.guildId?.toString(),
            fail_if_not_exists: options.messageReference.failIfNotExists === true,
          },
        }
        : {}),
      sticker_ids: options.stickerIds?.map((sticker) => sticker.toString()),
    },
  );

  return bot.transformers.message(bot, result);
}

export interface CreateMessage {
  /** The message contents (up to 2000 characters) */
  content?: string;
  /** Can be used to verify a message was sent (up to 25 characters). Value will appear in the Message Create event. */
  nonce?: string | number;
  /** true if this is a TTS message */
  tts?: boolean;
  /** Embedded `rich` content (up to 6000 characters) */
  embeds?: Embed[];
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions;
  /** Include to make your message a reply */
  messageReference?: {
    /** id of the originating message */
    messageId?: BigString;
    /**
     * id of the originating message's channel
     * Note: `channel_id` is optional when creating a reply, but will always be present when receiving an event/response that includes this data model.
     */
    channelId?: BigString;
    /** id of the originating message's guild */
    guildId?: BigString;
    /** When sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default true */
    failIfNotExists: boolean;
  };
  /** The contents of the file being sent */
  file?: FileContent | FileContent[];
  /** The components you would like to have sent in this message */
  components?: MessageComponents;
  /** IDs of up to 3 stickers in the server to send in the message */
  stickerIds?: [bigint] | [bigint, bigint] | [bigint, bigint, bigint];
}
