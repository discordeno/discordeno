import type { BigString, DiscordEmoji } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import type { Emoji } from '../../transformers/emoji.js'

/**
 * Gets an emoji by its ID.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild from which to get the emoji.
 * @param emojiId - The ID of the emoji to get.
 * @returns An instance of {@link Emoji}.
 *
 * @see {@link https://discord.com/developers/docs/resources/emoji#get-guild-emoji}
 */
export async function getEmoji (
  rest: RestManager,
  guildId: BigString,
  emojiId: BigString
): Promise<Emoji> {
  const result = await rest.runMethod<DiscordEmoji>(
    rest,
    'GET',
    rest.constants.routes.GUILD_EMOJI(guildId, emojiId)
  )

  return rest.transformers.emoji(rest, result)
}
