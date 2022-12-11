import type { BigString } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

/**
 * Deletes a guild.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to delete.
 *
 * @remarks
 * The bot user must be the owner of the guild.
 *
 * Fires a _Guild Delete_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#delete-guild}
 */
export async function deleteGuild (
  rest: RestManager,
  guildId: BigString
): Promise<void> {
  return await rest.runMethod<void>(
    rest,
    'DELETE',
    rest.constants.routes.GUILD(guildId)
  )
}
