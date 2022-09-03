import type { Bot } from "../../../bot.ts";
import { ApplicationCommand, CreateApplicationCommand } from "../../../mod.ts";
import { DiscordApplicationCommand } from "../../../types/discord.ts";

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
