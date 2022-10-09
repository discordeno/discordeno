import { BotWithCache, ChannelTypes, PermissionStrings } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export function connectToVoiceChannel(bot: BotWithCache) {
  const connectToVoiceChannel = bot.helpers.connectToVoiceChannel;

  bot.helpers.connectToVoiceChannel = async function (guildId, channelId, options) {
    const channel = bot.channels.get(bot.transformers.snowflake(channelId));
    if (!channel) throw new Error("CHANNEL_NOT_FOUND");

    if (
      ![ChannelTypes.GuildStageVoice, ChannelTypes.GuildVoice].includes(
        channel.type,
      )
    ) {
      throw new Error("INVALID_CHANNEL_TYPE");
    }

    const guild = channel?.guildId && bot.guilds.get(channel.guildId);
    if (!guild) throw new Error("GUILD_NOT_FOUND");

    // Permissions needed for the bot to connect
    // CONNECT is needed
    const permsNeeded: PermissionStrings[] = ["CONNECT", "VIEW_CHANNEL"];

    // Check if there is space for the bot if channel has user limit
    // Having MANAGE_CHANNELS permissions bypasses the limit
    // --> Add MANAGE_CHANNELS perm to the check if it is needed
    if (
      channel.userLimit &&
      guild.voiceStates.filter((vs) => vs.channelId === channelId).size >=
        channel.userLimit
    ) {
      permsNeeded.push("MANAGE_CHANNELS");
    }

    requireBotChannelPermissions(bot, channel, permsNeeded);

    return await connectToVoiceChannel(guildId, channelId, options);
  };
}
