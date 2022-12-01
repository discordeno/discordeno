import { BotWithCache } from '../../deps.js'
import { deleteMessage } from './deleteMessage.js'
import { deleteMessages } from './deleteMessages.js'
import { getMessage } from './getMessage.js'
import { getMessages } from './getMessages.js'
import { pinMessage } from './pinMessage.js'
import { reactions } from './reactions/index.js'
import { sendMessage } from './sendMessage.js'
import { unpinMessage } from './unpinMessage.js'

export function messages (bot: BotWithCache) {
  reactions(bot)
  deleteMessage(bot)
  deleteMessages(bot)
  getMessage(bot)
  getMessages(bot)
  pinMessage(bot)
  sendMessage(bot)
  unpinMessage(bot)
}
