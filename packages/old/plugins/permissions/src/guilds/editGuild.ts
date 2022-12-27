import { BotWithCache, GuildFeatures } from '../../deps.js'
import { requireBotGuildPermissions } from '../permissions.js'

export function editGuild (bot: BotWithCache) {
  const editGuild = bot.helpers.editGuild

  bot.helpers.editGuild = async function (guildId, options, shardId) {
    if (options.features?.includes(GuildFeatures.Community)) {
      requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ['ADMINISTRATOR'])
    } else requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ['MANAGE_GUILD'])

    return await editGuild(guildId, options, shardId)
  }
}
