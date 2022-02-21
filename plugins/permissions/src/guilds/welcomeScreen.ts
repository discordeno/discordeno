import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function getWelcomeScreen(bot: BotWithCache) {
  const getWelcomeScreenOld = bot.helpers.getWelcomeScreen;

  bot.helpers.getWelcomeScreen = async function (guildId) {
    const guild = bot.guilds.get(guildId);
    if (!guild?.welcomeScreen) {
      requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);
    }

    return await getWelcomeScreenOld(guildId);
  };
}

export function editWelcomeScreen(bot: BotWithCache) {
  const editWelcomeScreenOld = bot.helpers.editWelcomeScreen;

  bot.helpers.editWelcomeScreen = async function (guildId, options) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

    return await editWelcomeScreenOld(guildId, options);
  };
}

export default function setupWelcomeScreenPermChecks(bot: BotWithCache) {
  getWelcomeScreen(bot);
  editWelcomeScreen(bot);
}
