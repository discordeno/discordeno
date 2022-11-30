import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export async function createGuildSticker(bot: BotWithCache) {
  const createGuildSticker = bot.helpers.createGuildSticker;
  bot.helpers.createGuildSticker = (guildId, options) => {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_EMOJIS_AND_STICKERS"]);
    return createGuildSticker(guildId, options);
  };
}
