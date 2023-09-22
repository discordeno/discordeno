import type { DiscordApplication, DiscordInviteCreate } from '@discordeno/types'
import type { Application, Bot, User } from '../index.js'

export function transformInvite(bot: Bot, payload: DiscordInviteCreate): Invite {
  const props = bot.transformers.desiredProperties.invite
  const invite = {} as Invite

  if (props.channelId && payload.channel_id) invite.channelId = bot.transformers.snowflake(payload.channel_id)
  if (props.code && payload.code) invite.code = payload.code
  if (props.createdAt && payload.created_at) invite.createdAt = Date.parse(payload.created_at)
  if (props.guildId && payload.guild_id) invite.guildId = bot.transformers.snowflake(payload.guild_id)
  if (props.inviter && payload.inviter) invite.inviter = bot.transformers.user(bot, payload.inviter)
  if (props.maxAge && payload.max_age) invite.maxAge = payload.max_age
  if (props.maxUses && payload.max_uses) invite.maxUses = payload.max_uses
  if (props.targetType && payload.target_type) invite.targetType = payload.target_type
  if (props.targetUser && payload.target_user) invite.targetUser = bot.transformers.user(bot, payload.target_user)
  if (props.targetApplication && payload.target_application)
    invite.targetApplication = bot.transformers.application(bot, payload.target_application as DiscordApplication)
  if (props.temporary && payload.temporary) invite.temporary = payload.temporary
  if (props.uses && payload.uses) invite.uses = payload.uses

  return bot.transformers.customizers.invite(bot, payload, invite)
}

export interface Invite {
  /** The channel the invite is for */
  channelId: bigint
  /** The unique invite code */
  code: string
  /** The time at which the invite was created */
  createdAt: number
  /** The guild of the invite */
  guildId?: bigint
  /** The user that created the invite */
  inviter?: User
  /** How long the invite is valid for (in seconds) */
  maxAge: number
  /** The maximum number of times the invite can be used */
  maxUses: number
  /** The type of target for this voice channel invite */
  targetType: number
  /** The target user for this invite */
  targetUser: User
  /** The embedded application to open for this voice channel embedded application invite */
  targetApplication?: Application
  /** Whether or not the invite is temporary (invited users will be kicked on disconnect unless they're assigned a role) */
  temporary: boolean
  /** How many times the invite has been used (always will be 0) */
  uses: number
}
