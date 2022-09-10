import { BotWithCache } from "../../../deps.ts";
import { createGlobalApplicationCommand } from "./createGlobalApplicationCommand.ts";
import { createGuildApplicationCommand } from "./createGuildApplicationCommand.ts";

export function commands(bot: BotWithCache) {
  createGlobalApplicationCommand(bot);
  createGuildApplicationCommand(bot);
}
