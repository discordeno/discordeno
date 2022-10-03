import type { Bot } from "../../../bot.ts";
import { ApplicationCommand } from "../../../transformers/applicationCommand.ts";
import { DiscordApplicationCommand } from "../../../types/discord.ts";
import { BigString } from "../../../types/shared.ts";

// TODO: Swap `commandId` and `guildId` parameters.

/**
 * Gets a guild application command by its ID.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild the command is registered in.
 * @param commandId - The ID of the command to get.
 * @returns An instance of {@link ApplicationCommand}.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command}
 */
export async function getGuildApplicationCommand(
  bot: Bot,
  commandId: BigString,
  guildId: BigString,
): Promise<ApplicationCommand> {
  const result = await bot.rest.runMethod<DiscordApplicationCommand>(
    bot.rest,
    "GET",
    bot.constants.routes.COMMANDS_GUILD_ID(bot.applicationId, guildId, commandId),
  );

  return bot.transformers.applicationCommand(bot, result);
}
