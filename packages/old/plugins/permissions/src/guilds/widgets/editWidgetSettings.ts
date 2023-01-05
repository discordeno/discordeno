import type { BotWithCache } from '../../../deps.js'
import { requireBotGuildPermissions } from '../../permissions.js'

export function editWidgetSettings (bot: BotWithCache) {
  const editWidgetSettings = bot.helpers.editWidgetSettings

  bot.helpers.editWidgetSettings = async function (guildId, enabled, channelId) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ['MANAGE_GUILD'])

    return await editWidgetSettings(guildId, enabled, channelId)
  }
}
