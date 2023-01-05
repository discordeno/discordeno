import type { BotWithCache } from '../../deps.js'
import { requireBotGuildPermissions } from '../permissions.js'

export async function editGuildSticker (bot: BotWithCache) {
  const editGuildSticker = bot.helpers.editGuildSticker
  bot.helpers.editGuildSticker = async (guildId, stickerId, options) => {
    requireBotGuildPermissions(bot, guildId, ['MANAGE_EMOJIS_AND_STICKERS'])
    return await editGuildSticker(guildId, stickerId, options)
  }
}
