import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type {
  BigString,
  Camelize,
  DiscordCreateGuildEmoji,
  DiscordEmoji,
  WithReason
} from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

/**
 * Creates an emoji in a guild.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild in which to create the emoji.
 * @param options - The parameters for the creation of the emoji.
 * @returns An instance of the created {@link DiscordEmoji}.
 *
 * @remarks
 * Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.
 *
 * Emojis have a maximum file size of 256 kilobits. Attempting to upload a larger emoji will cause the route to return 400 Bad Request.
 *
 * Fires a _Guild Emojis Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/emoji#create-guild-emoji}
 */
export async function createEmoji (
  rest: RestManager,
  guildId: BigString,
  options: CreateGuildEmoji
): Promise<Camelize<DiscordEmoji>> {
  const result = await rest.runMethod<DiscordEmoji>(
    'POST',
    routes.GUILD_EMOJIS(guildId),
    {
      name: options.name,
      image: options.image,
      roles: options.roles?.map((role) => role.toString()),
      reason: options.reason
    } as DiscordCreateGuildEmoji
  )

  return TRANSFORMERS.emoji(result)
}

/** https://discord.com/developers/docs/resources/emoji#create-guild-emoji */
export interface CreateGuildEmoji extends WithReason {
  /** Name of the emoji */
  name: string
  /** The 128x128 emoji image. Emojis and animated emojis have a maximum file size of 256kb. Attempting to upload an emoji larger than this limit will fail and return 400 Bad Request and an error message, but not a JSON status code. If a URL is provided to the image parameter, Discordeno will automatically convert it to a base64 string internally. */
  image: string
  /** Roles allowed to use this emoji */
  roles?: BigString[]
}
