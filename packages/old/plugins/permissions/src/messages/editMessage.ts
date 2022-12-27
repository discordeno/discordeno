import { BotWithCache } from '../../deps.js'
import { requireBotChannelPermissions } from '../permissions.js'

export function editMessage (bot: BotWithCache) {
  const editMessage = bot.helpers.editMessage

  bot.helpers.editMessage = async function (channelId, messageId, content) {
    const message = bot.messages.get(messageId)
    if (message) {
      if (message.authorId !== bot.id) {
        content = { flags: content.flags }
        requireBotChannelPermissions(bot, channelId, ['MANAGE_MESSAGES'])
      }
    }

    return await editMessage(channelId, messageId, content)
  }
}
