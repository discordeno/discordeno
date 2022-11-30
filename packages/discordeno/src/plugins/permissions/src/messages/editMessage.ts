import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function editMessage(bot: BotWithCache) {
  const editMessage = bot.helpers.editMessage;

  bot.helpers.editMessage = function (channelId, messageId, content) {
    const message = bot.messages.get(messageId);
    if (message) {
      if (message.authorId !== bot.id) {
        content = { flags: content.flags };
        requireBotChannelPermissions(bot, channelId, ["MANAGE_MESSAGES"]);
      }
    }

    return editMessage(channelId, messageId, content);
  };
}
