import { BotWithCache } from '../../../deps.js'
import { createStageInstance } from './createStageInstance.js'
import { deleteStageInstance } from './deleteStageInstances.js'
import { editStageInstance } from './editStageInstance.js'

export function stages (bot: BotWithCache) {
  createStageInstance(bot)
  deleteStageInstance(bot)
  editStageInstance(bot)
}
