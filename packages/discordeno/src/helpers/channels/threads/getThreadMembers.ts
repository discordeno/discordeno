import type { Bot } from '../../../bot.js'
import { ThreadMember } from '../../../transformers/threadMember.js'
import { DiscordThreadMember } from '../../../types/discord.js'
import { BigString } from '../../../types/shared.js'
import { Collection } from '../../../util/collection.js'

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
export async function getThreadMembers(bot: Bot, channelId: BigString): Promise<Collection<bigint, ThreadMember>> {
  const results = await bot.rest.runMethod<DiscordThreadMember[]>(
    bot.rest,
    'GET',
    bot.constants.routes.THREAD_MEMBERS(channelId)
  )

  return new Collection(
    results.map((result) => {
      const member = bot.transformers.threadMember(bot, result)
      return [member.id!, member]
    })
  )
}
