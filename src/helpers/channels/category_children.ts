import { Bot } from "../../bot.ts";

/** Gets an array of all the channels ids that are the children of this category.
 * ⚠️ This does not work for custom cache users!
 */
export function categoryChildren(bot: Bot, parentChannelId: bigint) {
  // TODO: Cache Filter ?
  return bot.cache.channels.filter((channel) => channel.parentId === parentChannelId);
}
