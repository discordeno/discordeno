import type { ApplicationCommand } from "../../../types/interactions/commands/application_command.ts";
import type { EditGlobalApplicationCommand } from "../../../types/interactions/commands/edit_global_application_command.ts";
import type { Bot } from "../../../bot.ts";

/**
 * Edit an existing slash command. If this command did not exist, it will create it.
 */
export async function upsertSlashCommand(
  bot: Bot,
  commandId: bigint,
  options: EditGlobalApplicationCommand,
  guildId?: bigint
) {
  [options] = bot.utils.validateSlashCommands([options]);

  return await bot.rest.runMethod<ApplicationCommand>(
    bot.rest,
    "patch",
    guildId
      ? bot.constants.endpoints.COMMANDS_GUILD_ID(bot.applicationId, guildId, commandId)
      : bot.constants.endpoints.COMMANDS_ID(bot.applicationId, commandId),
    options
  );
}
