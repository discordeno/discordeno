import { Collection } from "../../../../../mod.ts";
import { DiscordGuild } from "../../../../../types/discord.ts";
import { proxyChannel } from "./channel.ts";
import { proxyEmoji } from "./emoji.ts";
import { proxyMember } from "./member.ts";
import { proxyRole } from "./role.ts";

export function proxyGuild(payload: DiscordGuild) {
  return {
    id: payload.id,
    name: payload.name,
    icon: payload.icon,
    splash: payload.splash,
    banner: payload.banner,
    description: payload.description,
    features: payload.features,
    permissions: payload.permissions,
    owner: payload.owner ?? false,
    large: payload.large ?? false,
    unavailable: payload.unavailable ?? false,

    afkTimeout: payload.afk_timeout,
    widgetEnabled: payload.widget_enabled,
    verificationLevel: payload.verification_level,
    defaultMessageNotifications: payload.default_message_notifications,
    explicitContentFilter: payload.explicit_content_filter,
    mfaLevel: payload.mfa_level,
    systemChannelFlags: payload.system_channel_flags,
    memberCount: payload.member_count,
    maxPresences: payload.max_presences,
    maxMembers: payload.max_members,
    vanityUrlCode: payload.vanity_url_code,
    premiumTier: payload.premium_tier,
    premiumSubscriptionCount: payload.premium_subscription_count,
    maxVideoChannelUsers: payload.max_video_channel_users,
    approximateMemberCount: payload.approximate_member_count,
    approximatePresenceCount: payload.approximate_presence_count,
    nsfwLevel: payload.nsfw_level,
    premiumProgressBarEnabled: payload.premium_progress_bar_enabled ?? false,
    iconHash: payload.icon_hash,
    discoverySplash: payload.discovery_splash,
    ownerId: payload.owner_id,
    afkChannelId: payload.afk_channel_id,
    widgetChannelId: payload.widget_channel_id,
    applicationId: payload.application_id,
    systemChannelId: payload.system_channel_id,
    rulesChannelId: payload.rules_channel_id,
    joinedAt: payload.joined_at,
    preferredLocale: payload.preferred_locale,
    publicUpdatesChannelId: payload.public_updates_channel_id,
    welcomeScreen: payload.welcome_screen,

    roles: new Collection(payload.roles?.map((r) => [r.id, proxyRole(r)])),
    emojis: new Collection(payload.emojis?.map(e => ([e.id!, proxyEmoji(e)]))),
    members: new Collection(payload.members?.map(m => ([m.user!.id, proxyMember(m)]))),
    channels: new Collection(payload.channels?.map(c => ([c.id, proxyChannel(c)]))),
    threads: new Collection(payload.threads?.map(c => ([c.id, proxyChannel(c)]))),
    presences: [],
    voiceStates: [],
    stageInstances: [],
  };
}
