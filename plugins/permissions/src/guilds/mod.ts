import { BotWithCache } from "../../deps.ts";
import createGuild from "./createGuild.ts";
import deleteGuild from "./deleteGuild.ts";
import editGuild from "./editGuild.ts";
import editWidgetSettings from "./editWidgetSettings.ts";
import setupEventsPermChecks from "./events.ts";
import getAuditLog from "./getAuditLog.ts";
import getBan from "./getBan.ts";
import getBans from "./getBans.ts";
import getPruneCount from "./getPruneCount.ts";
import getVanityUrl from "./getVanityUrl.ts";
import setupWelcomeScreenPermChecks from "./welcomeScreen.ts";

export default function setupGuildPermChecks(bot: BotWithCache) {
  createGuild(bot);
  deleteGuild(bot);
  editGuild(bot);
  editWidgetSettings(bot);
  setupEventsPermChecks(bot);
  getAuditLog(bot);
  getBan(bot);
  getBans(bot);
  getPruneCount(bot);
  getVanityUrl(bot);
  setupWelcomeScreenPermChecks(bot);
}
