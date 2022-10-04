import type { Bot } from "../../bot.ts";
import { Role } from "../../transformers/role.ts";
import { DiscordRole } from "../../types/discord.ts";
import { BigString } from "../../types/shared.ts";
import { Collection } from "../../util/collection.ts";

/**
 * Gets the list of roles for a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to get the list of roles for.
 * @returns A collection of {@link Role} objects assorted by role ID.
 *
 * @remarks
 * ⚠️ This endpoint should be used sparingly due to {@link User} objects already being included in guild payloads.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-roles}
 */
export async function getRoles(bot: Bot, guildId: BigString): Promise<Collection<bigint, Role>> {
  const results = await bot.rest.runMethod<DiscordRole[]>(bot.rest, "GET", bot.constants.routes.GUILD_ROLES(guildId));
  const id = bot.transformers.snowflake(guildId);

  return new Collection(
    results.map((result) => {
      const role = bot.transformers.role(bot, { role: result, guildId: id });
      return [role.id, role];
    }),
  );
}
