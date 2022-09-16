import type { Bot } from "../../../bot.ts";
import { ApplicationCommand } from "../../../transformers/applicationCommand.ts";
import { DiscordApplicationCommand } from "../../../types/discord.ts";
import { BigString } from "../../../types/shared.ts";
import { Collection } from "../../../util/collection.ts";

/**
 * Gets the list of application commands registered by your bot in a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild the commands are registered in.
 * @returns A collection of {@link ApplicationCommand} objects assorted by command ID.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-global-application-commandss}
 */
export async function getGuildApplicationCommands(
  bot: Bot,
  guildId: BigString,
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
