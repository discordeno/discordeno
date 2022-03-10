import type { Bot } from "../../../bot.ts";
import { DiscordGuildApplicationCommandPermissions } from "../../../types/discord.ts";
import type { GuildApplicationCommandPermissions } from "../../../types/interactions/commands/guildApplicationCommandPermissions.ts";
import { Collection } from "../../../util/collection.ts";

/** Fetches command permissions for all commands for your application in a guild. Returns an array of GuildApplicationCommandPermissions objects. */
export async function getApplicationCommandPermissions(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<DiscordGuildApplicationCommandPermissions[]>(
    bot.rest,
    "get",
    bot.constants.endpoints.COMMANDS_PERMISSIONS(bot.applicationId, guildId),
  );

  return new Collection(
    result.map((res) => {
      const perms = bot.transformers.applicationCommandPermission(bot, res);
      return [perms.id, perms];
    }),
  );
}
