import { applicationId } from "../../../bot.ts";
import { rest } from "../../../rest/rest.ts";
import type { ApplicationCommand } from "../../../types/interactions/commands/application_command.ts";
import { snowflakeToBigint } from "../../../util/bigint.ts";
import { Collection } from "../../../util/collection.ts";
import { endpoints } from "../../../util/constants.ts";

/** Fetch all of the global commands for your application. */
export async function getSlashCommands(guildId?: bigint) {
  const result = await rest.runMethod<ApplicationCommand[]>(
    "get",
    guildId ? endpoints.COMMANDS_GUILD(applicationId, guildId) : endpoints.COMMANDS(applicationId)
  );

  return new Collection(
    result.map((command) => [
      command.name,
      { ...command, id: snowflakeToBigint(command.id), applicationId: snowflakeToBigint(command.applicationId) },
    ])
  );
}
