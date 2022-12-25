import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type {
  BigString,
  Camelize,
  DiscordEmoji,
  DiscordModifyGuildEmoji,
  WithReason
} from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

/**
 * Edits an emoji.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild in which to edit the emoji.
 * @param id - The ID of the emoji to edit.
 * @param options - The parameters for the edit of the emoji.
 * @returns An instance of the updated {@link DiscordEmoji}.
 *
 * @remarks
 * Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.
 *
 * Fires a `Guild Emojis Update` gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/emoji#modify-guild-emoji}
 */
export async function editEmoji (
  rest: RestManager,
  guildId: BigString,
  id: BigString,
  options: ModifyGuildEmoji
): Promise<Camelize<DiscordEmoji>> {
  const result = await rest.runMethod<DiscordEmoji>(
    'PATCH',
    routes.GUILD_EMOJI(guildId, id),
    {
      name: options.name,
      // NEED TERNARY TO SUPPORT NULL AS VALID
      roles: options.roles
        ? options.roles.map((role) => role.toString())
        : options.roles,
      reason: options.reason
    } as DiscordModifyGuildEmoji
  )

  return TRANSFORMERS.emoji(result)
}

/** https://discord.com/developers/docs/resources/emoji#modify-guild-emoji */
export interface ModifyGuildEmoji extends WithReason {
  /** Name of the emoji */
  name?: string
  /** Roles allowed to use this emoji */
  roles?: BigString[] | null
}
