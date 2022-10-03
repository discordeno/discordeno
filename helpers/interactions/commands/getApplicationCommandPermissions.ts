import type { Bot } from "../../../bot.ts";
import { ApplicationCommandPermission } from "../../../transformers/applicationCommandPermission.ts";
import { DiscordGuildApplicationCommandPermissions } from "../../../types/discord.ts";
import { BigString } from "../../../types/shared.ts";
import { Collection } from "../../../util/collection.ts";

/**
 * Gets the permissions of all application commands registered in a guild by the ID of the guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to get the permissions objects of.
 * @returns A collection of {@link ApplicationCommandPermission} objects assorted by command ID.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command-permissions}
 */
export async function getApplicationCommandPermissions(
  bot: Bot,
  guildId: BigString,
): Promise<Collection<bigint, ApplicationCommandPermission>> {
  const results = await bot.rest.runMethod<DiscordGuildApplicationCommandPermissions[]>(
    bot.rest,
    "GET",
    bot.constants.routes.COMMANDS_PERMISSIONS(bot.applicationId, guildId),
  );

  return new Collection(
    results.map((result) => {
      const permission = bot.transformers.applicationCommandPermission(bot, result);
      return [permission.id, permission];
    }),
  );
}
