import { applicationId } from "../../bot.ts";
import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";

/** Deletes a slash command. */
export function deleteSlashCommand(id: string, guildId?: string) {
  if (!guildId) {
    return rest.runMethod("delete", endpoints.COMMANDS_ID(applicationId, id));
  }
  return rest.runMethod(
    "delete",
    endpoints.COMMANDS_GUILD_ID(applicationId, guildId, id),
  );
}
