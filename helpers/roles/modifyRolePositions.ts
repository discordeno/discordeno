import { Bot } from "../../bot.ts";
import { Role } from "../../transformers/role.ts";
import { DiscordRole } from "../../types/discord.ts";
import { Collection } from "../../util/collection.ts";

/** Modify the positions of a set of role objects for the guild. Requires the MANAGE_ROLES permission. Returns a list of all of the guild's role objects on success. Fires multiple Guild Role Update Gateway events. */
export async function modifyRolePositions(
  bot: Bot,
  guildId: bigint,
  options: ModifyRolePositions[],
): Promise<Collection<bigint, Role>> {
  const results = await bot.rest.runMethod<DiscordRole[]>(
    bot.rest,
    "PATCH",
    bot.constants.routes.GUILD_ROLES(guildId),
    options,
  );

  return new Collection(
    results.map((result) => {
      const role = bot.transformers.role(bot, { role: result, guildId });
      return [role.id, role];
    }),
  );
}

export interface ModifyRolePositions {
  /** The role id */
  id: bigint;
  /** The sorting position for the role. */
  position?: number | null;
}
