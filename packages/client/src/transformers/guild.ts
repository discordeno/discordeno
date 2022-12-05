import type { DiscordGuild, Optionalize } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { Client } from '../client.js'
import type { Emoji } from '../transformers/emoji.js'
import { GuildToggles } from './toggles/guild.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformGuild (
  client: Client,
  payload: { guild: DiscordGuild } & { shardId: number }
) {
  const guildId = client.transformers.snowflake(payload.guild.id)

  const guild = {
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
      id: client.transformers.snowflake(si.id),
      /** The guild id of the associated Stage channel */
      guildId,
      /** The id of the associated Stage channel */
      channelId: client.transformers.snowflake(si.channel_id),
      /** The topic of the Stage instance (1-120 characters) */
      topic: si.topic
    })),
    systemChannelFlags: payload.guild.system_channel_flags,
    vanityUrlCode: payload.guild.vanity_url_code,
    verificationLevel: payload.guild.verification_level,
    welcomeScreen: payload.guild.welcome_screen
      ? {
          description: payload.guild.welcome_screen.description ?? undefined,
          welcomeChannels: payload.guild.welcome_screen.welcome_channels.map(
            (wc) => ({
              channelId: client.transformers.snowflake(wc.channel_id),
              description: wc.description,
              emojiId: wc.emoji_id
                ? client.transformers.snowflake(wc.emoji_id)
                : undefined,
              emojiName: wc.emoji_name ?? undefined
            })
          )
        }
      : undefined,
    discoverySplash: payload.guild.discovery_splash
      ? client.utils.iconHashToBigInt(payload.guild.discovery_splash)
      : undefined,

    joinedAt: payload.guild.joined_at
      ? Date.parse(payload.guild.joined_at)
      : undefined,
    memberCount: payload.guild.member_count ?? 0,
    shardId: payload.shardId,
    icon: payload.guild.icon
      ? client.utils.iconHashToBigInt(payload.guild.icon)
      : undefined,
    banner: payload.guild.banner
      ? client.utils.iconHashToBigInt(payload.guild.banner)
      : undefined,
    splash: payload.guild.splash
      ? client.utils.iconHashToBigInt(payload.guild.splash)
      : undefined,
    channels: new Collection(
      payload.guild.channels?.map((channel) => {
        const result = client.transformers.channel(client, {
          channel,
          guildId
        })
        return [result.id, result]
      })
    ),
    members: new Collection(
      payload.guild.members?.map((member) => {
        const result = client.transformers.member(
          client,
          member,
          guildId,
          client.transformers.snowflake(member.user!.id)
        )
        return [result.id, result]
      })
    ),
    roles: new Collection(
      payload.guild.roles?.map((role) => {
        const result = client.transformers.role(client, { role, guildId })
        return [result.id, result]
      })
    ),
    emojis: new Collection(
      (payload.guild.emojis ?? []).map((emoji) => {
        const em: Emoji = client.transformers.emoji(client, emoji)
        return [em.id!, em]
      })
    ),
    voiceStates: new Collection(
      (payload.guild.voice_states ?? [])
        .map((vs) =>
          client.transformers.voiceState(client, { voiceState: vs, guildId })
        )
        .map((vs) => [vs.userId, vs])
    ),

    id: guildId,
    // WEIRD EDGE CASE WITH BOT CREATED SERVERS
    ownerId: payload.guild.owner_id
      ? client.transformers.snowflake(payload.guild.owner_id)
      : 0n,
    permissions: payload.guild.permissions
      ? client.transformers.snowflake(payload.guild.permissions)
      : 0n,
    afkChannelId: payload.guild.afk_channel_id
      ? client.transformers.snowflake(payload.guild.afk_channel_id)
      : undefined,
    widgetChannelId: payload.guild.widget_channel_id
      ? client.transformers.snowflake(payload.guild.widget_channel_id)
      : undefined,
    applicationId: payload.guild.application_id
      ? client.transformers.snowflake(payload.guild.application_id)
      : undefined,
    systemChannelId: payload.guild.system_channel_id
      ? client.transformers.snowflake(payload.guild.system_channel_id)
      : undefined,
    rulesChannelId: payload.guild.rules_channel_id
      ? client.transformers.snowflake(payload.guild.rules_channel_id)
      : undefined,
    publicUpdatesChannelId: payload.guild.public_updates_channel_id
      ? client.transformers.snowflake(payload.guild.public_updates_channel_id)
      : undefined,
    premiumProgressBarEnabled: payload.guild.premium_progress_bar_enabled
  }

  return guild as Optionalize<typeof guild>
}

export interface Guild extends ReturnType<typeof transformGuild> {}
