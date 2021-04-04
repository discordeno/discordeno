import { applicationId } from "../../bot.ts";
import { rest } from "../../rest/rest.ts";
import { Collection } from "../../util/collection.ts";
import { endpoints } from "../../util/constants.ts";

/** Fetch all of the global commands for your application. */
export async function getSlashCommands(guildId?: string) {
  const result = (await rest.runMethod(
    "get",
    guildId
      ? endpoints.COMMANDS_GUILD(applicationId, guildId)
      : endpoints.COMMANDS(applicationId),
  )) as SlashCommand[];

  return new Collection(result.map((command) => [command.name, command]));
}
