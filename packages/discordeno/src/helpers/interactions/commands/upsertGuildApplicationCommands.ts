import type { Bot } from "../../../bot.ts";
import { ApplicationCommand } from "../../../transformers/applicationCommand.ts";
import { BigString, CreateApplicationCommand, DiscordApplicationCommand } from "../../../types/mod.ts";
import { Collection } from "../../../util/collection.ts";

/**
 * Re-registers the list of application commands registered in a guild, overwriting the previous commands completely.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild whose list of commands to overwrite.
 * @param commands - The list of commands to use to overwrite the previous list.
 * @returns A collection of {@link ApplicationCommand} objects assorted by command ID.
 *
 * @remarks
 * ❗ Commands that are not present in the `commands` array will be __deleted__.
 *
 * ⚠️ Commands that do not already exist will count towards the daily limit of _200_ new commands.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-guild-application-commands}
 */
export async function upsertGuildApplicationCommands(
  bot: Bot,
  guildId: BigString,
  commands: CreateApplicationCommand[],
): Promise<Collection<bigint, ApplicationCommand>> {
  const results = await bot.rest.runMethod<DiscordApplicationCommand[]>(
    bot.rest,
    "PUT",
    bot.constants.routes.COMMANDS_GUILD(bot.applicationId, guildId),
    commands.map((command) => bot.transformers.reverse.createApplicationCommand(bot, command)),
  );

  return new Collection(
    results.map((result) => {
      const command = bot.transformers.applicationCommand(bot, result);
      return [command.id, command];
    }),
  );
}
