import type { Bot } from '../../../bot.js'
import { ThreadMember } from '../../../transformers/threadMember.js'
import { DiscordThreadMember } from '../../../types/discord.js'
import { BigString } from '../../../types/shared.js'

/**
 * Gets a thread member by their user ID.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the thread to get the thread member of.
 * @param userId - The user ID of the thread member to get.
 * @returns An instance of {@link ThreadMember}.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#get-thread-member}
 */
export async function getThreadMember (bot: Bot, channelId: BigString, userId: BigString): Promise<ThreadMember> {
  const result = await bot.rest.runMethod<DiscordThreadMember>(
    bot.rest,
    'GET',
    bot.constants.routes.THREAD_USER(channelId, userId)
  )

  return bot.transformers.threadMember(bot, result)
}
