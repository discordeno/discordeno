import { Guild } from "../structures/guild.ts";
import { createChannel } from "../structures/channel.ts";

import { formatImageURL } from "../utils/cdn.ts";
import { botHasPermission } from "../utils/permissions.ts";

import { RequestManager } from "../module/requestManager.ts";

import { endpoints } from "../constants/discord.ts";

import { Errors } from "../types/errors.ts";
import { Permissions, Permission } from "../types/permission.ts";
import {
  CreateChannelOptions,
  ChannelCreatePayload,
  ChannelTypes,
} from "../types/channel.ts";
import { ImageFormats, ImageSize } from "../types/cdn.ts";
import {
  CreateEmojisOptions,
  PositionSwap,
  EditEmojisOptions,
  CreateRoleOptions,
  PrunePayload,
  FetchMembersOptions,
  GetAuditLogsOptions,
  EditIntegrationOptions,
  BanOptions,
  GuildEditOptions,
} from "../types/guild.ts";
import { RoleData } from "../types/role.ts";
import { createRole } from "../structures/role.ts";
import { Intents } from "../types/options.ts";
import { identifyPayload } from "../module/client.ts";
import { requestAllMembers } from "../module/shardingManager.ts";
import { MemberCreatePayload } from "../types/member.ts";
import { cache } from "../utils/cache.ts";
import { createMember } from "../structures/member.ts";

/** Gets an array of all the channels ids that are the children of this category. */
export function categoryChildrenIDs(guild: Guild, id: string) {
  const channelIDs: string[] = [];
  guild.channels.forEach((channel) => {
    if (channel.parentID === id) channelIDs.push(channel.id);
  });

  return channelIDs;
}

/** The full URL of the icon from Discords CDN. Undefined when no icon is set. */
export function guildIconURL(
  guild: Guild,
  size: ImageSize = 128,
  format?: ImageFormats,
) {
  return guild.icon
    ? formatImageURL(endpoints.GUILD_ICON(guild.id, guild.icon), size, format)
    : undefined;
}

/** The full URL of the splash from Discords CDN. Undefined if no splash is set. */
export function guildSplashURL(
  guild: Guild,
  size: ImageSize = 128,
  format?: ImageFormats,
) {
  return guild.splash
    ? formatImageURL(
      endpoints.GUILD_SPLASH(guild.id, guild.splash),
      size,
      format,
    )
    : undefined;
}
/** The full URL of the banner from Discords CDN. Undefined if no banner is set. */
export function guildBannerURL(
  guild: Guild,
  size: ImageSize = 128,
  format?: ImageFormats,
) {
  return guild.banner
    ? formatImageURL(
      endpoints.GUILD_BANNER(guild.id, guild.banner),
      size,
      format,
    )
    : undefined;
}

/** Create a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
export async function createGuildChannel(
  guild: Guild,
  name: string,
  options: CreateChannelOptions,
) {
  if (!botHasPermission(guild.id, [Permissions.MANAGE_CHANNELS])) {
    throw new Error(Errors.MISSING_MANAGE_CHANNELS);
  }
  const result =
    (await RequestManager.post(endpoints.GUILD_CHANNELS(guild.id), {
      name,
      permission_overwrites: options?.permission_overwrites
        ? options.permission_overwrites.map((perm) => ({
          ...perm,
          allow: perm.allow.map((p) => Permissions[p]),
          deny: perm.deny.map((p) => Permissions[p]),
        }))
        : undefined,
      ...options,
      type: options.type ? ChannelTypes[options.type] : undefined,
    })) as ChannelCreatePayload;

  const channel = createChannel(result);
  guild.channels.set(result.id, channel);
  return channel;
}

/** Returns a list of guild channel objects.
*
* ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your channels will be cached in your guild.**
*/
export function getChannels(guildID: string) {
  return RequestManager.get(endpoints.GUILD_CHANNELS(guildID));
}

/** Modify the positions of channels on the guild. Requires MANAGE_CHANNELS permisison. */
export function swapChannels(
  guildID: string,
  channelPositions: PositionSwap[],
) {
  if (channelPositions.length < 2) {
    throw "You must provide atleast two channels to be swapped.";
  }
  return RequestManager.patch(
    endpoints.GUILD_CHANNELS(guildID),
    channelPositions,
  );
}

/** Returns a guild member object for the specified user.
*
* ⚠️ **ADVANCED USE ONLY: Your members will be cached in your guild most likely. Only use this when you are absolutely sure the member is not cached.**
*/
export async function getMember(guildID: string, id: string) {
  const guild = cache.guilds.get(guildID);
  if (!guild) return;

  const data = await RequestManager.get(
    endpoints.GUILD_MEMBER(guildID, id),
  ) as MemberCreatePayload;

  const member = createMember(data, guild);
  guild.members.set(id, member);
  return member;
}

/** Create an emoji in the server. Emojis and animated emojis have a maximum file size of 256kb. Attempting to upload an emoji larger than this limit will fail and return 400 Bad Request and an error message, but not a JSON status code. */
export function createEmoji(
  guildID: string,
  name: string,
  image: string,
  options: CreateEmojisOptions,
) {
  if (
    !botHasPermission(guildID, [Permissions.MANAGE_EMOJIS])
  ) {
    throw new Error(Errors.MISSING_MANAGE_EMOJIS);
  }
  return RequestManager.post(endpoints.GUILD_EMOJIS(guildID), {
    ...options,
    name,
    image,
  });
}

/** Modify the given emoji. Requires the MANAGE_EMOJIS permission. */
export function editEmoji(
  guildID: string,
  id: string,
  options: EditEmojisOptions,
) {
  if (
    !botHasPermission(guildID, [Permissions.MANAGE_EMOJIS])
  ) {
    throw new Error(Errors.MISSING_MANAGE_EMOJIS);
  }
  return RequestManager.patch(endpoints.GUILD_EMOJI(guildID, id), {
    name: options.name,
    roles: options.roles,
  });
}

/** Delete the given emoji. Requires the MANAGE_EMOJIS permission. Returns 204 No Content on success. */
export function deleteEmoji(guildID: string, id: string, reason?: string) {
  if (
    !botHasPermission(guildID, [Permissions.MANAGE_EMOJIS])
  ) {
    throw new Error(Errors.MISSING_MANAGE_EMOJIS);
  }
  return RequestManager.delete(
    endpoints.GUILD_EMOJI(guildID, id),
    { reason },
  );
}

/** Create a new role for the guild. Requires the MANAGE_ROLES permission. */
export async function createGuildRole(
  guild: Guild,
  options: CreateRoleOptions,
  reason?: string,
) {
  if (
    !botHasPermission(guild.id, [Permissions.MANAGE_ROLES])
  ) {
    throw new Error(Errors.MISSING_MANAGE_ROLES);
  }
  const role_data = await RequestManager.post(
    endpoints.GUILD_ROLES(guild.id),
    {
      ...options,
      permissions: options.permissions
        ?.reduce((subtotal, perm) => {
          subtotal |= Permissions[perm];
          return subtotal;
        }, 0),
      reason,
    },
  );

  const roleData = role_data as RoleData;
  const role = createRole(roleData);
  guild.roles.set(role.id, role);
  return role;
}

/** Edit a guild role. Requires the MANAGE_ROLES permission. */
export function editRole(
  guildID: string,
  id: string,
  options: CreateRoleOptions,
) {
  if (
    !botHasPermission(guildID, [Permissions.MANAGE_ROLES])
  ) {
    throw new Error(Errors.MISSING_MANAGE_ROLES);
  }
  return RequestManager.patch(endpoints.GUILD_ROLE(guildID, id), options);
}

/** Delete a guild role. Requires the MANAGE_ROLES permission. */
export function deleteRole(guildID: string, id: string) {
  if (
    !botHasPermission(guildID, [Permissions.MANAGE_ROLES])
  ) {
    throw new Error(Errors.MISSING_MANAGE_ROLES);
  }
  return RequestManager.delete(endpoints.GUILD_ROLE(guildID, id));
}

/** Returns a list of role objects for the guild.
*
* ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your roles will be cached in your guild.**
*/
export function getRoles(guildID: string) {
  if (
    !botHasPermission(guildID, [Permissions.MANAGE_ROLES])
  ) {
    throw new Error(Errors.MISSING_MANAGE_ROLES);
  }
  return RequestManager.get(endpoints.GUILD_ROLES(guildID));
}

/** Modify the positions of a set of role objects for the guild. Requires the MANAGE_ROLES permission. */
export function swapRoles(guildID: string, rolePositons: PositionSwap) {
  if (
    !botHasPermission(guildID, [Permissions.MANAGE_ROLES])
  ) {
    throw new Error(Errors.MISSING_MANAGE_ROLES);
  }
  return RequestManager.patch(endpoints.GUILD_ROLES(guildID), rolePositons);
}

/** Check how many members would be removed from the server in a prune operation. Requires the KICK_MEMBERS permission */
export async function getPruneCount(guildID: string, days: number) {
  if (days < 1) {
    throw new Error(Errors.PRUNE_MIN_DAYS);
  }
  if (
    !botHasPermission(guildID, [Permissions.KICK_MEMBERS])
  ) {
    throw new Error(Errors.MISSING_KICK_MEMBERS);
  }
  const result = (await RequestManager.get(
    endpoints.GUILD_PRUNE(guildID),
    { days },
  )) as PrunePayload;
  return result.pruned;
}

/** Begin pruning all members in the given time period */
export function pruneMembers(guildID: string, days: number) {
  if (days < 1) {
    throw new Error(Errors.PRUNE_MIN_DAYS);
  }
  if (
    !botHasPermission(guildID, [Permissions.KICK_MEMBERS])
  ) {
    throw new Error(Errors.MISSING_KICK_MEMBERS);
  }
  return RequestManager.post(endpoints.GUILD_PRUNE(guildID), { days });
}

export function fetchMembers(guild: Guild, options?: FetchMembersOptions) {
  if (!(identifyPayload.intents & Intents.GUILD_MEMBERS)) {
    throw new Error(Errors.MISSING_INTENT_GUILD_MEMBERS);
  }

  return new Promise((resolve) => {
    requestAllMembers(guild, resolve, options);
  });
}

/** Returns the audit logs for the guild. Requires VIEW AUDIT LOGS permission */
export function getAuditLogs(guildID: string, options: GetAuditLogsOptions) {
  if (!botHasPermission(guildID, [Permissions.VIEW_AUDIT_LOG])) {
    throw new Error(Errors.MISSING_VIEW_AUDIT_LOG);
  }

  return RequestManager.get(endpoints.GUILD_AUDIT_LOGS(guildID), {
    ...options,
    limit: options.limit && options.limit >= 1 && options.limit <= 100
      ? options.limit
      : 50,
  });
}

/** Returns the guild embed object. Requires the MANAGE_GUILD permission. */
export function getEmbed(guildID: string) {
  if (
    !botHasPermission(guildID, [Permissions.MANAGE_GUILD])
  ) {
    throw new Error(Errors.MISSING_MANAGE_GUILD);
  }
  return RequestManager.get(endpoints.GUILD_EMBED(guildID));
}

/** Modify a guild embed object for the guild. Requires the MANAGE_GUILD permission. */
export function editEmbed(
  guildID: string,
  enabled: boolean,
  channelID?: string | null,
) {
  if (
    !botHasPermission(guildID, [Permissions.MANAGE_GUILD])
  ) {
    throw new Error(Errors.MISSING_MANAGE_GUILD);
  }
  return RequestManager.patch(
    endpoints.GUILD_EMBED(guildID),
    { enabled, channel_id: channelID },
  );
}

/** Returns the code and uses of the vanity url for this server if it is enabled. Requires the MANAGE_GUILD permission. */
export function getVanityURL(guildID: string) {
  return RequestManager.get(endpoints.GUILD_VANITY_URL(guildID));
}

/** Returns a list of integrations for the guild. Requires the MANAGE_GUILD permission. */
export function getIntegrations(guildID: string) {
  if (
    !botHasPermission(guildID, [Permissions.MANAGE_GUILD])
  ) {
    throw new Error(Errors.MISSING_MANAGE_GUILD);
  }
  return RequestManager.get(endpoints.GUILD_INTEGRATIONS(guildID));
}

/** Modify the behavior and settings of an integration object for the guild. Requires the MANAGE_GUILD permission. */
export function editIntegration(
  guildID: string,
  id: string,
  options: EditIntegrationOptions,
) {
  if (
    !botHasPermission(guildID, [Permissions.MANAGE_GUILD])
  ) {
    throw new Error(Errors.MISSING_MANAGE_GUILD);
  }
  return RequestManager.patch(
    endpoints.GUILD_INTEGRATION(guildID, id),
    options,
  );
}

/** Delete the attached integration object for the guild with this id. Requires MANAGE_GUILD permission. */
export function deleteIntegration(guildID: string, id: string) {
  if (
    !botHasPermission(guildID, [Permissions.MANAGE_GUILD])
  ) {
    throw new Error(Errors.MISSING_MANAGE_GUILD);
  }
  return RequestManager.delete(endpoints.GUILD_INTEGRATION(guildID, id));
}

/** Sync an integration. Requires teh MANAGE_GUILD permission. */
export function syncIntegration(guildID: string, id: string) {
  if (
    !botHasPermission(guildID, [Permissions.MANAGE_GUILD])
  ) {
    throw new Error(Errors.MISSING_MANAGE_GUILD);
  }
  return RequestManager.post(endpoints.GUILD_INTEGRATION_SYNC(guildID, id));
}

/** Returns a list of ban objects for the users banned from this guild. Requires the BAN_MEMBERS permission. */
export function getBans(guildID: string) {
  if (
    !botHasPermission(guildID, [Permissions.BAN_MEMBERS])
  ) {
    throw new Error(Errors.MISSING_BAN_MEMBERS);
  }
  return RequestManager.get(endpoints.GUILD_BANS(guildID));
}

/** Ban a user from the guild and optionally delete previous messages sent by the user. Requires teh BAN_MEMBERS permission. */
export function ban(guildID: string, id: string, options: BanOptions) {
  if (
    !botHasPermission(guildID, [Permissions.BAN_MEMBERS])
  ) {
    throw new Error(Errors.MISSING_BAN_MEMBERS);
  }
  return RequestManager.put(endpoints.GUILD_BAN(guildID, id), options);
}

/** Remove the ban for a user. REquires BAN_MEMBERS permission */
export function unban(guildID: string, id: string) {
  if (
    !botHasPermission(guildID, [Permissions.BAN_MEMBERS])
  ) {
    throw new Error(Errors.MISSING_BAN_MEMBERS);
  }
  return RequestManager.delete(endpoints.GUILD_BAN(guildID, id));
}

/** Check whether a member has certain permissions in this channel. */
export function channelHasPermissions(
  guild: Guild,
  channelID: string,
  memberID: string,
  permissions: Permission[],
) {
  if (memberID === guild.ownerID) return true;

  const member = guild.members.get(memberID);
  if (!member) {
    throw new Error(
      "Invalid member id provided. This member was not found in the cache. Please fetch them with getMember on guild.",
    );
  }

  const channel = guild.channels.get(channelID);
  if (!channel) {
    throw new Error(
      "Invalid channel id provided. This channel was not found in the cache.",
    );
  }

  let permissionBits = member.roles.reduce((bits, roleID) => {
    const role = guild.roles.get(roleID);
    if (!role) return bits;

    bits |= role.permissions;

    return bits;
  }, 0);

  if (permissionBits & Permissions.ADMINISTRATOR) return true;

  return permissions.every((permission) =>
    permissionBits & Permissions[permission]
  );
}

/** Modify a guilds settings. Requires the MANAGE_GUILD permission. */
export function editGuild(guildID: string, options: GuildEditOptions) {
  if (
    !botHasPermission(guildID, [Permissions.MANAGE_GUILD])
  ) {
    throw new Error(Errors.MISSING_MANAGE_GUILD);
  }
  return RequestManager.patch(endpoints.GUILD(guildID), options);
}

/** Get all the invites for this guild. Requires MANAGE_GUILD permission */
export function getInvites(guildID: string) {
  if (
    !botHasPermission(guildID, [Permissions.MANAGE_GUILD])
  ) {
    throw new Error(Errors.MISSING_MANAGE_GUILD);
  }
  return RequestManager.get(endpoints.GUILD_INVITES(guildID));
}

/** Leave a guild */
export function leave(guildID: string) {
  return RequestManager.delete(endpoints.GUILD_LEAVE(guildID));
}

/** Returns a list of voice region objects for the guild. Unlike the similar /voice route, this returns VIP servers when the guild is VIP-enabled. */
export function getVoiceRegions(guildID: string) {
  return RequestManager.get(endpoints.GUILD_REGIONS(guildID));
}

/** Returns a list of guild webhooks objects. Requires the MANAGE_WEBHOOKs permission. */
export function getWebhooks(guildID: string) {
  if (!botHasPermission(guildID, [Permissions.MANAGE_WEBHOOKS])) {
    throw new Error(Errors.MISSING_MANAGE_WEBHOOKS);
  }

  return RequestManager.get(endpoints.GUILD_WEBHOOKS(guildID));
}
