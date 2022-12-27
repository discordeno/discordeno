import { routes } from '@discordeno/constant'
import type { BigString, DiscordListArchivedThreads, ListArchivedThreads } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../../restManager.js'
import { snakeToCamelCaseNested } from '../../../transformer.js'
import type { DiscordActiveThreads } from './getActiveThreads.js'

/**
 * Gets the list of public archived threads for a channel.
 *
 * @param rest - The rest manager to use to make the request.
 * @param channelId - The ID of the channel to get the archived threads for.
 * @param options - The parameters for the fetching of threads.
 * @returns An instance of {@link ArchivedThreads}.
 *
 * @remarks
 * Requires the `READ_MESSAGE_HISTORY` permission.
 *
 * If called on a channel of type {@link ChannelTypes.GuildText}, returns threads of type {@link ChannelTypes.GuildPublicThread}.
 * If called on a channel of type {@link ChannelTypes.GuildNews}, returns threads of type {@link ChannelTypes.GuildNewsThread}.
 *
 * Threads are ordered by the `archive_timestamp` property included in the metadata of the object in descending order.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#list-public-archived-threads}
 */
export async function getPublicArchivedThreads (
  rest: RestManager,
  channelId: BigString,
  options?: ListArchivedThreads
): Promise<DiscordArchivedThreads> {
  const results = await rest.runMethod<DiscordListArchivedThreads>(
    'GET',
    routes.THREAD_ARCHIVED_PUBLIC(channelId, options)
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

export type DiscordArchivedThreads = DiscordActiveThreads & {
  hasMore: boolean
}
