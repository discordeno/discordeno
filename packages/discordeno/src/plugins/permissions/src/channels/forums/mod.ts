import { BotWithCache } from '../../../deps.js'
import { createForumThread } from './createForumThread.js'

export function forums(bot: BotWithCache) {
  createForumThread(bot)
}
