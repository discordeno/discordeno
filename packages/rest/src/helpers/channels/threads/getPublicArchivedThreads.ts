import type { BigString, DiscordListArchivedThreads } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../../restManager.js'
import type { ActiveThreads } from './getActiveThreads.js'

/**
 * Gets the list of public archived threads for a channel.
 *
 * @param bot - The bot instance to use to make the request.
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
): Promise<ArchivedThreads> {
  const results = await rest.runMethod<DiscordListArchivedThreads>(
    rest,
    'GET',
    rest.constants.routes.THREAD_ARCHIVED_PUBLIC(channelId, options)
  )

  return {
    threads: new Collection(
      results.threads.map((result) => {
        const thread = rest.transformers.channel(rest, { channel: result })
        return [thread.id, thread]
      })
    ),
    members: new Collection(
      results.members.map((result) => {
        const member = rest.transformers.threadMember(rest, result)
        return [member.id!, member]
      })
    ),
    hasMore: results.has_more
  }
}

/** https://discord.com/developers/docs/resources/channel#list-public-archived-threads-query-string-params */
export interface ListArchivedThreads {
  /** Returns threads before this timestamp */
  before?: number
  /** Optional maximum number of threads to return */
  limit?: number
}

export type ArchivedThreads = ActiveThreads & {
  hasMore: boolean
}
