import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type { Camelize, DiscordInviteMetadata, GetInvite } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'

/**
 * Gets an invite to a channel by its invite code.
 *
 * @param rest - The rest manager to use to make the request.
 * @param inviteCode - The invite code of the invite to get.
 * @param options - The parameters for the fetching of the invite.
 * @returns An instance of {@link BaseInvite | Invite}.
 *
 * @see {@link https://discord.com/developers/docs/resources/invite#get-invite}
 */
export async function getInvite (
  rest: RestManager,
  inviteCode: string,
  options?: GetInvite
): Promise<Camelize<DiscordInviteMetadata>> {
  const result = await rest.runMethod<DiscordInviteMetadata>(
    'GET',
    routes.INVITE(inviteCode, options)
  )

  return TRANSFORMERS.invites.metadata(result)
}
