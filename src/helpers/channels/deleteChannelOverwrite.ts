import type { Bot } from "../../bot.ts";

/** Delete the channel permission overwrites for a user or role in this channel. Requires `MANAGE_ROLES` permission. */
export async function deleteChannelOverwrite(bot: Bot, channelId: bigint, overwriteId: bigint) {
  await bot.rest.runMethod<undefined>(
    bot.rest,
    "delete",
    bot.constants.endpoints.CHANNEL_OVERWRITE(channelId, overwriteId)
  );
}
