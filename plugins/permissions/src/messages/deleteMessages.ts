import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function deleteMessages(bot: BotWithCache) {
  const deleteMessages = bot.helpers.deleteMessages;

  bot.helpers.deleteMessages = async function (channelId, ids, reason) {
    const channel = bot.channels.get(bot.transformers.snowflake(channelId));
    if (!channel?.guildId) {
      throw new Error(
        `Bulk deleting messages is only allowed in channels which has a guild id. Channel ID: ${channelId} IDS: ${
          ids.join(" ")
        }`,
      );
    }

    requireBotChannelPermissions(bot, channel, ["MANAGE_MESSAGES"]);

    return await deleteMessages(channelId, ids, reason);
  };
}
