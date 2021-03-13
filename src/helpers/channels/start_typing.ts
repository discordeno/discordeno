import { cacheHandlers } from "../../cache.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { ChannelTypes, Errors } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { botHasChannelPermissions } from "../../util/permissions.ts";

/**
 * Trigger a typing indicator for the specified channel. Generally bots should **NOT** implement this route.
 * However, if a bot is responding to a command and expects the computation to take a few seconds,
 * this endpoint may be called to let the user know that the bot is processing their message.
 */
export async function startTyping(channelID: string) {
  const channel = await cacheHandlers.get("channels", channelID);
  // If the channel is cached, we can do extra checks/safety
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

    const hasSendMessagesPerm = await botHasChannelPermissions(
      channelID,
      ["SEND_MESSAGES"],
    );
    if (
      !hasSendMessagesPerm
    ) {
      throw new Error(Errors.MISSING_SEND_MESSAGES);
    }
  }

  const result = await RequestManager.post(endpoints.CHANNEL_TYPING(channelID));

  return result;
}
