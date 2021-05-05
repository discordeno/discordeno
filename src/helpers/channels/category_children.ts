import { cacheHandlers } from "../../cache.ts";

/** Gets an array of all the channels ids that are the children of this category. */
export function categoryChildren(id: bigint) {
  return cacheHandlers.filter(
    "channels",
    (channel) => channel.parentId === id,
  );
}
