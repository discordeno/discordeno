import { applicationID } from "../../bot.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { UpsertSlashCommandsOptions } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { validateSlashCommands } from "../../util/utils.ts";

/**
 * Bulk edit existing slash commands. If a command does not exist, it will create it.
 *
 * **NOTE:** Any slash commands that are not specified in this function will be **deleted**. If you don't provide the commandID and rename your command, the command gets a new ID.
 */
export async function upsertSlashCommands(
  options: UpsertSlashCommandsOptions[],
  guildID?: string,
) {
  validateSlashCommands(options);

  const result = await RequestManager.put(
    guildID
      ? endpoints.COMMANDS_GUILD(applicationID, guildID)
      : endpoints.COMMANDS(applicationID),
    options,
  );

  return result;
}
