import { routes } from '@discordeno/constant'
import type { BigString } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

/**
 * Removes a role from a member.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild the member to remove the role from is in.
 * @param userId - The user ID of the member to remove the role from.
 * @param roleId - The ID of the role to remove from the member.
 *
 * @remarks
 * Requires the `MANAGE_ROLES` permission.
 *
 * Fires a _Guild Member Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#remove-guild-member-role}
 */
export async function removeRole (
  rest: RestManager,
  guildId: BigString,
  userId: BigString,
  roleId: BigString,
  reason?: string
): Promise<void> {
  return await rest.runMethod<void>(

    'DELETE',
    routes.GUILD_MEMBER_ROLE(guildId, userId, roleId),
    { reason }
  )
}
