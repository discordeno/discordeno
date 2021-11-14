import type { DiscordenoEditWebhookMessage } from "../../../types/discordeno/edit_webhook_message.ts";
import type { Bot } from "../../../bot.ts";
import { DiscordAllowedMentionsTypes } from "../../../types/messages/allowed_mentions_types.ts";
import { DiscordMessageComponentTypes } from "../../../types/messages/components/message_component_types.ts";

/** To edit your response to a slash command. If a messageId is not provided it will default to editing the original response. */
export async function editSlashResponse(bot: Bot, token: string, options: DiscordenoEditWebhookMessage) {
  if (options.content && options.content.length > 2000) {
    throw Error(bot.constants.Errors.MESSAGE_MAX_LENGTH);
  }

  if (options.components?.length) {
    bot.utils.validateComponents(bot, options.components);
  }

  if (options.embeds && options.embeds.length > 10) {
    options.embeds.splice(10);
  }

  if (options.allowedMentions) {
    if (options.allowedMentions.users?.length) {
      if (options.allowedMentions.parse?.includes(DiscordAllowedMentionsTypes.UserMentions)) {
        options.allowedMentions.parse = options.allowedMentions.parse.filter((p) => p !== "users");
      }

      if (options.allowedMentions.users.length > 100) {
        options.allowedMentions.users = options.allowedMentions.users.slice(0, 100);
      }
    }

    if (options.allowedMentions.roles?.length) {
      if (options.allowedMentions.parse?.includes(DiscordAllowedMentionsTypes.RoleMentions)) {
        options.allowedMentions.parse = options.allowedMentions.parse.filter((p) => p !== "roles");
      }

      if (options.allowedMentions.roles.length > 100) {
        options.allowedMentions.roles = options.allowedMentions.roles.slice(0, 100);
      }
    }
  }

  const result = await bot.rest.runMethod(
    bot.rest,
    "patch",
    options.messageId
      ? bot.constants.endpoints.WEBHOOK_MESSAGE(bot.applicationId, token, options.messageId)
      : bot.constants.endpoints.INTERACTION_ORIGINAL_ID_TOKEN(bot.applicationId, token),
    {
      content: options.content,
      embeds: options.embeds,
      file: options.file,
      allowed_mentions: options.allowedMentions
        ? {
            parse: options.allowedMentions.parse,
            roles: options.allowedMentions.roles,
            users: options.allowedMentions.users,
            replied_user: options.allowedMentions.repliedUser,
          }
        : undefined,
      attachments: options.attachments,
      components: options.components?.map((component) => ({
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
      message_id: options.messageId,
    }
  );

  // If the original message was edited, this will not return a message
  if (!options.messageId) return result as undefined;

  return bot.transformers.message(bot, result);
}
