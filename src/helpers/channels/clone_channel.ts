import { cacheHandlers } from "../../cache.ts";
import { DiscordChannelTypes } from "../../types/channels/channel_types.ts";
import { CreateGuildChannel } from "../../types/guilds/create_guild_channel.ts";
import { Errors } from "../../types/misc/errors.ts";
import { calculatePermissions } from "../../util/permissions.ts";
import { createChannel } from "./create_channel.ts";

/** Create a copy of a channel */
export async function cloneChannel(channelId: string, reason?: string) {
  const channelToClone = await cacheHandlers.get("channels", channelId);
  //Return undefined if channel is not cached
  if (!channelToClone) throw new Error(Errors.CHANNEL_NOT_FOUND);

  //Check for DM channel
  if (
    channelToClone.type === DiscordChannelTypes.DM ||
    channelToClone.type === DiscordChannelTypes.GROUP_DM
  ) {
    throw new Error(Errors.CHANNEL_NOT_IN_GUILD);
  }

  const createChannelOptions: CreateGuildChannel = {
    ...channelToClone,
    name: channelToClone.name!,
    topic: channelToClone.topic || undefined,
    parentId: channelToClone.parentId || undefined,
    permissionOverwrites: channelToClone.permissionOverwrites.map((
      overwrite,
    ) => ({
      id: overwrite.id,
      type: overwrite.type,
      allow: calculatePermissions(BigInt(overwrite.allow)),
      deny: calculatePermissions(BigInt(overwrite.deny)),
    })),
  };

  //Create the channel (also handles permissions)
  return createChannel(channelToClone.guildId!, createChannelOptions, reason);
}
