import { BotWithCache } from "../../deps.ts";
import { automod } from "./automod/mod.ts";
import { createGuild } from "./createGuild.ts";
import { deleteGuild } from "./deleteGuild.ts";
import { editGuild } from "./editGuild.ts";
import { editGuildMfaLevel } from "./editGuildMfaLevel.ts";
import { editWelcomeScreen } from "./editWelcomeScreen.ts";
import { events } from "./events/mod.ts";
import { getAuditLog } from "./getAuditLog.ts";
import { getBan } from "./getBan.ts";
import { getBans } from "./getBans.ts";
import { getPruneCount } from "./getPruneCount.ts";
import { getVanityUrl } from "./getVanityUrl.ts";
import { getWelcomeScreen } from "./getWelcomeScreen.ts";
import { voice } from "./voice/mod.ts";
import { widgets } from "./widgets/mod.ts";

export function guilds(bot: BotWithCache) {
  automod(bot);
  events(bot);
  voice(bot);
  widgets(bot);

  createGuild(bot);
  deleteGuild(bot);
  editGuild(bot);
  editGuildMfaLevel(bot);
  editWelcomeScreen(bot);
  getAuditLog(bot);
  getBan(bot);
  getBans(bot);
  getPruneCount(bot);
  getVanityUrl(bot);
  getWelcomeScreen(bot);
}
