import type { Bot } from "../../bot.ts";

/** Delete messages from the channel. 2-100. Requires the MANAGE_MESSAGES permission */
export async function deleteMessages(bot: Bot, channelId: bigint, ids: bigint[], reason?: string) {
  await bot.utils.requireBotChannelPermissions(bot, channelId, ["MANAGE_MESSAGES"]);

  if (ids.length < 2) {
    throw new Error(bot.constants.Errors.DELETE_MESSAGES_MIN);
  }

  if (ids.length > 100) {
    console.warn(`This endpoint only accepts a maximum of 100 messages. Deleting the first 100 message ids provided.`);
  }

  return await bot.rest.runMethod<undefined>(bot.rest, "post", bot.constants.endpoints.CHANNEL_BULK_DELETE(channelId), {
    messages: ids.splice(0, 100),
    reason,
  });
}
