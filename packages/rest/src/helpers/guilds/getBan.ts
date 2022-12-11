import type { BigString, DiscordBan } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import type { User } from '../../transformers/member.js'

export interface Ban {
  reason?: string
  user: User
}

// TODO: Move `Ban` into its own transformer file.

/**
 * Gets a ban by user ID.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to get the ban from.
 * @param userId - The ID of the user to get the ban for.
 * @returns An instance of {@link Ban}.
 *
 * @remarks
 * Requires the `BAN_MEMBERS` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-ban}
 */
export async function getBan (
  rest: RestManager,
  guildId: BigString,
  userId: BigString
): Promise<Ban> {
  const result = await rest.runMethod<DiscordBan>(
    rest,
    'GET',
    rest.constants.routes.GUILD_BAN(guildId, userId)
  )

  return {
    reason: result.reason ?? undefined,
    user: rest.transformers.user(rest, result.user)
  }
}
