import { routes } from '@discordeno/constant'
import type { BigString, Camelize, DiscordEmoji } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'

/**
 * Gets the list of emojis for a guild.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild which to get the emojis of.
 * @returns A collection of {@link DiscordEmoji} objects assorted by emoji ID.
 *
 * @see {@link https://discord.com/developers/docs/resources/emoji#list-guild-emojis}
 */
export async function getEmojis (
  rest: RestManager,
  guildId: BigString
): Promise<Collection<string, Camelize<DiscordEmoji>>> {
  const results = await rest.runMethod<DiscordEmoji[]>(
    rest,
    'GET',
    routes.GUILD_EMOJIS(guildId)
  )

  return new Collection(
    results.map((result) => {
      const emoji: Camelize<DiscordEmoji> = {
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
      return [emoji.id!, emoji]
    })
  )
}
