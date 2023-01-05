import type { BotWithCache } from '../../deps.js'
import { requireBotGuildPermissions } from '../permissions.js'

export async function createGuildSticker (bot: BotWithCache) {
  const createGuildSticker = bot.helpers.createGuildSticker
  bot.helpers.createGuildSticker = async (guildId, options) => {
    requireBotGuildPermissions(bot, guildId, ['MANAGE_EMOJIS_AND_STICKERS'])
    return await createGuildSticker(guildId, options)
  }
}
