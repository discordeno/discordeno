import { routes } from '@discordeno/constant'
import type { BigString, Camelize, DiscordEmoji } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

/**
 * Gets an emoji by its ID.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild from which to get the emoji.
 * @param emojiId - The ID of the emoji to get.
 * @returns An instance of {@link DiscordEmoji}.
 *
 * @see {@link https://discord.com/developers/docs/resources/emoji#get-guild-emoji}
 */
export async function getEmoji (
  rest: RestManager,
  guildId: BigString,
  emojiId: BigString
): Promise<Camelize<DiscordEmoji>> {
  const result = await rest.runMethod<DiscordEmoji>(
    rest,
    'GET',
    routes.GUILD_EMOJI(guildId, emojiId)
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
