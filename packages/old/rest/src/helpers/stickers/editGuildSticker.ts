import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type {
  AtLeastOne,
  BigString,
  Camelize,
  DiscordEditGuildStickerOptions,
  DiscordSticker,
  WithReason
} from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

/**
 * Edit the given sticker.
 *
 * @param bot The bot instance to use to make the request.
 * @param guildId The ID of the guild to get
 * @return A {@link DiscordSticker}
 *
 * @remarks
 * Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.
 * Fires a Guild Stickers Update Gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/sticker#modify-guild-sticker}
 */
export async function editGuildSticker (
  rest: RestManager,
  guildId: BigString,
  stickerId: BigString,
  options: AtLeastOne<EditGuildStickerOptions>
): Promise<Camelize<DiscordSticker>> {
  const result = await rest.runMethod<DiscordSticker>(
    'PATCH',
    routes.GUILD_STICKER(guildId, stickerId),
    {
      name: options.name,
      description: options.description,
      tags: options.tags,
      reason: options.reason
    } as DiscordEditGuildStickerOptions
  )
  return TRANSFORMERS.sticker(result)
}

export interface EditGuildStickerOptions extends WithReason {
  /** Name of the sticker (2-30 characters) */
  name?: string
  /** Description of the sticker (empty or 2-100 characters) */
  description?: string | null
  /** Autocomplete/suggestion tags for the sticker (max 200 characters) */
  tags?: string
}
