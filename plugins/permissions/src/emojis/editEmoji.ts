import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function editEmoji(bot: BotWithCache) {
  const editEmoji = bot.helpers.editEmoji;

  bot.helpers.editEmoji = async function (guildId, id, options) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ["MANAGE_EMOJIS_AND_STICKERS"]);

    return await editEmoji(guildId, id, options);
  };
}
