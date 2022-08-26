import type { Bot } from "../../bot.ts";

/** Delete messages from the channel. 2-100. Requires the MANAGE_MESSAGES permission */
export async function deleteMessages(bot: Bot, channelId: bigint, ids: bigint[], reason?: string): Promise<void> {
  if (ids.length < 2) {
    throw new Error(bot.constants.Errors.DELETE_MESSAGES_MIN);
  }

  if (ids.length > 100) {
    console.warn(`This endpoint only accepts a maximum of 100 messages. Using the first 100 message ids provided.`);
  }

  return void await bot.rest.runMethod(bot.rest, "POST", bot.constants.routes.CHANNEL_BULK_DELETE(channelId), {
    messages: ids.slice(0, 100).map((id) => id.toString()),
    reason,
  });
}
