import { BotWithCache, ChannelTypes, PermissionStrings } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function sendMessage(bot: BotWithCache) {
  const sendMessage = bot.helpers.sendMessage;

  bot.helpers.sendMessage = async function (channelId, content) {
    const channel = bot.channels.get(bot.transformers.snowflake(channelId));
    if (
      channel &&
      [ChannelTypes.GuildCategory, ChannelTypes.GuildStageVoice, ChannelTypes.GuildForum].includes(channel.type)
    ) {
      throw new Error(`Can not send message to a channel of this type. Channel ID: ${channelId}`);
    }

    if (channel) {
      const requiredPerms: PermissionStrings[] = [];
      if (channel.guildId) requiredPerms.push("SEND_MESSAGES");
      if (content.tts) requiredPerms.push("SEND_TTS_MESSAGES");
      if (content.messageReference) requiredPerms.push("READ_MESSAGE_HISTORY");
      if (requiredPerms.length) requireBotChannelPermissions(bot, channel, requiredPerms);
    }

    return await sendMessage(channelId, content);
  };
}
