import type { Camelize, DiscordGuild } from '@discordeno/types'
import { c1amelize1Role } from './role.js'
import { c1amelize1Sticker } from './sticker.js'
import { c1amelize1WelcomeScreen } from './welcomeScreen.js'

export function c1amelize1Guild (payload: DiscordGuild): Camelize<DiscordGuild> {
  return {
    id: payload.id,
    name: payload.name,
    icon: payload.icon,
    iconHash: payload.icon_hash,
    splash: payload.splash,
    discoverySplash: payload.discovery_splash,
    ownerId: payload.owner_id,
    afkChannelId: payload.afk_channel_id,
    afkTimeout: payload.afk_timeout,
    widgetEnabled: payload.widget_enabled,
    widgetChannelId: payload.widget_channel_id,
    verificationLevel: payload.verification_level,
    defaultMessageNotifications: payload.default_message_notifications,
    explicitContentFilter: payload.explicit_content_filter,
    roles: payload.roles.map((role) => c1amelize1Role(role)),
    emojis: payload.emojis,
    features: payload.features,
    mfaLevel: payload.mfa_level,
    applicationId: payload.application_id,
    systemChannelId: payload.system_channel_id,
    systemChannelFlags: payload.system_channel_flags,
    rulesChannelId: payload.rules_channel_id,
    maxPresences: payload.max_presences,
    maxMembers: payload.max_members,
    vanityUrlCode: payload.vanity_url_code,
    description: payload.description,
    banner: payload.banner,
    premiumTier: payload.premium_tier,
    premiumSubscriptionCount: payload.premium_subscription_count,
    preferredLocale: payload.preferred_locale,
    publicUpdatesChannelId: payload.public_updates_channel_id,
    maxVideoChannelUsers: payload.max_video_channel_users,
    approximateMemberCount: payload.approximate_member_count,
    approximatePresenceCount: payload.approximate_presence_count,
    welcomeScreen:
      payload.welcome_screen && c1amelize1WelcomeScreen(payload.welcome_screen),
    nsfwLevel: payload.nsfw_level,
    stickers: payload.stickers?.map((sticker) => c1amelize1Sticker(sticker)),
    premiumProgressBarEnabled: payload.premium_progress_bar_enabled
  }
}
