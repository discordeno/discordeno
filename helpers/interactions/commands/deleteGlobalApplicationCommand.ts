import type { Bot } from "../../../bot.ts";
import { BigString } from "../../../types/shared.ts";

/**
 * Deletes an application command registered globally.
 *
 * @param bot - The bot instance to use to make the request.
 * @param commandId - The ID of the command to delete.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#delete-global-application-command}
 */
export async function deleteGlobalApplicationCommand(bot: Bot, commandId: BigString): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.COMMANDS_ID(bot.applicationId, commandId),
  );
}
