import Client from '../module/client'
import { endpoints } from '../constants/discord'
import { formatImageURL } from '../utils/cdn'
import { Guild, CreateGuildPayload, ChannelTypes, Permissions, PrunePayload } from '../types/guild'
import { create_role } from './role'
import { create_member } from './member'
import { create_channel } from './channel'

export const createGuild = (data: CreateGuildPayload, client: Client) => {
  const guild: Guild = {
    ...data,
    roles: new Map(data.roles.map(r => [r.id, create_role(r)])),
    emojis: data.emojis,
    joined_at: Date.parse(data.joined_at),
    voice_states: new Map(data.voice_states.map(vs => [vs.id, create_voice_state(vs)])),
    members: new Map(data.members.map(m => [m.id, create_member(m)])),
    channels: new Map(data.channels.map(c => [c.id, create_channel(c, data, client)])),
    presences: new Map(data.presences.map(p => [p.id, create_presence(p)])),
    icon_url: (size, format) =>
      data.icon ? formatImageURL(endpoints.GUILD_ICON(data.id, data.icon), size, format) : undefined,
    splash_url: (size, format) =>
      data.splash ? formatImageURL(endpoints.GUILD_SPLASH(data.id, data.splash), size, format) : undefined,
    banner_url: (size, format) =>
      data.banner ? formatImageURL(endpoints.GUILD_BANNER(data.id, data.banner), size, format) : undefined,
    create_channel: (name, options) => {
      // TODO: Check if the bot has `MANAGE_CHANNELS` permission before making a channel
      return client.RequestManager.post(endpoints.GUILD_CHANNELS(data.id), {
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
    get_channels: () => {
      return client.RequestManager.get(endpoints.GUILD_CHANNELS(data.id))
    },
    swap_channels: channel_positions => {
      if (channel_positions.length < 2) throw 'You must provide atleast two channels to be swapped.'
      return client.RequestManager.patch(endpoints.GUILD_CHANNELS(data.id), channel_positions)
    },
    get_member: id => {
      return client.RequestManager.get(endpoints.GUILD_MEMBER(data.id, id))
    },
    create_emoji: (name, image, options) => {
      // TODO: Check if the bot has `MANAGE_EMOJIS` permission
      return client.RequestManager.post(endpoints.GUILD_EMOJIS(data.id), {
        ...options,
        name,
        image
      })
    },
    edit_emoji: (id, options) => {
      // TODO: check if the bot has `MANAGE_EMOJIS` permission
      return client.RequestManager.patch(endpoints.GUILD_EMOJI(data.id, id), {
        name: options.name,
        roles: options.roles
      })
    },
    delete_emoji: (id, reason) => {
      // TODO: check if the bot has `MANAGE_EMOJIS` permission
      return client.RequestManager.delete(endpoints.GUILD_EMOJI(data.id, id), { reason })
    },
    create_role: async options => {
      // TODO: check if the bot has the `MANAGE_ROLES` permission.
      const role = await client.RequestManager.post(endpoints.GUILD_ROLES(data.id), {
        ...options,
        permissions: options.permissions?.map(perm => Permissions[perm])
      })
      // TODO: cache this role

      return role
    },
    edit_role: (id, options) => {
      // TODO: check if the bot has the `MANAGE_ROLES` permission.
      return client.RequestManager.patch(endpoints.GUILD_ROLE(data.id, id), options)
    },
    delete_role: id => {
      // TODO: check if the bot has the `MANAGE_ROLES` permission.
      return client.RequestManager.delete(endpoints.GUILD_ROLE(data.id, id))
    },
    get_roles: () => {
      // TODO: check if the bot has the `MANAGE_ROLES` permission.
      return client.RequestManager.get(endpoints.GUILD_ROLES(data.id))
    },
    swap_roles: rolePositons => {
      // TODO: check if the bot has the `MANAGE_ROLES` permission.
      return client.RequestManager.patch(endpoints.GUILD_ROLES(data.id), rolePositons)
    },
    get_prune_count: async days => {
      if (days < 1) throw `The number of days to count prune for must be 1 or more.`
      // TODO: check if the bot has `KICK_MEMBERS` permission
      const result = (await client.RequestManager.get(endpoints.GUILD_PRUNE(data.id), { days })) as PrunePayload
      return result.pruned
    },
    prune_members: days => {
      if (days < 1) throw `The number of days must be 1 or more.`
      // TODO: check if the bot has `KICK_MEMBERS` permission.
      return client.RequestManager.post(endpoints.GUILD_PRUNE(data.id), { days })
    },
    // TODO: REQUEST THIS OVER WEBSOCKET WITH GET_GUILD_MEMBERS ENDPOINT
    // fetch_all_members: () => {
    // },
    get_audit_logs: options => {
      // TODO: check if the bot has VIEW_AUDIT_LOGS permission
      return client.RequestManager.get(endpoints.GUILD_AUDIT_LOGS(data.id), {
        ...options,
        limit: options.limit && options.limit >= 1 && options.limit <= 100 ? options.limit : 50
      })
    },
    get_embed: () => {
      // TODO: check if the bot has the MANAGE_GUILD permission
      return client.RequestManager.get(endpoints.GUILD_EMBED(data.id))
    },
    edit_embed: (enabled, channel_id) => {
      // TODO: Requires the MANAGE_GUILD permission.
      return client.RequestManager.patch(endpoints.GUILD_EMBED(data.id), { enabled, channel_id })
    },
    get_vanity_url: () => {
      return client.RequestManager.get(endpoints.GUILD_VANITY_URL(data.id))
    },
    get_integrations: () => {
      // TODO: requires the MANAGE_GUILD permission
      return client.RequestManager.get(endpoints.GUILD_INTEGRATIONS(data.id))
    },
    edit_integration: (id, options) => {
      // TODO: requires the MANAGE_GUILD permission
      return client.RequestManager.patch(endpoints.GUILD_INTEGRATION(data.id, id), options)
    },
    delete_integration: id => {
      // TODO: requires the MANAGE_GUILD permission
      return client.RequestManager.delete(endpoints.GUILD_INTEGRATION(data.id, id))
    },
    sync_integration: id => {
      // TODO: requires MANAGE_GUILD
      return client.RequestManager.post(endpoints.GUILD_INTEGRATION_SYNC(data.id, id))
    },
    get_bans: () => {
      // TODO: requires the BAN_MEMBERS permission
      return client.RequestManager.get(endpoints.GUILD_BANS(data.id))
    },
    ban: (id, options) => {
      // TODO: requires the BAN_MEMBERS permission
      return client.RequestManager.put(endpoints.GUILD_BAN(data.id, id), options)
    },
    unban: id => {
      // TODO: requires the BAN_MEMBERS permission
      return client.RequestManager.delete(endpoints.GUILD_BAN(data.id, id))
    },
    edit: options => {
      // TODO: requires the MANAGE_GUILD permission
      return client.RequestManager.patch(endpoints.GUILD(data.id), options)
    },
    get_invites: () => {
      // TODO: requires MANAGE_GUILD permission
      return client.RequestManager.get(endpoints.GUILD_INVITES(data.id))
    },
    leave: () => {
      return client.RequestManager.delete(endpoints.GUILD_LEAVE(data.id))
    },
    get_voice_regions: () => {
      return client.RequestManager.get(endpoints.GUILD_REGIONS(data.id))
    },
    get_webhooks: () => {
      // TODO: requires MANAGE_WEBHOOKS
      return client.RequestManager.get(endpoints.GUILD_WEBHOOKS(data.id))
    }
  }

  return guild
}
