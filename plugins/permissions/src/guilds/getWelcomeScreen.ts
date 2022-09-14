import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function getWelcomeScreen(bot: BotWithCache) {
  const getWelcomeScreen = bot.helpers.getWelcomeScreen;

  bot.helpers.getWelcomeScreen = async function (guildId) {
    const guild = bot.guilds.get(guildId);
    if (!guild?.welcomeScreen) requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

    return await getWelcomeScreen(guildId);
  };
}
