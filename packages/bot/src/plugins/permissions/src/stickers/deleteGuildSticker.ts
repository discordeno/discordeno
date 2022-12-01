import { BotWithCache } from '../../deps.js'
import { requireBotGuildPermissions } from '../permissions.js'

export async function deleteGuildSticker (bot: BotWithCache) {
  const deleteGuildSticker = bot.helpers.deleteGuildSticker
  bot.helpers.deleteGuildSticker = async (guildId, stickerId, reason) => {
    requireBotGuildPermissions(bot, guildId, ['MANAGE_EMOJIS_AND_STICKERS'])
    return await deleteGuildSticker(guildId, stickerId, reason)
  }
}
