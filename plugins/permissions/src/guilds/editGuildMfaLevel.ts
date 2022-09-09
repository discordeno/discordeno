import { BotWithCache } from "../../deps.ts";

export default function editGuildMfaLevel(bot: BotWithCache) {
  const editGuildMfaLevelOld = bot.helpers.editGuildMfaLevel;

  bot.helpers.editGuildMfaLevel = async function (guildId, mfaLevel, reason) {
    const guild = bot.guilds.get(guildId);
    if (guild?.ownerId !== bot.id) throw new Error("The bot is not the owner of the guild");
    return await editGuildMfaLevelOld(guildId, mfaLevel, reason);
  };
}
