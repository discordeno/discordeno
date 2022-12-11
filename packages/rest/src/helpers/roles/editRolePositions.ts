import type { BigString, DiscordRole, DiscordModifyRolePositions } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'
import type { Role } from '../../transformers/role.js'

/**
 * Edits the positions of a set of roles.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to edit the role positions in.
 * @param options - The parameters for the edit of the role positions.
 * @returns A collection of {@link Role} objects assorted by role ID.
 *
 * @remarks
 * Requires the `MANAGE_ROLES` permission.
 *
 * Fires a _Guild Role Update_ gateway event for every role impacted in this change.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#modify-guild-role-positions}
 */
export async function modifyRolePositions (
  rest: RestManager,
  guildId: BigString,
  options: ModifyRolePositions[]
): Promise<Collection<bigint, Role>> {
  const results = await rest.runMethod<DiscordRole[]>(
    rest,
    'PATCH',
    rest.constants.routes.GUILD_ROLES(guildId),
    options as DiscordModifyRolePositions[]
  )

  const id = rest.transformers.snowflake(guildId)

  return new Collection(
    results.map((result) => {
      const role = rest.transformers.role(rest, { role: result, guildId: id })
      return [role.id, role]
    })
  )
}

export interface ModifyRolePositions {
  /** The role id */
  id: BigString
  /** The sorting position for the role. */
  position?: number | null
}
