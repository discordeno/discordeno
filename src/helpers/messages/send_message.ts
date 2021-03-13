import { cacheHandlers } from "../../cache.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { structures } from "../../structures/mod.ts";
import {
  ChannelTypes,
  Errors,
  MessageContent,
  MessageCreateOptions,
  Permission,
} from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";

/** Send a message to the channel. Requires SEND_MESSAGES permission. */
export async function sendMessage(
  channelID: string,
  content: string | MessageContent,
) {
  if (typeof content === "string") content = { content };

  const channel = await cacheHandlers.get("channels", channelID);
  if (channel) {
    if (
      ![
        ChannelTypes.DM,
        ChannelTypes.GUILD_NEWS,
        ChannelTypes.GUILD_TEXT,
      ].includes(channel.type)
    ) {
      throw new Error(Errors.CHANNEL_NOT_TEXT_BASED);
    }

    const requiredPerms: Set<Permission> = new Set([
      "SEND_MESSAGES",
      "VIEW_CHANNEL",
    ]);

    if (content.tts) requiredPerms.add("SEND_TTS_MESSAGES");
    if (content.embed) requiredPerms.add("EMBED_LINKS");
    if (content.replyMessageID || content.mentions?.repliedUser) {
      requiredPerms.add("READ_MESSAGE_HISTORY");
    }

    await requireBotChannelPermissions(channelID, [...requiredPerms]);
  }

  // Use ... for content length due to unicode characters and js .length handling
  if (content.content && [...content.content].length > 2000) {
    throw new Error(Errors.MESSAGE_MAX_LENGTH);
  }

  if (content.mentions) {
    if (content.mentions.users?.length) {
      if (content.mentions.parse?.includes("users")) {
        content.mentions.parse = content.mentions.parse.filter(
          (p) => p !== "users",
        );
      }

      if (content.mentions.users.length > 100) {
        content.mentions.users = content.mentions.users.slice(0, 100);
      }
    }

    if (content.mentions.roles?.length) {
      if (content.mentions.parse?.includes("roles")) {
        content.mentions.parse = content.mentions.parse.filter(
          (p) => p !== "roles",
        );
      }

      if (content.mentions.roles.length > 100) {
        content.mentions.roles = content.mentions.roles.slice(0, 100);
      }
    }
  }

  const result = (await RequestManager.post(
    endpoints.CHANNEL_MESSAGES(channelID),
    {
      ...content,
      allowed_mentions: content.mentions
        ? {
          ...content.mentions,
          replied_user: content.mentions.repliedUser,
        }
        : undefined,
      ...(content.replyMessageID
        ? {
          message_reference: {
            message_id: content.replyMessageID,
            fail_if_not_exists: content.failReplyIfNotExists === true,
          },
        }
        : {}),
    },
  )) as MessageCreateOptions;

  return structures.createMessageStruct(result);
}
