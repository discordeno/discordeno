import { Bot } from "../../../bot.ts";
import { ApplicationCommand, CreateApplicationCommand, DiscordApplicationCommand } from "../../../mod.ts";

export async function createGuildApplicationCommand(
  bot: Bot,
  command: CreateApplicationCommand,
  guildId: bigint,
): Promise<ApplicationCommand> {
  const result = await bot.rest.runMethod<DiscordApplicationCommand>(
    bot.rest,
    "POST",
    bot.constants.routes.COMMANDS_GUILD(bot.applicationId, guildId),
    bot.transformers.reverse.createApplicationCommand(bot, command),
  );

  return bot.transformers.applicationCommand(bot, result);
}
