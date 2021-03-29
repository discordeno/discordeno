import { applicationId } from "../../bot.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { validateSlashCommands } from "../../util/utils.ts";

/**
 * Bulk edit existing slash commands. If a command does not exist, it will create it.
 *
 * **NOTE:** Any slash commands that are not specified in this function will be **deleted**. If you don't provide the commandId and rename your command, the command gets a new Id.
 */
export async function upsertSlashCommands(
  options: UpsertSlashCommandsOptions[],
  guildId?: string,
) {
  validateSlashCommands(options);

  const result = await RequestManager.put(
    guildId
      ? endpoints.COMMANDS_GUILD(applicationId, guildId)
      : endpoints.COMMANDS(applicationId),
    options,
  );

  return result;
}
