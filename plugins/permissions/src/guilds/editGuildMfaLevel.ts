import { BotWithCache } from "../../deps.ts";

export function editGuildMfaLevel(bot: BotWithCache) {
  const editGuildMfaLevel = bot.helpers.editGuildMfaLevel;

  bot.helpers.editGuildMfaLevel = async function (guildId, mfaLevel, reason) {
    const guild = bot.guilds.get(bot.transformers.snowflake(guildId));
    if (guild?.ownerId !== bot.id) throw new Error("The bot is not the owner of the guild");
    return await editGuildMfaLevel(guildId, mfaLevel, reason);
  };
}
