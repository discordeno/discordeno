import type { ApplicationCommand } from "../../../types/interactions/commands/applicationCommand.ts";
import type { CreateGlobalApplicationCommand } from "../../../types/interactions/commands/createGlobalApplicationCommand.ts";
import type { Bot } from "../../../bot.ts";
import { ApplicationCommandOption } from "../../../types/interactions/commands/applicationCommandOption.ts";

/**
 * There are two kinds of Application Commands: global commands and guild commands. Global commands are available for every guild that adds your app; guild commands are specific to the guild you specify when making them. Command names are unique per application within each scope (global and guild). That means:
 *
 * - Your app **cannot** have two global commands with the same name
 * - Your app **cannot** have two guild commands within the same name **on the same guild**
 * - Your app **can** have a global and guild command with the same name
 * - Multiple apps **can** have commands with the same names
 *
 * Global commands are cached for **1 hour**. That means that new global commands will fan out slowly across all guilds, and will be guaranteed to be updated in an hour.
 * Guild commands update **instantly**. We recommend you use guild commands for quick testing, and global commands when they're ready for public use.
 */
export async function createApplicationCommand(bot: Bot, options: CreateGlobalApplicationCommand, guildId?: bigint) {
  const result = await bot.rest.runMethod<ApplicationCommand>(
    bot.rest,
    "post",
    guildId
      ? bot.constants.endpoints.COMMANDS_GUILD(bot.applicationId, guildId)
      : bot.constants.endpoints.COMMANDS(bot.applicationId),
    {
      name: options.name,
      description: options.description,
      type: options.type,
      options: options.options ? makeOptionsForCommand(options.options) : undefined,
    }
  );

  return bot.transformers.applicationCommand(bot, result);
}

// @ts-ignore TODO: see if we can make this not circular
export function makeOptionsForCommand(options: ApplicationCommandOption[]) {
  return options.map((option) => ({
    type: option.type,
    name: option.name,
    description: option.description,
    required: option.required,
    choices: option.choices,
    options: option.options ? makeOptionsForCommand(option.options) : undefined,
    channel_types: option.channelTypes,
  }));
}
