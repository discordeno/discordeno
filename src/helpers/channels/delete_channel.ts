import type { Bot } from "../../bot.ts";

/** Delete a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
export async function deleteChannel(bot: Bot, channelId: bigint, reason?: string) {
  const channel = await cacheHandlers.get("channels", channelId);

  if (channel?.guildId) {
    const guild = await cacheHandlers.get("guilds", channel.guildId);
    if (!guild) throw new Error(bot.constants.Errors.GUILD_NOT_FOUND);

    if (guild.rulesChannelId === channelId) {
      throw new Error(bot.constants.Errors.RULES_CHANNEL_CANNOT_BE_DELETED);
    }

    if (guild.publicUpdatesChannelId === channelId) {
      throw new Error(bot.constants.Errors.UPDATES_CHANNEL_CANNOT_BE_DELETED);
    }

    await bot.utils.requireBotGuildPermissions(bot, guild, ["MANAGE_CHANNELS"]);
  }

  return await bot.rest.runMethod<undefined>(bot.rest, "delete", bot.constants.endpoints.CHANNEL_BASE(channelId), {
    reason,
  });
}
