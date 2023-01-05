import type { BotWithCache } from '../../../deps.js'
import { editWidgetSettings } from './editWidgetSettings.js'

export function widgets (bot: BotWithCache) {
  editWidgetSettings(bot)
}
