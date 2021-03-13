import { applicationID } from "../../bot.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { SlashCommand } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";

/** Fetchs the global command for the given ID. If a guildID is provided, the guild command will be fetched. */
export async function getSlashCommand(commandID: string, guildID?: string) {
  const result = await RequestManager.get(
    guildID
      ? endpoints.COMMANDS_GUILD_ID(applicationID, guildID, commandID)
      : endpoints.COMMANDS_ID(applicationID, commandID),
  );

  return result as SlashCommand;
}
