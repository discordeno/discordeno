import { Bot } from "../../deps.ts";
import { createGuild } from "./createGuild.ts";
import { events } from "./events/mod.ts";

export function guilds(bot: Bot) {
  events(bot);
  createGuild(bot);
}
