import { BigString } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

/**
 * Unbans a user from a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to unban the user in.
 * @param userId - The ID of the user to unban.
 *
 * @remarks
 * Requires the `BAN_MEMBERS` permission.
 *
 * Fires a _Guild Ban Remove_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#remove-guild-ban}
 */
export async function unbanMember (
  rest: RestManager,
  guildId: BigString,
  userId: BigString
): Promise<void> {
  return await rest.runMethod<void>(
    rest,
    'DELETE',
    rest.constants.routes.GUILD_BAN(guildId, userId)
  )
}
