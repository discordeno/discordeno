import { AllowedMentionsTypes, Bot } from '../../deps.js'
import { validateComponents } from '../components.js'

export function editWebhookMessage(bot: Bot) {
  const editWebhookMessage = bot.helpers.editWebhookMessage

  bot.helpers.editWebhookMessage = async function (webhookId, webhookToken, messageId, options) {
    if (options.content && !bot.utils.validateLength(options.content, { max: 2000 })) {
      throw Error('The content can not exceed 2000 characters.')
    }

    if ((options.embeds != null) && options.embeds.length > 10) options.embeds.splice(10)

    if (options.allowedMentions != null) {
      if (options.allowedMentions.users?.length) {
        if (options.allowedMentions.parse?.includes(AllowedMentionsTypes.UserMentions)) {
          options.allowedMentions.parse = options.allowedMentions.parse.filter((p) => p !== 'users')
        }

        if (options.allowedMentions.users.length > 100) {
          options.allowedMentions.users = options.allowedMentions.users.slice(0, 100)
        }
      }

      if (options.allowedMentions.roles?.length) {
        if (options.allowedMentions.parse?.includes(AllowedMentionsTypes.RoleMentions)) {
          options.allowedMentions.parse = options.allowedMentions.parse.filter((p) => p !== 'roles')
        }

        if (options.allowedMentions.roles.length > 100) {
          options.allowedMentions.roles = options.allowedMentions.roles.slice(0, 100)
        }
      }
    }

    if (options.components != null) validateComponents(bot, options.components)

    return await editWebhookMessage(webhookId, webhookToken, messageId, options)
  }
}
