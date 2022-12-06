import type {
  BigString,
  DiscordChannel,
  DiscordListActiveThreads,
  DiscordThreadMember,
  SnakeToCamelCaseNested
} from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../../restManager.js'
import { snakeToCamelCaseNested } from '../../../transformer.js'

/**
 * Gets the list of all active threads for a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to get the threads of.
 * @returns An instance of {@link DiscordActiveThreads}.
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
): Promise<DiscordActiveThreads> {
  const results = await rest.runMethod<DiscordListActiveThreads>(
    rest,
    'GET',
    rest.constants.routes.THREAD_ACTIVE(guildId)
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
    )
  }
}

export interface DiscordActiveThreads {
  threads: Collection<string, SnakeToCamelCaseNested<DiscordChannel>>
  members: Collection<string, SnakeToCamelCaseNested<DiscordThreadMember>>
}
