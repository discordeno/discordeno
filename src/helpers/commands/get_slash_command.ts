import { applicationId } from "../../bot.ts";
import { rest } from "../../rest/rest.ts";
import { ApplicationCommand } from "../../types/interactions/application_command.ts";
import { endpoints } from "../../util/constants.ts";

/** Fetchs the global command for the given Id. If a guildId is provided, the guild command will be fetched. */
export async function getSlashCommand(commandId: string, guildId?: string) {
  const result = await rest.runMethod(
    "get",
    guildId
      ? endpoints.COMMANDS_GUILD_ID(applicationId, guildId, commandId)
      : endpoints.COMMANDS_ID(applicationId, commandId),
  );

  return result as ApplicationCommand;
}
