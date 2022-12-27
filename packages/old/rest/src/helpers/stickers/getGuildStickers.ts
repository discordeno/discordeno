import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type { BigString, Camelize, DiscordSticker } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'

/**
 * Returns an array of sticker objects for the given guild.
 *
 * @param bot The bot instance to use to make the request.
 * @param guildId The ID of the guild to get
 * @returns A collection of {@link DiscordSticker} objects assorted by sticker ID.
 *
 * @remarks Includes user fields if the bot has the `MANAGE_EMOJIS_AND_STICKERS` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/sticker#list-guild-stickers}
 */
export async function getGuildStickers (
  rest: RestManager,
  guildId: BigString
): Promise<Collection<string, Camelize<DiscordSticker>>> {
  const results = await rest.runMethod<DiscordSticker[]>(
    'GET',
    routes.GUILD_STICKERS(guildId)
  )

  return new Collection(
    results.map((result) => {
      const pack = TRANSFORMERS.sticker(result)
      return [pack.id, pack]
    })
  )
}
