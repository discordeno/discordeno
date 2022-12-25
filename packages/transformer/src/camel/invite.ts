import type { Camelize, DiscordInvite, DiscordInviteMetadata, DiscordInviteStageInstance } from '@discordeno/types'
import TRANSFORMERS from '../index.js'

export function c1amelize1Invite (payload: DiscordInvite): Camelize<DiscordInvite> {
  return {
    code: payload.code,

    expiresAt: payload.expires_at,
    targetType: payload.target_type,
    approximateMemberCount: payload.approximate_member_count,
    approximatePresenceCount: payload.approximate_presence_count,

    inviter: payload.inviter && TRANSFORMERS.user(payload.inviter),
    targetUser: payload.target_user && TRANSFORMERS.user(payload.target_user),
    stageInstance: payload.stage_instance && TRANSFORMERS.invites.stage(payload.stage_instance),
    guildScheduledEvent: payload.guild_scheduled_event && TRANSFORMERS.event(payload.guild_scheduled_event),

    channel: payload.channel && {
      id: payload.channel.id
    },
    guild: payload.guild && {
      id: payload.guild.id
    },
    targetApplication: payload.target_application && {
      id: payload.target_application.id
    }
  }
}

export function c1amelize1StageInvite (payload: DiscordInviteStageInstance): Camelize<DiscordInviteStageInstance> {
  return {
    topic: payload.topic,

    speakerCount: payload.speaker_count,
    participantCount: payload.participant_count,

    members: payload.members.map((member) => ({
      user: member.user && TRANSFORMERS.user(member.user)
    }))
  }
}

export function c1amelizeInviteMetadata (payload: DiscordInviteMetadata): Camelize<DiscordInviteMetadata> {
  return {
    code: payload.code,
    uses: payload.uses,
    temporary: payload.temporary,

    maxAge: payload.max_age,
    maxUses: payload.max_uses,
    createdAt: payload.created_at,
    expiresAt: payload.expires_at,
    targetType: payload.target_type,
    approximateMemberCount: payload.approximate_member_count,
    approximatePresenceCount: payload.approximate_presence_count,

    inviter: payload.inviter && TRANSFORMERS.user(payload.inviter),
    targetUser: payload.target_user && TRANSFORMERS.user(payload.target_user),
    stageInstance: payload.stage_instance && TRANSFORMERS.invites.stage(payload.stage_instance),
    guildScheduledEvent: payload.guild_scheduled_event && TRANSFORMERS.event(payload.guild_scheduled_event),

    channel: payload.channel && {
      id: payload.channel.id
    },
    guild: payload.guild && {
      id: payload.guild.id
    },
    targetApplication: payload.target_application && {
      id: payload.target_application.id
    }
  }
}
