import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export async function editGuildSticker(bot: BotWithCache) {
  const editGuildSticker = bot.helpers.editGuildSticker;
  bot.helpers.editGuildSticker = (guildId, stickerId, options) => {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_EMOJIS_AND_STICKERS"]);
    return editGuildSticker(guildId, stickerId, options);
  };
}
