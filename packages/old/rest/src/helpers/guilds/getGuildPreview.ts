import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type {
  BigString,
  DiscordGuildPreview,
  GuildFeatures
} from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import type { Emoji } from '../../transformers/emoji.js'
import type { Sticker } from '../../transformers/sticker.js'

export interface GuildPreview {
  id: BigString
  name?: string
  icon?: string
  splash?: string
  discoverySplash?: string
  emojis?: Emoji[]
  features: GuildFeatures[]
  approximateMemberCount: number
  approximatePresenceCount: number
  description?: string
  stickers: Sticker[]
}

// TODO: Move `GuildPreview` into its own transformer file.

/**
 * Gets the preview of a guild by a guild's ID.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to get the preview of.
 * @returns An instance of {@link GuildPreview}.
 *
 * @remarks
 * If the bot user is not in the guild, the guild must be lurkable.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-preview}
 */
export async function getGuildPreview (
  rest: RestManager,
  guildId: BigString
): Promise<GuildPreview> {
  const result = await rest.runMethod<DiscordGuildPreview>(
    'GET',
    routes.GUILD_PREVIEW(guildId)
  )

  return TRANSFORMERS.preview(result)
}
