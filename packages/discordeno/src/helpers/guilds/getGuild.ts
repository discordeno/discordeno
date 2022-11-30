import type { Bot } from '../../bot.js'
import { Guild } from '../../transformers/guild.js'
import { DiscordGuild } from '../../types/discord.js'
import { BigString } from '../../types/shared.js'

/**
 * Gets a guild by its ID.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to get.
 * @param options - The parameters for the fetching of the guild.
 * @returns An instance of {@link Guild}.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild}
 */
export async function getGuild(
  bot: Bot,
  guildId: BigString,
  options: { counts?: boolean } = {
    counts: true
  }
): Promise<Guild> {
  const result = await bot.rest.runMethod<DiscordGuild>(
    bot.rest,
    'GET',
    bot.constants.routes.GUILD(guildId, options.counts)
  )

  return bot.transformers.guild(bot, {
    guild: result,
    shardId: bot.utils.calculateShardId(bot.gateway, bot.transformers.snowflake(guildId))
  })
}
