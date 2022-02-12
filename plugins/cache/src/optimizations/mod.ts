import { BotWithCache } from "../addCacheCollections.ts";
import { transformUser } from "./transformers/user.ts";

export function enableOptimizedCache(bot: BotWithCache) {
    bot.transformers.user = transformUser;
}

export default enableOptimizedCache;