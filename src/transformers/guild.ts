import { Bot } from "../bot.ts";
import type { PresenceUpdate } from "../types/activity/presence_update.ts";
import type { Emoji } from "../types/emojis/emoji.ts";
import type { Guild } from "../types/guilds/guild.ts";
import { Collection } from "../util/collection.ts";
import { iconHashToBigInt } from "../util/hash.ts";
import { channelToThread } from "../util/transformers/channel_to_thread.ts";
import { transformChannel } from "./channel.ts";
import { DiscordenoRole, transformRole } from "./role.ts";
import { DiscordenoVoiceState, transformVoiceState } from "./voice_state.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";

export function transformGuild(bot: Bot, payload: { guild: SnakeCasedPropertiesDeep<Guild> } & { shardId : number }): DiscordenoGuild {
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
    stageInstances: payload.guild.stage_instances,
    systemChannelFlags: payload.guild.system_channel_flags,
    vanityUrlCode: payload.guild.vanity_url_code,
    verificationLevel: payload.guild.verification_level,
    welcomeScreen: payload.guild.welcome_screen,
    discoverySplash: payload.guild.discovery_splash,

    bitfield: (payload.guild.owner ? 1n : 0n) |
      (payload.guild.widget_enabled ? 2n : 0n) |
      (payload.guild.large ? 4n : 0n) |
      (payload.guild.unavailable ? 8n : 0n),

    joinedAt: payload.guild.joined_at ? Date.parse(payload.guild.joined_at) : undefined,
    memberCount: payload.guild.member_count ?? 0,
    shardId: payload.shardId,
    icon: payload.guild.icon ? iconHashToBigInt(payload.guild.icon) : undefined,
    banner: payload.guild.banner ? iconHashToBigInt(payload.guild.banner) : undefined,
    splash: payload.guild.icon ? iconHashToBigInt(payload.guild.splash) : undefined,

    // TRANSFORMED STUFF BELOW
    // TODO: Handle channels/threads in a better way?
    channels: (payload.guild.channels || []).map((channel) => transformChannel(bot, { channel, guildId: bot.transformers.snowflake(payload.guild.id) })),
    threads: (payload.guild.threads || []).map((channel) => channelToThread(channel)),

    roles: new Collection((payload.guild.roles || []).map(role => transformRole(bot, {role, guildId: bot.transformers.snowflake(payload.guild.id)})).map(role => [role.id, role])),
    presences: new Collection((payload.guild.presences || []).map((p) => [bot.transformers.snowflake(p.user!.id), p])),
    emojis: new Collection((payload.guild.emojis || []).map((emoji) => [bot.transformers.snowflake(emoji.id!), emoji])),
    voiceStates: new Collection((payload.guild.voice_states || []).map((vs) => transformVoiceState(bot, {voiceState: vs, guildId: bot.transformers.snowflake(payload.guild.id)})).map((vs) => [vs.userId, vs])),

    id: bot.transformers.snowflake(payload.guild.id),
    ownerId: bot.transformers.snowflake(payload.guild.owner_id),
    permissions: payload.guild.permissions ? bot.transformers.snowflake(payload.guild.permissions) : 0n,
    afkChannelId: payload.guild.afk_channel_id ? bot.transformers.snowflake(payload.guild.afk_channel_id) : undefined,
    widgetChannelId: payload.guild.widget_channel_id ? bot.transformers.snowflake(payload.guild.widget_channel_id) : undefined,
    applicationId: payload.guild.application_id ? bot.transformers.snowflake(payload.guild.application_id) : undefined,
    systemChannelId: payload.guild.system_channel_id ? bot.transformers.snowflake(payload.guild.system_channel_id) : undefined,
    rulesChannelId: payload.guild.rules_channel_id ? bot.transformers.snowflake(payload.guild.rules_channel_id) : undefined,
    publicUpdatesChannelId: payload.guild.public_updates_channel_id ? bot.transformers.snowflake(payload.guild.public_updates_channel_id) : undefined
  }
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
    > {
  /** Guild id */
  id: bigint;
  /** Id of the owner */
  ownerId: bigint;
  /** Total permissions for the user in the guild (execludes overrides) */
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
  /** Whether this server's icon is animated */
  animatedIcon: boolean;
  /** Whether this server's banner is animated. */
  animatedBanner: boolean;
  /** Whether this server's splash is animated. */
  animatedSplash: boolean;
  /** The id of the shard this guild is bound to */
  shardId: number;
  /** Total number of members in this guild */
  memberCount: number;
  /** The roles in the guild */
  roles: Collection<bigint, DiscordenoRole>;
  /** The presences of all the users in the guild. */
  presences: Collection<bigint, PresenceUpdate>;
  /** The Voice State data for each user in a voice channel in this server. */
  voiceStates: Collection<bigint, DiscordenoVoiceState>;
  /** Custom guild emojis */
  emojis: Collection<bigint, Emoji>;
  /** Whether the bot is the owner of this guild */
  isOwner: boolean;
  /** Holds all the boolean toggles. */
  bitfield: bigint;
}
