import { routes } from '@discordeno/constant'
import type {
  BigString,
  DiscordThreadMember,
  SnakeToCamelCaseNested
} from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../../restManager.js'
import { snakeToCamelCaseNested } from '../../../transformer.js'

/**
 * Gets the list of thread members for a thread.
 *
 * @param rest - The rest manager to use to make the request.
 * @param channelId - The ID of the thread to get the thread members of.
 * @returns A collection of {@link DiscordThreadMember} assorted by user ID.
 *
 * @remarks
 * Requires the application to have the `GUILD_MEMBERS` privileged intent enabled.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#list-thread-members}
 */
export async function getThreadMembers (
  rest: RestManager,
  channelId: BigString
): Promise<Collection<string, SnakeToCamelCaseNested<DiscordThreadMember>>> {
  const results = await rest.runMethod<DiscordThreadMember[]>(
    rest,
    'GET',
    routes.THREAD_MEMBERS(channelId)
  )

  return new Collection(
    results.map((result) => {
      const member = snakeToCamelCaseNested(result)
      return [member.id!, member]
    })
  )
}
