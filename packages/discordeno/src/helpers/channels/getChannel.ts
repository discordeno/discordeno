import type { Bot } from '../../bot.js'
import { Channel } from '../../transformers/channel.js'
import { DiscordChannel } from '../../types/discord.js'
import { BigString } from '../../types/shared.js'

/**
 * Gets a channel by its ID.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel to get.
 * @returns An instance of {@link Channel}.
 *
 * @remarks
 * If the channel is a thread, a {@link ThreadMember} object is included in the result.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#get-channel}
 */
export async function getChannel(bot: Bot, channelId: BigString): Promise<Channel> {
  const result = await bot.rest.runMethod<DiscordChannel>(
    bot.rest,
    'GET',
    bot.constants.routes.CHANNEL(channelId)
  )

  // IF A CHANNEL DOESN'T EXIST, DISCORD RETURNS `{}`
  return bot.transformers.channel(bot, {
    channel: result,
    guildId: result.guild_id ? bot.transformers.snowflake(result.guild_id) : undefined
  })
}
