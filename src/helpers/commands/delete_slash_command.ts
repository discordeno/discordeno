import { applicationId } from "../../bot.ts";
import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";

/** Deletes a slash command. */
export async function deleteSlashCommand(
  id: string,
  guildId?: string,
) {
  return await rest.runMethod<undefined>(
    "delete",
    guildId
      ? endpoints.COMMANDS_GUILD_ID(applicationId, guildId, id)
      : endpoints.COMMANDS_ID(applicationId, id),
  );
}
