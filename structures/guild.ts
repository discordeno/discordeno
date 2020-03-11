import Client from "../module/client.ts"
import { endpoints } from "../constants/discord.ts"
import { format_image_url } from "../utils/cdn.ts"
import {
  Create_Guild_Payload,
  ChannelTypes,
  PrunePayload,
  Position_Swap,
  Get_Audit_Logs_Options,
  Edit_Integration_Options,
  BanOptions,
  Guild_Edit_Options,
  Create_Emojis_Options,
  Edit_Emojis_Options,
  Create_Role_Options
} from "../types/guild.ts"
import { create_role } from "./role.ts"
import { create_member } from "./member.ts"
import { create_channel } from "./channel.ts"
import { Channel_Create_Options } from "../types/channel.ts"
import { Image_Size, Image_Formats } from "../types/cdn.ts"
import { Permissions, Permission } from "../types/permission.ts"
import { bot_has_permission } from "../utils/permissions.ts"
import { Errors } from "../types/errors.ts"

export const create_guild = (data: Create_Guild_Payload, client: Client) => {
  const guild = {
    /** The raw create guild payload data. */
    raw: () => data,
    /** The guild id */
    id: () => data.id,
    /** The guild name. 2-100 characters */
    name: () => data.name,
    /** The guild icon image hash */
    icon: () => data.icon,
    /** The guild splash image hash */
    splash: () => data.splash,
    /** The id of the guild owner */
    owner_id: () => data.owner_id,
    /** The voice region id for the guild */
    region: () => data.region,
    /** The afk channel id */
    afk_channel_id: () => data.afk_channel_id,
    /** The AFK timeout in seconds */
    afk_timeout: () => data.afk_timeout,
    /** The verification level required for the guild */
    verification_level: () => data.verification_level,
    /** The roles in the guild */
    roles: () => new Map(data.roles.map(r => [r.id, create_role(r)])),
    /** The custom guild emojis */
    emojis: () => data.emojis,
    /** The enabled guild features. */
    features: () => data.features,
    /** The required MFA level for the guild. */
    mfa_level: () => data.mfa_level,
    /** The id of the channel to which system messages are sent. */
    system_channel_id: () => data.system_channel_id,
    /** When this guild was joined at. */
    joined_at: Date.parse(data.joined_at),
    /** Whether this is considered a large guild. */
    large: () => data.large,
    /** Whether this guild is unavailable */
    unavailable: () => data.unavailable,
    /** The total number of members in this guild. */
    member_count: () => data.member_count,
    /** The current open voice states in the guild. */
    voice_states: () => data.voice_states,
    /** The users in this guild. */
    members: new Map(data.members.map(m => [m.user.id, create_member(m, data.id, data.roles, data.owner_id, client)])),
    /** The channels in the guild */
    channels: new Map(data.channels.map(c => [c.id, create_channel(c, client)])),
    /** The presences of all the users in the guild. */
    presences: new Map(data.presences.map(p => [p.user.id, p])),
    /** The maximum amount of presences for the guild(the default value, currently 5000 is in effect when null is returned.)  */
    max_presences: () => data.max_presences,
    /** The maximum amount of members for the guild */
    max_members: () => data.max_members,
    /** The vanity url code for the guild */
    vanity_url_code: () => data.vanity_url_code,
    /** The description for the guild */
    description: () => data.description,
    /** The banner hash */
    banner: () => data.banner,
    /** The current premium tier of the guild */
    premium_tier: () => data.premium_tier,
    /** The total number of users currently boosting this server. */
    premium_subscription_count: () => data.premium_subscription_count,
    /** The preferred locale of this guild only set if the guild has the  DISCOVERABLE feature, defaults to en-US */
    preferred_locale: () => data.preferred_locale,
    /** Gets an array of all the channels ids that are the children of this category. */
    category_children_ids: (id: string) => data.channels.filter(c => c.parent_id === id).map(c => c.id),
    /** The full URL of the icon from Discords CDN. Undefined when no icon is set. */
    icon_url: (size: Image_Size = 128, format?: Image_Formats) =>
      data.icon ? format_image_url(endpoints.GUILD_ICON(data.id, data.icon), size, format) : undefined,
    /** The full URL of the splash from Discords CDN. Undefined if no splash is set. */
    splash_url: (size: Image_Size = 128, format?: Image_Formats) =>
      data.splash ? format_image_url(endpoints.GUILD_SPLASH(data.id, data.splash), size, format) : undefined,
    /** The full URL of the banner from Discords CDN. Undefined if no banner is set. */
    banner_url: (size: Image_Size = 128, format?: Image_Formats) =>
      data.banner ? format_image_url(endpoints.GUILD_BANNER(data.id, data.banner), size, format) : undefined,
    /** Create a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
    create_channel: (name: string, options: Channel_Create_Options) => {
      if (!bot_has_permission(data.id, client.bot_id, [Permissions.MANAGE_CHANNELS]))
        throw new Error(Errors.MISSING_MANAGE_CHANNELS)
      return client.discordRequestManager.post(endpoints.GUILD_CHANNELS(data.id), {
        name,
        type: options?.type ? ChannelTypes[options.type] : undefined,
        permission_overwrites: options?.permission_overwrites
          ? options.permission_overwrites.map(perm => ({
              ...perm,
              allow: perm.allow.map(p => Permissions[p]),
              deny: perm.deny.map(p => Permissions[p])
            }))
          : undefined,
        ...options
      })
    },
    /** Returns a list of guild channel objects.
     *
     * ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your channels will be cached in your guild.**
     */
    get_channels: () => {
      return client.discordRequestManager.get(endpoints.GUILD_CHANNELS(data.id))
    },
    /** Modify the positions of channels on the guild. Requires MANAGE_CHANNELS permisison. */
    swap_channels: (channel_positions: Position_Swap[]) => {
      if (channel_positions.length < 2) {
        throw "You must provide atleast two channels to be swapped."
      }
      return client.discordRequestManager.patch(endpoints.GUILD_CHANNELS(data.id), channel_positions)
    },
    /** Returns a guild member object for the specified user.
     *
     * ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your members will be cached in your guild.**
     */
    get_member: (id: string) => {
      return client.discordRequestManager.get(endpoints.GUILD_MEMBER(data.id, id))
    },
    /** Create an emoji in the server. Emojis and animated emojis have a maximum file size of 256kb. Attempting to upload an emoji larger than this limit will fail and return 400 Bad Request and an error message, but not a JSON status code. */
    create_emoji: (name: string, image: string, options: Create_Emojis_Options) => {
      if (!bot_has_permission(data.id, client.bot_id, [Permissions.MANAGE_EMOJIS]))
        throw new Error(Errors.MISSING_MANAGE_EMOJIS)
      return client.discordRequestManager.post(endpoints.GUILD_EMOJIS(data.id), {
        ...options,
        name,
        image
      })
    },
    /** Modify the given emoji. Requires the MANAGE_EMOJIS permission. */
    edit_emoji: (id: string, options: Edit_Emojis_Options) => {
      if (!bot_has_permission(data.id, client.bot_id, [Permissions.MANAGE_EMOJIS]))
        throw new Error(Errors.MISSING_MANAGE_EMOJIS)
      return client.discordRequestManager.patch(endpoints.GUILD_EMOJI(data.id, id), {
        name: options.name,
        roles: options.roles
      })
    },
    /** Delete the given emoji. Requires the MANAGE_EMOJIS permission. Returns 204 No Content on success. */
    delete_emoji: (id: string, reason?: string) => {
      if (!bot_has_permission(data.id, client.bot_id, [Permissions.MANAGE_EMOJIS]))
        throw new Error(Errors.MISSING_MANAGE_EMOJIS)
      return client.discordRequestManager.delete(endpoints.GUILD_EMOJI(data.id, id), { reason })
    },
    /** Create a new role for the guild. Requires the MANAGE_ROLES permission. */
    create_role: async (options: Create_Role_Options) => {
      if (!bot_has_permission(data.id, client.bot_id, [Permissions.MANAGE_ROLES]))
        throw new Error(Errors.MISSING_MANAGE_ROLES)
      const role = await client.discordRequestManager.post(endpoints.GUILD_ROLES(data.id), {
        ...options,
        permissions: options.permissions?.map(perm => Permissions[perm])
      })
      // TODO: cache this role

      return role
    },
    /** Edit a guild role. Requires the MANAGE_ROLES permission. */
    edit_role: (id: string, options: Create_Role_Options) => {
      if (!bot_has_permission(data.id, client.bot_id, [Permissions.MANAGE_ROLES]))
        throw new Error(Errors.MISSING_MANAGE_ROLES)
      return client.discordRequestManager.patch(endpoints.GUILD_ROLE(data.id, id), options)
    },
    /** Delete a guild role. Requires the MANAGE_ROLES permission. */
    delete_role: (id: string) => {
      if (!bot_has_permission(data.id, client.bot_id, [Permissions.MANAGE_ROLES]))
        throw new Error(Errors.MISSING_MANAGE_ROLES)
      return client.discordRequestManager.delete(endpoints.GUILD_ROLE(data.id, id))
    },
    /** Returns a list of role objects for the guild.
     *
     * ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your roles will be cached in your guild.**
     */
    get_roles: () => {
      if (!bot_has_permission(data.id, client.bot_id, [Permissions.MANAGE_ROLES]))
        throw new Error(Errors.MISSING_MANAGE_ROLES)
      return client.discordRequestManager.get(endpoints.GUILD_ROLES(data.id))
    },
    /** Modify the positions of a set of role objects for the guild. Requires the MANAGE_ROLES permission. */
    swap_roles: (rolePositons: Position_Swap) => {
      if (!bot_has_permission(data.id, client.bot_id, [Permissions.MANAGE_ROLES]))
        throw new Error(Errors.MISSING_MANAGE_ROLES)
      return client.discordRequestManager.patch(endpoints.GUILD_ROLES(data.id), rolePositons)
    },
    /** Check how many members would be removed from the server in a prune operation. Requires the KICK_MEMBERS permission */
    get_prune_count: async (days: number) => {
      if (days < 1) throw new Error(Errors.PRUNE_MIN_DAYS)
      if (!bot_has_permission(data.id, client.bot_id, [Permissions.KICK_MEMBERS]))
        throw new Error(Errors.MISSING_KICK_MEMBERS)
      const result = (await client.discordRequestManager.get(endpoints.GUILD_PRUNE(data.id), { days })) as PrunePayload
      return result.pruned
    },
    /** Begin pruning all members in the given time period */
    prune_members: (days: number) => {
      if (days < 1) throw new Error(Errors.PRUNE_MIN_DAYS)
      if (!bot_has_permission(data.id, client.bot_id, [Permissions.KICK_MEMBERS]))
        throw new Error(Errors.MISSING_KICK_MEMBERS)
      return client.discordRequestManager.post(endpoints.GUILD_PRUNE(data.id), { days })
    },
    // TODO: REQUEST THIS OVER WEBSOCKET WITH GET_GUILD_MEMBERS ENDPOINT
    // fetch_all_members: () => {
    // },
    /** Returns the audit logs for the guild. Requires VIEW AUDIT LOGS permission */
    get_audit_logs: (options: Get_Audit_Logs_Options) => {
      if (!bot_has_permission(data.id, client.bot_id, [Permissions.VIEW_AUDIT_LOG]))
        throw new Error(Errors.MISSING_VIEW_AUDIT_LOG)

      return client.discordRequestManager.get(endpoints.GUILD_AUDIT_LOGS(data.id), {
        ...options,
        limit: options.limit && options.limit >= 1 && options.limit <= 100 ? options.limit : 50
      })
    },
    /** Returns the guild embed object. Requires the MANAGE_GUILD permission. */
    get_embed: () => {
      if (!bot_has_permission(data.id, client.bot_id, [Permissions.MANAGE_GUILD]))
        throw new Error(Errors.MISSING_MANAGE_GUILD)
      return client.discordRequestManager.get(endpoints.GUILD_EMBED(data.id))
    },
    /** Modify a guild embed object for the guild. Requires the MANAGE_GUILD permission. */
    edit_embed: (enabled: boolean, channel_id?: string | null) => {
      if (!bot_has_permission(data.id, client.bot_id, [Permissions.MANAGE_GUILD]))
        throw new Error(Errors.MISSING_MANAGE_GUILD)
      return client.discordRequestManager.patch(endpoints.GUILD_EMBED(data.id), { enabled, channel_id })
    },
    /** Returns the code and uses of the vanity url for this server if it is enabled. Requires the MANAGE_GUILD permission. */
    get_vanity_url: () => {
      return client.discordRequestManager.get(endpoints.GUILD_VANITY_URL(data.id))
    },
    /** Returns a list of integrations for the guild. Requires the MANAGE_GUILD permission. */
    get_integrations: () => {
      if (!bot_has_permission(data.id, client.bot_id, [Permissions.MANAGE_GUILD]))
        throw new Error(Errors.MISSING_MANAGE_GUILD)
      return client.discordRequestManager.get(endpoints.GUILD_INTEGRATIONS(data.id))
    },
    /** Modify the behavior and settings of an integration object for the guild. Requires the MANAGE_GUILD permission. */
    edit_integration: (id: string, options: Edit_Integration_Options) => {
      if (!bot_has_permission(data.id, client.bot_id, [Permissions.MANAGE_GUILD]))
        throw new Error(Errors.MISSING_MANAGE_GUILD)
      return client.discordRequestManager.patch(endpoints.GUILD_INTEGRATION(data.id, id), options)
    },
    /** Delete the attached integration object for the guild with this id. Requires MANAGE_GUILD permission. */
    delete_integration: (id: string) => {
      if (!bot_has_permission(data.id, client.bot_id, [Permissions.MANAGE_GUILD]))
        throw new Error(Errors.MISSING_MANAGE_GUILD)
      return client.discordRequestManager.delete(endpoints.GUILD_INTEGRATION(data.id, id))
    },
    /** Sync an integration. Requires teh MANAGE_GUILD permission. */
    sync_integration: (id: string) => {
      if (!bot_has_permission(data.id, client.bot_id, [Permissions.MANAGE_GUILD]))
        throw new Error(Errors.MISSING_MANAGE_GUILD)
      return client.discordRequestManager.post(endpoints.GUILD_INTEGRATION_SYNC(data.id, id))
    },
    /** Returns a list of ban objects for the users banned from this guild. Requires the BAN_MEMBERS permission. */
    get_bans: () => {
      if (!bot_has_permission(data.id, client.bot_id, [Permissions.BAN_MEMBERS]))
        throw new Error(Errors.MISSING_BAN_MEMBERS)
      return client.discordRequestManager.get(endpoints.GUILD_BANS(data.id))
    },
    /** Ban a user from the guild and optionally delete previous messages sent by the user. Requires teh BAN_MEMBERS permission. */
    ban: (id: string, options: BanOptions) => {
      if (!bot_has_permission(data.id, client.bot_id, [Permissions.BAN_MEMBERS]))
        throw new Error(Errors.MISSING_BAN_MEMBERS)
      return client.discordRequestManager.put(endpoints.GUILD_BAN(data.id, id), options)
    },
    /** Remove the ban for a user. REquires BAN_MEMBERS permission */
    unban: (id: string) => {
      if (!bot_has_permission(data.id, client.bot_id, [Permissions.BAN_MEMBERS]))
        throw new Error(Errors.MISSING_BAN_MEMBERS)
      return client.discordRequestManager.delete(endpoints.GUILD_BAN(data.id, id))
    },
    /** Check whether a member has certain permissions in this channel. */
    channel_has_permissions: (channel_id: string, member_id: string, permissions: Permission[]) => {
      if (member_id === data.owner_id) return true

      const member = guild.members.get(member_id)
      if (!member) {
        throw "Invalid member id provided. This member was not found in the cache. Please fetch them with getMember on guild."
      }

      const channel = guild.channels.get(channel_id)
      if (!channel) {
        throw "Invalid channel id provided. This channel was not found in the cache."
      }

      let permissionBits = member.roles().reduce((bits, role_id) => {
        const role = guild.roles().get(role_id)
        if (!role) return bits

        bits |= role.permissions()

        return bits
      }, 0)

      // channel.permission_overwrites()?.forEach(overwrite => {
      // permissionBits = (permissionBits & ~overwrite.deny) | overwrite.allow
      // })

      if (permissionBits & Permissions.ADMINISTRATOR) return true

      return permissions.every(permission => permissionBits & Permissions[permission])
    },
    /** Modify a guilds settings. Requires the MANAGE_GUILD permission. */
    edit: (options: Guild_Edit_Options) => {
      if (!bot_has_permission(data.id, client.bot_id, [Permissions.MANAGE_GUILD]))
        throw new Error(Errors.MISSING_MANAGE_GUILD)
      return client.discordRequestManager.patch(endpoints.GUILD(data.id), options)
    },
    /** Get all the invites for this guild. Requires MANAGE_GUILD permission */
    get_invites: () => {
      if (!bot_has_permission(data.id, client.bot_id, [Permissions.MANAGE_GUILD]))
        throw new Error(Errors.MISSING_MANAGE_GUILD)
      return client.discordRequestManager.get(endpoints.GUILD_INVITES(data.id))
    },
    /** Leave a guild */
    leave: () => {
      return client.discordRequestManager.delete(endpoints.GUILD_LEAVE(data.id))
    },
    /** Returns a list of voice region objects for the guild. Unlike the similar /voice route, this returns VIP servers when the guild is VIP-enabled. */
    get_voice_regions: () => {
      return client.discordRequestManager.get(endpoints.GUILD_REGIONS(data.id))
    },
    /** Returns a list of guild webhooks objects. Requires the MANAGE_WEBHOOKs permission. */
    get_webhooks: () => {
      if (!bot_has_permission(data.id, client.bot_id, [Permissions.MANAGE_WEBHOOKS]))
        throw new Error(Errors.MISSING_MANAGE_WEBHOOKS)

      return client.discordRequestManager.get(endpoints.GUILD_WEBHOOKS(data.id))
    }
  }

  return guild
}
