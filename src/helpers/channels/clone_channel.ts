import { cacheHandlers } from "../../cache.ts";
import { createChannel } from "./create_channel.ts";
import { Errors } from "../../types/misc/errors.ts";
import { DiscordChannelTypes } from "../../types/channels/channel_types.ts";
import { calculatePermissions } from "../../util/permissions.ts";
import { Overwrite } from "../../types/channels/overwrite.ts";

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

  //Convert channel permission
  const newOverwrites: Overwrite[] = [];

  channelToClone.permissionOverwrites.forEach((overwrite) => {
    newOverwrites.push({
      id: overwrite.id,
      type: overwrite.type,
      allow: calculatePermissions(BigInt(overwrite.allow)),
      deny: calculatePermissions(BigInt(overwrite.deny)),
    });
  });

  channelToClone.permissionOverwrites = newOverwrites;

  //Create the channel (also handles permissions)
  return createChannel(channelToClone.guildId!, channelToClone, reason);
}
