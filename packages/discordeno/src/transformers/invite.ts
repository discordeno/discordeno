import { Bot } from '../bot.js'
import { DiscordInviteCreate } from '../types/discord.js'
import { Optionalize } from '../types/shared.js'

export function transformInvite(bot: Bot, invite: DiscordInviteCreate) {
  const transformedInvite = {
    /** The channel the invite is for */
    channelId: bot.transformers.snowflake(invite.channel_id),
    /** The unique invite code */
    code: invite.code,
    /** The time at which the invite was created */
    createdAt: Date.parse(invite.created_at),
    /** The guild of the invite */
    guildId: invite.guild_id ? bot.transformers.snowflake(invite.guild_id) : undefined,
    /** The user that created the invite */
    inviter: (invite.inviter != null) ? bot.transformers.user(bot, invite.inviter) : undefined,
    /** How long the invite is valid for (in seconds) */
    maxAge: invite.max_age,
    /** The maximum number of times the invite can be used */
    maxUses: invite.max_uses,
    /** The type of target for this voice channel invite */
    targetType: invite.target_type,
    /** The target user for this invite */
    targetUser: (invite.target_user != null) ? bot.transformers.user(bot, invite.target_user) : undefined,
    /** The embedded application to open for this voice channel embedded application invite */
    targetApplication: (invite.target_application != null)
      // @ts-expect-error should not break anything even though its partial. if it does blame wolf :)
      ? bot.transformers.application(bot, invite.target_application)
      : undefined,
    /** Whether or not the invite is temporary (invited users will be kicked on disconnect unless they're assigned a role) */
    temporary: invite.temporary,
    /** How many times the invite has been used (always will be 0) */
    uses: invite.uses
  }

  return transformedInvite as Optionalize<typeof transformedInvite>
}

export interface Invite extends ReturnType<typeof transformInvite> { }
