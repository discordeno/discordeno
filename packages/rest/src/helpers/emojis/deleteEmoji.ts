import { routes } from '@discordeno/constant'
import type { BigString } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

/**
 * Deletes an emoji from a guild.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild from which to delete the emoji.
 * @param id - The ID of the emoji to delete.
 *
 * @remarks
 * Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.
 *
 * Fires a _Guild Emojis Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/emoji#delete-guild-emoji}
 */
export async function deleteEmoji (
  rest: RestManager,
  guildId: BigString,
  id: BigString,
  reason?: string
): Promise<void> {
  return await rest.runMethod<void>(
    rest,
    'DELETE',
    routes.GUILD_EMOJI(guildId, id),
    {
      reason
    }
  )
}
