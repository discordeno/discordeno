import { applicationID } from "../../bot.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { validateSlashCommands } from "../../util/utils.ts";

/**
 * Edit an existing slash command. If this command did not exist, it will create it.
 */
export async function upsertSlashCommand(
  commandID: string,
  options: UpsertSlashCommandOptions,
  guildID?: string,
) {
  validateSlashCommands([options]);

  const result = await RequestManager.patch(
    guildID
      ? endpoints.COMMANDS_GUILD_ID(applicationID, guildID, commandID)
      : endpoints.COMMANDS_ID(applicationID, commandID),
    options,
  );

  return result;
}
