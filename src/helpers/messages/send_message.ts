import { cacheHandlers } from "../../cache.ts";
import { rest } from "../../rest/rest.ts";
import { structures } from "../../structures/mod.ts";
import { DiscordChannelTypes } from "../../types/channels/channel_types.ts";
import { DiscordAllowedMentionsTypes } from "../../types/messages/allowed_mentions_types.ts";
import { ButtonStyles } from "../../types/messages/components/button_styles.ts";
import { CreateMessage } from "../../types/messages/create_message.ts";
import { DiscordMessage, Message } from "../../types/messages/message.ts";
import { Errors } from "../../types/misc/errors.ts";
import { PermissionStrings } from "../../types/permissions/permission_strings.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";
import { camelKeysToSnakeCase } from "../../util/utils.ts";
import { validateLength } from "../../util/validate_length.ts";
import { isActionRow } from "../type_guards/is_action_row.ts";
import { isButton } from "../type_guards/is_button.ts";

/** Send a message to the channel. Requires SEND_MESSAGES permission. */
export async function sendMessage(
  channelId: string,
  content: string | CreateMessage,
) {
  if (typeof content === "string") content = { content };

  const channel = await cacheHandlers.get("channels", channelId);
  if (channel) {
    if (
      ![
        DiscordChannelTypes.DM,
        DiscordChannelTypes.GUILD_NEWS,
        DiscordChannelTypes.GUILD_TEXT,
      ].includes(channel.type)
    ) {
      throw new Error(Errors.CHANNEL_NOT_TEXT_BASED);
    }

    const requiredPerms: Set<PermissionStrings> = new Set([
      "SEND_MESSAGES",
      "VIEW_CHANNEL",
    ]);

    if (content.tts) requiredPerms.add("SEND_TTS_MESSAGES");
    if (content.embed) requiredPerms.add("EMBED_LINKS");
    if (
      content.messageReference?.messageId ||
      content.allowedMentions?.repliedUser
    ) {
      requiredPerms.add("READ_MESSAGE_HISTORY");
    }

    await requireBotChannelPermissions(channelId, [...requiredPerms]);
  }

  // Use ... for content length due to unicode characters and js .length handling
  if (content.content && !validateLength(content.content, { max: 2000 })) {
    throw new Error(Errors.MESSAGE_MAX_LENGTH);
  }

  if (content.allowedMentions) {
    if (content.allowedMentions.users?.length) {
      if (
        content.allowedMentions.parse?.includes(
          DiscordAllowedMentionsTypes.UserMentions,
        )
      ) {
        content.allowedMentions.parse = content.allowedMentions.parse.filter(
          (p) => p !== "users",
        );
      }

      if (content.allowedMentions.users.length > 100) {
        content.allowedMentions.users = content.allowedMentions.users.slice(
          0,
          100,
        );
      }
    }

    if (content.allowedMentions.roles?.length) {
      if (
        content.allowedMentions.parse?.includes(
          DiscordAllowedMentionsTypes.RoleMentions,
        )
      ) {
        content.allowedMentions.parse = content.allowedMentions.parse.filter(
          (p) => p !== "roles",
        );
      }

      if (content.allowedMentions.roles.length > 100) {
        content.allowedMentions.roles = content.allowedMentions.roles.slice(
          0,
          100,
        );
      }
    }
  }

  if (content.components?.length) {
    let actionRowCounter = 0;

    for (const component of content.components) {
      // 5 Link buttons can not have a custom_id
      if (isButton(component)) {
        if (
          component.type === ButtonStyles.Link &&
          component.customId
        ) {
          throw new Error(Errors.LINK_BUTTON_CANNOT_HAVE_CUSTOM_ID);
        }
        if (
          !component.customId
        ) {
          if (component.type !== ButtonStyles.Link) {
            throw new Error(Errors.BUTTON_REQUIRES_CUSTOM_ID);
          }
        }

        if (!validateLength(component.label, { max: 80 })) {
          throw new Error(Errors.COMPONENT_LABEL_TOO_BIG);
        }

        if (
          component.customId &&
          !validateLength(component.customId, { max: 100 })
        ) {
          throw new Error(Errors.COMPONENT_CUSTOM_ID_TOO_BIG);
        }
      }

      if (!isActionRow(component)) {
        continue;
      }

      actionRowCounter++;
      // Max of 5 ActionRows per message
      if (actionRowCounter > 5) throw new Error(Errors.TOO_MANY_ACTION_ROWS);

      // Max of 5 Buttons (or any component type) within an ActionRow
      if (component.components?.length > 5) {
        throw new Error(Errors.TOO_MANY_COMPONENTS);
      }
    }
  }

  if (
    content.nonce &&
    !validateLength(content.nonce.toString(), { max: 25 })
  ) {
    throw new Error(Errors.NONCE_TOO_LONG);
  }

  const result = await rest.runMethod<Message>(
    "post",
    endpoints.CHANNEL_MESSAGES(channelId),
    camelKeysToSnakeCase<DiscordMessage>({
      ...content,
      ...(content.messageReference?.messageId
        ? {
          messageReference: {
            ...content.messageReference,
            failIfNotExists: content.messageReference.failIfNotExists === true,
          },
        }
        : {}),
    }),
  );

  return structures.createDiscordenoMessage(result);
}
