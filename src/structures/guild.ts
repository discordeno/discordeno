import { botId } from "../bot.ts";
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
import { GetGuildAuditLog } from "../types/audit_log/get_guild_audit_log.ts";
import { CreateGuildBan } from "../types/guilds/create_guild_ban.ts";
import { DiscordGuild, Guild } from "../types/guilds/guild.ts";
import { DiscordGuildFeatures } from "../types/guilds/guild_features.ts";
import { GuildMember } from "../types/guilds/guild_member.ts";
import { ModifyGuild } from "../types/guilds/modify_guild.ts";
import { DiscordImageFormat } from "../types/misc/image_format.ts";
import { DiscordImageSize } from "../types/misc/image_size.ts";
import { PresenceUpdate } from "../types/misc/presence_update.ts";
import { Collection } from "../util/collection.ts";
import { createNewProp, snakeKeysToCamelCase } from "../util/utils.ts";
import { RoleStruct, structures } from "./mod.ts";

export const initialMemberLoadQueue = new Map<string, GuildMember[]>();

const baseGuild: Partial<GuildStruct> = {
  get members() {
    return cache.members.filter((member) => member.guilds.has(this.id!));
  },
  get channels() {
    return cache.channels.filter((channel) => channel.guildId === this.id);
  },
  get afkChannel() {
    return cache.channels.get(this.afkChannelId!);
  },
  get publicUpdatesChannel() {
    return cache.channels.get(this.publicUpdatesChannelId!);
  },
  get rulesChannel() {
    return cache.channels.get(this.rulesChannelId!);
  },
  get systemChannel() {
    return cache.channels.get(this.systemChannelId!);
  },
  get bot() {
    return cache.members.get(botId);
  },
  get botMember() {
    return this.bot?.guilds.get(this.id!);
  },
  get botVoice() {
    return this.voiceStates?.get(botId);
  },
  get owner() {
    return cache.members.get(this.ownerId!);
  },
  get partnered() {
    return Boolean(this.features?.includes(DiscordGuildFeatures.PARTNERED));
  },
  get verified() {
    return Boolean(this.features?.includes(DiscordGuildFeatures.VERIFIED));
  },
  bannerURL(size, format) {
    return guildBannerURL(this as unknown as Guild, size, format);
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
  getBan(memberId) {
    return getBan(this.id!, memberId);
  },
  bans() {
    return getBans(this.id!);
  },
  ban(memberId, options) {
    return banMember(this.id!, memberId, options);
  },
  unban(memberId) {
    return unbanMember(this.id!, memberId);
  },
  invites() {
    return getInvites(this.id!);
  },
  iconURL(size, format) {
    return guildIconURL(this as unknown as Guild, size, format);
  },
  leave() {
    return leaveGuild(this.id!);
  },
};

export async function createGuildStruct(
  data: DiscordGuild,
  shardId: number,
) {
  const {
    memberCount = 0,
    voiceStates = [],
    channels = [],
    presences = [],
    joinedAt = "",
    emojis,
    members = [],
    ...rest
  } = snakeKeysToCamelCase(data) as Guild;

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

  const props: Record<string, ReturnType<typeof createNewProp>> = {};
  for (const key of Object.keys(rest)) {
    // @ts-ignore index signature
    props[key] = createNewProp(rest[key]);
  }

  const guild = Object.create(baseGuild, {
    ...props,
    shardId: createNewProp(shardId),
    roles: createNewProp(
      new Collection(roles.map((r: RoleStruct) => [r.id, r])),
    ),
    joinedAt: createNewProp(Date.parse(joinedAt)),
    presences: createNewProp(
      new Collection(presences.map((p) => [p.user?.id, p])),
    ),
    memberCount: createNewProp(memberCount),
    emojis: createNewProp(
      new Collection(emojis.map((emoji) => [emoji.id ?? emoji.name, emoji])),
    ),
    voiceStates: createNewProp(
      new Collection(
        voiceStates.map((vs) => [vs.userId, vs]),
      ),
    ),
  });

  initialMemberLoadQueue.set(guild.id, members);

  return guild as Guild;
}

export interface GuildStruct extends
  Omit<
    Guild,
    "roles" | "presences" | "voiceStates" | "members" | "channels"
  > {
  /** The roles in the guild */
  roles: Collection<string, RoleStruct>;
  /** The presences of all the users in the guild. */
  presences: Collection<string, PresenceUpdate>;
  /** The Voice State data for each user in a voice channel in this server. */
  voiceStates: Collection<string, CleanVoiceState>;

  // GETTERS
  /** Members in this guild. */
  members: Collection<string, MemberStruct>;
  /** Channels in this guild. */
  channels: Collection<string, ChannelStruct>;
  /** The afk channel if one is set */
  afkChannel?: ChannelStruct;
  /** The public update channel if one is set */
  publicUpdatesChannel?: ChannelStruct;
  /** The rules channel in this guild if one is set */
  rulesChannel?: ChannelStruct;
  /** The system channel in this guild if one is set */
  systemChannel?: ChannelStruct;
  /** The bot member in this guild if cached */
  bot?: MemberStruct;
  /** The bot guild member in this guild if cached */
  botMember?: GuildMember;
  /** The bots voice state if there is one in this guild */
  botVoice?: CleanVoiceState;
  /** The owner member of this guild */
  owner?: MemberStruct;
  /** Whether or not this guild is partnered */
  partnered: boolean;
  /** Whether or not this guild is verified */
  verified: boolean;

  // METHODS

  /** The banner url for this server */
  bannerURL(
    size?: DiscordImageSize,
    format?: DiscordImageFormat,
  ): string | undefined;
  /** The full URL of the icon from Discords CDN. Undefined when no icon is set. */
  iconURL(
    size?: DiscordImageSize,
    format?: DiscordImageFormat,
  ): string | undefined;
  /** Delete a guild permanently. User must be owner. Returns 204 No Content on success. Fires a Guild Delete Gateway event. */
  delete(): ReturnType<typeof deleteServer>;
  /** Leave a guild */
  leave(): ReturnType<typeof leaveGuild>;
  /** Edit the server. Requires the MANAGE_GUILD permission. */
  edit(options: ModifyGuild): ReturnType<typeof editGuild>;
  /** Returns the audit logs for the guild. Requires VIEW AUDIT LOGS permission */
  auditLogs(options: GetGuildAuditLog): ReturnType<typeof getAuditLogs>;
  /** Returns a ban object for the given user or a 404 not found if the ban cannot be found. Requires the BAN_MEMBERS permission. */
  getBan(memberID: string): ReturnType<typeof getBan>;
  /** Returns a list of ban objects for the users banned from this guild. Requires the BAN_MEMBERS permission. */
  bans(): ReturnType<typeof getBans>;
  /** Ban a user from the guild and optionally delete previous messages sent by the user. Requires the BAN_MEMBERS permission. */
  ban(memberID: string, options: CreateGuildBan): ReturnType<typeof banMember>;
  /** Remove the ban for a user. Requires BAN_MEMBERS permission */
  unban(memberID: string): ReturnType<typeof unbanMember>;
  /** Get all the invites for this guild. Requires MANAGE_GUILD permission */
  invites(): ReturnType<typeof getInvites>;
}
