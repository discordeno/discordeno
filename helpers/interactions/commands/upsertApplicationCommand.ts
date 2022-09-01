import type { Bot } from "../../../bot.ts";
import { ApplicationCommand } from "../../../transformers/applicationCommand.ts";
import { DiscordApplicationCommand } from "../../../types/discord.ts";
import { AtLeastOne } from "../../../types/shared.ts";
import {
  CreateApplicationCommand,
  CreateContextApplicationCommand,
  isContextApplicationCommand,
  makeOptionsForCommand,
} from "./createApplicationCommand.ts";

/**
 * Edit an existing application command. If this command did not exist, it will create it.
 */
export async function upsertApplicationCommand(
  bot: Bot,
  commandId: bigint,
  command: AtLeastOne<CreateApplicationCommand> | AtLeastOne<CreateContextApplicationCommand>,
  guildId?: bigint,
): Promise<ApplicationCommand> {
  const result = await bot.rest.runMethod<DiscordApplicationCommand>(
    bot.rest,
    "PATCH",
    guildId
      ? bot.constants.routes.COMMANDS_GUILD_ID(bot.applicationId, guildId, commandId)
      : bot.constants.routes.COMMANDS_ID(bot.applicationId, commandId),
    isContextApplicationCommand(command)
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
      },
  );

  return bot.transformers.applicationCommand(bot, result);
}
