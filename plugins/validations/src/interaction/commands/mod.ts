import { Bot } from "../../../deps.ts";
import { createGlobalApplicationCommand } from "./createGlobalApplicationCommand.ts";
import { createGuildApplicationCommand } from "./createGuildApplicationCommand.ts";

export function commands(bot: Bot) {
  createGlobalApplicationCommand(bot);
  createGuildApplicationCommand(bot);
}
