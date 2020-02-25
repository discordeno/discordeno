import {
  Channel_Create_Options,
  Channel_Types,
  Get_Messages_After,
  Get_Messages_Around,
  Get_Messages,
  Get_Messages_Before,
  MessageContent,
  Create_Invite_Options
} from '../types/channel'
import Client from '../module/client'
import { endpoints } from '../constants/discord.ts'
import { create_message, Message } from './message'
import { Message_Create_Options } from '../types/message'
import { Permission, Permissions } from '../types/permission'
import { Guild } from '../types/return-type'

export const create_channel = (data: Channel_Create_Options, guild: Guild, client: Client) => {
  const base_channel = {
    /** The unique id of the channel */
    id: data.id,
    /** The type of the channel. */
    type: () => data.type,
    /** The id of the guild where this channel exists */
    guild_id: () => data.guild_id
  }

  const base_text_channel = {
    /** A short collection of recently sent messages since bot started. */
    messages: new Map<string, Message>(),
    /** The last message id in this channel */
    last_message_id: () => data.last_message_id,
    /** Fetch a single message from the server. Requires VIEW_CHANNEL and READ_MESSAGE_HISTORY */
    get_message: async (id: string) => {
      // TODO: check if the user has VIEW_CHANNEL and READ_MESSAGE_HISTORY
      const result = await client.discordRequestManager.get(endpoints.CHANNEL_MESSAGE(data.id, id))
      return create_message(result, client)
    },
    /** Fetches between 2-100 messages. Requires VIEW_CHANNEL and READ_MESSAGE_HISTORY */
    get_messages: async (options?: Get_Messages_After | Get_Messages_Before | Get_Messages_Around | Get_Messages) => {
      // TODO: check if the user has VIEW_CHANNEL and READ_MESSAGE_HISTORY
      if (options?.limit && options.limit > 100) return

      const result = (await client.discordRequestManager.get(
        endpoints.CHANNEL_MESSAGES(data.id),
        options
      )) as Message_Create_Options[]
      return result.map(res => create_message(res, client))
    },
    /** Get pinned messages in this channel. */
    get_pins: async () => {
      const result = (await client.discordRequestManager.get(endpoints.CHANNEL_PINS(data.id))) as Message_Create_Options[]
      return result.map(res => create_message(res, client))
    },
    /** Send a message to the channel. Requires SEND_MESSAGES permission. */
    send_message: async (content: string | MessageContent) => {
      if (data.type !== Channel_Types.DM) {
        // TODO: check if the bot has SEND_MESSAGES permission
      }

      if (typeof content === 'string') content = { content }
      if (content.tts) {
        // TODO: check if the bot has SEND_TTS_MESSAGE
      }

      // TODO: Check content length

      const result = await client.discordRequestManager.post(endpoints.CHANNEL_MESSAGES(data.id), content)
      return create_message(result, client)
    }
  }

  // If it is a dm channel
  if (data.type === Channel_Types.DM)
    return {
      ...base_channel,
      ...base_text_channel
    }

  // GUILD CHANNEL ONLY
  const base_guild_channel = {
    ...base_channel,
    /** Whether this channel NSFW enabled. */
    nsfw: () => data.nsfw!,
    /** The position of the channel in the server. */
    position: () => data.position!,
    /** The category id for this channel. */
    parent_id: () => data.parent_id,
    // TODO: fix this from being number on allow and deny to being array of strings
    /** Fetch the permission overwrites */
    permission_overwrites: () => data.permission_overwrites,
    /** Check whether a member has certain permissions in this channel. */
    has_permissions: (id: string, permissions: Permission[]) => {
      if (id === guild.owner_id()) return true

      const member = guild.members.get(id)
      if (!member)
        throw 'Invalid member id provided. This member was not found in the cache. Please fetch them with getMember on guild.'

      let permissionBits = member.roles().reduce((bits, role_id) => {
        const role = guild.roles.get(role_id)
        if (!role) return bits

        bits |= role.permissions()

        return bits
      }, 0)

      data.permission_overwrites?.forEach(overwrite => {
        permissionBits = (permissionBits & ~overwrite.deny) | overwrite.allow
      })

      if (permissionBits & Permissions.ADMINISTRATOR) return true

      return permissions.every(permission => permissionBits & Permissions[permission])
    }
  }

  // Guild Text Channel
  if ([Channel_Types.GUILD_TEXT, Channel_Types.GUILD_NEWS].includes(data.type))
    return {
      ...base_guild_channel,
      ...base_text_channel,
      /** The topic of the channel */
      topic: () => data.topic,
      /** The mention of the channel */
      mention: () => `<#${data.id}>`,
      /** Delete messages from the channel. 2-100. Requires the MANAGE_MESSAGES permission */
      delete_messages: (ids: string[], reason?: string) => {
        // TODO: Requires the MANAGE_MESSAGES permission.
        if (ids.length < 2) throw 'This endpoint will only accept 2-100 message ids.'
        if (ids.length > 100)
          console.warn(
            `This endpoint only accepts a maximum of 100 messages. Deleting the first 100 message ids provided.`
          )
        return client.discordRequestManager.POST(endpoints.CHANNEL_BULK_DELETE(data.id), {
          messages: ids.splice(0, 100),
          reason
        })
      },
      /** Gets the invites for this channel. Requires MANAGE_CHANNEL */
      get_invites: () => {
        // TODO: Requires the MANAGE_CHANNELS permission
        return client.discordRequestManager.get(endpoints.CHANNEL_INVITES(data.id))
      },
      /** Creates a new invite for this channel. Requires CREATE_INSTANT_INVITE */
      create_invite: (options: Create_Invite_Options) => {
        // TODO: Requires CREATE_INSTANT_INVITE permissin.
        return client.discordRequestManager.post(endpoints.CHANNEL_INVITES(data.id), options)
      },
      /** Gets the webhooks for this channel. Requires MANAGE_WEBHOOKS */
      get_webhooks: () => {
        // TODO: Requires MANAGE_WEBHOOKS
        return client.discordRequestManager.get(endpoints.CHANNEL_WEBHOOKS(data.id))
      }
    }

  if (data.type === Channel_Types.GUILD_CATEGORY)
    return {
      ...base_guild_channel,
      /** Gets an array of all the channels ids that are the children of this category. */
      children_ids: () =>
        Object.keys(guild.channels).filter(channel => guild.channels.get(channel).parent_id === data.id)
    }

  if (data.type === Channel_Types.GUILD_VOICE)
    return {
      ...base_guild_channel,
      // TODO: after learning opus and stuff
      /** Join a voice channel. */
      join: () => {},
      /** Leave a voice channel */
      leave: () => {}
    }

  return {
    ...data,
    /** The channel mention */
    mention: () => `<#${data.id}>`
  }
}
