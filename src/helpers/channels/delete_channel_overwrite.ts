import type { Bot } from "../../bot.ts";

/** Delete the channel permission overwrites for a user or role in this channel. Requires `MANAGE_ROLES` permission. */
export async function deleteChannelOverwrite(
  bot: Bot,
  guildId: bigint,
  channelId: bigint,
  overwriteId: bigint
): Promise<undefined> {
  await bot.utils.requireBotGuildPermissions(bot, guildId, ["MANAGE_ROLES"]);

  return await bot.rest.runMethod<undefined>(
    bot.rest,
    "delete",
    bot.constants.endpoints.CHANNEL_OVERWRITE(channelId, overwriteId)
  );
}
