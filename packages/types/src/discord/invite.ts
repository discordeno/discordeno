/** Types for: https://discord.com/developers/docs/resources/invite */

import type { DiscordApplication } from './application.js'
import type { DiscordChannel } from './channel.js'
import type { DiscordGuild, DiscordMember } from './guild.js'
import type { DiscordScheduledEvent } from './guildScheduledEvent.js'
import type { DiscordUser } from './user.js'

/** https://discord.com/developers/docs/resources/invite#invite-object-invite-structure */
export interface DiscordInvite {
  /** The type of invite */
  type: DiscordInviteType
  /** The invite code (unique Id) */
  code: string
  /** The guild this invite is for */
  guild?: Partial<DiscordGuild>
  /** The channel this invite is for */
  channel: Partial<DiscordChannel> | null
  /** The user who created the invite */
  inviter?: DiscordUser
  /** The type of target for this voice channel invite */
  target_type?: TargetTypes
  /** The target user for this invite */
  target_user?: DiscordUser
  /** The embedded application to open for this voice channel embedded application invite */
  target_application?: Partial<DiscordApplication>
  /** Approximate count of online members (only present when target_user is set) */
  approximate_presence_count?: number
  /** Approximate count of total members */
  approximate_member_count?: number
  /** The expiration date of this invite, returned from the `GET /invites/<code>` endpoint when `with_expiration` is `true` */
  expires_at?: string | null
  /** Stage instance data if there is a public Stage instance in the Stage channel this invite is for */
  stage_instance?: DiscordInviteStageInstance
  /** guild scheduled event data */
  guild_scheduled_event?: DiscordScheduledEvent
}

/** https://discord.com/developers/docs/resources/invite#invite-object-invite-types */
export enum DiscordInviteType {
  Guild,
  GroupDm,
  Friend,
}

/** https://discord.com/developers/docs/resources/invite#invite-object-invite-target-types */
export enum TargetTypes {
  Stream = 1,
  EmbeddedApplication,
}

/** https://discord.com/developers/docs/resources/invite#invite-metadata-object-invite-metadata-structure */
export interface DiscordInviteMetadata extends DiscordInvite {
  /** Number of times this invite has been used */
  uses: number
  /** Max number of times this invite can be used */
  max_uses: number
  /** Duration (in seconds) after which the invite expires */
  max_age: number
  /** Whether this invite only grants temporary membership */
  temporary: boolean
  /** When this invite was created */
  created_at: string
}

/**
 * https://discord.com/developers/docs/resources/invite#invite-stage-instance-object-invite-stage-instance-structure
 * @deprecated
 */
export interface DiscordInviteStageInstance {
  /** The members speaking in the Stage */
  members: Partial<DiscordMember>[]
  /** The number of users in the Stage */
  participant_count: number
  /** The number of users speaking in the Stage */
  speaker_count: number
  /** The topic of the Stage instance (1-120 characters) */
  topic: string
}
