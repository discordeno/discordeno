import { BigString, DiscordEmoji } from '@discordeno/types'
import type { Bot } from '../../bot.js'
import { Emoji } from '../../transformers/emoji.js'
import { Collection } from '../../util/collection.js'

/**
 * Gets the list of emojis for a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild which to get the emojis of.
 * @returns A collection of {@link Emoji} objects assorted by emoji ID.
 *
 * @see {@link https://discord.com/developers/docs/resources/emoji#list-guild-emojis}
 */
export async function getEmojis (bot: Bot, guildId: BigString): Promise<Collection<bigint, Emoji>> {
  const results = await bot.rest.runMethod<DiscordEmoji[]>(
    bot.rest,
    'GET',
    bot.constants.routes.GUILD_EMOJIS(guildId)
  )

  return new Collection(
    results.map((result) => {
      const emoji = bot.transformers.emoji(bot, result)
      return [emoji.id!, emoji]
    })
  )
}
