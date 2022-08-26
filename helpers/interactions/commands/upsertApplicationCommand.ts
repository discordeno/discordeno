import type { Bot } from "../../../bot.ts";
import { ApplicationCommand } from "../../../transformers/applicationCommand.ts";
import { DiscordApplicationCommand } from "../../../types/discord.ts";
import { AtLeastOne } from "../../../types/shared.ts";
import {
  CreateApplicationCommand,
  CreateContextApplicationCommand,
  isContextApplicationCommand,
  makeOptionsForCommand
} from "./createApplicationCommand.ts";

/**
 * Edit an existing application command. If this command did not exist, it will create it.
 */
export async function upsertApplicationCommand(
  bot: Bot,
  commandId: bigint,
  options: AtLeastOne<CreateApplicationCommand> | AtLeastOne<CreateContextApplicationCommand>,
  guildId?: bigint,
): Promise<ApplicationCommand> {
  const result = await bot.rest.runMethod<DiscordApplicationCommand>(
    bot.rest,
    "PATCH",
    guildId
      ? bot.constants.routes.COMMANDS_GUILD_ID(bot.applicationId, guildId, commandId)
      : bot.constants.routes.COMMANDS_ID(bot.applicationId, commandId),
    isContextApplicationCommand(options)
      ? {
        name: options.name,
        type: options.type,
      }
      : {
        name: options.name,
        description: options.description,
        type: options.type,
        options: options.options ? makeOptionsForCommand(options.options) : undefined,
      },
  );

  return bot.transformers.applicationCommand(bot, result);
}
