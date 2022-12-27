import { routes } from '@discordeno/constant'
import type { BigString } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

/**
 * Kicks a member from a guild.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to kick the member from.
 * @param userId - The user ID of the member to kick from the guild.
 *
 * @remarks
 * Requires the `KICK_MEMBERS` permission.
 *
 * Fires a _Guild Member Remove_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#remove-guild-member}
 */
export async function kickMember (
  rest: RestManager,
  guildId: BigString,
  userId: BigString,
  reason?: string
): Promise<void> {
  return await rest.runMethod<void>(

    'DELETE',
    routes.GUILD_MEMBER(guildId, userId),
    {
      reason
    }
  )
}
