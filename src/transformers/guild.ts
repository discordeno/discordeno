import { Bot } from "../bot.ts";
import type { Emoji } from "../types/emojis/emoji.ts";
import type { Guild } from "../types/guilds/guild.ts";
import { Collection } from "../util/collection.ts";
import { DiscordenoRole } from "./role.ts";
import { DiscordenoVoiceState } from "./voiceState.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";

export function transformGuild(
  bot: Bot,
  payload: { guild: SnakeCasedPropertiesDeep<Guild> } & { shardId: number }
): DiscordenoGuild {
  const guildId = bot.transformers.snowflake(payload.guild.id);

  return {
    afkTimeout: payload.guild.afk_timeout,
    approximateMemberCount: payload.guild.approximate_member_count,
    approximatePresenceCount: payload.guild.approximate_presence_count,
    defaultMessageNotifications: payload.guild.default_message_notifications,
    description: payload.guild.description,
    explicitContentFilter: payload.guild.explicit_content_filter,
    features: payload.guild.features,
    maxMembers: payload.guild.max_members,
    maxPresences: payload.guild.max_presences,
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
      /** The privacy level of the Stage instance */
      privacyLevel: si.privacy_level,
      /** Whether or not Stage discovery is disabled */
      discoverableDisabled: si.discoverable_disabled,
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
    discoverySplash: payload.guild.discovery_splash,

    bitfield:
      (payload.guild.owner ? 1n : 0n) |
      (payload.guild.widget_enabled ? 2n : 0n) |
      (payload.guild.large ? 4n : 0n) |
      (payload.guild.unavailable ? 8n : 0n),

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
      })
    ),
    emojis: new Collection((payload.guild.emojis || []).map((emoji) => [bot.transformers.snowflake(emoji.id!), emoji])),
    voiceStates: new Collection(
      (payload.guild.voice_states || [])
        .map((vs) => bot.transformers.voiceState(bot, { voiceState: vs, guildId }))
        .map((vs) => [vs.userId, vs])
    ),

    id: guildId,
    // WEIRD EDGE CASE WITH BOT CREATED SERVERS
    ownerId: payload.guild.owner_id ? bot.transformers.snowflake(payload.guild.owner_id) : 0n,
    permissions: payload.guild.permissions ? bot.transformers.snowflake(payload.guild.permissions) : 0n,
    afkChannelId: payload.guild.afk_channel_id ? bot.transformers.snowflake(payload.guild.afk_channel_id) : undefined,
    widgetChannelId: payload.guild.widget_channel_id
      ? bot.transformers.snowflake(payload.guild.widget_channel_id)
      : undefined,
    applicationId: payload.guild.application_id ? bot.transformers.snowflake(payload.guild.application_id) : undefined,
    systemChannelId: payload.guild.system_channel_id
      ? bot.transformers.snowflake(payload.guild.system_channel_id)
      : undefined,
    rulesChannelId: payload.guild.rules_channel_id
      ? bot.transformers.snowflake(payload.guild.rules_channel_id)
      : undefined,
    publicUpdatesChannelId: payload.guild.public_updates_channel_id
      ? bot.transformers.snowflake(payload.guild.public_updates_channel_id)
      : undefined,
  };
}

export interface DiscordenoGuild
  extends Omit<
    Guild,
    | "roles"
    | "presences"
    | "voiceStates"
    | "members"
    | "channels"
    | "memberCount"
    | "owner"
    | "emojis"
    | "id"
    | "ownerId"
    | "permissions"
    | "afkChannelId"
    | "widgetChannelId"
    | "applicationId"
    | "systemChannelId"
    | "rulesChannelId"
    | "publicUpdatesChannelId"
    | "joinedAt"
    | "icon"
    | "banner"
    | "splash"
    | "stageInstances"
    | "welcomeScreen"
    | "channels"
  > {
  /** Guild id */
  id: bigint;
  /** Id of the owner */
  ownerId: bigint;
  /** Total permissions for the user in the guild (excludes overwrites) */
  permissions: bigint;
  /** Id of afk channel */
  afkChannelId?: bigint;
  /** The channel id that the widget will generate an invite to, or null if set to no invite */
  widgetChannelId?: bigint;
  /** Application id of the guild creator if it is bot-created */
  applicationId?: bigint;
  /** The id of the channel where guild notices such as welcome messages and boost events are posted */
  systemChannelId?: bigint;
  /** The id of the channel where community guilds can display rules and/or guidelines */
  rulesChannelId?: bigint;
  /** The id of the channel where admins and moderators of Community guilds receive notices from Discord */
  publicUpdatesChannelId?: bigint;
  /** The id of the shard this guild is bound to */
  shardId: number;
  /** Total number of members in this guild */
  memberCount: number;
  /** The roles in the guild */
  roles: Collection<bigint, DiscordenoRole>;
  /** The presences of all the users in the guild. */
  // presences: Collection<bigint, DiscordenoPresence>;
  /** The Voice State data for each user in a voice channel in this server. */
  voiceStates: Collection<bigint, DiscordenoVoiceState>;
  /** Custom guild emojis */
  emojis: Collection<bigint, Emoji>;
  /** Holds all the boolean toggles. */
  bitfield: bigint;
  /** When this guild was joined at */
  joinedAt?: number;
  /** Icon hash */
  icon?: bigint;
  /** Splash hash */
  splash?: bigint;
  /** Banner hash */
  banner?: bigint;
  /** The stage instances in this guild */
  stageInstances?: {
    /** The id of this Stage instance */
    id: bigint;
    /** The guild id of the associated Stage channel */
    guildId: bigint;
    /** The id of the associated Stage channel */
    channelId: bigint;
    /** The topic of the Stage instance (1-120 characters) */
    topic: string;
    /** The privacy level of the Stage instance */
    privacyLevel: number;
    /** Whether or not Stage discovery is disabled */
    discoverableDisabled: boolean;
  }[];
  welcomeScreen?: {
    /** The server description shown in the welcome screen */
    description?: string;
    /** The channels shown in the welcome screen, up to 5 */
    welcomeChannels: {
      /** The channel's id */
      channelId: bigint;
      /** The descriptino schown for the channel */
      description: string;
      /** The emoji id, if the emoji is custom */
      emojiId?: bigint;
      /** The emoji name if custom, the unicode character if standard, or `null` if no emoji is set */
      emojiName?: string;
    }[];
  };
}
