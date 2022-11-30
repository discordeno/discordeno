import { Bot } from '../../deps.js'
import { editMember } from './editMember.js'

export function members(bot: Bot) {
  editMember(bot)
}
