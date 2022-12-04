import { BigString } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

/**
 * Leaves a guild.
 *
 * @param bot - The bot instance used to make the request
 * @param guildId - The ID of the guild to leave.
 *
 * @remarks
 * Fires a _Guild Delete_ event.
 *
 * @see {@link https://discord.com/developers/docs/resources/user#leave-guild}
 */
export async function leaveGuild (
  rest: RestManager,
  guildId: BigString
): Promise<void> {
  return await rest.runMethod<void>(
    rest,
    'DELETE',
    rest.constants.routes.GUILD_LEAVE(guildId)
  )
}
