import { BotWithCache } from '../../deps.js'
import { requireBotGuildPermissions } from '../permissions.js'

export function createEmoji (bot: BotWithCache) {
  const createEmoji = bot.helpers.createEmoji

  bot.helpers.createEmoji = async function (guildId, id) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ['MANAGE_EMOJIS_AND_STICKERS'])

    return await createEmoji(guildId, id)
  }
}
