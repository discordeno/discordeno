import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type { BigString, Camelize, DiscordInviteMetadata } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../../restManager.js'

/**
 * Gets the list of invites for a guild.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to get the invites from.
 * @returns A collection of {@link InviteMetadata | Invite} objects assorted by invite code.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/invite#get-invites}
 */
export async function getInvites (
  rest: RestManager,
  guildId: BigString
): Promise<Collection<string, Camelize<DiscordInviteMetadata>>> {
  const results = await rest.runMethod<DiscordInviteMetadata[]>(
    'GET',
    routes.GUILD_INVITES(guildId)
  )

  return new Collection(
    results.map<[string, Camelize<DiscordInviteMetadata>]>((result) => {
      const inviteMetadata = TRANSFORMERS.invites.metadata(result)
      return [inviteMetadata.code, inviteMetadata]
    })
  )
}
