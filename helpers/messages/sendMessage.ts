import type { Bot } from "../../bot.ts";
import { AllowedMentions, FileContent, MessageComponents } from "../../types/mod.ts";
import { DiscordMessage } from "../../types/discord.ts";
import { MessageComponentTypes } from "../../types/shared.ts";
import { Embed } from "../../transformers/embed.ts";

/** Send a message to the channel. Requires SEND_MESSAGES permission. */
export async function sendMessage(bot: Bot, channelId: bigint, content: CreateMessage) {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "post",
    bot.constants.endpoints.CHANNEL_MESSAGES(channelId),
    {
      content: content.content,
      tts: content.tts,
      embeds: content.embeds?.map((embed) => bot.transformers.reverse.embed(bot, embed)),
      allowed_mentions: content.allowedMentions
        ? {
          parse: content.allowedMentions?.parse,
          roles: content.allowedMentions?.roles?.map((id) => id.toString()),
          users: content.allowedMentions?.users?.map((id) => id.toString()),
          replied_user: content.allowedMentions?.repliedUser,
        }
        : undefined,
      file: content.file,
      components: content.components?.map((component) => ({
        type: component.type,
        components: component.components.map((component) => {
          if (component.type === MessageComponentTypes.InputText) {
            return {
              type: component.type,
              style: component.style,
              custom_id: component.customId,
              label: component.label,
              placeholder: component.placeholder,
              min_length: component.minLength ?? component.required === false ? 0 : component.minLength,
              max_length: component.maxLength,
            };
          }

          if (component.type === MessageComponentTypes.SelectMenu) {
            return {
              type: component.type,
              custom_id: component.customId,
              placeholder: component.placeholder,
              min_values: component.minValues,
              max_values: component.maxValues,
              options: component.options.map((option) => ({
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
            type: component.type,
            custom_id: component.customId,
            label: component.label,
            style: component.style,
            emoji: "emoji" in component && component.emoji
              ? {
                id: component.emoji.id?.toString(),
                name: component.emoji.name,
                animated: component.emoji.animated,
              }
              : undefined,
            url: "url" in component ? component.url : undefined,
            disabled: "disabled" in component ? component.disabled : undefined,
          };
        }),
      })),
      ...(content.messageReference?.messageId
        ? {
          message_reference: {
            message_id: content.messageReference.messageId.toString(),
            channel_id: content.messageReference.channelId?.toString(),
            guild_id: content.messageReference.guildId?.toString(),
            fail_if_not_exists: content.messageReference.failIfNotExists === true,
          },
        }
        : {}),
    },
  );

  return bot.transformers.message(bot, result);
}

export interface CreateMessage {
  /** The message contents (up to 2000 characters) */
  content?: string;
  /** true if this is a TTS message */
  tts?: boolean;
  /** Embedded `rich` content (up to 6000 characters) */
  embeds?: Embed[];
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions;
  /** Include to make your message a reply */
  messageReference?: {
    /** id of the originating message */
    messageId?: bigint;
    /**
     * id of the originating message's channel
     * Note: `channel_id` is optional when creating a reply, but will always be present when receiving an event/response that includes this data model.
     */
    channelId?: bigint;
    /** id of the originating message's guild */
    guildId?: bigint;
    /** When sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default true */
    failIfNotExists: boolean;
  };
  /** The contents of the file being sent */
  file?: FileContent | FileContent[];
  /** The components you would like to have sent in this message */
  components?: MessageComponents;
}
