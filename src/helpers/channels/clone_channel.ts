import { cacheHandlers } from "../../cache.ts";
import { createChannel } from "./create_channel.ts";
import { Errors } from "../../types/misc/errors.ts";
import { DiscordChannelTypes } from "../../types/channels/channel_types.ts";

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

  //Create the channel (also handles permissions)
  return createChannel(channelToClone.guildId!, channelToClone, reason);
}
