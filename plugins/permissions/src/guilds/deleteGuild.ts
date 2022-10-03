import { BotWithCache } from "../../deps.ts";

export function deleteGuild(bot: BotWithCache) {
  const deleteGuild = bot.helpers.deleteGuild;

  bot.helpers.deleteGuild = async function (guildId) {
    const guild = bot.guilds.get(bot.transformers.snowflake(guildId));
    if (guild && guild.ownerId !== bot.id) throw new Error("A bot can only delete a guild it owns.");

    return await deleteGuild(guildId);
  };
}
