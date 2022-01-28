import { BotWithCache } from "../deps.ts";
import { requireBotGuildPermissions } from "./permissions.ts";

export function createEmoji(bot: BotWithCache) {
  const createEmojiOld = bot.helpers.createEmoji;

  bot.helpers.createEmoji = function (guildId, id) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_EMOJIS"]);

    return createEmojiOld(guildId, id);
  };
}

export function deleteEmoji(bot: BotWithCache) {
  const deleteEmojiOld = bot.helpers.deleteEmoji;

  bot.helpers.deleteEmoji = function (guildId, id) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_EMOJIS"]);

    return deleteEmojiOld(guildId, id);
  };
}

export function editEmoji(bot: BotWithCache) {
  const editEmojiOld = bot.helpers.editEmoji;

  bot.helpers.editEmoji = function (guildId, id, options) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_EMOJIS"]);

    return editEmojiOld(guildId, id, options);
  };
}

export default function setupEmojiPermChecks(bot: BotWithCache) {
  createEmoji(bot);
  deleteEmoji(bot);
  editEmoji(bot)
}
