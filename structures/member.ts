import Client from '../module/client'
import { endpoints } from '../constants/discord'
import { format_image_url } from '../utils/cdn'
import { Member_Create_Payload, Edit_Member_Options } from '../types/member'
import { Image_Size, Image_Formats } from '../types/cdn'
import { Permission, Permissions } from '../types/permission'

export const create_member = (data: Member_Create_Payload, guild: Guild, client: Client) => {
  return {
    /** The complete raw data from the member create payload */
    raw: () => data,
    /** The unique user id */
    id: () => data.user.id,
    /** The user's guild nickname if one is set. */
    roles: () => data.roles,
    /** Array of role ids that the member has */
    nick: () => data.nick,
    /** When the user joined the guild. */
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
      // TODO: check if the bot has MANAGE_ROLE and its highest role is above this one
      return client.RequestManager.put(endpoints.GUILD_MEMBER_ROLE(guild.id, data.user.id, role_id), { reason })
    },
    /** Remove a role from the member */
    remove_role: (role_id: string, reason?: string) => {
      // TODO: check if the bot has MANAGE_ROLE permissions and its highest role is above this role
      return client.RequestManager.delete(endpoints.GUILD_MEMBER_ROLE(guild.id, data.user.id, role_id), { reason })
    },
    /** Kick a member from the server */
    kick: (reason?: string) => {
      // TODO: check if bot has KICK_MEMBER permissions
      return client.RequestManager.delete(endpoints.GUILD_MEMBER(guild.id, data.user.id), { reason })
    },
    /** Ban a member from the server */
    ban: (delete_message_days = 0, reason?: string) => {
      return guild.ban(data.user.id, { delete_message_days, reason })
    },
    /** Checks if the member has this permission. If the member is an owner or has admin perms it will always be true. */
    has_permissions: (permissions: Permission[]) => {
      if (data.user.id === guild.owner_id) return true

      const permissionBits = data.roles.reduce((bits, role_id) => {
        const role = guild.roles.get(role_id)
        if (!role) return bits

        bits |= role.permissions

        return bits
      }, 0)

      return permissions.every(permission => permissionBits & Permissions[permission])
    },
    /** Edit the member */
    edit: (options: Edit_Member_Options) => {
      // TODO: check if has MANAGE_NICKNAME Permission
      // TODO: check if it is a valid nickname like 32 characters
      options.nick = undefined

      // TODO: check if has MANAGE_ROLES permission
      options.roles = undefined

      // TODO: This should check if the member is in a voice channel
      // TODO: CHeck if has MUTE_MEMBERS permission
      options.mute = undefined
      // TODO: check if has DEAFEN_MEMBERS permission
      options.deaf = undefined
      // TODO: if channel id is provided check if the bot has CONNECT and MOVE in channel and current channel
      options.channel_id = undefined

      return client.RequestManager.patch(endpoints.GUILD_MEMBER(guild.id, data.user.id), options)
    }
  }
}


