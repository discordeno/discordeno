import type { ChannelTypes, DiscordChannel, DiscordOverwrite, DiscordThreadMember, SortOrderTypes } from './discord/channels.js'
import type { DiscordMemberWithUser } from './discord/guilds.js'
import type { DiscordUser } from './discord/users.js'
import type { TeamMembershipStates } from './shared.js'

/** https://discord.com/developers/docs/topics/teams#data-models-team-object */
export interface DiscordTeam {
  /** Hash of the image of the team's icon */
  icon: string | null
  /** Unique ID of the team */
  id: string
  /** Members of the team */
  members: DiscordTeamMember[]
  /** User ID of the current team owner */
  owner_user_id: string
  /** Name of the team */
  name: string
}

/** https://discord.com/developers/docs/topics/teams#data-models-team-members-object */
export interface DiscordTeamMember {
  /** The user's membership state on the team */
  membership_state: TeamMembershipStates
  /** The id of the parent team of which they are a member */
  team_id: string
  /** The avatar, discriminator, id, username, and global_name of the user */
  user: Partial<DiscordUser> & Pick<DiscordUser, 'avatar' | 'discriminator' | 'id' | 'username' | 'global_name'>
  /** Role of the team member */
  role: DiscordTeamMemberRole
}

/** https://discord.com/developers/docs/events/gateway#guild-member-add */
export interface DiscordGuildMemberAdd extends DiscordMemberWithUser {
  /** id of the guild */
  guild_id: string
}

/** https://discord.com/developers/docs/events/gateway#thread-member-update */
export interface DiscordThreadMemberUpdate {
  /** The id of the thread */
  id: string
  /** The id of the guild */
  guild_id: string
  /** The timestamp when the bot joined this thread. */
  joined_at: string
  /** The flags this user has for this thread. Not useful for bots. */
  flags: number
}

export interface DiscordCreateGuildChannel {
  /** Channel name (1-100 characters) */
  name: string
  /** The type of channel */
  type?: ChannelTypes
  /** Channel topic (0-1024 characters) */
  topic?: string
  /** The bitrate (in bits) of the voice channel (voice only) */
  bitrate?: number
  /** The user limit of the voice channel (voice only) */
  user_limit?: number
  /** Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected */
  rate_limit_per_user?: number
  /** Sorting position of the channel */
  position?: number
  /** The channel's permission overwrites */
  permission_overwrites?: DiscordOverwrite[]
  /** Id of the parent category for a channel */
  parent_id?: string
  /** Whether the channel is nsfw */
  nsfw?: boolean
  /** Default duration (in minutes) that clients (not the API) use for newly created threads in this channel, to determine when to automatically archive the thread after the last activity */
  default_auto_archive_duration?: number
  /** Emoji to show in the add reaction button on a thread in a forum channel */
  default_reaction_emoji?: {
    /** The id of a guild's custom emoji. Exactly one of `emojiId` and `emojiName` must be set. */
    emoji_id?: string | null
    /** The unicode character of the emoji. Exactly one of `emojiId` and `emojiName` must be set. */
    emoji_name?: string | null
  }
  /** Set of tags that can be used in a forum channel */
  available_tags?: Array<{
    /** The id of the tag */
    id: string
    /** The name of the tag (0-20 characters) */
    name: string
    /** whether this tag can only be added to or removed from threads by a member with the MANAGE_THREADS permission */
    moderated: boolean
    /** The id of a guild's custom emoji */
    emoji_id: string
    /** The unicode character of the emoji */
    emoji_name?: string
  }>
  /** the default sort order type used to order posts in forum channels */
  default_sort_order?: SortOrderTypes | null
}

export interface DiscordCreateWebhook {
  /** Name of the webhook (1-80 characters) */
  name: string
  /** Image url for the default webhook avatar */
  avatar?: string | null
}

export type DiscordArchivedThreads = DiscordActiveThreads & {
  hasMore: boolean
}

export interface DiscordActiveThreads {
  threads: DiscordChannel[]
  members: DiscordThreadMember[]
}

export interface DiscordVanityUrl {
  code: string | null
  uses: number
}

export interface DiscordPrunedCount {
  pruned: number
}

/** https://discord.com/developers/docs/topics/teams#team-member-roles-team-member-role-types */
export enum DiscordTeamMemberRole {
  /** Owners are the most permissiable role, and can take destructive, irreversible actions like deleting the team itself. Teams are limited to 1 owner. */
  Owner = 'owner',
  /** Admins have similar access as owners, except they cannot take destructive actions on the team or team-owned apps. */
  Admin = 'admin',
  /**
   * Developers can access information about team-owned apps, like the client secret or public key.
   * They can also take limited actions on team-owned apps, like configuring interaction endpoints or resetting the bot token.
   * Members with the Developer role *cannot* manage the team or its members, or take destructive actions on team-owned apps.
   */
  Developer = 'developer',
  /** Read-only members can access information about a team and any team-owned apps. Some examples include getting the IDs of applications and exporting payout records. */
  ReadOnly = 'read_only',
}

export interface DiscordThreadMemberGuildCreate {
  /** Any user-thread settings, currently only used for notifications */
  flags: number
  /** The time the current user last joined the thread */
  join_timestamp: string
}
