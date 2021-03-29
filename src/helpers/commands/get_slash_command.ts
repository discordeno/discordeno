import { applicationId } from "../../bot.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";

/** Fetchs the global command for the given Id. If a guildId is provided, the guild command will be fetched. */
export async function getSlashCommand(commandId: string, guildId?: string) {
  const result = await RequestManager.get(
    guildId
      ? endpoints.COMMANDS_GUILD_ID(applicationId, guildId, commandId)
      : endpoints.COMMANDS_ID(applicationId, commandId),
  );

  return result as SlashCommand;
}
