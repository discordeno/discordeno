import { Bot } from '../../../deps.js'
import { editFollowupMessage } from './editFollowupMessage.js'
import { editOriginalInteractionResponse } from './editOriginalInteractionResponse.js'
import { sendInteractionResponse } from './sendInteractionResponse.js'

export function responses (bot: Bot) {
  editFollowupMessage(bot)
  editOriginalInteractionResponse(bot)
  sendInteractionResponse(bot)
}
