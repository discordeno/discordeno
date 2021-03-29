import { applicationId } from "../../bot.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";

/** Deletes a slash command. */
export function deleteSlashCommand(id: string, guildId?: string) {
  if (!guildId) {
    return RequestManager.delete(endpoints.COMMANDS_ID(applicationId, id));
  }
  return RequestManager.delete(
    endpoints.COMMANDS_GUILD_ID(applicationId, guildId, id),
  );
}
