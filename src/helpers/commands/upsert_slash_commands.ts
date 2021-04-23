import { applicationId } from "../../bot.ts";
import { rest } from "../../rest/rest.ts";
import { EditGlobalApplicationCommand } from "../../types/interactions/edit_global_application_command.ts";
import { ApplicationCommand } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { validateSlashCommands } from "../../util/utils.ts";

/**
 * Bulk edit existing slash commands. If a command does not exist, it will create it.
 *
 * **NOTE:** Any slash commands that are not specified in this function will be **deleted**. If you don't provide the commandId and rename your command, the command gets a new Id.
 */
export async function upsertSlashCommands(
  options: EditGlobalApplicationCommand[],
  guildId?: string,
) {
  validateSlashCommands(options);

  return await rest.runMethod<ApplicationCommand[]>(
    "put",
    guildId
      ? endpoints.COMMANDS_GUILD(applicationId, guildId)
      : endpoints.COMMANDS(applicationId),
    options,
  );
}
