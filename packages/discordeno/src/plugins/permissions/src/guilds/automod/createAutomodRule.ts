import { AutoModerationActionType, BotWithCache } from '../../../deps.js'
import { requireBotGuildPermissions } from '../../permissions.js'

export function createAutomodRule(bot: BotWithCache) {
  const createAutomodRule = bot.helpers.createAutomodRule

  bot.helpers.createAutomodRule = async function (guildId, options) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ['MANAGE_GUILD'])

    for (const action of options.actions) {
      // Check for maximum duration seconds
      if (action.metadata?.durationSeconds && action.metadata.durationSeconds > 2419200) {
        console.log(
          `[Warning] Automod action duration seconds is too high: ${action.metadata.durationSeconds}. Setting to Discord's allowed maximum.`
        )
        // Discords max is 4 weeks
        action.metadata.durationSeconds = 2419200
      }

      // Timeout actions require perm check
      if (action.type === AutoModerationActionType.Timeout) {
        requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ['MODERATE_MEMBERS'])
      }
    }

    return await createAutomodRule(guildId, options)
  }
}
