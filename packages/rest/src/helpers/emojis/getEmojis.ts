import { BigString, DiscordEmoji } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'
import { Emoji } from '../../transformers/emoji.js'

/**
 * Gets the list of emojis for a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild which to get the emojis of.
 * @returns A collection of {@link Emoji} objects assorted by emoji ID.
 *
 * @see {@link https://discord.com/developers/docs/resources/emoji#list-guild-emojis}
 */
export async function getEmojis (
  rest: RestManager,
  guildId: BigString
): Promise<Collection<bigint, Emoji>> {
  const results = await rest.runMethod<DiscordEmoji[]>(
    rest,
    'GET',
    rest.constants.routes.GUILD_EMOJIS(guildId)
  )

  return new Collection(
    results.map((result) => {
      const emoji = rest.transformers.emoji(rest, result)
      return [emoji.id!, emoji]
    })
  )
}
