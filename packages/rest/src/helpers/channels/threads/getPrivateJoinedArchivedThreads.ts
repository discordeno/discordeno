import type { BigString, DiscordListArchivedThreads } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../../restManager.js'
import { snakeToCamelCaseNested } from '../../../transformer.js'
import type {
  DiscordArchivedThreads,
  ListArchivedThreads
} from './getPublicArchivedThreads.js'

/**
 * Gets the list of private archived threads the bot is a member of for a channel.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel to get the archived threads for.
 * @param options - The parameters for the fetching of threads.
 * @returns An instance of {@link DiscordArchivedThreads}.
 *
 * @remarks
 * Requires the `READ_MESSAGE_HISTORY` permission.
 *
 * Returns threads of type {@link ChannelTypes.GuildPrivateThread}.
 *
 * Threads are ordered by the `id` property in descending order.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#list-joined-private-archived-threads}
 */
export async function getPrivateJoinedArchivedThreads (
  rest: RestManager,
  channelId: BigString,
  options?: ListArchivedThreads
): Promise<DiscordArchivedThreads> {
  const results = await rest.runMethod<DiscordListArchivedThreads>(
    rest,
    'GET',
    rest.constants.routes.THREAD_ARCHIVED_PRIVATE_JOINED(channelId, options)
  )

  return {
    threads: new Collection(
      results.threads.map((result) => {
        const thread = snakeToCamelCaseNested(result)
        return [thread.id, thread]
      })
    ),
    members: new Collection(
      results.members.map((result) => {
        const member = snakeToCamelCaseNested(result)
        return [member.id!, member]
      })
    ),
    hasMore: results.has_more
  }
}
