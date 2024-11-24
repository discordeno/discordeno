import { ChannelTypes, type DiscordGuild, type DiscordPresenceUpdate } from '@discordeno/types'
import { Collection, iconHashToBigInt } from '@discordeno/utils'
import type { Channel, Guild, InternalBot } from '../index.js'
import { GuildToggles } from './toggles/guild.js'

export const baseGuild: InternalBot['transformers']['$inferredTypes']['guild'] = {
  // This allows typescript to still check for type errors on functions below
  ...(undefined as unknown as InternalBot['transformers']['$inferredTypes']['guild']),

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
}

export function transformGuild(bot: InternalBot, payload: { guild: DiscordGuild; shardId: number }): typeof bot.transformers.$inferredTypes.guild {
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
  if (props.maxStageVideoChannelUsers && payload.guild.max_stage_video_channel_users)
    guild.maxStageVideoChannelUsers = payload.guild.max_stage_video_channel_users
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
