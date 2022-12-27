import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type { BigString, Camelize, DiscordRole } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'

/**
 * Gets the list of roles for a guild.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to get the list of roles for.
 * @returns A collection of {@link DisorcRole} objects assorted by role ID.
 *
 * @remarks
 * ⚠️ This endpoint should be used sparingly due to {@link User} objects already being included in guild payloads.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-roles}
 */
export async function getRoles (
  rest: RestManager,
  guildId: BigString
): Promise<Collection<string, Camelize<DiscordRole>>> {
  const results = await rest.runMethod<DiscordRole[]>(
    'GET',
    routes.GUILD_ROLES(guildId)
  )

  return new Collection(
    results.map((result) => {
      const role = TRANSFORMERS.role(result)
      return [role.id, role]
    })
  )
}
