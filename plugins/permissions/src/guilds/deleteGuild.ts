import { BotWithCache } from "../../deps.ts";

export default function deleteGuild(bot: BotWithCache) {
  const deleteGuildOld = bot.helpers.deleteGuild;

  bot.helpers.deleteGuild = function (guildId) {
    const guild = bot.guilds.get(guildId);
    if (guild && guild.ownerId !== bot.id) {
      throw new Error("A bot can only delete a guild it owns.");
    }

    return deleteGuildOld(guildId);
  };
}
