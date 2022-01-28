import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export default function editGuild(bot: BotWithCache) {
  const editGuildOld = bot.helpers.editGuild;

  bot.helpers.editGuild = function (guildId, options, shardId) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"])

    return editGuildOld(guildId, options, shardId);
  };
}
