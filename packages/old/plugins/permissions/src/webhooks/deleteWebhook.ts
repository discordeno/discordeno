import type { BotWithCache } from '../../deps.js'
import { requireBotChannelPermissions } from '../permissions.js'

export function deleteWebhook (bot: BotWithCache) {
  const deleteWebhook = bot.helpers.deleteWebhook

  bot.helpers.deleteWebhook = async function (channelId, options) {
    requireBotChannelPermissions(bot, bot.transformers.snowflake(channelId), ['MANAGE_WEBHOOKS', 'VIEW_CHANNEL'])

    return await deleteWebhook(channelId, options)
  }
}
