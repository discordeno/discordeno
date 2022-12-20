import { routes } from '@discordeno/constant'
import type { DiscordSticker } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import type { Sticker } from '../../transformers/sticker.js'

/**
 * Returns a sticker object for the given sticker ID.
 *
 * @param bot The bot instance to use to make the request.
 * @param stickerId The ID of the sticker to get
 * @returns A {@link Sticker}
 *
 * @see {@link https://discord.com/developers/docs/resources/sticker#get-sticker}
 */
export async function getSticker (
  rest: RestManager,
  stickerId: bigint
): Promise<Sticker> {
  const result = await rest.runMethod<DiscordSticker>(

    'GET',
    routes.STICKER(stickerId)
  )

  return rest.transformers.sticker(rest, result)
}
