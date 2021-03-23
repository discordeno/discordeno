import { botID } from "../bot.ts";
import { cache, cacheHandlers } from "../cache.ts";
import { deleteServer } from "../helpers/guilds/delete_server.ts";
import { editGuild } from "../helpers/guilds/edit_guild.ts";
import { getAuditLogs } from "../helpers/guilds/get_audit_logs.ts";
import { getBan } from "../helpers/guilds/get_ban.ts";
import { getBans } from "../helpers/guilds/get_bans.ts";
import { guildBannerURL } from "../helpers/guilds/guild_banner_url.ts";
import { guildIconURL } from "../helpers/guilds/guild_icon_url.ts";
import { leaveGuild } from "../helpers/guilds/leave_guild.ts";
import { getInvites } from "../helpers/invites/get_invites.ts";
import { banMember } from "../helpers/members/ban_member.ts";
import { unbanMember } from "../helpers/members/unban_member.ts";
import { Collection } from "../util/collection.ts";
import { createNewProp } from "../util/utils.ts";
import { Member } from "./member.ts";
import { Channel, Role, structures } from "./mod.ts";

export const initialMemberLoadQueue = new Map<string, MemberCreatePayload[]>();

const baseGuild: Partial<Guild> = {
  get members() {
    return cache.members.filter((member) => member.guilds.has(this.id!));
  },
  get channels() {
    return cache.channels.filter((channel) => channel.guildID === this.id);
  },
  get afkChannel() {
    return cache.channels.get(this.afkChannelID!);
  },
  get publicUpdatesChannel() {
    return cache.channels.get(this.publicUpdatesChannelID!);
  },
  get rulesChannel() {
    return cache.channels.get(this.rulesChannelID!);
  },
  get systemChannel() {
    return cache.channels.get(this.systemChannelID!);
  },
  get bot() {
    return cache.members.get(botID);
  },
  get botMember() {
    return this.bot?.guilds.get(this.id!);
  },
  get botVoice() {
    return this.voiceStates?.get(botID);
  },
  get owner() {
    return cache.members.get(this.ownerID!);
  },
  get partnered() {
    return Boolean(this.features?.includes("PARTNERED"));
  },
  get verified() {
    return Boolean(this.features?.includes("VERIFIED"));
  },
  bannerURL(size, format) {
    return guildBannerURL(this as Guild, size, format);
  },
  delete() {
    return deleteServer(this.id!);
  },
  edit(options) {
    return editGuild(this.id!, options);
  },
  auditLogs(options) {
    return getAuditLogs(this.id!, options);
  },
  getBan(memberID) {
    return getBan(this.id!, memberID);
  },
  bans() {
    return getBans(this.id!);
  },
  ban(memberID, options) {
    return banMember(this.id!, memberID, options);
  },
  unban(memberID) {
    return unbanMember(this.id!, memberID);
  },
  invites() {
    return getInvites(this.id!);
  },
  iconURL(size, format) {
    return guildIconURL(this as Guild, size, format);
  },
  leave() {
    return leaveGuild(this.id!);
  },
};

export async function createGuildStruct(
  data: CreateGuildPayload,
  shardID: number,
) {
  const {
    disovery_splash: discoverySplash,
    default_message_notifications: defaultMessageNotifications,
    explicit_content_filter: explicitContentFilter,
    system_channel_flags: systemChannelFlags,
    rules_channel_id: rulesChannelID,
    public_updates_channel_id: publicUpdatesChannelID,
    max_video_channel_users: maxVideoChannelUsers,
    approximate_member_count: approximateMemberCount,
    approximate_presence_count: approximatePresenceCount,
    owner_id: ownerID,
    afk_channel_id: afkChannelID,
    afk_timeout: afkTimeout,
    widget_enabled: widgetEnabled,
    widget_channel_id: widgetChannelID,
    verification_level: verificationLevel,
    mfa_level: mfaLevel,
    system_channel_id: systemChannelID,
    max_presences: maxPresences,
    max_members: maxMembers,
    vanity_url_code: vanityURLCode,
    premium_tier: premiumTier,
    premium_subscription_count: premiumSubscriptionCount,
    preferred_locale: preferredLocale,
    joined_at: joinedAt,
    member_count: memberCount = 0,
    voice_states: voiceStates = [],
    channels = [],
    members,
    presences = [],
    emojis,
    ...rest
  } = data;

  const roles = await Promise.all(
    data.roles.map((role) => structures.createRoleStruct(role)),
  );

  await Promise.all(channels.map(async (channel) => {
    const channelStruct = await structures.createChannelStruct(
      channel,
      rest.id,
    );
    return cacheHandlers.set("channels", channelStruct.id, channelStruct);
  }));

  const restProps: Record<string, ReturnType<typeof createNewProp>> = {};
  for (const key of Object.keys(rest)) {
    // @ts-ignore index signature
    restProps[key] = createNewProp(rest[key]);
  }

  const guild = Object.create(baseGuild, {
    ...restProps,
    discoverySplash: createNewProp(discoverySplash),
    defaultMessageNotifications: createNewProp(defaultMessageNotifications),
    explicitContentFilter: createNewProp(explicitContentFilter),
    rulesChannelID: createNewProp(rulesChannelID),
    publicUpdatesChannelID: createNewProp(publicUpdatesChannelID),
    maxVideoChannelUsers: createNewProp(maxVideoChannelUsers),
    approximateMemberCount: createNewProp(approximateMemberCount),
    approximatePresenceCount: createNewProp(approximatePresenceCount),
    shardID: createNewProp(shardID),
    ownerID: createNewProp(ownerID),
    afkChannelID: createNewProp(afkChannelID),
    afkTimeout: createNewProp(afkTimeout),
    widgetEnabled: createNewProp(widgetEnabled),
    widgetChannelID: createNewProp(widgetChannelID),
    verificationLevel: createNewProp(verificationLevel),
    mfaLevel: createNewProp(mfaLevel),
    systemChannelID: createNewProp(systemChannelID),
    maxPresences: createNewProp(maxPresences),
    maxMembers: createNewProp(maxMembers),
    vanityURLCode: createNewProp(vanityURLCode),
    premiumTier: createNewProp(premiumTier),
    premiumSubscriptionCount: createNewProp(premiumSubscriptionCount),
    preferredLocale: createNewProp(preferredLocale),
    roles: createNewProp(new Collection(roles.map((r: Role) => [r.id, r]))),
    joinedAt: createNewProp(Date.parse(joinedAt)),
    presences: createNewProp(
      new Collection(presences.map((p: Presence) => [p.user.id, p])),
    ),
    memberCount: createNewProp(memberCount),
    emojis: createNewProp(
      new Collection(emojis.map((emoji) => [emoji.id ?? emoji.name, emoji])),
    ),
    voiceStates: createNewProp(
      new Collection(
        voiceStates.map((vs: VoiceState) => [
          vs.user_id,
          {
            ...vs,
            guildID: vs.guild_id,
            channelID: vs.channel_id,
            userID: vs.user_id,
            sessionID: vs.session_id,
            selfDeaf: vs.self_deaf,
            selfMute: vs.self_mute,
            selfStream: vs.self_stream,
          },
        ]),
      ),
    ),
  });

  initialMemberLoadQueue.set(guild.id, members);

  return guild as Guild;
}
