import { BotWithCache } from '../../deps.js'
import { requireBotGuildPermissions } from '../permissions.js'

export function deleteEmoji(bot: BotWithCache) {
  const deleteEmoji = bot.helpers.deleteEmoji

  bot.helpers.deleteEmoji = async function (guildId, id) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ['MANAGE_EMOJIS_AND_STICKERS'])

    return await deleteEmoji(guildId, id)
  }
}
