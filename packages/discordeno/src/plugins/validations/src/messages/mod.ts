import { Bot } from '../../deps.js'
import { deleteMessages } from './deleteMessages.js'
import { editMessage } from './editMessage.js'
import { sendMessage } from './sendMessage.js'

export function messages (bot: Bot) {
  deleteMessages(bot)
  editMessage(bot)
  sendMessage(bot)
}
