import { BotWithCache } from '../../deps.js'
import { banMember } from './banMember.js'
import { editBotMember } from './editBotMember.js'
import { editMember } from './editMember.js'
import { kickMember } from './kickMember.js'
import { pruneMembers } from './pruneMembers.js'
import { unbanMember } from './unbanMember.js'

export function members(bot: BotWithCache) {
  banMember(bot)
  editBotMember(bot)
  editMember(bot)
  kickMember(bot)
  pruneMembers(bot)
  unbanMember(bot)
}
