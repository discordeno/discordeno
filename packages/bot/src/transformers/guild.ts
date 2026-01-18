import { ChannelTypes, type DiscordGuild, type DiscordPresenceUpdate } from '@discordeno/types';
import { Collection, iconHashToBigInt } from '@discordeno/utils';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { GuildToggles } from './toggles/guild.js';
import type { Channel, Guild } from './types.js';

export const baseGuild: Guild = {
  // This allows typescript to still check for type errors on functions below
  ...(undefined as unknown as Guild),

  get threads() {
    if (!this.channels) return new Collection<bigint, Channel>();

    const threads = this.channels
      .array()
      .filter((x) => x.type === ChannelTypes.PublicThread || x.type === ChannelTypes.PrivateThread || x.type === ChannelTypes.AnnouncementThread);

    return new Collection(threads.map((x) => [x.id, x]));
  },
  get features() {
    return this.toggles.features;
  },
};

export function transformGuild(bot: Bot, payload: DiscordGuild, extra?: { shardId?: number }): Guild {
  const guildId = bot.transformers.snowflake(payload.id);
  const props = bot.transformers.desiredProperties.guild;
  const guild: SetupDesiredProps<Guild, TransformersDesiredProperties, DesiredPropertiesBehavior> = Object.create(baseGuild);

  if (props.afkTimeout && payload.afk_timeout) guild.afkTimeout = payload.afk_timeout;
  if (props.approximateMemberCount && payload.approximate_member_count) guild.approximateMemberCount = payload.approximate_member_count;
  if (props.approximatePresenceCount && payload.approximate_presence_count) guild.approximatePresenceCount = payload.approximate_presence_count;
  if (props.defaultMessageNotifications) guild.defaultMessageNotifications = payload.default_message_notifications;
  if (props.description && payload.description) guild.description = payload.description;
  if (props.toggles) guild.toggles = new GuildToggles(payload);
  if (props.explicitContentFilter) guild.explicitContentFilter = payload.explicit_content_filter;
  if (props.maxMembers && payload.max_members) guild.maxMembers = payload.max_members;
  if (props.maxPresences && payload.max_presences) guild.maxPresences = payload.max_presences ?? undefined;
  if (props.maxVideoChannelUsers && payload.max_video_channel_users) guild.maxVideoChannelUsers = payload.max_video_channel_users;
  if (props.maxStageVideoChannelUsers && payload.max_stage_video_channel_users)
    guild.maxStageVideoChannelUsers = payload.max_stage_video_channel_users;
  if (props.mfaLevel) guild.mfaLevel = payload.mfa_level;
  if (props.name && payload.name) guild.name = payload.name;
  if (props.nsfwLevel) guild.nsfwLevel = payload.nsfw_level;
  if (props.preferredLocale && payload.preferred_locale) guild.preferredLocale = payload.preferred_locale;
  if (props.premiumSubscriptionCount && payload.premium_subscription_count !== undefined)
    guild.premiumSubscriptionCount = payload.premium_subscription_count;
  if (props.premiumTier) guild.premiumTier = payload.premium_tier;
  if (props.stageInstances && payload.stage_instances)
    guild.stageInstances = payload.stage_instances.map((si) => ({
      /** The id of this Stage instance */
      id: bot.transformers.snowflake(si.id),
      /** The guild id of the associated Stage channel */
      guildId,
      /** The id of the associated Stage channel */
      channelId: bot.transformers.snowflake(si.channel_id),
      /** The topic of the Stage instance (1-120 characters) */
      topic: si.topic,
    }));
  if (props.channels && (!!payload.channels || !!payload.threads))
    guild.channels = new Collection(
      [...(payload.channels ?? []), ...(payload.threads ?? [])].map((channel) => {
        const result = bot.transformers.channel(bot, channel, { guildId });
        // TODO: We should check that id exists, or else the collection will have undefined as it's key (This is valid for all the collections below as well)
        // @ts-expect-error: See TODO above
        return [result.id, result];
      }),
    );
  if (props.members && payload.members)
    guild.members = new Collection(
      payload.members.map((member) => {
        const result = bot.transformers.member(bot, member, { guildId, userId: bot.transformers.snowflake(member.user!.id) });
        // @ts-expect-error: See TODO above
        return [result.id, result];
      }),
    );
  if (props.roles && payload.roles)
    guild.roles = new Collection(
      payload.roles.map((role) => {
        const result = bot.transformers.role(bot, role, { guildId });
        // @ts-expect-error: See TODO above
        return [result.id, result];
      }),
    );
  if (props.emojis && payload.emojis)
    guild.emojis = new Collection(
      payload.emojis.map((emoji) => {
        const result = bot.transformers.emoji(bot, emoji);
        // @ts-expect-error: See TODO above
        return [result.id!, result];
      }),
    );
  if (props.voiceStates && payload.voice_states)
    guild.voiceStates = new Collection(
      payload.voice_states.map((voiceState) => {
        const result = bot.transformers.voiceState(bot, voiceState, { guildId });
        // @ts-expect-error: See TODO above
        return [result.userId, result];
      }),
    );
  if (props.stickers && payload.stickers)
    guild.stickers = new Collection(
      payload.stickers?.map((sticker) => {
        const result = bot.transformers.sticker(bot, sticker);
        // @ts-expect-error: See TODO above
        return [result.id, result];
      }),
    );
  if (props.systemChannelFlags && payload.system_channel_flags) guild.systemChannelFlags = payload.system_channel_flags;
  if (props.vanityUrlCode && payload.vanity_url_code) guild.vanityUrlCode = payload.vanity_url_code;
  if (props.verificationLevel) guild.verificationLevel = payload.verification_level;
  if (props.welcomeScreen && payload.welcome_screen)
    guild.welcomeScreen = {
      description: payload.welcome_screen.description ?? undefined,
      welcomeChannels: payload.welcome_screen.welcome_channels.map((wc) => ({
        channelId: bot.transformers.snowflake(wc.channel_id),
        description: wc.description,
        emojiId: wc.emoji_id ? bot.transformers.snowflake(wc.emoji_id) : undefined,
        emojiName: wc.emoji_name ?? undefined,
      })),
    };
  if (props.discoverySplash && payload.discovery_splash) guild.discoverySplash = iconHashToBigInt(payload.discovery_splash);
  if (props.joinedAt && payload.joined_at) guild.joinedAt = Date.parse(payload.joined_at);
  if (props.memberCount && payload.member_count) guild.memberCount = payload.member_count ?? 0;
  if (props.shardId && extra?.shardId) guild.shardId = extra.shardId;
  if (props.icon && payload.icon) guild.icon = iconHashToBigInt(payload.icon);
  if (props.banner && payload.banner) guild.banner = iconHashToBigInt(payload.banner);
  if (props.splash && payload.splash) guild.splash = iconHashToBigInt(payload.splash);
  if (props.id && payload.id) guild.id = guildId;
  if (props.ownerId && payload.owner_id) guild.ownerId = bot.transformers.snowflake(payload.owner_id);
  if (props.permissions && payload.permissions) guild.permissions = bot.transformers.snowflake(payload.permissions);
  if (props.afkChannelId && payload.afk_channel_id) guild.afkChannelId = bot.transformers.snowflake(payload.afk_channel_id);
  if (props.widgetChannelId && payload.widget_channel_id) guild.widgetChannelId = bot.transformers.snowflake(payload.widget_channel_id);
  if (props.applicationId && payload.application_id) guild.applicationId = bot.transformers.snowflake(payload.application_id);
  if (props.systemChannelId && payload.system_channel_id) guild.systemChannelId = bot.transformers.snowflake(payload.system_channel_id);
  if (props.rulesChannelId && payload.rules_channel_id) guild.rulesChannelId = bot.transformers.snowflake(payload.rules_channel_id);
  if (props.publicUpdatesChannelId && payload.public_updates_channel_id)
    guild.publicUpdatesChannelId = bot.transformers.snowflake(payload.public_updates_channel_id);
  if (props.premiumProgressBarEnabled && payload.premium_progress_bar_enabled) guild.premiumProgressBarEnabled = payload.premium_progress_bar_enabled;
  if (props.large && payload.large) guild.large = payload.large;
  if (props.owner && payload.owner) guild.owner = payload.owner;
  if (props.widgetEnabled && payload.widget_enabled) guild.widgetEnabled = payload.widget_enabled;
  if (props.unavailable && payload.unavailable) guild.unavailable = payload.unavailable;
  if (props.iconHash && payload.icon_hash) guild.iconHash = iconHashToBigInt(payload.icon_hash);
  if (props.presences && payload.presences)
    guild.presences = payload.presences?.map((presence) => bot.transformers.presence(bot, presence as DiscordPresenceUpdate));
  if (props.safetyAlertsChannelId && payload.safety_alerts_channel_id)
    guild.safetyAlertsChannelId = bot.transformers.snowflake(payload.safety_alerts_channel_id);
  if (props.incidentsData && payload.incidents_data) guild.incidentsData = bot.transformers.incidentsData(bot, payload.incidents_data);

  return bot.transformers.customizers.guild(bot, payload, guild, extra);
}
