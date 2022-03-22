import { Bot } from "../../bot.ts";
import { DiscordRole } from "../../types/discord.ts";
import { Collection } from "../../util/collection.ts";

/** Modify the positions of a set of role objects for the guild. Requires the MANAGE_ROLES permission. Returns a list of all of the guild's role objects on success. Fires multiple Guild Role Update Gateway events. */
export async function modifyRolePositions(bot: Bot, guildId: bigint, options: ModifyRolePositions[]) {
  const roles = await bot.rest.runMethod<DiscordRole[]>(
    bot.rest,
    "get",
    bot.constants.endpoints.GUILD_ROLES(guildId),
    options,
  );

  return new Collection(roles.map((role) => {
    const result = bot.transformers.role(bot, { role, guildId });
    return [result.id, result];
  }));
}

export interface ModifyRolePositions {
  /** The role id */
  id: bigint;
  /** The sorting position for the role. */
  position?: number | null;
}

