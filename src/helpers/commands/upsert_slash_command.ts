import { applicationId } from "../../bot.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { validateSlashCommands } from "../../util/utils.ts";

/**
 * Edit an existing slash command. If this command did not exist, it will create it.
 */
export async function upsertSlashCommand(
  commandId: string,
  options: UpsertSlashCommandOptions,
  guildId?: string,
) {
  validateSlashCommands([options]);

  const result = await RequestManager.patch(
    guildId
      ? endpoints.COMMANDS_GUILD_Id(applicationId, guildId, commandId)
      : endpoints.COMMANDS_Id(applicationId, commandId),
    options,
  );

  return result;
}
