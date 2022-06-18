import { Collection } from "../../../util/collection.ts";
import { Bot } from "../../../bot.ts";
import { DiscordApplicationCommand } from "../../../deps.ts";

/** Fetch all the commands for your application. If a guild id is not provided, it will fetch global commands. */
export async function getApplicationCommands(bot: Bot, guildId?: bigint) {
  const result = await bot.rest.runMethod<DiscordApplicationCommand[]>(
    bot.rest,
    "GET",
    guildId
      ? bot.constants.routes.COMMANDS_GUILD(bot.applicationId, guildId)
      : bot.constants.routes.COMMANDS(bot.applicationId),
  );

  return new Collection(
    result.map((res) => {
      const command = bot.transformers.applicationCommand(bot, res);
      return [command.id, command];
    }),
  );
}
