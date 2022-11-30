import { BotWithCache } from '../../cache/src/addCacheCollections.js'
import { BigString } from '../deps.js'

/** Fetch members for an entire guild then return the entire guilds cached members. */
export async function fetchAndRetrieveMembers(bot: BotWithCache, guildId: BigString) {
  if (!bot.enabledPlugins?.has('CACHE')) {
    throw new Error('The fetchAndRetrieveMembers function requires the CACHE plugin first.')
  }

  const guild = bot.guilds.get(bot.transformers.snowflake(guildId))
  if (guild == null) {
    throw new Error('The guild was not found in cache. Unable to fetch members for uncached guild.')
  }

  await bot.helpers.fetchMembers(guildId, { limit: 0 })
  return bot.members.filter((member) => member.guildId === guildId)
}
