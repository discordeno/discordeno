import type { ApplicationCommand } from "../../../types/interactions/commands/applicationCommand.ts";
import { Collection } from "../../../util/collection.ts";
import type { Bot } from "../../../bot.ts";

/** Fetch all the commands for your application. If a guild id is not provided, it will fetch global commands. */
export async function getApplicationCommands(bot: Bot, guildId?: bigint) {
  const result = await bot.rest.runMethod<ApplicationCommand[]>(
    bot.rest,
    "get",
    guildId
      ? bot.constants.endpoints.COMMANDS_GUILD(bot.applicationId, guildId)
      : bot.constants.endpoints.COMMANDS(bot.applicationId),
  );

  return new Collection(
    result.map((res) => {
      const command = bot.transformers.applicationCommand(bot, res);
      return [command.id, command];
    }),
  );
}
