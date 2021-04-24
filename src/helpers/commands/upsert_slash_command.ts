import { applicationId } from "../../bot.ts";
import { rest } from "../../rest/rest.ts";
import { EditGlobalApplicationCommand } from "../../types/interactions/edit_global_application_command.ts";
import { ApplicationCommand } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { validateSlashCommands } from "../../util/utils.ts";

/**
 * Edit an existing slash command. If this command did not exist, it will create it.
 */
export async function upsertSlashCommand(
  commandId: string,
  options: EditGlobalApplicationCommand,
  guildId?: string,
) {
  validateSlashCommands([options]);

  return await rest.runMethod<ApplicationCommand>(
    "patch",
    guildId
      ? endpoints.COMMANDS_GUILD_ID(applicationId, guildId, commandId)
      : endpoints.COMMANDS_ID(applicationId, commandId),
    options,
  );
}
