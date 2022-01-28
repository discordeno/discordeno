import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function editWidget(bot: BotWithCache) {
  const editWidgetOld = bot.helpers.editWidget;

  bot.helpers.editWidget = function (guildId, enabled, channelId) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

    return editWidgetOld(guildId, enabled, channelId);
  };
}

export default function setupWidgetPermChecks(bot: BotWithCache) {
  editWidget(bot);
}
