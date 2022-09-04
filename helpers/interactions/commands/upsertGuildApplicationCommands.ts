import type { Bot } from "../../../bot.ts";
import { ApplicationCommand } from "../../../transformers/applicationCommand.ts";
import { CreateApplicationCommand, DiscordApplicationCommand } from "../../../types/mod.ts";
import { Collection } from "../../../util/collection.ts";

/**
 * Bulk edit existing guild application commands. If a command does not exist, it will create it.
 *
 * **NOTE:** Any application commands that are not specified in this function will be **deleted**. If you don't provide the commandId and rename your command, the command gets a new Id.
 */
export async function upsertGuildApplicationCommands(
  bot: Bot,
  guildId: bigint,
  commands: CreateApplicationCommand[],
): Promise<Collection<bigint, ApplicationCommand>> {
  const results = await bot.rest.runMethod<DiscordApplicationCommand[]>(
    bot.rest,
    "PATCH",
    bot.constants.routes.COMMANDS_GUILD(bot.applicationId, guildId),
    commands.map((command) => bot.transformers.reverse.createApplicationCommand(bot, command)),
  );

  return new Collection(
    results.map((result) => {
      const command = bot.transformers.applicationCommand(bot, result);
      return [command.id, command];
    }),
  );
}
