import type { DiscordApplication, DiscordInviteCreate, DiscordInviteMetadata } from '@discordeno/types'
import { checkIfExists, isInviteWithMetadata, type Application, type Bot, type ScheduledEvent, type User } from '../index.js'
import type { InviteStageInstance } from './stageInviteInstance.js'

export function transformInvite(bot: Bot, payload: DiscordInviteCreate | DiscordInviteMetadata): Invite {
  const props = bot.transformers.desiredProperties.invite
  const invite = {} as Invite
  const hasMetadata = isInviteWithMetadata(payload)

  if (props.code && checkIfExists(payload.code)) invite.code = payload.code
  if (props.createdAt && checkIfExists(payload.created_at)) invite.createdAt = Date.parse(payload.created_at)
  if (props.inviter && checkIfExists(payload.inviter)) invite.inviter = bot.transformers.user(bot, payload.inviter)
  if (props.maxAge && checkIfExists(payload.max_age)) invite.maxAge = payload.max_age
  if (props.maxUses && checkIfExists(payload.max_uses)) invite.maxUses = payload.max_uses
  if (props.targetType && checkIfExists(payload.target_type)) invite.targetType = payload.target_type
  if (props.targetUser && checkIfExists(payload.target_user)) invite.targetUser = bot.transformers.user(bot, payload.target_user)
  if (props.targetApplication && checkIfExists(payload.target_application))
    invite.targetApplication = bot.transformers.application(bot, payload.target_application as DiscordApplication)
  if (props.temporary && checkIfExists(payload.temporary)) invite.temporary = payload.temporary
  if (props.uses && checkIfExists(payload.uses)) invite.uses = payload.uses

  if (hasMetadata) {
    if (props.channelId && checkIfExists(payload.channel) && checkIfExists(payload.channel.id))
      invite.channelId = bot.transformers.snowflake(payload.channel.id)
    if (props.guildId && checkIfExists(payload.guild) && checkIfExists(payload.guild.id))
      invite.guildId = bot.transformers.snowflake(payload.guild.id)
    if (props.approximateMemberCount && checkIfExists(payload.approximate_member_count))
      invite.approximateMemberCount = payload.approximate_member_count
    if (props.approximatePresenceCount && checkIfExists(payload.approximate_presence_count))
      invite.approximatePresenceCount = payload.approximate_presence_count
    if (props.guildScheduledEvent && checkIfExists(payload.guild_scheduled_event)) {
      invite.guildScheduledEvent = payload.guild_scheduled_event ? bot.transformers.scheduledEvent(bot, payload.guild_scheduled_event) : undefined
    }
    if (props.stageInstance && checkIfExists(invite.guildId) && checkIfExists(payload.stage_instance)) {
      invite.stageInstance = payload.stage_instance
        ? bot.transformers.inviteStageInstance(bot, {
            ...payload.stage_instance,
            guildId: invite.guildId,
          })
        : undefined
    }
    if (props.expiresAt && checkIfExists(payload.expires_at)) {
      invite.expiresAt = Date.parse(payload.expires_at)
    }
  } else {
    if (props.channelId && checkIfExists(payload.channel_id)) invite.channelId = bot.transformers.snowflake(payload.channel_id)
    if (props.guildId && checkIfExists(payload.guild_id)) invite.guildId = bot.transformers.snowflake(payload.guild_id)
  }

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
  /** Approximate count of online members (only present when target_user is set) */
  approximateMemberCount: number
  /** Stage instance data if there is a public Stage instance in the Stage channel this invite is for */
  stageInstance?: InviteStageInstance
  /** The expiration date of this invite, returned from the GET /invites/code endpoint when with_expiration is true */
  expiresAt?: number
  /** guild scheduled event data */
  guildScheduledEvent?: ScheduledEvent
  /** Approximate count of online members (only present when target_user is set) */
  approximatePresenceCount?: number
}
