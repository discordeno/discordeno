import type { BotWithCustomProps } from '../../bot.js'
import { customizeTransformers } from './transformers/mod.js'

export function customizeInternals(bot: BotWithCustomProps): void {
  customizeTransformers(bot)
}
