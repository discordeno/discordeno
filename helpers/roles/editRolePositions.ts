import { Bot } from "../../bot.ts";
import { Role } from "../../transformers/role.ts";
import { DiscordRole } from "../../types/discord.ts";
import { BigString } from "../../types/shared.ts";
import { Collection } from "../../util/collection.ts";

/**
 * Edits the positions of a set of roles.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to edit the role positions in.
 * @param options - The parameters for the edit of the role positions.
 * @returns A collection of {@link Role} objects assorted by role ID.
 *
 * @remarks
 * Requires the `MANAGE_ROLES` permission.
 *
 * Fires a _Guild Role Update_ gateway event for every role impacted in this change.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#modify-guild-role-positions}
 */
export async function modifyRolePositions(
  bot: Bot,
  guildId: BigString,
  options: ModifyRolePositions[],
): Promise<Collection<bigint, Role>> {
  const results = await bot.rest.runMethod<DiscordRole[]>(
    bot.rest,
    "PATCH",
    bot.constants.routes.GUILD_ROLES(guildId),
    options,
  );

  const id = bot.transformers.snowflake(guildId);

  return new Collection(
    results.map((result) => {
      const role = bot.transformers.role(bot, { role: result, guildId: id });
      return [role.id, role];
    }),
  );
}

export interface ModifyRolePositions {
  /** The role id */
  id: BigString;
  /** The sorting position for the role. */
  position?: number | null;
}
