import { BotWithCache } from "../../deps.ts";
import { commands } from "./commands/mod.ts";
import { responses } from "./responses/mod.ts";

export function interactions(bot: BotWithCache) {
  commands(bot);
  responses(bot);
}
