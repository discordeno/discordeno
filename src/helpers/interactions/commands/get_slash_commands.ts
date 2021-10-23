import type { ApplicationCommand } from "../../../types/interactions/commands/application_command.ts";
import { Collection } from "../../../util/collection.ts";
import type { Bot } from "../../../bot.ts";

/** Fetch all the global commands for your application. */
export async function getSlashCommands(bot: Bot, guildId?: bigint) {
  const result = await bot.rest.runMethod<ApplicationCommand[]>(
    bot.rest,
    "get",
    guildId
      ? bot.constants.endpoints.COMMANDS_GUILD(bot.applicationId, guildId)
      : bot.constants.endpoints.COMMANDS(bot.applicationId)
  );

  return new Collection(
    result.map((command) => [
      command.name,
      {
        ...command,
        id: bot.transformers.snowflake(command.id),
        applicationId: bot.transformers.snowflake(command.applicationId),
      },
    ])
  );
}
