import type { BotWithCache } from '../../../deps.js'
import { addThreadMember } from './addThreadMember.js'
import { getPrivateArchivedThreads } from './getPrivateArchivedThreads.js'
import { getPrivateJoinedArchivedThreads } from './getPrivateJoinedArchivedThreads.js'
import { getPublicArchivedThreads } from './getPublicArchivedThreads.js'
import { joinThread } from './joinThread.js'
import { leaveThread } from './leaveThread.js'
import { removeThreadMember } from './removeThreadMember.js'

export function threads (bot: BotWithCache) {
  addThreadMember(bot)
  getPublicArchivedThreads(bot)
  getPrivateArchivedThreads(bot)
  getPrivateJoinedArchivedThreads(bot)
  joinThread(bot)
  leaveThread(bot)
  removeThreadMember(bot)
}
