import { BotWithCache } from "../../cache/src/addCacheCollections.ts";

/** Fetch members for an entire guild then return the entire guilds cached members. */
export async function fetchAndRetrieveMembers(bot: BotWithCache, guildId: bigint) {
  if (!bot.enabledPlugins?.has("CACHE")) {
    throw new Error("The fetchAndRetrieveMembers function requires the CACHE plugin first.");
  }

  const guild = bot.guilds.get(guildId);
  if (!guild) {
    throw new Error("The guild was not found in cache. Unable to fetch members for uncached guild.");
  }

  await bot.helpers.fetchMembers(guildId, guild.shardId);
  return bot.members.filter((member) => member.guildId === guildId);
}
