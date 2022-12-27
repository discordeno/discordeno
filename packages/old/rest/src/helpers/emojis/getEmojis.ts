import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type { BigString, Camelize, DiscordEmoji } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'

/**
 * Gets the list of emojis for a guild.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild which to get the emojis of.
 * @returns A collection of {@link DiscordEmoji} objects assorted by emoji ID.
 *
 * @see {@link https://discord.com/developers/docs/resources/emoji#list-guild-emojis}
 */
export async function getEmojis (
  rest: RestManager,
  guildId: BigString
): Promise<Collection<string, Camelize<DiscordEmoji>>> {
  const results = await rest.runMethod<DiscordEmoji[]>(
    'GET',
    routes.GUILD_EMOJIS(guildId)
  )

  return new Collection(
    results.map((result) => {
      const emoji = TRANSFORMERS.emoji(result)
      return [emoji.id!, emoji]
    })
  )
}
