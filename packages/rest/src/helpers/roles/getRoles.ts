import type { BigString, DiscordRole } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'
import type { Role } from '../../transformers/role.js'

/**
 * Gets the list of roles for a guild.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to get the list of roles for.
 * @returns A collection of {@link Role} objects assorted by role ID.
 *
 * @remarks
 * ⚠️ This endpoint should be used sparingly due to {@link User} objects already being included in guild payloads.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-roles}
 */
export async function getRoles (
  rest: RestManager,
  guildId: BigString
): Promise<Collection<bigint, Role>> {
  const results = await rest.runMethod<DiscordRole[]>(
    rest,
    'GET',
    rest.constants.routes.GUILD_ROLES(guildId)
  )
  const id = rest.transformers.snowflake(guildId)

  return new Collection(
    results.map((result) => {
      const role = rest.transformers.role(rest, { role: result, guildId: id })
      return [role.id, role]
    })
  )
}
