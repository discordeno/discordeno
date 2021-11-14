import type { Bot } from "../../bot.ts";

/** Deletes the Stage instance. Requires the user to be a moderator of the Stage channel. */
export async function deleteStageInstance(bot: Bot, channelId: bigint) {
  return await bot.rest.runMethod<undefined>(bot.rest, "delete", bot.constants.endpoints.STAGE_INSTANCE(channelId));
}
