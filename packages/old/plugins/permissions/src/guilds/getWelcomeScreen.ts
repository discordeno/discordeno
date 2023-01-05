import type { BotWithCache } from '../../deps.js'
import { requireBotGuildPermissions } from '../permissions.js'

export function getWelcomeScreen (bot: BotWithCache) {
  const getWelcomeScreen = bot.helpers.getWelcomeScreen

  bot.helpers.getWelcomeScreen = async function (guildId) {
    const guild = bot.guilds.get(bot.transformers.snowflake(guildId))
    if ((guild?.welcomeScreen) == null) requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ['MANAGE_GUILD'])

    return await getWelcomeScreen(guildId)
  }
}
