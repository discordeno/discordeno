import { BotWithCache, GuildFeatures } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export default function editGuild(bot: BotWithCache) {
  const editGuildOld = bot.helpers.editGuild;

  bot.helpers.editGuild = async function (guildId, options, shardId) {
    if (options.features?.includes(GuildFeatures.Community)) {
      requireBotGuildPermissions(bot, guildId, ["ADMINISTRATOR"]);
    } else {
      requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);
    }

    return await editGuildOld(guildId, options, shardId);
  };
}
