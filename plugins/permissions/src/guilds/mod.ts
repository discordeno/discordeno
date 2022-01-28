import { BotWithCache } from "../../deps.ts";
import setupEventsPermChecks from "./events.ts";
import setupWelcomeScreenPermChecks from "./welcomeScreen.ts";
import setupWidgetPermChecks from "./widget.ts";
import createGuild from "./createGuild.ts";
import deleteGuild from "./deleteGuild.ts";
import editGuild from "./editGuild.ts";
import getAuditLogs from "./getAuditLogs.ts";
import getBan from "./getBan.ts";
import getBans from "./getBans.ts";
import getPruneCount from "./getPruneCount.ts";
import getVanityUrl from "./getVanityUrl.ts";

export default function setupGuildPermChecks(bot: BotWithCache) {
  setupEventsPermChecks(bot);
  createGuild(bot);
  deleteGuild(bot);
  editGuild(bot);
  setupWelcomeScreenPermChecks(bot);
  setupWidgetPermChecks(bot);
  getAuditLogs(bot);
  getBan(bot);
  getBans(bot);
  getPruneCount(bot);
  getVanityUrl(bot);
}
