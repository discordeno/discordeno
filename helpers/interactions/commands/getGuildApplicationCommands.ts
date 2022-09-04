import type { Bot } from "../../../bot.ts";
import { ApplicationCommand } from "../../../transformers/applicationCommand.ts";
import { DiscordApplicationCommand } from "../../../types/discord.ts";
import { Collection } from "../../../util/collection.ts";

/** Fetch all the commands for your application for a given guild */
export async function getGuildApplicationCommands(
  bot: Bot,
  guildId: bigint,
): Promise<Collection<bigint, ApplicationCommand>> {
  const results = await bot.rest.runMethod<DiscordApplicationCommand[]>(
    bot.rest,
    "GET",
    bot.constants.routes.COMMANDS_GUILD(bot.applicationId, guildId),
  );

  return new Collection(
    results.map((result) => {
      const command = bot.transformers.applicationCommand(bot, result);
      return [command.id, command];
    }),
  );
}
