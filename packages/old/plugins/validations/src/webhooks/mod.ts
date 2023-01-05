import type { Bot } from '../../deps.js'
import { createWebhook } from './createWebhook.js'
import { editWebhook } from './editWebhook.js'
import { editWebhookMessage } from './editWebhookMessage.js'
import { sendWebhookMessage } from './sendWebhookMessage.js'

export function webhooks (bot: Bot) {
  createWebhook(bot)
  editWebhookMessage(bot)
  editWebhook(bot)
  sendWebhookMessage(bot)
}
