import { cacheHandlers } from "../../cache.ts";
import { createChannel } from "./create_channel.ts";
import { CreateGuildChannel } from "../../types/guilds/create_guild_channel.ts";
import { DiscordenoChannel } from "../../structures/channel.ts";

/** Create a copy of a channel */
export async function cloneChannel(channelId: string, reason?: string) {
  const channelToClone = await cacheHandlers.get(
    "channels",
    channelId
  );
  //Return undefined if channel is not cached (unsure about error handling)
  if (!channelToClone) return;

  //If "name" is null or undefined as specified by types
  channelToClone.name ??= "new-channel";

  //Merge channel data with reason for createChannel options
  const creationData = {
    reason,
    ...channelToClone,
  };
  //Create the channel (also handles permissions)
  return createChannel(
    channelToClone.guildId!,
    creationData as CreateGuildChannel
  );
}
