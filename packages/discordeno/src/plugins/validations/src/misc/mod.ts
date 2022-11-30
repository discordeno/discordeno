import { Bot } from '../../deps.js'
import { editBotProfile } from './editBotProfile.js'

export function misc (bot: Bot) {
  editBotProfile(bot)
}
