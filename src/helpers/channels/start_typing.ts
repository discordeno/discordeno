import { DiscordChannelTypes } from "../../types/channels/channel_types.ts";
import type { Bot } from "../../bot.ts";

/**
 * Trigger a typing indicator for the specified channel. Generally bots should **NOT** implement this route.
 * However, if a bot is responding to a command and expects the computation to take a few seconds,
 * this endpoint may be called to let the user know that the bot is processing their message.
 */
export async function startTyping(bot: Bot, channelId: bigint) {
  const channel = await bot.cache.channels.get(channelId);
  // If the channel is cached, we can do extra checks/safety
  if (channel) {
    if (
      ![
        DiscordChannelTypes.DM,
        DiscordChannelTypes.GuildNews,
        DiscordChannelTypes.GuildText,
        DiscordChannelTypes.GuildNewsThread,
        DiscordChannelTypes.GuildPrivateThread,
        DiscordChannelTypes.GuildPublicThread,
      ].includes(channel.type)
    ) {
      throw new Error(bot.constants.Errors.CHANNEL_NOT_TEXT_BASED);
    }

    const hasSendMessagesPerm = await bot.utils.botHasChannelPermissions(bots, channelId, ["SEND_MESSAGES"]);
    if (!hasSendMessagesPerm) {
      throw new Error(bot.constants.Errors.MISSING_SEND_MESSAGES);
    }
  }

  return await bot.rest.runMethod<undefined>(bot.rest, "post", bot.constants.endpoints.CHANNEL_TYPING(channelId));
}
