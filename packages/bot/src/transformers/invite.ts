import type {
  DiscordApplication,
  DiscordInviteCreate,
  DiscordInviteMetadata,
  DiscordInviteStageInstance,
  DiscordScheduledEvent,
} from '@discordeno/types'
import type { Application, Bot, ScheduledEvent, User } from '../index.js'
import type { InviteStageInstance } from './stageInviteInstance.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformInvite(bot: Bot, payload: DiscordInviteCreate | DiscordInviteMetadata) {
  const props = bot.transformers.desiredProperties.invite
  const invite = {} as Invite
  if ((props.channelId && (<DiscordInviteCreate>payload).channel_id) || (<DiscordInviteMetadata>payload).channel?.id)
    invite.channelId = bot.transformers.snowflake((<DiscordInviteCreate>payload).channel_id || <string>(<DiscordInviteMetadata>payload).channel?.id)
  if (props.code && payload.code) invite.code = payload.code
  if (props.createdAt && payload.created_at) invite.createdAt = Date.parse(payload.created_at)
  if (props.guildId && ((<DiscordInviteCreate>payload).guild_id ?? (<DiscordInviteMetadata>payload).guild?.id))
    invite.guildId = bot.transformers.snowflake((<DiscordInviteCreate>payload).guild_id ?? <string>(<DiscordInviteMetadata>payload).guild?.id)
  if (props.inviter && payload.inviter) invite.inviter = bot.transformers.user(bot, payload.inviter)
  if (props.maxAge && payload.max_age) invite.maxAge = payload.max_age
  if (props.maxUses && payload.max_uses) invite.maxUses = payload.max_uses
  if (props.targetType && payload.target_type) invite.targetType = payload.target_type
  if (props.targetUser && payload.target_user) invite.targetUser = bot.transformers.user(bot, payload.target_user)
  if (props.targetApplication && payload.target_application)
    invite.targetApplication = bot.transformers.application(bot, payload.target_application as DiscordApplication)
  if (props.temporary && payload.temporary) invite.temporary = payload.temporary
  if (props.uses && payload.uses) invite.uses = payload.uses

  if (props.approximateMemberCount && (<DiscordInviteMetadata>payload).approximate_member_count)
    invite.approximateMemberCount = <number>(<DiscordInviteMetadata>payload).approximate_member_count

  if (props.approximatePresenceCount && (<DiscordInviteMetadata>payload).approximate_presence_count)
    invite.approximatePresenceCount = (<DiscordInviteMetadata>payload).approximate_presence_count
  if (props.guildScheduledEvent && (<DiscordInviteMetadata>payload).guild_scheduled_event) {
    invite.guildScheduledEvent = (<DiscordInviteMetadata>payload).guild_scheduled_event
      ? bot.transformers.scheduledEvent(bot, <DiscordScheduledEvent>(<DiscordInviteMetadata>payload).guild_scheduled_event)
      : undefined
  }
  if (props.stageInstance && invite.guildId && (<DiscordInviteMetadata>payload).stage_instance) {
    invite.stageInstance = (<DiscordInviteMetadata>payload).stage_instance
      ? bot.transformers.inviteStageInstance(bot, {
          ...(<DiscordInviteStageInstance>(<DiscordInviteMetadata>payload).stage_instance),
          guildId: invite.guildId,
        })
      : undefined
  }
  if (props.expiresAt && (<DiscordInviteMetadata>payload).expires_at) {
    invite.expiresAt = Date.parse(<string>(<DiscordInviteMetadata>payload).expires_at)
  }
  return invite
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
  /** The expiration date of this invite, returned from the GET /invites/<code> endpoint when with_expiration is true */
  expiresAt?: number
  /** guild scheduled event data */
  guildScheduledEvent?: ScheduledEvent
  /** Approximate count of online members (only present when target_user is set) */
  approximatePresenceCount?: number
}
