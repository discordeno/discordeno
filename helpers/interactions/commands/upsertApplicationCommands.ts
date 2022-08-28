import type { Bot } from "../../../bot.ts";
import { ApplicationCommand } from "../../../transformers/applicationCommand.ts";
import { DiscordApplicationCommand } from "../../../types/discord.ts";
import { Collection } from "../../../util/collection.ts";
import {
  CreateApplicationCommand,
  CreateContextApplicationCommand,
  isContextApplicationCommand,
  makeOptionsForCommand,
} from "./createApplicationCommand.ts";

/**
 * Bulk edit existing application commands. If a command does not exist, it will create it.
 *
 * **NOTE:** Any application commands that are not specified in this function will be **deleted**. If you don't provide the commandId and rename your command, the command gets a new Id.
 */
export async function upsertApplicationCommands(
  bot: Bot,
  commands: (UpsertApplicationCommands | CreateContextApplicationCommand)[],
  guildId?: bigint,
): Promise<Collection<bigint, ApplicationCommand>> {
  const results = await bot.rest.runMethod<DiscordApplicationCommand[]>(
    bot.rest,
    "PUT",
    guildId
      ? bot.constants.routes.COMMANDS_GUILD(bot.applicationId, guildId)
      : bot.constants.routes.COMMANDS(bot.applicationId),
    commands.map((command) => (isContextApplicationCommand(command)
      ? {
        name: command.name,
        name_localizations: command.nameLocalizations,
        type: command.type,
        default_member_permissions: command.defaultMemberPermissions
          ? bot.utils.calculateBits(command.defaultMemberPermissions)
          : undefined,
        dm_permission: command.dmPermission,
      }
      : {
        name: command.name,
        name_localizations: command.nameLocalizations,
        description: command.description,
        description_localizations: command.descriptionLocalizations,
        type: command.type,
        options: command.options ? makeOptionsForCommand(command.options) : undefined,
        default_member_permissions: command.defaultMemberPermissions
          ? bot.utils.calculateBits(command.defaultMemberPermissions)
          : undefined,
        dm_permission: command.dmPermission,
      })
    ),
  );

  return new Collection(
    results.map((result) => {
      const command = bot.transformers.applicationCommand(bot, result);
      return [command.id, command];
    }),
  );
}

export interface UpsertApplicationCommands extends CreateApplicationCommand {
  /** ID of the command, if known */
  id?: bigint;
}
