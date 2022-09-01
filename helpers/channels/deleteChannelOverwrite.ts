import type { Bot } from "../../bot.ts";

/** Delete the channel permission overwrites for a user or role in this channel. Requires `MANAGE_ROLES` permission. */
export async function deleteChannelOverwrite(bot: Bot, channelId: bigint, overwriteId: bigint): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.CHANNEL_OVERWRITE(channelId, overwriteId),
  );
}
