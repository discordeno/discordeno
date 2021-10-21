import type { Bot } from "../../bot.ts";

/** Checks whether a channel is synchronized with its parent/category channel or not. */
export async function isChannelSynced(bot: Bot, channelId: bigint) {
  const channel = await bot.cache.channels.get(channelId);
  if (!channel?.parentId) return false;

  const parentChannel = await bot.cache.channels.get(channel.parentId);
  if (!parentChannel) return false;

  return channel.permissionOverwrites?.every((overwrite) => {
    const permission = parentChannel.permissionOverwrites?.find((ow) => ow.id === overwrite.id);
    if (!permission) return false;
    return !(overwrite.allow !== permission.allow || overwrite.deny !== permission.deny);
  });
}
