import type { BotWithCache } from '../../../deps.js'
import { createAutomodRule } from './createAutomodRule.js'
import { deleteAutomodRule } from './deleteAutomodRule.js'
import { editAutomodRule } from './editAutomodRule.js'
import { getAutomodRule } from './getAutomodRule.js'
import { getAutomodRules } from './getAutomodRules.js'

export function automod (bot: BotWithCache) {
  createAutomodRule(bot)
  deleteAutomodRule(bot)
  editAutomodRule(bot)
  getAutomodRule(bot)
  getAutomodRules(bot)
}
