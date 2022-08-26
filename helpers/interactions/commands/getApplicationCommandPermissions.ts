import type { Bot } from "../../../bot.ts";
import { ApplicationCommandPermission } from "../../../transformers/applicationCommandPermission.ts";
import { DiscordGuildApplicationCommandPermissions } from "../../../types/discord.ts";
import { Collection } from "../../../util/collection.ts";

/** Fetches command permissions for all commands for your application in a guild. Returns an array of GuildApplicationCommandPermissions objects. */
export async function getApplicationCommandPermissions(
  bot: Bot,
  guildId: bigint,
): Promise<Collection<bigint, ApplicationCommandPermission>> {
  const result = await bot.rest.runMethod<DiscordGuildApplicationCommandPermissions[]>(
    bot.rest,
    "GET",
    bot.constants.routes.COMMANDS_PERMISSIONS(bot.applicationId, guildId),
  );

  return new Collection(
    result.map((res) => {
      const permission = bot.transformers.applicationCommandPermission(bot, res);
      return [permission.id, permission];
    }),
  );
}
