import { Bot } from "../../bot.ts";

/** Gets an array of all the channels ids that are the children of this category.
 * ⚠️ This does not work for custom cache users!
 */
export async function categoryChildren(bot: Bot, parentChannelId: bigint) {
  return await bot.cache.execute("FILTER_CATEGORY_CHILDREN_CHANNELS", { parentChannelId });
}
