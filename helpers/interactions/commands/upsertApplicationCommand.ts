import type { Bot } from "../../../bot.ts";
import {
  CreateApplicationCommand,
  CreateContextApplicationCommand,
  isContextApplicationCommand,
  makeOptionsForCommand,
} from "./createApplicationCommand.ts";
import { DiscordApplicationCommand } from "../../../types/discord.ts";
import { ApplicationCommandOption } from "../../../transformers/applicationCommandOption.ts";
import { ApplicationCommandTypes } from "../../../types/shared.ts";

/**
 * Edit an existing application command. If this command did not exist, it will create it.
 */
export async function upsertApplicationCommand(
  bot: Bot,
  commandId: bigint,
  options: CreateApplicationCommand | CreateContextApplicationCommand,
  guildId?: bigint,
) {
  const result = await bot.rest.runMethod<DiscordApplicationCommand>(
    bot.rest,
    "patch",
    guildId
      ? bot.constants.endpoints.COMMANDS_GUILD_ID(bot.applicationId, guildId, commandId)
      : bot.constants.endpoints.COMMANDS_ID(bot.applicationId, commandId),
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
