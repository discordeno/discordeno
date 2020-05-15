import { botID, identifyPayload } from "../module/client.ts";
import { endpoints } from "../constants/discord.ts";
import { formatImageURL } from "../utils/cdn.ts";
import {
  CreateGuildPayload,
  PrunePayload,
  PositionSwap,
  GetAuditLogsOptions,
  EditIntegrationOptions,
  BanOptions,
  GuildEditOptions,
  CreateEmojisOptions,
  EditEmojisOptions,
  CreateRoleOptions,
  FetchMembersOptions,
} from "../types/guild.ts";
import { createRole } from "./role.ts";
import { createMember } from "./member.ts";
import { createChannel } from "./channel.ts";
import {
  CreateChannelOptions,
  ChannelTypes,
  ChannelCreatePayload,
} from "../types/channel.ts";
import { ImageSize, ImageFormats } from "../types/cdn.ts";
import { Permissions, Permission } from "../types/permission.ts";
import { botHasPermission } from "../utils/permissions.ts";
import { Errors } from "../types/errors.ts";
import { RequestManager } from "../module/requestManager.ts";
import { RoleData } from "../types/role.ts";
import { Intents } from "../types/options.ts";
import { requestAllMembers } from "../module/shardingManager.ts";

export const createGuild = (data: CreateGuildPayload) => {
  const guild = {
    ...data,
    /** The raw create guild payload data. */
    raw: data,
    /** The roles in the guild */
    roles: new Map(data.roles.map((r) => [r.id, createRole(r)])),
    /** When this guild was joined at. */
    joinedAt: Date.parse(data.joined_at),
    /** The users in this guild. */
    members: new Map(
      data.members.map((
        m,
      ) => [m.user.id, createMember(m, data.id, data.roles, data.owner_id)]),
    ),
    /** The channels in the guild */
    channels: new Map(data.channels.map((c) => [c.id, createChannel(c)])),
    /** The presences of all the users in the guild. */
    presences: new Map(data.presences.map((p) => [p.user.id, p])),
    /** The total number of members in this guild. This value is updated as members leave and join the server. However, if you do not have the intent enabled to be able to listen to these events, then this will not be accurate. */
    memberCount: data.member_count || 0,

    /** Gets an array of all the channels ids that are the children of this category. */
    categoryChildrenIDs: (id: string) =>
      data.channels.filter((c) => c.parent_id === id).map((c) => c.id),
    /** The full URL of the icon from Discords CDN. Undefined when no icon is set. */
    iconURL: (size: ImageSize = 128, format?: ImageFormats) =>
      data.icon
        ? formatImageURL(endpoints.GUILD_ICON(data.id, data.icon), size, format)
        : undefined,
    /** The full URL of the splash from Discords CDN. Undefined if no splash is set. */
    splashURL: (size: ImageSize = 128, format?: ImageFormats) =>
      data.splash
        ? formatImageURL(
          endpoints.GUILD_SPLASH(data.id, data.splash),
          size,
          format,
        )
        : undefined,
    /** The full URL of the banner from Discords CDN. Undefined if no banner is set. */
    bannerURL: (size: ImageSize = 128, format?: ImageFormats) =>
      data.banner
        ? formatImageURL(
          endpoints.GUILD_BANNER(data.id, data.banner),
          size,
          format,
        )
        : undefined,
    /** Create a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
    createChannel: async (name: string, options: CreateChannelOptions) => {
      if (!botHasPermission(data.id, botID, [Permissions.MANAGE_CHANNELS])) {
        throw new Error(Errors.MISSING_MANAGE_CHANNELS);
      }
      const result =
        (await RequestManager.post(endpoints.GUILD_CHANNELS(data.id), {
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
    },
    /** Returns a list of guild channel objects.
     *
     * ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your channels will be cached in your guild.**
     */
    getChannels: () => {
      return RequestManager.get(endpoints.GUILD_CHANNELS(data.id));
    },
    /** Modify the positions of channels on the guild. Requires MANAGE_CHANNELS permisison. */
    swapChannels: (channelPositions: PositionSwap[]) => {
      if (channelPositions.length < 2) {
        throw "You must provide atleast two channels to be swapped.";
      }
      return RequestManager.patch(
        endpoints.GUILD_CHANNELS(data.id),
        channelPositions,
      );
    },
    /** Returns a guild member object for the specified user.
     *
     * ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your members will be cached in your guild.**
     */
    getMember: (id: string) => {
      return RequestManager.get(endpoints.GUILD_MEMBER(data.id, id));
    },
    /** Create an emoji in the server. Emojis and animated emojis have a maximum file size of 256kb. Attempting to upload an emoji larger than this limit will fail and return 400 Bad Request and an error message, but not a JSON status code. */
    createEmoji: (
      name: string,
      image: string,
      options: CreateEmojisOptions,
    ) => {
      if (
        !botHasPermission(data.id, botID, [Permissions.MANAGE_EMOJIS])
      ) {
        throw new Error(Errors.MISSING_MANAGE_EMOJIS);
      }
      return RequestManager.post(endpoints.GUILD_EMOJIS(data.id), {
        ...options,
        name,
        image,
      });
    },
    /** Modify the given emoji. Requires the MANAGE_EMOJIS permission. */
    editEmoji: (id: string, options: EditEmojisOptions) => {
      if (
        !botHasPermission(data.id, botID, [Permissions.MANAGE_EMOJIS])
      ) {
        throw new Error(Errors.MISSING_MANAGE_EMOJIS);
      }
      return RequestManager.patch(endpoints.GUILD_EMOJI(data.id, id), {
        name: options.name,
        roles: options.roles,
      });
    },
    /** Delete the given emoji. Requires the MANAGE_EMOJIS permission. Returns 204 No Content on success. */
    deleteEmoji: (id: string, reason?: string) => {
      if (
        !botHasPermission(data.id, botID, [Permissions.MANAGE_EMOJIS])
      ) {
        throw new Error(Errors.MISSING_MANAGE_EMOJIS);
      }
      return RequestManager.delete(
        endpoints.GUILD_EMOJI(data.id, id),
        { reason },
      );
    },
    /** Create a new role for the guild. Requires the MANAGE_ROLES permission. */
    createRole: async (options: CreateRoleOptions, reason?: string) => {
      if (
        !botHasPermission(data.id, botID, [Permissions.MANAGE_ROLES])
      ) {
        throw new Error(Errors.MISSING_MANAGE_ROLES);
      }
      const role_data = await RequestManager.post(
        endpoints.GUILD_ROLES(data.id),
        {
          ...options,
          permissions: options.permissions?.map((perm) => Permissions[perm]),
          reason,
        },
      );

      const roleData = role_data as RoleData;
      const role = createRole(roleData);
      guild.roles.set(roleData.id, role);
      return role;
    },
    /** Edit a guild role. Requires the MANAGE_ROLES permission. */
    editRole: (id: string, options: CreateRoleOptions) => {
      if (
        !botHasPermission(data.id, botID, [Permissions.MANAGE_ROLES])
      ) {
        throw new Error(Errors.MISSING_MANAGE_ROLES);
      }
      return RequestManager.patch(endpoints.GUILD_ROLE(data.id, id), options);
    },
    /** Delete a guild role. Requires the MANAGE_ROLES permission. */
    deleteRole: (id: string) => {
      if (
        !botHasPermission(data.id, botID, [Permissions.MANAGE_ROLES])
      ) {
        throw new Error(Errors.MISSING_MANAGE_ROLES);
      }
      return RequestManager.delete(endpoints.GUILD_ROLE(data.id, id));
    },
    /** Returns a list of role objects for the guild.
     *
     * ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your roles will be cached in your guild.**
     */
    getRoles: () => {
      if (
        !botHasPermission(data.id, botID, [Permissions.MANAGE_ROLES])
      ) {
        throw new Error(Errors.MISSING_MANAGE_ROLES);
      }
      return RequestManager.get(endpoints.GUILD_ROLES(data.id));
    },
    /** Modify the positions of a set of role objects for the guild. Requires the MANAGE_ROLES permission. */
    swapRoles: (rolePositons: PositionSwap) => {
      if (
        !botHasPermission(data.id, botID, [Permissions.MANAGE_ROLES])
      ) {
        throw new Error(Errors.MISSING_MANAGE_ROLES);
      }
      return RequestManager.patch(endpoints.GUILD_ROLES(data.id), rolePositons);
    },
    /** Check how many members would be removed from the server in a prune operation. Requires the KICK_MEMBERS permission */
    getPruneCount: async (days: number) => {
      if (days < 1) throw new Error(Errors.PRUNE_MIN_DAYS);
      if (
        !botHasPermission(data.id, botID, [Permissions.KICK_MEMBERS])
      ) {
        throw new Error(Errors.MISSING_KICK_MEMBERS);
      }
      const result = (await RequestManager.get(
        endpoints.GUILD_PRUNE(data.id),
        { days },
      )) as PrunePayload;
      return result.pruned;
    },
    /** Begin pruning all members in the given time period */
    pruneMembers: (days: number) => {
      if (days < 1) throw new Error(Errors.PRUNE_MIN_DAYS);
      if (
        !botHasPermission(data.id, botID, [Permissions.KICK_MEMBERS])
      ) {
        throw new Error(Errors.MISSING_KICK_MEMBERS);
      }
      return RequestManager.post(endpoints.GUILD_PRUNE(data.id), { days });
    },
    fetchMembers: (options?: FetchMembersOptions) => {
      if (!(identifyPayload.intents & Intents.GUILD_MEMBERS)) throw new Error(Errors.MISSING_INTENT_GUILD_MEMBERS)

      return new Promise((resolve) => {
        requestAllMembers(data.id, resolve, guild.memberCount, options)
      })
    },
    /** Returns the audit logs for the guild. Requires VIEW AUDIT LOGS permission */
    getAuditLogs: (options: GetAuditLogsOptions) => {
      if (!botHasPermission(data.id, botID, [Permissions.VIEW_AUDIT_LOG])) {
        throw new Error(Errors.MISSING_VIEW_AUDIT_LOG);
      }

      return RequestManager.get(endpoints.GUILD_AUDIT_LOGS(data.id), {
        ...options,
        limit: options.limit && options.limit >= 1 && options.limit <= 100
          ? options.limit
          : 50,
      });
    },
    /** Returns the guild embed object. Requires the MANAGE_GUILD permission. */
    getEmbed: () => {
      if (
        !botHasPermission(data.id, botID, [Permissions.MANAGE_GUILD])
      ) {
        throw new Error(Errors.MISSING_MANAGE_GUILD);
      }
      return RequestManager.get(endpoints.GUILD_EMBED(data.id));
    },
    /** Modify a guild embed object for the guild. Requires the MANAGE_GUILD permission. */
    editEmbed: (enabled: boolean, channel_id?: string | null) => {
      if (
        !botHasPermission(data.id, botID, [Permissions.MANAGE_GUILD])
      ) {
        throw new Error(Errors.MISSING_MANAGE_GUILD);
      }
      return RequestManager.patch(
        endpoints.GUILD_EMBED(data.id),
        { enabled, channel_id },
      );
    },
    /** Returns the code and uses of the vanity url for this server if it is enabled. Requires the MANAGE_GUILD permission. */
    getVanityURL: () => {
      return RequestManager.get(endpoints.GUILD_VANITY_URL(data.id));
    },
    /** Returns a list of integrations for the guild. Requires the MANAGE_GUILD permission. */
    getIntegrations: () => {
      if (
        !botHasPermission(data.id, botID, [Permissions.MANAGE_GUILD])
      ) {
        throw new Error(Errors.MISSING_MANAGE_GUILD);
      }
      return RequestManager.get(endpoints.GUILD_INTEGRATIONS(data.id));
    },
    /** Modify the behavior and settings of an integration object for the guild. Requires the MANAGE_GUILD permission. */
    editIntegration: (id: string, options: EditIntegrationOptions) => {
      if (
        !botHasPermission(data.id, botID, [Permissions.MANAGE_GUILD])
      ) {
        throw new Error(Errors.MISSING_MANAGE_GUILD);
      }
      return RequestManager.patch(
        endpoints.GUILD_INTEGRATION(data.id, id),
        options,
      );
    },
    /** Delete the attached integration object for the guild with this id. Requires MANAGE_GUILD permission. */
    deleteIntegration: (id: string) => {
      if (
        !botHasPermission(data.id, botID, [Permissions.MANAGE_GUILD])
      ) {
        throw new Error(Errors.MISSING_MANAGE_GUILD);
      }
      return RequestManager.delete(endpoints.GUILD_INTEGRATION(data.id, id));
    },
    /** Sync an integration. Requires teh MANAGE_GUILD permission. */
    syncIntegration: (id: string) => {
      if (
        !botHasPermission(data.id, botID, [Permissions.MANAGE_GUILD])
      ) {
        throw new Error(Errors.MISSING_MANAGE_GUILD);
      }
      return RequestManager.post(endpoints.GUILD_INTEGRATION_SYNC(data.id, id));
    },
    /** Returns a list of ban objects for the users banned from this guild. Requires the BAN_MEMBERS permission. */
    getBans: () => {
      if (
        !botHasPermission(data.id, botID, [Permissions.BAN_MEMBERS])
      ) {
        throw new Error(Errors.MISSING_BAN_MEMBERS);
      }
      return RequestManager.get(endpoints.GUILD_BANS(data.id));
    },
    /** Ban a user from the guild and optionally delete previous messages sent by the user. Requires teh BAN_MEMBERS permission. */
    ban: (id: string, options: BanOptions) => {
      if (
        !botHasPermission(data.id, botID, [Permissions.BAN_MEMBERS])
      ) {
        throw new Error(Errors.MISSING_BAN_MEMBERS);
      }
      return RequestManager.put(endpoints.GUILD_BAN(data.id, id), options);
    },
    /** Remove the ban for a user. REquires BAN_MEMBERS permission */
    unban: (id: string) => {
      if (
        !botHasPermission(data.id, botID, [Permissions.BAN_MEMBERS])
      ) {
        throw new Error(Errors.MISSING_BAN_MEMBERS);
      }
      return RequestManager.delete(endpoints.GUILD_BAN(data.id, id));
    },
    /** Check whether a member has certain permissions in this channel. */
    channelHasPermissions: (
      channelID: string,
      memberID: string,
      permissions: Permission[],
    ) => {
      if (memberID === data.owner_id) return true;

      const member = guild.members.get(memberID);
      if (!member) {
        throw "Invalid member id provided. This member was not found in the cache. Please fetch them with getMember on guild.";
      }

      const channel = guild.channels.get(channelID);
      if (!channel) {
        throw "Invalid channel id provided. This channel was not found in the cache.";
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
    },
    /** Modify a guilds settings. Requires the MANAGE_GUILD permission. */
    edit: (options: GuildEditOptions) => {
      if (
        !botHasPermission(data.id, botID, [Permissions.MANAGE_GUILD])
      ) {
        throw new Error(Errors.MISSING_MANAGE_GUILD);
      }
      return RequestManager.patch(endpoints.GUILD(data.id), options);
    },
    /** Get all the invites for this guild. Requires MANAGE_GUILD permission */
    getInvites: () => {
      if (
        !botHasPermission(data.id, botID, [Permissions.MANAGE_GUILD])
      ) {
        throw new Error(Errors.MISSING_MANAGE_GUILD);
      }
      return RequestManager.get(endpoints.GUILD_INVITES(data.id));
    },
    /** Leave a guild */
    leave: () => {
      return RequestManager.delete(endpoints.GUILD_LEAVE(data.id));
    },
    /** Returns a list of voice region objects for the guild. Unlike the similar /voice route, this returns VIP servers when the guild is VIP-enabled. */
    getVoiceRegions: () => {
      return RequestManager.get(endpoints.GUILD_REGIONS(data.id));
    },
    /** Returns a list of guild webhooks objects. Requires the MANAGE_WEBHOOKs permission. */
    getWebhooks: () => {
      if (!botHasPermission(data.id, botID, [Permissions.MANAGE_WEBHOOKS])) {
        throw new Error(Errors.MISSING_MANAGE_WEBHOOKS);
      }

      return RequestManager.get(endpoints.GUILD_WEBHOOKS(data.id));
    },
  };

  return guild;
};

export type Guild = ReturnType<typeof createGuild>;
