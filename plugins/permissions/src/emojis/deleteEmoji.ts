import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function deleteEmoji(bot: BotWithCache) {
  const deleteEmoji = bot.helpers.deleteEmoji;

  bot.helpers.deleteEmoji = async function (guildId, id) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_EMOJIS"]);

    return await deleteEmoji(guildId, id);
  };
}
