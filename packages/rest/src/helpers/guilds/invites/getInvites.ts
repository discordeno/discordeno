import { routes } from '@discordeno/constant'
import type { BigString, DiscordInviteMetadata } from '@discordeno/types'
import { TargetTypes } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../../restManager.js'
import type { InviteMetadata } from './getInvite.js'

/**
 * Gets the list of invites for a guild.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to get the invites from.
 * @returns A collection of {@link InviteMetadata | Invite} objects assorted by invite code.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/invite#get-invites}
 */
export async function getInvites (
  rest: RestManager,
  guildId: BigString
): Promise<Collection<string, InviteMetadata>> {
  const results = await rest.runMethod<DiscordInviteMetadata[]>(

    'GET',
    routes.GUILD_INVITES(guildId)
  )

  return new Collection(
    results.map<[string, InviteMetadata]>((result) => {
      const inviteMetadata = {
        code: result.code,
        guildId: result.guild?.id
          ? rest.transformers.snowflake(result.guild.id)
          : undefined,
        channelId: result.channel?.id
          ? rest.transformers.snowflake(result.channel.id)
          : undefined,
        inviter: result.inviter
          ? rest.transformers.user(rest, result.inviter)
          : undefined,
        targetType: result.target_type
          ? result.target_type === 1
            ? TargetTypes.Stream
            : TargetTypes.EmbeddedApplication
          : undefined,
        targetUser: result.target_user
          ? rest.transformers.user(rest, result.target_user)
          : undefined,
        targetApplicationId: result.target_application?.id
          ? rest.transformers.snowflake(result.target_application.id)
          : undefined,
        approximatePresenceCount: result.approximate_presence_count,
        approximateMemberCount: result.approximate_member_count,
        expiresAt: result.expires_at
          ? Date.parse(result.expires_at)
          : undefined,
        guildScheduledEvent: result.guild_scheduled_event
          ? rest.transformers.scheduledEvent(rest, result.guild_scheduled_event)
          : undefined,
        // Metadata structure
        uses: result.uses,
        maxUses: result.max_uses,
        maxAge: result.max_age,
        temporary: result.temporary,
        createdAt: Date.parse(result.created_at)
      }
      return [inviteMetadata.code, inviteMetadata]
    })
  )
}
