import { cacheHandlers } from "../../cache.ts";
import { DiscordChannelTypes } from "../../types/channels/channel_types.ts";
import { CreateGuildChannel } from "../../types/guilds/create_guild_channel.ts";
import { Errors } from "../../types/misc/errors.ts";
import { bigintToSnowflake } from "../../util/bigint.ts";
import { calculatePermissions } from "../../util/permissions.ts";
import { createChannel } from "./create_channel.ts";

/** Create a copy of a channel */
export async function cloneChannel(channelId: bigint, reason?: string) {
  const channelToClone = await cacheHandlers.get("channels", channelId);
  //Return undefined if channel is not cached
  if (!channelToClone) throw new Error(Errors.CHANNEL_NOT_FOUND);

  //Check for DM channel
  if (
    channelToClone.type === DiscordChannelTypes.Dm ||
    channelToClone.type === DiscordChannelTypes.GroupDm
  ) {
    throw new Error(Errors.CHANNEL_NOT_IN_GUILD);
  }

  const createChannelOptions: CreateGuildChannel = {
    ...channelToClone,
    name: channelToClone.name!,
    topic: channelToClone.topic || undefined,
    parentId: channelToClone.parentId
      ? bigintToSnowflake(channelToClone.parentId)
      : undefined,
    permissionOverwrites: channelToClone.permissionOverwrites.map((
      overwrite,
    ) => ({
      id: overwrite.id.toString(),
      type: overwrite.type,
      allow: calculatePermissions(overwrite.allow.toString()),
      deny: calculatePermissions(overwrite.deny.toString()),
    })),
  };

  //Create the channel (also handles permissions)
  return createChannel(channelToClone.guildId!, createChannelOptions, reason);
}
