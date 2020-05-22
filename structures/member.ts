import { endpoints } from "../constants/discord.ts";
import { formatImageURL } from "../utils/cdn.ts";
import { MemberCreatePayload, EditMemberOptions } from "../types/member.ts";
import { ImageSize, ImageFormats } from "../types/cdn.ts";
import { Permission, Permissions } from "../types/permission.ts";
import {
  memberHasPermission,
  botHasPermission,
  highestRole,
  higherRolePosition,
} from "../utils/permissions.ts";
import { Errors } from "../types/errors.ts";
import { RequestManager } from "../module/requestManager.ts";
import { botID } from "../module/client.ts";
import { Guild } from "./guild.ts";
import { cache } from "../utils/cache.ts";
import { createUser } from "./user.ts";

export const createMember = (data: MemberCreatePayload, guild: Guild) => {
  // Add the user to cache as well
  cache.users.set(data.user.id, createUser(data.user));

  return {
    ...data,
    /** When the user joined the guild */
    joinedAt: Date.parse(data.joined_at),
    /** When the user used their nitro boost on the server. */
    premiumSince: data.premium_since
      ? Date.parse(data.premium_since)
      : undefined,
    /** The full username#discriminator */
    tag: `${data.user.username}#${data.user.discriminator}`,
    /** The user mention with nickname if possible */
    mention: `<@!${data.user.id}>`,
    /** The guild id where this member exists */
    guildID: guild.id,

    /** Gets the guild object from cache for this member. This is a method instead of a prop to preserve memory. */
    guild: () => cache.guilds.get(guild.id)!,
    /** The users custom avatar or the default avatar */
    avatarURL: (size: ImageSize = 128, format?: ImageFormats) =>
      data.user.avatar
        ? formatImageURL(
          endpoints.USER_AVATAR(data.user.id, data.user.avatar),
          size,
          format,
        )
        : endpoints.USER_DEFAULT_AVATAR(Number(data.user.discriminator) % 5),
    /** Add a role to the member */
    addRole: (roleID: string, reason?: string) => {
      const botsHighestRole = highestRole(guild.id, botID);
      if (
        botsHighestRole &&
        !higherRolePosition(guild.id, botsHighestRole.id, roleID)
      ) {
        throw new Error(Errors.BOTS_HIGHEST_ROLE_TOO_LOW);
      }

      if (!botHasPermission(guild.id, [Permissions.MANAGE_ROLES])) {
        throw new Error(Errors.MISSING_MANAGE_ROLES);
      }

      return RequestManager.put(
        endpoints.GUILD_MEMBER_ROLE(guild.id, data.user.id, roleID),
        { reason },
      );
    },
    /** Remove a role from the member */
    removeRole: (roleID: string, reason?: string) => {
      const botsHighestRole = highestRole(guild.id, botID);
      if (
        botsHighestRole &&
        !higherRolePosition(guild.id, botsHighestRole.id, roleID)
      ) {
        throw new Error(Errors.BOTS_HIGHEST_ROLE_TOO_LOW);
      }

      if (!botHasPermission(guild.id, [Permissions.MANAGE_ROLES])) {
        throw new Error(Errors.MISSING_MANAGE_ROLES);
      }
      return RequestManager.delete(
        endpoints.GUILD_MEMBER_ROLE(guild.id, data.user.id, roleID),
        { reason },
      );
    },
    /** Kick a member from the server */
    kick: (reason?: string) => {
      const botsHighestRole = highestRole(guild.id, botID);
      const membersHighestRole = highestRole(guild.id, data.user.id);
      if (
        botsHighestRole && membersHighestRole &&
        botsHighestRole.position <= membersHighestRole.position
      ) {
        throw new Error(Errors.BOTS_HIGHEST_ROLE_TOO_LOW);
      }

      if (!botHasPermission(guild.id, [Permissions.KICK_MEMBERS])) {
        throw new Error(Errors.MISSING_KICK_MEMBERS);
      }
      return RequestManager.delete(
        endpoints.GUILD_MEMBER(guild.id, data.user.id),
        { reason },
      );
    },
    /** Edit the member */
    edit: (options: EditMemberOptions) => {
      if (options.nick) {
        if (options.nick.length > 32) {
          throw new Error(Errors.NICKNAMES_MAX_LENGTH);
        }
        if (!botHasPermission(guild.id, [Permissions.MANAGE_NICKNAMES])) {
          throw new Error(Errors.MISSING_MANAGE_NICKNAMES);
        }
      }

      if (
        options.roles &&
        !botHasPermission(guild.id, [Permissions.MANAGE_ROLES])
      ) {
        throw new Error(Errors.MISSING_MANAGE_ROLES);
      }

      if (options.mute) {
        // TODO: This should check if the member is in a voice channel
        if (
          !botHasPermission(guild.id, [Permissions.MUTE_MEMBERS])
        ) {
          throw new Error(Errors.MISSING_MUTE_MEMBERS);
        }
      }

      if (
        options.deaf &&
        !botHasPermission(guild.id, [Permissions.DEAFEN_MEMBERS])
      ) {
        throw new Error(Errors.MISSING_DEAFEN_MEMBERS);
      }

      // TODO: if channel id is provided check if the bot has CONNECT and MOVE in channel and current channel

      return RequestManager.patch(
        endpoints.GUILD_MEMBER(guild.id, data.user.id),
        options,
      );
    },
    /** Checks if the member has this permission. If the member is an owner or has admin perms it will always be true. */
    hasPermissions: (permissions: Permission[]) => {
      return memberHasPermission(
        data.user.id,
        guild,
        data.roles,
        permissions,
      );
    },
  };
};

export interface Member extends ReturnType<typeof createMember> {}
