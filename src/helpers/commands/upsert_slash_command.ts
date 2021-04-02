import { applicationId } from "../../bot.ts";
import { rest } from "../../rest/rest.ts";
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

  const result = await rest.runMethod(
    "patch",
    guildId
      ? endpoints.COMMANDS_GUILD_ID(applicationId, guildId, commandId)
      : endpoints.COMMANDS_ID(applicationId, commandId),
    options,
  );

  return result;
}
