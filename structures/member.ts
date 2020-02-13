import Client from '../module/client'
import { endpoints } from '../constants/discord'
import { Guild, Image_Size, Image_Formats, Permissions, Permission } from '../types/guild'
import { formatImageURL } from '../utils/cdn'

export interface Edit_Member_Options {
  /** Value to set users nickname to. Requires MANAGE_NICKNAMES permission. */
  nick?: string
  /** Array of role ids the member is assigned. Requires MANAGE_ROLES permission. */
  roles?: string[]
  /** Whether the user is muted in voice channels. Requires MUTE_MEMBERS permission. */
  mute?: boolean
  /** Whether the user is deafened in voice channels. Requires DEAFEN_MEMBERS permission. */
  deaf?: boolean
  /** The id of the channel to move user to if they are connected to voice. To kick the user from their current channel, set to null. Requires MOVE_MEMBERS permission. When moving members to channels, must have permissions to both CONNECT to the channel and have the MOVE_MEMBER permission. */
  channel_id?: string | null
}

export interface Member {
  /** The unique user id */
  id: string
  /** The user's guild nickname if one is set. */
  nick(): string | undefined
  /** Array of role ids that the member has */
  roles(): string[]
  /** When the user joined the guild. */
  joined_at(): number
  /** When the user used their nitro boost on the server. */
  premium_since(): number | undefined
  /** Whether the user is deafened in voice channels */
  deaf(): boolean
  /** Whether the user is muted in voice channels */
  mute(): boolean
  edit(options: Edit_Member_Options): Promise<Member>
  /** The username of the this member. */
  username(): string
  /** The 4 digit unique identifier */
  discriminator(): string
  /** The full username#discriminator */
  tag(): string
  /** The users custom avatar or the default avatar */
  avatarURL(size: Image_Size, format: Image_Formats): string
  /** The user mention with nickname if possible */
  mention(): string
  /** Whether the member is a bot */
  bot(): boolean
  /** When the user created their account */
  created_at(): number
  /** Add a role to the member */
  addRole(role_id: string, reason: string): Promise<void>
  /** Remove a role from the member */
  removeRole(role_id: string, reason: string): Promise<void>
  /** Kick a member from the server */
  kick(reason: string): Promise<void>
  /** Ban a member from the server */
  ban(delete_message_days?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7, reason?: string): Promise<void>
  has_permissions(permissions: Permission[]): boolean
}

export interface Member_Create_Payload {
  /** The user this guild member represents */
  user: User
  /** The user's guild nickname if one is set. */
  nick?: string
  /** Array of role ids that the member has */
  roles: string[]
  /** When the user joined the guild. */
  joined_at: string
  /** When the user used their nitro boost on the server. */
  premium_since?: string
  /** Whether the user is deafened in voice channels */
  deaf: boolean
  /** Whether the user is muted in voice channels */
  mute: boolean
}

export const create_member = (data: Member_Create_Payload, guild: Guild, client: Client) => {
  const member: Member = {
    id: data.user.id,
    roles: () => data.roles,
    nick: () => data.nick,
    joined_at: () => Date.parse(data.joined_at),
    premium_since: () => (data.premium_since ? Date.parse(data.premium_since) : undefined),
    deaf: () => data.deaf,
    mute: () => data.mute,
    username: () => data.user.username,
    discriminator: () => data.user.discriminator,
    tag: () => `${data.user.username}#${data.user.discriminator}`,
    game: () => data.game,
    status: () => data.status,
    client_status: () => data.client_status,
    activities: () => data.activites,
    avatarURL: (size, format) =>
      data.user.avatar
        ? formatImageURL(endpoints.USER_AVATAR(data.user.id, data.user.avatar), size, format)
        : endpoints.USER_DEFAULT_AVATAR(data.user.discriminator % 5),
    mention: () => `<@!${data.user.id}>`,
    bot: () => data.user.bot,
    created_at: () => data.user.created_at,
    addRole: (role_id, reason) => {
      // TODO: check if the bot has MANAGE_ROLE and its highest role is above this one
      return client.RequestManager.put(endpoints.GUILD_MEMBER_ROLE(guild.id, data.user.id, role_id), { reason })
    },
    removeRole: (role_id, reason) => {
      // TODO: check if the bot has MANAGE_ROLE permissions and its highest role is above this role
      return client.RequestManager.delete(endpoints.GUILD_MEMBER_ROLE(guild.id, data.user.id, role_id), { reason })
    },
    kick: reason => {
      // TODO: check if bot has KICK_MEMBER permissions
      return client.RequestManager.delete(endpoints.GUILD_MEMBER(guild.id, data.user.id), { reason })
    },
    ban: (delete_message_days = 0, reason) => {
      return guild.ban(data.user.id, { delete_message_days, reason })
    },
    has_permissions: permissions => {
      if (data.user.id === guild.owner_id) return true

      const permissionBits = data.roles.reduce((bits, role_id) => {
        const role = guild.roles.get(role_id)
        if (!role) return bits

        bits |= role.permissions

        return bits
      }, 0)

      return permissions.every(permission => permissionBits & Permissions[permission])
    },
    edit: options => {
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

      return client.RequestManager.patch(endpoints.GUILD_MEMBER(guild.id, data.id), options)
    }
  }

  return member
}
