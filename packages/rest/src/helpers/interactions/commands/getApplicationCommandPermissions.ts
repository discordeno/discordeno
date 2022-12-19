import { routes } from '@discordeno/constant'
import type {
  BigString,
  DiscordGuildApplicationCommandPermissions
} from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../../restManager.js'
import type { ApplicationCommandPermission } from '../../../transformers/applicationCommandPermission.js'

/**
 * Gets the permissions of all application commands registered in a guild by the ID of the guild.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to get the permissions objects of.
 * @returns A collection of {@link ApplicationCommandPermission} objects assorted by command ID.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command-permissions}
 */
export async function getApplicationCommandPermissions (
  rest: RestManager,
  guildId: BigString
): Promise<Collection<bigint, ApplicationCommandPermission>> {
  const results = await rest.runMethod<
  DiscordGuildApplicationCommandPermissions[]
  >(
    rest,
    'GET',
    routes.COMMANDS_PERMISSIONS(rest.applicationId, guildId)
  )

  return new Collection(
    results.map((result) => {
      const permission = rest.transformers.applicationCommandPermission(
        rest,
        result
      )
      return [permission.id, permission]
    })
  )
}
