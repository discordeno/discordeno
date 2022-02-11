import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function deleteMessage(bot: BotWithCache) {
  const deleteMessageOld = bot.helpers.deleteMessage;

  bot.helpers.deleteMessage = function (
    channelId,
    messageId,
    reason,
    milliseconds,
  ) {
    const message = bot.messages.get(messageId);
    // DELETING SELF MESSAGES IS ALWAYS ALLOWED
    if (message?.authorId === bot.id) {
      return deleteMessageOld(channelId, messageId, reason, milliseconds);
    }

    const channel = bot.channels.get(channelId);
    if (channel?.guildId) {
      requireBotChannelPermissions(bot, channel, [
        "MANAGE_MESSAGES",
      ]);
    } else {
      throw new Error(
        `You can only delete messages in a channel which has a guild id. Channel ID: ${channelId} Message Id: ${messageId}`,
      );
    }

    return deleteMessageOld(channelId, messageId, reason, milliseconds);
  };
}

export function deleteMessages(bot: BotWithCache) {
  const deleteMessagesOld = bot.helpers.deleteMessages;

  bot.helpers.deleteMessages = function (
    channelId,
    ids,
    reason,
  ) {
    const channel = bot.channels.get(channelId);
    if (!channel?.guildId) {
      throw new Error(
        `Bulk deleting messages is only allowed in channels which has a guild id. Channel ID: ${channelId} IDS: ${
          ids.join(" ")
        }`,
      );
    }

    requireBotChannelPermissions(bot, channel, [
      "MANAGE_MESSAGES",
    ]);

    return deleteMessagesOld(channelId, ids, reason);
  };
}

export default function setupDeleteMessagePermChecks(bot: BotWithCache) {
  deleteMessage(bot);
  deleteMessages(bot);
}
