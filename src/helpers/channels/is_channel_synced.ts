import type { Bot } from "../../bot.ts";
import { separate } from "../../transformers/channel.ts";

/** Checks whether a channel is synchronized with its parent/category channel or not. */
export async function isChannelSynced(bot: Bot, channelId: bigint) {
  const channel = await bot.cache.channels.get(channelId);
  if (!channel?.parentId) return false;

  const parentChannel = await bot.cache.channels.get(channel.parentId);
  if (!parentChannel) return false;

  return channel.permissionOverwrites?.every((overwrite) => {
    const [type, id, allow, deny] = separate(overwrite);

    const permission = parentChannel.permissionOverwrites?.find((ow) => {
      const [_, owID] = separate(ow);
      return owID === id;
    });

    if (!permission) return false;
    const [parentType, parentId, parentAllow, parentDeny] = separate(permission);
    return !(allow !== parentAllow || deny !== parentDeny);
  });
}
