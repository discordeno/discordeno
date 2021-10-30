import { DiscordChannelTypes } from "../../types/channels/channel_types.ts";
import { Errors } from "../../types/discordeno/errors.ts";
import { DiscordAllowedMentionsTypes } from "../../types/messages/allowed_mentions_types.ts";
import type { CreateMessage } from "../../types/messages/create_message.ts";
import type { Message } from "../../types/messages/message.ts";
import type { PermissionStrings } from "../../types/permissions/permission_strings.ts";
import type { Bot } from "../../bot.ts";
import { DiscordMessageComponentTypes } from "../../types/messages/components/message_component_types.ts";

/** Send a message to the channel. Requires SEND_MESSAGES permission. */
export async function sendMessage(bot: Bot, channelId: bigint, content: string | CreateMessage) {
  if (typeof content === "string") content = { content };

  const channel = await bot.cache.channels.get(channelId);
  if (channel) {
    if (
      ![
        DiscordChannelTypes.DM,
        DiscordChannelTypes.GuildNews,
        DiscordChannelTypes.GuildText,
        DiscordChannelTypes.GuildPublicThread,
        DiscordChannelTypes.GuildPrivateThread,
        DiscordChannelTypes.GuildNewsThread,
        DiscordChannelTypes.GuildVoice,
      ].includes(channel.type)
    ) {
      throw new Error(Errors.CHANNEL_NOT_TEXT_BASED);
    }

    const requiredPerms: Set<PermissionStrings> = new Set(["SEND_MESSAGES", "VIEW_CHANNEL"]);

    if (content.tts) requiredPerms.add("SEND_TTS_MESSAGES");
    if (content.embeds?.length) {
      requiredPerms.add("EMBED_LINKS");
      content.embeds?.splice(10);
    }

    if (content.messageReference?.messageId || content.allowedMentions?.repliedUser) {
      requiredPerms.add("READ_MESSAGE_HISTORY");
    }

    await bot.utils.requireBotChannelPermissions(bot, channelId, [...requiredPerms]);
  }

  // Use ... for content length due to unicode characters and js .length handling
  if (content.content && !bot.utils.validateLength(content.content, { max: 2000 })) {
    throw new Error(bot.constants.Errors.MESSAGE_MAX_LENGTH);
  }

  if (content.components?.length) {
    bot.utils.validateComponents(bot, content.components);
  }

  if (content.allowedMentions) {
    if (content.allowedMentions.users?.length) {
      if (content.allowedMentions.parse?.includes(DiscordAllowedMentionsTypes.UserMentions)) {
        content.allowedMentions.parse = content.allowedMentions.parse.filter((p) => p !== "users");
      }

      if (content.allowedMentions.users.length > 100) {
        content.allowedMentions.users = content.allowedMentions.users.slice(0, 100);
      }
    }

    if (content.allowedMentions.roles?.length) {
      if (content.allowedMentions.parse?.includes(DiscordAllowedMentionsTypes.RoleMentions)) {
        content.allowedMentions.parse = content.allowedMentions.parse.filter((p) => p !== "roles");
      }

      if (content.allowedMentions.roles.length > 100) {
        content.allowedMentions.roles = content.allowedMentions.roles.slice(0, 100);
      }
    }
  }

  const result = await bot.rest.runMethod<Message>(
    bot.rest,
    "post",
    bot.constants.endpoints.CHANNEL_MESSAGES(channelId),
    {
      content: content.content,
      tts: content.tts,
      embeds: content.embeds?.map((embed) => ({
        title: embed.title,
        type: embed.type,
        description: embed.description,
        url: embed.url,
        timestamp: embed.timestamp,
        color: embed.color,
        footer: embed.footer
          ? {
              text: embed.footer.text,
              icon_url: embed.footer.iconUrl,
              proxy_icon_url: embed.footer.proxyIconUrl,
            }
          : undefined,
        image: embed.image
          ? {
              url: embed.image.url,
              proxy_url: embed.image.proxyUrl,
              height: embed.image.height,
              width: embed.image.width,
            }
          : undefined,
        thumbnail: embed.thumbnail
          ? {
              url: embed.thumbnail.url,
              proxy_url: embed.thumbnail.proxyUrl,
              height: embed.thumbnail.height,
              width: embed.thumbnail.width,
            }
          : undefined,
        video: embed.video
          ? {
              url: embed.video.url,
              proxy_url: embed.video.proxyUrl,
              height: embed.video.height,
              width: embed.video.width,
            }
          : undefined,
        provider: embed.provider,
        author: embed.author
          ? {
              name: embed.author.name,
              url: embed.author.url,
              icon_url: embed.author.iconUrl,
              proxy_icon_url: embed.author.proxyIconUrl,
            }
          : undefined,
        fields: embed.fields,
      })),
      allowed_mentions: content.allowedMentions
        ? {
            parse: content.allowedMentions?.parse,
            roles: content.allowedMentions?.roles,
            users: content.allowedMentions?.users,
            replied_user: content.allowedMentions?.repliedUser,
          }
        : undefined,
      file: content.file,
      components: content.components?.map((component) => ({
        type: component.type,
        components: component.components.map((subcomponent) => {
          if (subcomponent.type === DiscordMessageComponentTypes.SelectMenu)
            return {
              type: subcomponent.type,
              custom_id: subcomponent.customId,
              placeholder: subcomponent.placeholder,
              min_values: subcomponent.minValues,
              max_values: subcomponent.maxValues,
              options: subcomponent.options.map((option) => ({
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

          return {
            type: subcomponent.type,
            custom_id: subcomponent.customId,
            label: subcomponent.label,
            customId: subcomponent.customId,
            style: subcomponent.style,
            emoji: subcomponent.emoji
              ? {
                  id: subcomponent.emoji.id?.toString(),
                  name: subcomponent.emoji.name,
                  animated: subcomponent.emoji.animated,
                }
              : undefined,
            url: subcomponent.url,
            disabled: subcomponent.disabled,
          };
        }),
      })),
      ...(content.messageReference?.messageId
        ? {
            message_reference: {
              message_id: content.messageReference.messageId,
              channel_id: content.messageReference.channelId,
              guild_id: content.messageReference.guildId,
              fail_if_not_exists: content.messageReference.failIfNotExists === true,
            },
          }
        : {}),
    }
  );

  return bot.transformers.message(bot, result);
}
