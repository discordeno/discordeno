import type { Bot } from "../../../bot.ts";
import { ApplicationCommand } from "../../../transformers/applicationCommand.ts";
import { DiscordApplicationCommand } from "../../../types/discord.ts";
import { BigString } from "../../../types/shared.ts";

/**
 * Gets a global application command by its ID.
 *
 * @param bot - The bot instance to use to make the request.
 * @param commandId - The ID of the command to get.
 * @returns An instance of {@link ApplicationCommand}.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-global-application-command}
 */
export async function getGlobalApplicationCommand(bot: Bot, commandId: BigString): Promise<ApplicationCommand> {
  const result = await bot.rest.runMethod<DiscordApplicationCommand>(
    bot.rest,
    "GET",
    bot.constants.routes.COMMANDS_ID(bot.applicationId, commandId),
  );

  return bot.transformers.applicationCommand(bot, result);
}
