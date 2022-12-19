import { routes } from '@discordeno/constant'
import type { DiscordStickerPack } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'
import type { StickerPack } from '../../transformers/sticker.js'

/**
 * Returns the list of sticker packs available to Nitro subscribers.
 *
 * @param bot The bot instance to use to make the request.
 * @returns A collection of {@link StickerPack} objects assorted by sticker ID.
 *
 * @see {@link https://discord.com/developers/docs/resources/sticker#list-nitro-sticker-packs}
 */
export async function getNitroStickerPacks (
  rest: RestManager
): Promise<Collection<bigint, StickerPack>> {
  const results = await rest.runMethod<DiscordStickerPack[]>(
    rest,
    'GET',
    routes.NITRO_STICKER_PACKS()
  )

  return new Collection(
    results.map((result) => {
      const pack = rest.transformers.stickerPack(rest, result)
      return [pack.id, pack]
    })
  )
}
