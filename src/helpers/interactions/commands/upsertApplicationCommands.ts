import type { ApplicationCommand } from "../../../types/interactions/commands/applicationCommand.ts";
import type { EditGlobalApplicationCommand } from "../../../types/interactions/commands/editGlobalApplicationCommand.ts";
import type { MakeRequired } from "../../../types/util.ts";
import type { Bot } from "../../../bot.ts";
import { Collection } from "../../../util/collection.ts";

/**
 * Bulk edit existing application commands. If a command does not exist, it will create it.
 *
 * **NOTE:** Any application commands that are not specified in this function will be **deleted**. If you don't provide the commandId and rename your command, the command gets a new Id.
 */
export async function upsertApplicationCommands(
  bot: Bot,
  options: MakeRequired<EditGlobalApplicationCommand, "name">[],
  guildId?: bigint
) {
  const result = await bot.rest.runMethod<ApplicationCommand[]>(
    bot.rest,
    "put",
    guildId
      ? bot.constants.endpoints.COMMANDS_GUILD(bot.applicationId, guildId)
      : bot.constants.endpoints.COMMANDS(bot.applicationId),
    options
  );

  return new Collection(
    result.map((res) => {
      const command = bot.transformers.applicationCommand(bot, res);
      return [command.id, command];
    })
  );
}
