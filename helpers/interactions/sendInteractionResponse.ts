import type { DiscordenoInteractionResponse } from "../../types/discordeno/interactionResponse.ts";
import type { Bot } from "../../bot.ts";
import { MessageComponentTypes } from "../../types/messages/components/messageComponentTypes.ts";
import { DiscordMessage } from "../../types/discord.ts";

/**
 * Send a response to a users application command. The command data will have the id and token necessary to respond.
 * Interaction `tokens` are valid for **15 minutes** and can be used to send followup messages.
 *
 * NOTE: By default we will suppress mentions. To enable mentions, just pass any mentions object.
 */
export async function sendInteractionResponse(
  bot: Bot,
  id: bigint,
  token: string,
  options: DiscordenoInteractionResponse,
) {
  // If the user wants this as a private message mark it ephemeral
  if (options.private) {
    options.data = { ...options.data, flags: 64 };
  }

  // If no mentions are provided, force disable mentions
  if (!options.data?.allowedMentions) {
    options.data = { ...options.data, allowedMentions: { parse: [] } };
  }

  // DRY code a little bit
  const data = {
    content: options.data.content,
    tts: options.data.tts,
    embeds: options.data.embeds?.map((embed) => ({
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
    allowed_mentions: {
      parse: options.data.allowedMentions!.parse,
      replied_user: options.data.allowedMentions!.repliedUser,
      users: options.data.allowedMentions!.users?.map((id) => id.toString()),
      roles: options.data.allowedMentions!.roles?.map((id) => id.toString()),
    },
    file: options.data.file,
    custom_id: options.data.customId,
    title: options.data.title,
    components: options.data.components?.map((component) => ({
      type: component.type,
      components: component.components.map((subcomponent) => {
        if (subcomponent.type === MessageComponentTypes.InputText) {
          return {
            type: subcomponent.type,
            style: subcomponent.style,
            custom_id: subcomponent.customId,
            label: subcomponent.label,
            placeholder: subcomponent.placeholder,
            min_length: subcomponent.minLength ?? subcomponent.required === false ? 0 : subcomponent.minLength,
            max_length: subcomponent.maxLength,
          };
        }

        if (subcomponent.type === MessageComponentTypes.SelectMenu) {
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
        }

        return {
          type: subcomponent.type,
          custom_id: subcomponent.customId,
          label: subcomponent.label,
          style: subcomponent.style,
          emoji: "emoji" in subcomponent && subcomponent.emoji
            ? {
              id: subcomponent.emoji.id?.toString(),
              name: subcomponent.emoji.name,
              animated: subcomponent.emoji.animated,
            }
            : undefined,
          url: "url" in subcomponent ? subcomponent.url : undefined,
          disabled: "disabled" in subcomponent ? subcomponent.disabled : undefined,
        };
      }),
    })),
    flags: options.data.flags,
    choices: options.data.choices,
  };

  // A reply has never been send
  if (bot.cache.unrepliedInteractions.delete(id)) {
    return await bot.rest.runMethod<undefined>(
      bot.rest,
      "post",
      bot.constants.endpoints.INTERACTION_ID_TOKEN(id, token),
      {
        type: options.type,
        data,
      },
    );
  }

  // If its already been executed, we need to send a followup response
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "post",
    bot.constants.endpoints.WEBHOOK(bot.applicationId, token),
    data,
  );

  return bot.transformers.message(bot, result);
}
