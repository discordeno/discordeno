import { cacheHandlers } from "../../cache.ts";

/** Gets an array of all the channels ids that are the children of this category. */
export function categoryChildrenIds(guildId: string, id: string) {
  return cacheHandlers.filter(
    "channels",
    (channel) => channel.parentId === id && channel.guildId === guildId,
  );
}
