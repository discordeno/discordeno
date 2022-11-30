import { BotWithCache } from '../../deps.js'
import { createWebhook } from './createWebhook.js'
import { deleteWebhook } from './deleteWebhook.js'
import { editWebhook } from './editWebhook.js'

export function webhooks(bot: BotWithCache) {
  createWebhook(bot)
  deleteWebhook(bot)
  editWebhook(bot)
}
