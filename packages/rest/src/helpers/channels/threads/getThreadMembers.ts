import type { BigString, DiscordThreadMember } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../../restManager.js'
import type { ThreadMember } from '../../../transformers/threadMember.js'

/**
 * Gets the list of thread members for a thread.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the thread to get the thread members of.
 * @returns A collection of {@link ThreadMember} assorted by user ID.
 *
 * @remarks
 * Requires the application to have the `GUILD_MEMBERS` privileged intent enabled.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#list-thread-members}
 */
export async function getThreadMembers (
  rest: RestManager,
  channelId: BigString
): Promise<Collection<bigint, ThreadMember>> {
  const results = await rest.runMethod<DiscordThreadMember[]>(
    rest,
    'GET',
    rest.constants.routes.THREAD_MEMBERS(channelId)
  )

  return new Collection(
    results.map((result) => {
      const member = rest.transformers.threadMember(rest, result)
      return [member.id!, member]
    })
  )
}
