import type { Bot } from "../../bot.ts";
import { BigString } from "../../types/shared.ts";

/**
 * Adds a role to a member.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild the member to add the role to is in.
 * @param userId - The user ID of the member to add the role to.
 * @param roleId - The ID of the role to add to the member.
 *
 * @remarks
 * Requires the `MANAGE_ROLES` permission.
 *
 * Fires a _Guild Member Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#add-guild-member-role}
 */
export async function addRole(
  bot: Bot,
  guildId: BigString,
  userId: BigString,
  roleId: BigString,
  reason?: string,
): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "PUT",
    bot.constants.routes.GUILD_MEMBER_ROLE(guildId, userId, roleId),
    { reason },
  );
}
