import type { Bot } from "../../../bot.ts";

/** Deletes the Stage instance. Requires the user to be a moderator of the Stage channel. */
export async function deleteStageInstance(bot: Bot, channelId: bigint): Promise<void> {
  return await bot.rest.runMethod<void>(bot.rest, "DELETE", bot.constants.routes.STAGE_INSTANCE(channelId));
}
