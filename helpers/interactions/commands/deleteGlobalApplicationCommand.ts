import type { Bot } from "../../../bot.ts";

/** Deletes a global application command. */
export async function deleteGlobalApplicationCommand(bot: Bot, commandId: bigint): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.COMMANDS_ID(bot.applicationId, commandId),
  );
}
