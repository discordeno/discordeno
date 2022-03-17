import type { Emoji } from "../transformers/emoji.ts";
import { Bot } from "../bot.ts";
import { Collection } from "../util/collection.ts";
import { DiscordGuild } from "../types/discord.ts";
import { Optionalize } from "../types/shared.ts";
import { GuildToggles } from "./toggles/guild.ts";

export function transformGuild(
  bot: Bot,
  payload: { guild: DiscordGuild } & { shardId: number },
) {
  const guildId = bot.transformers.snowflake(payload.guild.id);

  return {
    afkTimeout: payload.guild.afk_timeout,
    approximateMemberCount: payload.guild.approximate_member_count,
    approximatePresenceCount: payload.guild.approximate_presence_count,
    defaultMessageNotifications: payload.guild.default_message_notifications,
    description: payload.guild.description,
    explicitContentFilter: payload.guild.explicit_content_filter,
    toggles: new GuildToggles(payload.guild),
    maxMembers: payload.guild.max_members,
    maxPresences: payload.guild.max_presences ?? undefined,
    maxVideoChannelUsers: payload.guild.max_video_channel_users,
    mfaLevel: payload.guild.mfa_level,
    name: payload.guild.name,
    nsfwLevel: payload.guild.nsfw_level,
    preferredLocale: payload.guild.preferred_locale,
    premiumSubscriptionCount: payload.guild.premium_subscription_count,
    premiumTier: payload.guild.premium_tier,
    stageInstances: payload.guild.stage_instances?.map((si) => ({
      /** The id of this Stage instance */
      id: bot.transformers.snowflake(si.id),
      /** The guild id of the associated Stage channel */
      guildId,
      /** The id of the associated Stage channel */
      channelId: bot.transformers.snowflake(si.channel_id),
      /** The topic of the Stage instance (1-120 characters) */
      topic: si.topic,
    })),
    systemChannelFlags: payload.guild.system_channel_flags,
    vanityUrlCode: payload.guild.vanity_url_code,
    verificationLevel: payload.guild.verification_level,
    welcomeScreen: payload.guild.welcome_screen
      ? {
        description: payload.guild.welcome_screen.description ?? undefined,
        welcomeChannels: payload.guild.welcome_screen.welcome_channels.map((wc) => ({
          channelId: bot.transformers.snowflake(wc.channel_id),
          description: wc.description,
          emojiId: wc.emoji_id ? bot.transformers.snowflake(wc.emoji_id) : undefined,
          emojiName: wc.emoji_name ?? undefined,
        })),
      }
      : undefined,
    discoverySplash: payload.guild.discovery_splash
      ? bot.utils.iconHashToBigInt(payload.guild.discovery_splash)
      : undefined,

    joinedAt: payload.guild.joined_at ? Date.parse(payload.guild.joined_at) : undefined,
    memberCount: payload.guild.member_count ?? 0,
    shardId: payload.shardId,
    icon: payload.guild.icon ? bot.utils.iconHashToBigInt(payload.guild.icon) : undefined,
    banner: payload.guild.banner ? bot.utils.iconHashToBigInt(payload.guild.banner) : undefined,
    splash: payload.guild.splash ? bot.utils.iconHashToBigInt(payload.guild.splash) : undefined,
    roles: new Collection(
      payload.guild.roles?.map((role) => {
        const result = bot.transformers.role(bot, { role, guildId });
        return [result.id, result];
      }),
    ),
    emojis: new Collection(
      (payload.guild.emojis || []).map((emoji) => {
        const em: Emoji = bot.transformers.emoji(bot, emoji);
        return [em.id!, em];
      }),
    ),
    voiceStates: new Collection(
      (payload.guild.voice_states || [])
        .map((vs) => bot.transformers.voiceState(bot, { voiceState: vs, guildId }))
        .map((vs) => [vs.userId, vs]),
    ),

    id: guildId,
    // WEIRD EDGE CASE WITH BOT CREATED SERVERS
    ownerId: payload.guild.owner_id ? bot.transformers.snowflake(payload.guild.owner_id) : 0n,
    permissions: payload.guild.permissions ? bot.transformers.snowflake(payload.guild.permissions) : 0n,
    afkChannelId: payload.guild.afk_channel_id ? bot.transformers.snowflake(payload.guild.afk_channel_id) : undefined,
    widgetChannelId: payload.guild.widget_channel_id ? bot.transformers.snowflake(payload.guild.widget_channel_id)
    : undefined,
    applicationId: payload.guild.application_id ? bot.transformers.snowflake(payload.guild.application_id) : undefined,
    systemChannelId: payload.guild.system_channel_id ? bot.transformers.snowflake(payload.guild.system_channel_id)
    : undefined,
    rulesChannelId: payload.guild.rules_channel_id ? bot.transformers.snowflake(payload.guild.rules_channel_id)
    : undefined,
    publicUpdatesChannelId: payload.guild.public_updates_channel_id
      ? bot.transformers.snowflake(payload.guild.public_updates_channel_id)
      : undefined,
    premiumProgressBarEnabled: payload.guild.premium_progress_bar_enabled,
  };
}

export interface Guild extends Optionalize<ReturnType<typeof transformGuild>> {}
