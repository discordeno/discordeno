import type { DiscordApplication, DiscordInviteCreate, DiscordInviteMetadata } from '@discordeno/types'
import { type InternalBot, type Invite, isInviteWithMetadata } from '../index.js'

export function transformInvite(
  bot: InternalBot,
  payload: { invite: DiscordInviteCreate | DiscordInviteMetadata; shardId: number },
): typeof bot.transformers.$inferredTypes.invite {
  const props = bot.transformers.desiredProperties.invite
  const invite = {} as Invite

  if (props.type && 'type' in payload.invite) invite.type = payload.invite.type
  if (props.code && payload.invite.code) invite.code = payload.invite.code
  if (props.createdAt && payload.invite.created_at) invite.createdAt = Date.parse(payload.invite.created_at)
  if (props.inviter && payload.invite.inviter) invite.inviter = bot.transformers.user(bot, payload.invite.inviter)
  if (props.maxAge) invite.maxAge = payload.invite.max_age
  if (props.maxUses) invite.maxUses = payload.invite.max_uses
  if (props.targetType && payload.invite.target_type) invite.targetType = payload.invite.target_type
  if (props.targetUser && payload.invite.target_user) invite.targetUser = bot.transformers.user(bot, payload.invite.target_user)
  if (props.targetApplication && payload.invite.target_application)
    invite.targetApplication = bot.transformers.application(bot, {
      application: payload.invite.target_application as DiscordApplication,
      shardId: payload.shardId,
    })
  if (props.temporary && payload.invite.temporary) invite.temporary = payload.invite.temporary
  if (props.uses && payload.invite.uses) invite.uses = payload.invite.uses

  if (isInviteWithMetadata(payload.invite)) {
    if (props.channelId && payload.invite.channel?.id) invite.channelId = bot.transformers.snowflake(payload.invite.channel.id)
    if (props.guildId && payload.invite.guild?.id) invite.guildId = bot.transformers.snowflake(payload.invite.guild.id)
    if (props.approximateMemberCount && payload.invite.approximate_member_count)
      invite.approximateMemberCount = payload.invite.approximate_member_count
    if (props.approximatePresenceCount && payload.invite.approximate_presence_count !== undefined)
      invite.approximatePresenceCount = payload.invite.approximate_presence_count
    if (props.guildScheduledEvent && payload.invite.guild_scheduled_event)
      invite.guildScheduledEvent = bot.transformers.scheduledEvent(bot, payload.invite.guild_scheduled_event)
    if (props.stageInstance && invite.guildId && payload.invite.stage_instance) {
      invite.stageInstance = bot.transformers.inviteStageInstance(bot, {
        ...payload.invite.stage_instance,
        guildId: invite.guildId,
      })
    }
    if (props.expiresAt && payload.invite.expires_at) {
      invite.expiresAt = Date.parse(payload.invite.expires_at)
    }
  } else {
    if (props.channelId && payload.invite.channel_id) invite.channelId = bot.transformers.snowflake(payload.invite.channel_id)
    if (props.guildId && payload.invite.guild_id) invite.guildId = bot.transformers.snowflake(payload.invite.guild_id)
  }

  return bot.transformers.customizers.invite(bot, payload.invite, invite)
}
