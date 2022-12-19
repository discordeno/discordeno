import type { Camelize, DiscordGuild } from '@discordeno/types'
import { s1nakelize1Role } from './role.js'
import { s1nakelize1Sticker } from './sticker.js'
import { s1nakelize1WelcomeScreen } from './welcomeScreen.js'

export function s1nakelize1Guild (payload: Camelize<DiscordGuild>): DiscordGuild {
  return {
    id: payload.id,
    name: payload.name,
    icon: payload.icon,
    splash: payload.splash,
    emojis: payload.emojis,
    banner: payload.banner,
    features: payload.features,
    description: payload.description,

    owner_id: payload.ownerId,
    mfa_level: payload.mfaLevel,
    icon_hash: payload.iconHash,
    afk_timeout: payload.afkTimeout,
    max_members: payload.maxMembers,
    premium_tier: payload.premiumTier,
    max_presences: payload.maxPresences,
    afk_channel_id: payload.afkChannelId,
    application_id: payload.applicationId,
    widget_enabled: payload.widgetEnabled,
    vanity_url_code: payload.vanityUrlCode,
    rules_channel_id: payload.rulesChannelId,
    preferred_locale: payload.preferredLocale,
    nsfw_level: payload.nsfwLevel,
    discovery_splash: payload.discoverySplash,
    widget_channel_id: payload.widgetChannelId,
    system_channel_id: payload.systemChannelId,
    verification_level: payload.verificationLevel,
    system_channel_flags: payload.systemChannelFlags,
    max_video_channel_users: payload.maxVideoChannelUsers,
    explicit_content_filter: payload.explicitContentFilter,
    approximate_member_count: payload.approximateMemberCount,
    public_updates_channel_id: payload.publicUpdatesChannelId,
    approximate_presence_count: payload.approximatePresenceCount,
    premium_subscription_count: payload.premiumSubscriptionCount,
    premium_progress_bar_enabled: payload.premiumProgressBarEnabled,
    default_message_notifications: payload.defaultMessageNotifications,

    roles: payload.roles.map((role) => s1nakelize1Role(role)),
    welcome_screen: payload.welcomeScreen && s1nakelize1WelcomeScreen(payload.welcomeScreen),
    stickers: payload.stickers?.map((sticker) => s1nakelize1Sticker(sticker))
  }
}
