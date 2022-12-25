import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type { BigString, Camelize, DiscordSticker } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

/**
 * Returns a sticker object for the given sticker ID.
 *
 * @param bot The bot instance to use to make the request.
 * @param stickerId The ID of the sticker to get
 * @returns A {@link DiscordSticker}
 *
 * @see {@link https://discord.com/developers/docs/resources/sticker#get-sticker}
 */
export async function getSticker (
  rest: RestManager,
  stickerId: BigString
): Promise<Camelize<DiscordSticker>> {
  const result = await rest.runMethod<DiscordSticker>(
    'GET',
    routes.STICKER(stickerId)
  )

  return TRANSFORMERS.sticker(result)
}
