import { botID } from "../module/client.ts";
import { endpoints } from "../constants/discord.ts";
import { formatImageURL } from "../utils/cdn.ts";
import { MemberCreatePayload, EditMemberOptions } from "../types/member.ts";
import { ImageSize, ImageFormats } from "../types/cdn.ts";
import { Permission, Permissions } from "../types/permission.ts";
import { RoleData } from "../types/role.ts";
import { memberHasPermission, botHasPermission } from "../utils/permissions.ts";
import { Errors } from "../types/errors.ts";
import { RequestManager } from "../module/requestManager.ts";

export const createMember = (
  data: MemberCreatePayload,
  guildID: string,
  roleData: RoleData[],
  ownerID: string,
) => ({
  ...data,
  /** The complete raw data from the member create payload */
  raw: data,
  /** When the user joined the guild */
  joinedAt: Date.parse(data.joined_at),
  /** When the user used their nitro boost on the server. */
  premiumSince: data.premium_since ? Date.parse(data.premium_since) : undefined,
  /** The full username#discriminator */
  tag: `${data.user.username}#${data.user.discriminator}`,
  /** The user mention with nickname if possible */
  mention: `<@!${data.user.id}>`,

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
    // TODO: check if the bots highest role is above this one
    if (
      !botHasPermission(guildID, botID, [Permissions.MANAGE_ROLES])
    ) {
      throw new Error(Errors.MISSING_MANAGE_ROLES);
    }
    return RequestManager.put(
      endpoints.GUILD_MEMBER_ROLE(guildID, data.user.id, roleID),
      { reason },
    );
  },
  /** Remove a role from the member */
  remove_role: (roleID: string, reason?: string) => {
    // TODO: check if the bots highest role is above this role
    if (
      !botHasPermission(guildID, botID, [Permissions.MANAGE_ROLES])
    ) {
      throw new Error(Errors.MISSING_MANAGE_ROLES);
    }
    return RequestManager.delete(
      endpoints.GUILD_MEMBER_ROLE(guildID, data.user.id, roleID),
      { reason },
    );
  },
  /** Kick a member from the server */
  kick: (reason?: string) => {
    // TODO: Check if the bot is above the user so it is capable of kicking
    if (
      !botHasPermission(guildID, botID, [Permissions.KICK_MEMBERS])
    ) {
      throw new Error(Errors.MISSING_KICK_MEMBERS);
    }
    return RequestManager.delete(
      endpoints.GUILD_MEMBER(guildID, data.user.id),
      { reason },
    );
  },
  /** Edit the member */
  edit: (options: EditMemberOptions) => {
    if (options.nick) {
      if (options.nick.length > 32) {
        throw new Error(Errors.NICKNAMES_MAX_LENGTH);
      }
      if (!botHasPermission(guildID, botID, [Permissions.MANAGE_NICKNAMES])) {
        throw new Error(Errors.MISSING_MANAGE_NICKNAMES);
      }
    }

    if (
      options.roles &&
      !botHasPermission(guildID, botID, [Permissions.MANAGE_ROLES])
    ) {
      throw new Error(Errors.MISSING_MANAGE_ROLES);
    }

    if (options.mute) {
      // TODO: This should check if the member is in a voice channel
      if (
        !botHasPermission(guildID, botID, [Permissions.MUTE_MEMBERS])
      ) {
        throw new Error(Errors.MISSING_MUTE_MEMBERS);
      }
    }

    if (
      options.deaf &&
      !botHasPermission(guildID, botID, [Permissions.DEAFEN_MEMBERS])
    ) {
      throw new Error(Errors.MISSING_DEAFEN_MEMBERS);
    }

    // TODO: if channel id is provided check if the bot has CONNECT and MOVE in channel and current channel

    return RequestManager.patch(
      endpoints.GUILD_MEMBER(guildID, data.user.id),
      options,
    );
  },
  /** Checks if the member has this permission. If the member is an owner or has admin perms it will always be true. */
  hasPermissions: (permissions: Permission[]) => {
    return memberHasPermission(
      data.user.id,
      ownerID,
      roleData,
      data.roles,
      permissions,
    );
  },
});
