import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type { BigString, Camelize, DiscordEmoji } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

/**
 * Gets an emoji by its ID.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild from which to get the emoji.
 * @param emojiId - The ID of the emoji to get.
 * @returns An instance of {@link DiscordEmoji}.
 *
 * @see {@link https://discord.com/developers/docs/resources/emoji#get-guild-emoji}
 */
export async function getEmoji (
  rest: RestManager,
  guildId: BigString,
  emojiId: BigString
): Promise<Camelize<DiscordEmoji>> {
  const result = await rest.runMethod<DiscordEmoji>(
    'GET',
    routes.GUILD_EMOJI(guildId, emojiId)
  )

  return TRANSFORMERS.emoji(result)
}
