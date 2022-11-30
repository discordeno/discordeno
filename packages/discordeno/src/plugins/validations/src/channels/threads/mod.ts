import { Bot } from '../../../deps.js'
import { addThreadMember } from './addThreadMember.js'
import { getThreadMembers } from './getThreadMember.js'
import { removeThreadMember } from './removeThreadMember.js'

export function threads(bot: Bot) {
  addThreadMember(bot)
  getThreadMembers(bot)
  removeThreadMember(bot)
}
