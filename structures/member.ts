import Client from "../module/client.ts"
import { endpoints } from "../constants/discord.ts"
import { format_image_url } from "../utils/cdn.ts"
import { Member_Create_Payload, Edit_Member_Options } from "../types/member.ts"
import { Image_Size, Image_Formats } from "../types/cdn.ts"
import { Permission, Permissions } from "../types/permission.ts"
import { Role_Data } from "../types/role.ts"
import { member_has_permission, bot_has_permission } from "../utils/permissions.ts"
import { Errors } from "../types/errors.ts"
import { Request_Manager } from "../module/Request_Manager.ts"

export const create_member = (
  data: Member_Create_Payload,
  guild_id: string,
  role_data: Role_Data[],
  owner_id: string,
  client: Client
) => ({
  /** The complete raw data from the member create payload */
  raw: () => data,
  /** The unique user id */
  id: () => data.user.id,
  /** The user's guild nickname if one is set. */
  roles: () => data.roles,
  /** Array of role ids that the member has */
  nick: () => data.nick,
  /** When the user joined the guild */
  joined_at: () => Date.parse(data.joined_at),
  /** When the user used their nitro boost on the server. */
  premium_since: () => (data.premium_since ? Date.parse(data.premium_since) : undefined),
  /** Whether the user is deafened in voice channels */
  deaf: () => data.deaf,
  /** Whether the user is muted in voice channels */
  mute: () => data.mute,
  /** The username of the this member. */
  username: () => data.user.username,
  /** The 4 digit unique identifier */
  discriminator: () => data.user.discriminator,
  /** The full username#discriminator */
  tag: () => `${data.user.username}#${data.user.discriminator}`,
  /** The users custom avatar or the default avatar */
  avatar_url: (size: Image_Size = 128, format?: Image_Formats) =>
    data.user.avatar
      ? format_image_url(endpoints.USER_AVATAR(data.user.id, data.user.avatar), size, format)
      : endpoints.USER_DEFAULT_AVATAR(Number(data.user.discriminator) % 5),
  /** The user mention with nickname if possible */
  mention: () => `<@!${data.user.id}>`,
  /** Whether the member is a bot */
  bot: () => data.user.bot,
  /** Add a role to the member */
  add_role: (role_id: string, reason?: string) => {
    // TODO: check if the bots highest role is above this one
    if (!bot_has_permission(guild_id, client.bot_id, [Permissions.MANAGE_ROLES]))
      throw new Error(Errors.MISSING_MANAGE_ROLES)
    return Request_Manager.put(endpoints.GUILD_MEMBER_ROLE(guild_id, data.user.id, role_id), { reason })
  },
  /** Remove a role from the member */
  remove_role: (role_id: string, reason?: string) => {
    // TODO: check if the bots highest role is above this role
    if (!bot_has_permission(guild_id, client.bot_id, [Permissions.MANAGE_ROLES]))
      throw new Error(Errors.MISSING_MANAGE_ROLES)
    return Request_Manager.delete(endpoints.GUILD_MEMBER_ROLE(guild_id, data.user.id, role_id), { reason })
  },
  /** Kick a member from the server */
  kick: (reason?: string) => {
    // TODO: Check if the bot is above the user so it is capable of kicking
    if (!bot_has_permission(guild_id, client.bot_id, [Permissions.KICK_MEMBERS]))
      throw new Error(Errors.MISSING_KICK_MEMBERS)
    return Request_Manager.delete(endpoints.GUILD_MEMBER(guild_id, data.user.id), { reason })
  },
  /** Edit the member */
  edit: (options: Edit_Member_Options) => {
    if (options.nick) {
      if (options.nick.length > 32) throw new Error(Errors.NICKNAMES_MAX_LENGTH)
      if (!bot_has_permission(guild_id, client.bot_id, [Permissions.MANAGE_NICKNAMES]))
        throw new Error(Errors.MISSING_MANAGE_NICKNAMES)
    }

    if (options.roles && !bot_has_permission(guild_id, client.bot_id, [Permissions.MANAGE_ROLES]))
      throw new Error(Errors.MISSING_MANAGE_ROLES)

    if (options.mute) {
      // TODO: This should check if the member is in a voice channel
      if (!bot_has_permission(guild_id, client.bot_id, [Permissions.MUTE_MEMBERS]))
        throw new Error(Errors.MISSING_MUTE_MEMBERS)
    }

    if (options.deaf && !bot_has_permission(guild_id, client.bot_id, [Permissions.DEAFEN_MEMBERS]))
      throw new Error(Errors.MISSING_DEAFEN_MEMBERS)

    // TODO: if channel id is provided check if the bot has CONNECT and MOVE in channel and current channel

    return Request_Manager.patch(endpoints.GUILD_MEMBER(guild_id, data.user.id), options)
  },
  /** Checks if the member has this permission. If the member is an owner or has admin perms it will always be true. */
  has_permissions: (permissions: Permission[]) => {
    return member_has_permission(data.user.id, owner_id, role_data, data.roles, permissions)
  }
})
