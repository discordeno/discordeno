import { Bot } from "../../deps.ts";
import setupEventsPermChecks from "./events.ts";
import createGuild from "./createGuild.ts";

export default function setupGuildPermChecks(bot: Bot) {
  setupEventsPermChecks(bot);
  createGuild(bot);
}
