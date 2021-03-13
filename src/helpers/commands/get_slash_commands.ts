import { applicationID } from "../../bot.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { SlashCommand } from "../../types/mod.ts";
import { Collection } from "../../util/collection.ts";
import { endpoints } from "../../util/constants.ts";

/** Fetch all of the global commands for your application. */
export async function getSlashCommands(guildID?: string) {
  const result = (await RequestManager.get(
    guildID
      ? endpoints.COMMANDS_GUILD(applicationID, guildID)
      : endpoints.COMMANDS(applicationID),
  )) as SlashCommand[];

  return new Collection(result.map((command) => [command.name, command]));
}
