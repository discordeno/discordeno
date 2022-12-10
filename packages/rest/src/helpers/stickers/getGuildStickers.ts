import type { DiscordSticker } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'
import type { Sticker } from '../../transformers/sticker.js'

/**
 * Returns an array of sticker objects for the given guild.
 *
 * @param bot The bot instance to use to make the request.
 * @param guildId The ID of the guild to get
 * @returns A collection of {@link Sticker} objects assorted by sticker ID.
 *
 * @remarks Includes user fields if the bot has the `MANAGE_EMOJIS_AND_STICKERS` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/sticker#list-guild-stickers}
 */
export async function getGuildStickers (
  rest: RestManager,
  guildId: bigint
): Promise<Collection<bigint, Sticker>> {
  const results = await rest.runMethod<DiscordSticker[]>(
    rest,
    'GET',
    rest.constants.routes.GUILD_STICKERS(guildId)
  )

  return new Collection(
    results.map((result) => {
      const pack = rest.transformers.sticker(rest, result)
      return [pack.id, pack]
    })
  )
}
