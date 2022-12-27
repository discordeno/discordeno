import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type {
  BigString,
  Camelize,
  DiscordModifyRolePositions,
  DiscordRole
} from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'

/**
 * Edits the positions of a set of roles.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to edit the role positions in.
 * @param options - The parameters for the edit of the role positions.
 * @returns A collection of {@link DiscordRole} objects assorted by role ID.
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
): Promise<Collection<string, Camelize<DiscordRole>>> {
  const results = await rest.runMethod<DiscordRole[]>(
    'PATCH',
    routes.GUILD_ROLES(guildId),
    options as DiscordModifyRolePositions[]
  )

  return new Collection(
    results.map((result) => {
      const role = TRANSFORMERS.role(result)
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
