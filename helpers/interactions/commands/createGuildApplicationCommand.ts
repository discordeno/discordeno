import { Bot } from "../../../bot.ts";
import { ApplicationCommand, DiscordApplicationCommand } from "../../../mod.ts";
import { CreateApplicationCommand, transformCreateApplicationCommand } from "./createGlobalApplicationCommand.ts";

export async function createGuildApplicationCommand(
  bot: Bot,
  command: CreateApplicationCommand,
  guildId: bigint,
): Promise<ApplicationCommand> {
  const result = await bot.rest.runMethod<DiscordApplicationCommand>(
    bot.rest,
    "POST",
    bot.constants.routes.COMMANDS_GUILD(bot.applicationId, guildId),
    transformCreateApplicationCommand(bot, command),
  );

  return bot.transformers.applicationCommand(bot, result);
}
