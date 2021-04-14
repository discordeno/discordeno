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
  if (!channelToClone) throw new Error(Errors.CHANNEL_NOT_FOUND);

  //If "name" is undefined as specified by types
  channelToClone.name ??= "new-channel";

  //Create the channel (also handles permissions)
  return createChannel(
    channelToClone.guildId!,
    channelToClone,
    reason,
  );
}
