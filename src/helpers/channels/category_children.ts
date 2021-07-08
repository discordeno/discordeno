import { cache } from "../../cache.ts";

/** Gets an array of all the channels ids that are the children of this category.
 * ⚠️ This does not work for custom cache users!
 */
export function categoryChildren(parentChannelId: bigint) {
  return cache.channels.filter((channel) => channel.parentId === parentChannelId);
}
