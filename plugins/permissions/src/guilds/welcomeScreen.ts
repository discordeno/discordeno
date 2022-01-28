import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function editWelcomeScreen(bot: BotWithCache) {
  const editWelcomeScreenOld = bot.helpers.editWelcomeScreen;

  bot.helpers.editWelcomeScreen = function (guildId, options) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

    return editWelcomeScreenOld(guildId, options);
  };
}

export default function setupWelcomeScreenPermChecks(bot: BotWithCache) {
  editWelcomeScreen(bot);
}
