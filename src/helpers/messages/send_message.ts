import { cacheHandlers } from "../../cache.ts";
import { rest } from "../../rest/rest.ts";
import { structures } from "../../structures/mod.ts";
import { DiscordChannelTypes } from "../../types/channels/channel_types.ts";
import { PermissionStrings } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";

/** Send a message to the channel. Requires SEND_MESSAGES permission. */
export async function sendMessage(
  channelId: string,
  content: string | MessageContent,
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
    if (content.replyMessageId || content.mentions?.repliedUser) {
      requiredPerms.add("READ_MESSAGE_HISTORY");
    }

    await requireBotChannelPermissions(channelId, [...requiredPerms]);
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

  const result =
    (await rest.runMethod("post", endpoints.CHANNEL_MESSAGES(channelId), {
      ...content,
      allowed_mentions: content.mentions
        ? {
          ...content.mentions,
          replied_user: content.mentions.repliedUser,
        }
        : undefined,
      ...(content.replyMessageId
        ? {
          message_reference: {
            message_id: content.replyMessageId,
            fail_if_not_exists: content.failReplyIfNotExists === true,
          },
        }
        : {}),
    })) as MessageCreateOptions;

  return structures.createMessageStruct(result);
}
