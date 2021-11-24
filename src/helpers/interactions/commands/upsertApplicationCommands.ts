import type { ApplicationCommand } from "../../../types/interactions/commands/applicationCommand.ts";
import type { EditGlobalApplicationCommand } from "../../../types/interactions/commands/editGlobalApplicationCommand.ts";
import type { MakeRequired } from "../../../types/util.ts";
import type { Bot } from "../../../bot.ts";

/**
 * Bulk edit existing slash commands. If a command does not exist, it will create it.
 *
 * **NOTE:** Any slash commands that are not specified in this function will be **deleted**. If you don't provide the commandId and rename your command, the command gets a new Id.
 */
export async function upsertApplicationCommands(
  bot: Bot,
  options: MakeRequired<EditGlobalApplicationCommand, "name">[],
  guildId?: bigint
) {
  return await bot.rest.runMethod<ApplicationCommand[]>(
    bot.rest,
    "put",
    guildId
      ? bot.constants.endpoints.COMMANDS_GUILD(bot.applicationId, guildId)
      : bot.constants.endpoints.COMMANDS(bot.applicationId),
    options
  );
}
