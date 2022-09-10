import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function deleteMessages(bot: BotWithCache) {
  const deleteMessages = bot.helpers.deleteMessages;

  bot.helpers.deleteMessages = async function (channelId, ids, reason) {
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

      console.log(`[Permission Plugin] Skipping bulk message delete of ID ${id} because it is older than 2 weeks.`);
      return false;
    });

    if (ids.length < 2) {
      throw new Error("Bulk message delete requires at least 2 messages.");
    }

    requireBotChannelPermissions(bot, channel, ["MANAGE_MESSAGES"]);

    return await deleteMessages(channelId, ids, reason);
  };
}
