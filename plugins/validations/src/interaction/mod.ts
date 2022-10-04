import { Bot } from "../../deps.ts";
import { commands } from "./commands/mod.ts";
import { responses } from "./responses/mod.ts";

export function interactions(bot: Bot) {
  commands(bot);
  responses(bot);
}
