import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function deleteEmoji(bot: BotWithCache) {
  const deleteEmoji = bot.helpers.deleteEmoji;

  bot.helpers.deleteEmoji = async function (guildId, id) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ["MANAGE_EMOJIS_AND_STICKERS"]);

    return await deleteEmoji(guildId, id);
  };
}
