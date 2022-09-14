import { BotWithCache } from "../../../deps.ts";
import { editWidgetSettings } from "./editWidgetSettings.ts";

export function widgets(bot: BotWithCache) {
  editWidgetSettings(bot);
}
