import type {
  BigString,
  DiscordEmoji,
  SnakeToCamelCaseNested,
  WithReason,
  DiscordModifyGuildEmoji
} from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

/**
 * Edits an emoji.
 *
 * @param bot - The bot instance to use to make the request.
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
): Promise<SnakeToCamelCaseNested<DiscordEmoji>> {
  const result = await rest.runMethod<DiscordEmoji>(
    rest,
    'PATCH',
    rest.constants.routes.GUILD_EMOJI(guildId, id),
    {
      name: options.name,
      // NEED TERNARY TO SUPPORT NULL AS VALID
      roles: options.roles
        ? options.roles.map((role) => role.toString())
        : options.roles,
      reason: options.reason
    } as DiscordModifyGuildEmoji
  )

  return {
    id: result.id,
    name: result.name,
    roles: result.roles,
    user: result.user && {
      id: result.user.id,
      username: result.user.username,
      discriminator: result.user.discriminator,
      avatar: result.user.avatar,
      bot: result.user.bot,
      system: result.user.system,
      mfaEnabled: result.user.mfa_enabled,
      banner: result.user.banner,
      accentColor: result.user.accent_color,
      locale: result.user.locale,
      verified: result.user.verified,
      email: result.user.email,
      flags: result.user.flags,
      premiumType: result.user.premium_type,
      publicFlags: result.user.public_flags
    },
    requireColons: result.require_colons,
    managed: result.managed,
    animated: result.animated,
    available: result.animated
  }
}

/** https://discord.com/developers/docs/resources/emoji#modify-guild-emoji */
export interface ModifyGuildEmoji extends WithReason {
  /** Name of the emoji */
  name?: string
  /** Roles allowed to use this emoji */
  roles?: BigString[] | null
}
