import type { Bot } from "../../../bot.ts";
import { ApplicationCommand } from "../../../transformers/applicationCommand.ts";
import { DiscordApplicationCommand } from "../../../types/discord.ts";

/** Fetches the guild command for the given Id */
export async function getGuildApplicationCommand(
  bot: Bot,
  commandId: bigint,
  guildId: bigint,
): Promise<ApplicationCommand> {
  const result = await bot.rest.runMethod<DiscordApplicationCommand>(
    bot.rest,
    "GET",
    bot.constants.routes.COMMANDS_GUILD_ID(bot.applicationId, guildId, commandId),
  );

  return bot.transformers.applicationCommand(bot, result);
}
