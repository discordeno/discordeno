import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function createEmoji(bot: BotWithCache) {
  const createEmoji = bot.helpers.createEmoji;

  bot.helpers.createEmoji = async function (guildId, id) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ["MANAGE_EMOJIS_AND_STICKERS"]);

    return await createEmoji(guildId, id);
  };
}
