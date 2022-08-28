import { BotWithCustomProps } from "../../bot";
import { customizeTransformers } from "./transformers/mod";

export function customizeInternals(bot: BotWithCustomProps) {
  customizeTransformers(bot);
}
