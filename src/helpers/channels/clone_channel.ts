import type { Bot } from "../../bot.ts";
import { DiscordChannelTypes } from "../../types/channels/channel_types.ts";
import type { CreateGuildChannel } from "../../types/guilds/create_guild_channel.ts";

/** Create a copy of a channel */
export async function cloneChannel(bot: Bot, channelId: bigint, reason?: string) {
  const channelToClone = await bot.cache.channels.get(channelId);
  if (!channelToClone) throw new Error(bot.constants.Errors.CHANNEL_NOT_FOUND);

  //Check for DM channel
  if (channelToClone.type === DiscordChannelTypes.DM || channelToClone.type === DiscordChannelTypes.GroupDm) {
    throw new Error(bot.constants.Errors.CHANNEL_NOT_IN_GUILD);
  }

  const createChannelOptions: CreateGuildChannel = {
    ...channelToClone,
    name: channelToClone.name!,
    topic: channelToClone.topic || undefined,
    permissionOverwrites: channelToClone.permissionOverwrites.map((overwrite) => ({
      id: overwrite.id.toString(),
      type: overwrite.type,
      allow: bot.utils.calculatePermissions(overwrite.allow),
      deny: bot.utils.calculatePermissions(overwrite.deny),
    })),
  };

  //Create the channel (also handles permissions)
  return await bot.helpers.createChannel(bot, channelToClone.guildId!, createChannelOptions, reason);
}
