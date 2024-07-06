import {
  ChannelTypes,
  type DefaultMessageNotificationLevels,
  type DiscordGuild,
  type DiscordPresenceUpdate,
  type ExplicitContentFilterLevels,
  type GuildNsfwLevel,
  type MfaLevels,
  type PremiumTiers,
  type SystemChannelFlags,
  type VerificationLevels,
} from '@discordeno/types'
import { Collection, iconHashToBigInt } from '@discordeno/utils'
import type { Bot, Channel, GuildFeatureKeys, Member, PresenceUpdate, Role, StageInstance, Sticker, VoiceState, WelcomeScreen } from '../index.js'
import type { Emoji } from '../transformers/emoji.js'
import { GuildToggles } from './toggles/guild.js'

const baseGuild = {
  get threads() {
    if (!this.channels) return new Collection<bigint, Channel>()

    const threads = this.channels
      .array()
      .filter((x) => x.type === ChannelTypes.PublicThread || x.type === ChannelTypes.PrivateThread || x.type === ChannelTypes.AnnouncementThread)

    return new Collection(threads.map((x) => [x.id, x]))
  },
  get features() {
    return this.toggles.features
  },
} as Guild

export function transformGuild(bot: Bot, payload: { guild: DiscordGuild } & { shardId: number }): Guild {
  const guildId = bot.transformers.snowflake(payload.guild.id)
  const props = bot.transformers.desiredProperties.guild
  const guild: Guild = Object.create(baseGuild)

  if (props.afkTimeout && payload.guild.afk_timeout) guild.afkTimeout = payload.guild.afk_timeout
  if (props.approximateMemberCount && payload.guild.approximate_member_count) guild.approximateMemberCount = payload.guild.approximate_member_count
  if (props.approximatePresenceCount && payload.guild.approximate_presence_count)
    guild.approximatePresenceCount = payload.guild.approximate_presence_count
  if (props.defaultMessageNotifications) guild.defaultMessageNotifications = payload.guild.default_message_notifications
  if (props.description && payload.guild.description) guild.description = payload.guild.description
  if (props.toggles) guild.toggles = new GuildToggles(payload.guild)
  if (props.explicitContentFilter) guild.explicitContentFilter = payload.guild.explicit_content_filter
  if (props.maxMembers && payload.guild.max_members) guild.maxMembers = payload.guild.max_members
  if (props.maxPresences && payload.guild.max_presences) guild.maxPresences = payload.guild.max_presences ?? undefined
  if (props.maxVideoChannelUsers && payload.guild.max_video_channel_users) guild.maxVideoChannelUsers = payload.guild.max_video_channel_users
  if (props.mfaLevel) guild.mfaLevel = payload.guild.mfa_level
  if (props.name && payload.guild.name) guild.name = payload.guild.name
  if (props.nsfwLevel) guild.nsfwLevel = payload.guild.nsfw_level
  if (props.preferredLocale && payload.guild.preferred_locale) guild.preferredLocale = payload.guild.preferred_locale
  if (props.premiumSubscriptionCount && payload.guild.premium_subscription_count !== undefined)
    guild.premiumSubscriptionCount = payload.guild.premium_subscription_count
  if (props.premiumTier) guild.premiumTier = payload.guild.premium_tier
  if (props.stageInstances && payload.guild.stage_instances)
    guild.stageInstances = payload.guild.stage_instances.map((si) => ({
      /** The id of this Stage instance */
      id: bot.transformers.snowflake(si.id),
      /** The guild id of the associated Stage channel */
      guildId,
      /** The id of the associated Stage channel */
      channelId: bot.transformers.snowflake(si.channel_id),
      /** The topic of the Stage instance (1-120 characters) */
      topic: si.topic,
    }))
  if (props.channels && (!!payload.guild.channels || !!payload.guild.threads))
    guild.channels = new Collection(
      [...(payload.guild.channels ?? []), ...(payload.guild.threads ?? [])].map((channel) => {
        const result = bot.transformers.channel(bot, { channel, guildId })
        return [result.id, result]
      }),
    )
  if (props.members && payload.guild.members)
    guild.members = new Collection(
      payload.guild.members.map((member) => {
        const result = bot.transformers.member(bot, member, guildId, bot.transformers.snowflake(member.user!.id))
        return [result.id, result]
      }),
    )
  if (props.roles && payload.guild.roles)
    guild.roles = new Collection(
      payload.guild.roles.map((role) => {
        const result = bot.transformers.role(bot, { role, guildId })
        return [result.id, result]
      }),
    )
  if (props.emojis && payload.guild.emojis)
    guild.emojis = new Collection(
      payload.guild.emojis.map((emoji) => {
        const result = bot.transformers.emoji(bot, emoji)
        return [result.id!, result]
      }),
    )
  if (props.voiceStates && payload.guild.voice_states)
    guild.voiceStates = new Collection(
      payload.guild.voice_states.map((voiceState) => {
        const result = bot.transformers.voiceState(bot, { voiceState, guildId })
        return [result.userId, result]
      }),
    )
  if (props.stickers && payload.guild.stickers)
    guild.stickers = new Collection(
      payload.guild.stickers?.map((sticker) => {
        const result = bot.transformers.sticker(bot, sticker)
        return [result.id, result]
      }),
    )
  if (props.systemChannelFlags && payload.guild.system_channel_flags) guild.systemChannelFlags = payload.guild.system_channel_flags
  if (props.vanityUrlCode && payload.guild.vanity_url_code) guild.vanityUrlCode = payload.guild.vanity_url_code
  if (props.verificationLevel) guild.verificationLevel = payload.guild.verification_level
  if (props.welcomeScreen && payload.guild.welcome_screen)
    guild.welcomeScreen = {
      description: payload.guild.welcome_screen.description ?? undefined,
      welcomeChannels: payload.guild.welcome_screen.welcome_channels.map((wc) => ({
        channelId: bot.transformers.snowflake(wc.channel_id),
        description: wc.description,
        emojiId: wc.emoji_id ? bot.transformers.snowflake(wc.emoji_id) : undefined,
        emojiName: wc.emoji_name ?? undefined,
      })),
    }
  if (props.discoverySplash && payload.guild.discovery_splash) guild.discoverySplash = iconHashToBigInt(payload.guild.discovery_splash)
  if (props.joinedAt && payload.guild.joined_at) guild.joinedAt = Date.parse(payload.guild.joined_at)
  if (props.memberCount && payload.guild.member_count) guild.memberCount = payload.guild.member_count ?? 0
  if (props.shardId) guild.shardId = payload.shardId
  if (props.icon && payload.guild.icon) guild.icon = iconHashToBigInt(payload.guild.icon)
  if (props.banner && payload.guild.banner) guild.banner = iconHashToBigInt(payload.guild.banner)
  if (props.splash && payload.guild.splash) guild.splash = iconHashToBigInt(payload.guild.splash)
  if (props.id && payload.guild.id) guild.id = guildId
  if (props.ownerId && payload.guild.owner_id) guild.ownerId = bot.transformers.snowflake(payload.guild.owner_id)
  if (props.permissions && payload.guild.permissions) guild.permissions = bot.transformers.snowflake(payload.guild.permissions)
  if (props.afkChannelId && payload.guild.afk_channel_id) guild.afkChannelId = bot.transformers.snowflake(payload.guild.afk_channel_id)
  if (props.widgetChannelId && payload.guild.widget_channel_id) guild.widgetChannelId = bot.transformers.snowflake(payload.guild.widget_channel_id)
  if (props.applicationId && payload.guild.application_id) guild.applicationId = bot.transformers.snowflake(payload.guild.application_id)
  if (props.systemChannelId && payload.guild.system_channel_id) guild.systemChannelId = bot.transformers.snowflake(payload.guild.system_channel_id)
  if (props.rulesChannelId && payload.guild.rules_channel_id) guild.rulesChannelId = bot.transformers.snowflake(payload.guild.rules_channel_id)
  if (props.publicUpdatesChannelId && payload.guild.public_updates_channel_id)
    guild.publicUpdatesChannelId = bot.transformers.snowflake(payload.guild.public_updates_channel_id)
  if (props.premiumProgressBarEnabled && payload.guild.premium_progress_bar_enabled)
    guild.premiumProgressBarEnabled = payload.guild.premium_progress_bar_enabled
  if (props.large && payload.guild.large) guild.large = payload.guild.large
  if (props.owner && payload.guild.owner) guild.owner = payload.guild.owner
  if (props.widgetEnabled && payload.guild.widget_enabled) guild.widgetEnabled = payload.guild.widget_enabled
  if (props.unavailable && payload.guild.unavailable) guild.unavailable = payload.guild.unavailable
  if (props.iconHash && payload.guild.icon_hash) guild.iconHash = iconHashToBigInt(payload.guild.icon_hash)
  if (props.presences && payload.guild.presences)
    guild.presences = payload.guild.presences?.map((presence) => bot.transformers.presence(bot, presence as DiscordPresenceUpdate))
  if (props.safetyAlertsChannelId && payload.guild.safety_alerts_channel_id)
    guild.safetyAlertsChannelId = bot.transformers.snowflake(payload.guild.safety_alerts_channel_id)

  return bot.transformers.customizers.guild(bot, payload.guild, guild)
}

export interface Guild {
  /** Guild name (2-100 characters, excluding trailing and leading whitespace) */
  name: string
  /** True if the user is the owner of the guild */
  owner: boolean | undefined
  /** Afk timeout in seconds */
  afkTimeout: number
  /** True if the server widget is enabled */
  widgetEnabled?: boolean
  /** Verification level required for the guild */
  verificationLevel: VerificationLevels
  /** Default message notifications level */
  defaultMessageNotifications: DefaultMessageNotificationLevels
  /** Explicit content filter level */
  explicitContentFilter: ExplicitContentFilterLevels
  /** Enabled guild features */
  features: GuildFeatureKeys[]
  /** Required MFA level for the guild */
  mfaLevel: MfaLevels
  /** System channel flags */
  systemChannelFlags: SystemChannelFlags
  /** True if this is considered a large guild */
  large?: boolean
  /** True if this guild is unavailable due to an outage */
  unavailable?: boolean
  /** Total number of members in this guild */
  memberCount: number
  /** The maximum number of presences for the guild (the default value, currently 25000, is in effect when null is returned) */
  maxPresences?: number
  /** The maximum number of members for the guild */
  maxMembers?: number
  /** The vanity url code for the guild */
  vanityUrlCode?: string
  /** The description of a guild */
  description?: string
  toggles: GuildToggles
  shardId: number
  /** Premium tier (Server Boost level) */
  premiumTier: PremiumTiers
  /** The number of boosts this guild currently has */
  premiumSubscriptionCount?: number
  /** The maximum amount of users in a video channel */
  maxVideoChannelUsers?: number
  /** Maximum amount of users in a stage video channel */
  maxStageVideoChannelUsers?: number
  /** Approximate number of members in this guild, returned from the GET /guilds/id endpoint when with_counts is true */
  approximateMemberCount?: number
  /** Approximate number of non-offline members in this guild, returned from the GET /guilds/id endpoint when with_counts is true */
  approximatePresenceCount?: number
  /** Guild NSFW level */
  nsfwLevel: GuildNsfwLevel
  /** Whether the guild has the boost progress bar enabled */
  premiumProgressBarEnabled: boolean
  /** Guild id */
  id: bigint
  /** Icon hash */
  icon?: bigint
  /** Icon hash, returned when in the template object */
  iconHash?: bigint
  /** Splash hash */
  splash?: bigint
  /** Discovery splash hash; only present for guilds with the "DISCOVERABLE" feature */
  discoverySplash?: bigint
  /** Id of the owner */
  ownerId: bigint
  /** Total permissions for the user in the guild (excludes overwrites and implicit permissions) */
  permissions: bigint
  /** Id of afk channel */
  afkChannelId?: bigint
  /** The channel id that the widget will generate an invite to, or null if set to no invite */
  widgetChannelId?: bigint
  /** Roles in the guild */
  roles: Collection<bigint, Role>
  /** Custom guild emojis */
  emojis: Collection<bigint, Emoji>
  /** Application id of the guild creator if it is bot-created */
  applicationId?: bigint
  /** The id of the channel where guild notices such as welcome messages and boost events are posted */
  systemChannelId?: bigint
  /** The id of the channel where community guilds can display rules and/or guidelines */
  rulesChannelId?: bigint
  /** When this guild was joined at */
  joinedAt?: number
  /** States of members currently in voice channels; lacks the guild_id key */
  voiceStates: Collection<bigint, VoiceState>
  /** Users in the guild */
  members: Collection<bigint, Member>
  /** Channels in the guild */
  channels: Collection<bigint, Channel>
  /** All active threads in the guild that the current user has permission to view */
  threads: Collection<bigint, Channel>
  /** Presences of the members in the guild, will only include non-offline members if the size is greater than large threshold */
  presences?: PresenceUpdate[]
  /** Banner hash */
  banner?: bigint
  /** The preferred locale of a Community guild; used in server discovery and notices from Discord; defaults to "en-US" */
  preferredLocale: string
  /** The id of the channel where admins and moderators of Community guilds receive notices from Discord */
  publicUpdatesChannelId?: bigint
  /** The welcome screen of a Community guild, shown to new members, returned in an Invite's guild object */
  welcomeScreen?: WelcomeScreen
  /** Stage instances in the guild */
  stageInstances?: StageInstance[]
  /** Custom guild stickers */
  stickers?: Collection<bigint, Sticker>
  /** The id of the channel where admins and moderators of Community guilds receive safety alerts from Discord */
  safetyAlertsChannelId?: bigint
}
