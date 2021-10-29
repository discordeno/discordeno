import type { Bot } from "../../bot.ts";
import { DiscordChannelTypes } from "../../types/channels/channel_types.ts";

/** Pin a message in a channel. Requires MANAGE_MESSAGES. Max pins allowed in a channel = 50. */
export async function pin(bot: Bot, channelId: bigint, messageId: bigint) {
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
      ].includes(channel.type)
    ) {
      throw new Error(bot.constants.Errors.CHANNEL_NOT_TEXT_BASED);
    }
    
    await bot.utils.requireBotChannelPermissions(bot, channel, ["MANAGE_MESSAGES"]);
  }
  
  return await bot.rest.runMethod<undefined>(
    bot.rest,
    "put",
    bot.constants.endpoints.CHANNEL_PIN(channelId, messageId)
  );
}

// aliases
export { pin as pinMessage };
