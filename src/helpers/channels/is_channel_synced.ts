import { cacheHandlers } from "../../cache.ts";

/** Checks whether a channel is synchronized with its parent/category channel or not. */
export async function isChannelSynced(channelID: string) {
  const channel = await cacheHandlers.get("channels", channelID);
  if (!channel?.parentID) return false;

  const parentChannel = await cacheHandlers.get("channels", channel.parentID);
  if (!parentChannel) return false;

  return channel.permissionOverwrites?.every((overwrite) => {
    const permission = parentChannel.permissionOverwrites?.find(
      (ow) => ow.id === overwrite.id,
    );
    if (!permission) return false;
    return !(
      overwrite.allow !== permission.allow || overwrite.deny !== permission.deny
    );
  });
}
