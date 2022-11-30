import { BotWithCache } from '../../deps.js'
import { requireBotGuildPermissions } from '../permissions.js'

export function editWelcomeScreen(bot: BotWithCache) {
  const editWelcomeScreen = bot.helpers.editWelcomeScreen

  bot.helpers.editWelcomeScreen = async function (guildId, options) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ['MANAGE_GUILD'])

    return await editWelcomeScreen(guildId, options)
  }
}
