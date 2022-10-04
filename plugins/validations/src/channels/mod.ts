import { Bot } from "../../deps.ts";
import { threads } from "./threads/mod.ts";

export function channels(bot: Bot) {
  threads(bot);
}
