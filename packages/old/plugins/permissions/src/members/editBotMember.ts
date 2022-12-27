import { BotWithCache } from '../../deps.js'
import { requireBotGuildPermissions } from '../permissions.js'

export function editBotMember (bot: BotWithCache) {
  const editBotMember = bot.helpers.editBotMember

  bot.helpers.editBotMember = async function (guildId, options) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ['CHANGE_NICKNAME'])

    return await editBotMember(guildId, options)
  }
}
