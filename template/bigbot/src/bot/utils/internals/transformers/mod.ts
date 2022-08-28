import { BotWithCustomProps } from "../../../bot";
// SETUP-DD-TEMP: Enable this comment if you want to enable this customizer.
// import { customizeGuildTransformer } from "./guild";
import { customizeInteractionTransformer } from "./interaction";

export function customizeTransformers(bot: BotWithCustomProps) {
  customizeInteractionTransformer(bot);
  // SETUP-DD-TEMP: Enable this comment if you want to enable this customizer.
  // customizeGuildTransformer(bot);
}
