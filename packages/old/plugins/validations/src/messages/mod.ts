import type { Bot } from '../../deps.js'
import { deleteMessages } from './deleteMessages.js'
import { editMessage } from './editMessage.js'
import { sendMessage } from './sendMessage.js'

export function messages (bot: Bot) {
  deleteMessages(bot)
  editMessage(bot)
  sendMessage(bot)

  // TODO: validations getMessages
  // if (options?.limit && (options.limit < 0 || options.limit > 100)) {
  //   throw new Error(rest.constants.Errors.INVALID_GET_MESSAGES_LIMIT)
  // }
}
