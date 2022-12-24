import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type { BigString, Camelize, DiscordSticker } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

/**
 * Returns a sticker object for the given guild and sticker IDs.
 *
 * @param bot The bot instance to use to make the request.
 * @param guildId The ID of the guild to get
 * @param stickerId The ID of the sticker to get
 * @return A {@link DiscordSticker}
 *
 * @remarks Includes the user field if the bot has the `MANAGE_EMOJIS_AND_STICKERS` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/sticker#get-guild-sticker}
 */
export async function getGuildSticker (
  rest: RestManager,
  guildId: BigString,
  stickerId: BigString
): Promise<Camelize<DiscordSticker>> {
  const result = await rest.runMethod<DiscordSticker>(
    'GET',
    routes.GUILD_STICKER(guildId, stickerId)
  )
  return TRANSFORMERS.sticker(result)
}
