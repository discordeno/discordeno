import { BotWithCache } from "../../../deps.ts";
import { requireBotGuildPermissions } from "../../permissions.ts";

export function editWidgetSettings(bot: BotWithCache) {
  const editWidgetSettings = bot.helpers.editWidgetSettings;

  bot.helpers.editWidgetSettings = async function (guildId, enabled, channelId) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

    return await editWidgetSettings(guildId, enabled, channelId);
  };
}
