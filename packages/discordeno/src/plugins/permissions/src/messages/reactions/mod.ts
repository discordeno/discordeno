import { BotWithCache } from '../../../deps.js'
import { addReaction } from './addReaction.js'
import { addReactions } from './addReactions.js'
import { deleteReactionsAll } from './deleteReactionsAll.js'
import { deleteReactionsEmoji } from './deleteReactionsEmoji.js'
import { deleteUserReaction } from './deleteUserReaction.ts.js'

export function reactions (bot: BotWithCache) {
  addReaction(bot)
  addReactions(bot)
  deleteReactionsAll(bot)
  deleteReactionsEmoji(bot)
  deleteUserReaction(bot)
}
