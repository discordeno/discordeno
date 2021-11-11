import type { Bot } from "../../bot.ts";
import { DiscordenoChannel, separate } from "../../transformers/channel.ts";
import type { CreateGuildChannel } from "../../types/guilds/create_guild_channel.ts";

/** Create a copy of a channel */
export async function cloneChannel(bot: Bot, channel: DiscordenoChannel, reason?: string) {
  if (!channel.guildId) throw new Error(`Cannot clone a channel outside a guild`);

  const createChannelOptions: CreateGuildChannel = {
    type: channel.type,
    bitrate: channel.bitrate,
    userLimit: channel.userLimit,
    rateLimitPerUser: channel.rateLimitPerUser,
    position: channel.position,
    parentId: channel.parentId,
    nsfw: channel.nsfw,
    name: channel.name!,
    topic: channel.topic || undefined,
    permissionOverwrites: channel.permissionOverwrites.map((overwrite) => {
      const [type, id, allow, deny] = separate(overwrite);

      return {
        id,
        type,
        allow: bot.utils.calculatePermissions(BigInt(allow)),
        deny: bot.utils.calculatePermissions(BigInt(deny)),
      };
    }),
  };

  //Create the channel (also handles permissions)
  return await bot.helpers.createChannel(channel.guildId!, createChannelOptions, reason);
}
