import { cacheHandlers } from "../../cache.ts";

/** Gets an array of all the channels ids that are the children of this category. */
export function categoryChildrenIDs(guildID: string, id: string) {
  return cacheHandlers.filter(
    "channels",
    (channel) => channel.parentID === id && channel.guildID === guildID,
  );
}
