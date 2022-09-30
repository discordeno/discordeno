import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export async function deleteGuildSticker(bot: BotWithCache) {
  const deleteGuildSticker = bot.helpers.deleteGuildSticker;
  bot.helpers.deleteGuildSticker = (guildId, stickerId, reason) => {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_EMOJIS_AND_STICKERS"]);
    return deleteGuildSticker(guildId, stickerId, reason);
  };
}
