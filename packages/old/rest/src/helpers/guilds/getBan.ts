import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type { BigString, Camelize, DiscordBan } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

// TODO: Move `Ban` into its own transformer file.

/**
 * Gets a ban by user ID.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to get the ban from.
 * @param userId - The ID of the user to get the ban for.
 * @returns An instance of {@link DiscordBan}.
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
): Promise<Camelize<DiscordBan>> {
  const result = await rest.runMethod<DiscordBan>(
    'GET',
    routes.GUILD_BAN(guildId, userId)
  )

  return {
    reason: result.reason,
    user: TRANSFORMERS.user(result.user)
  }
}
