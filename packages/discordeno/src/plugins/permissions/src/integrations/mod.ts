import { BotWithCache } from '../../deps.js'
import { deleteIntegration } from './deleteIntegrations.js'
import { getIntegrations } from './getIntegrations.js'

export function integrations(bot: BotWithCache) {
  deleteIntegration(bot)
  getIntegrations(bot)
}
