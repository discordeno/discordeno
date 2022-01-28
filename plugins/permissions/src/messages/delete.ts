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

    // 2 WEEKS
    const oldestAllowed = Date.now() - 1209600000;

    ids = ids.filter((id) => {
      const createdAt = Number(id / 4194304n + 1420070400000n);
      // IF MESSAGE IS OLDER THAN 2 WEEKS
      if (createdAt > oldestAllowed) return true;

      console.log(
        `[Permission Plugin] Skipping bulk message delete of ID ${id} because it is older than 2 weeks.`,
      );
      return false;
    });

    if (ids.length < 2) {
      throw new Error("Bulk message delete requires at least 2 messages.");
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
