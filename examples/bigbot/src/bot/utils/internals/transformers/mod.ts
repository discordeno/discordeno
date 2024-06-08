import type { BotWithCustomProps } from '../../../bot.js'
// SETUP-DD-TEMP: Enable this comment if you want to enable this customizer.
// import { customizeGuildTransformer } from "./guild.js";
import { customizeInteractionTransformer } from './interaction.js'

export function customizeTransformers(bot: BotWithCustomProps): void {
  customizeInteractionTransformer(bot)
  // SETUP-DD-TEMP: Enable this comment if you want to enable this customizer.
  // customizeGuildTransformer(bot);
}
