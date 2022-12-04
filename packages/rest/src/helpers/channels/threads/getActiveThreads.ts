import { BigString, DiscordListActiveThreads } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../../restManager.js'
import { Channel } from '../../../transformers/channel.js'
import { ThreadMember } from '../../../transformers/threadMember.js'

/**
 * Gets the list of all active threads for a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to get the threads of.
 * @returns An instance of {@link ActiveThreads}.
 *
 * @remarks
 * Returns both public and private threads.
 *
 * Threads are ordered by the `id` property in descending order.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#list-active-guild-threads}
 */
export async function getActiveThreads (
  rest: RestManager,
  guildId: BigString
): Promise<ActiveThreads> {
  const results = await rest.runMethod<DiscordListActiveThreads>(
    rest,
    'GET',
    rest.constants.routes.THREAD_ACTIVE(guildId)
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
    )
  }
}

export interface ActiveThreads {
  threads: Collection<bigint, Channel>
  members: Collection<bigint, ThreadMember>
}
