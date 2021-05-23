import { cacheHandlers } from "../../cache.ts";

/** Gets all the channels ids that are the children of this category. */
export async function categoryChildren(id: bigint) {
  return await cacheHandlers.filter("channels", (channel) => channel.parentId === id);
}
