import type { Bot } from "../../../bot.ts";
import { ApplicationCommand, CreateApplicationCommand } from "../../../mod.ts";
import { DiscordApplicationCommand } from "../../../types/discord.ts";

/**
 * Creates an application command accessible globally; across different guilds and channels.
 *
 * @param bot - The bot instance to use to make the request.
 * @param command - The command to create.
 * @returns An instance of the created {@link ApplicationCommand}.
 *
 * @remarks
 * ⚠️ Creating a command with the same name as an existing command for your application will overwrite the old command.
 * ⚠️ Global commands once created are cached for periods of __an hour__, so changes made to existing commands will take an hour to surface.
 * ⚠️ You can only create up to 200 _new_ commands daily.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#create-global-application-command}
 */
export async function createGlobalApplicationCommand(
  bot: Bot,
  command: CreateApplicationCommand,
): Promise<ApplicationCommand> {
  const result = await bot.rest.runMethod<DiscordApplicationCommand>(
    bot.rest,
    "POST",
    bot.constants.routes.COMMANDS(bot.applicationId),
    bot.transformers.reverse.createApplicationCommand(bot, command),
  );

  return bot.transformers.applicationCommand(bot, result);
}
