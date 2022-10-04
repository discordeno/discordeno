import { Bot } from "../../../bot.ts";
import { ApplicationCommand, BigString, CreateApplicationCommand, DiscordApplicationCommand } from "../../../mod.ts";

/**
 * Creates an application command only accessible in a specific guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param command - The command to create.
 * @param guildId - The ID of the guild to create the command for.
 * @returns An instance of the created {@link ApplicationCommand}.
 *
 * @remarks
 * ⚠️ Creating a command with the same name as an existing command for your application will overwrite the old command.
 * ⚠️ You can only create up to 200 _new_ commands daily.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command}
 */
export async function createGuildApplicationCommand(
  bot: Bot,
  command: CreateApplicationCommand,
  guildId: BigString,
): Promise<ApplicationCommand> {
  const result = await bot.rest.runMethod<DiscordApplicationCommand>(
    bot.rest,
    "POST",
    bot.constants.routes.COMMANDS_GUILD(bot.applicationId, guildId),
    bot.transformers.reverse.createApplicationCommand(bot, command),
  );

  return bot.transformers.applicationCommand(bot, result);
}
