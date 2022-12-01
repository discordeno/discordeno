import { BotWithCache } from '../../deps.js'
import { requireBotGuildPermissions } from '../permissions.js'

export function editEmoji (bot: BotWithCache) {
  const editEmoji = bot.helpers.editEmoji

  bot.helpers.editEmoji = async function (guildId, id, options) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ['MANAGE_EMOJIS_AND_STICKERS'])

    return await editEmoji(guildId, id, options)
  }
}
