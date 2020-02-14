import { Channel_Create_Options, Channel_Types } from '../types/channel'
import { Guild, Permission, Permissions } from '../types/guild'
import Client from '../module/client'
import { endpoints } from '../constants/discord'

export interface MessageContent {
  /** The message contents, up to 2000 characters */
  content?: string
  /** A nonce that can be used for optimistic message sending. */
  nonce?: number | string
  /** Whether this is a TextToSpeech message */
  tts?: boolean
  /** The contents of the file being sent */
  file?: File_Content
  /** Embed object */
  embed?: Embed_Object
  /** JSON encoded body of any additional request fields. */
  payload_json?: string
}

export const create_channel = (data: Channel_Create_Options, guild: Guild, client: Client) => {
  const base_channel = {
    id: data.id,
    type: () => data.type,
    guild_id: () => data.guild_id
  }

  const base_text_channel = {
    messages: new Map<string, Message>(),
    last_message_id: () => data.last_message_id,
    get_message: async (id: string) => {
      // TODO: check if the user has VIEW_CHANNEL and READ_MESSAGE_HISTORY
      const result = await client.RequestManager.get(endpoints.CHANNEL_MESSAGE(data.id, id))
      return create_message(result, client)
    },
    get_messages: async (options?: Get_Messages_After | Get_Messages_Before | Get_Messages_Around | Get_Messages) => {
      // TODO: check if the user has VIEW_CHANNEL and READ_MESSAGE_HISTORY
      if (!options.limit || options.limit <= 100) {
        const result = await client.RequestManager.get(endpoints.CHANNEL_MESSAGES(data.id), options)
        return result.map(res => create_message(res, client))
      }

      const fetch_messages = () => {}
      const
      return client.RequestManager.get(endpoints.CHANNEL_MESSAGES(data.id), options)
    },
    send_message: async (content: string | MessageContent) => {
      if (data.type !== Channel_Types.DM) {
        // TODO: check if the bot has SEND_MESSAGES permission
      }

      if (typeof content === 'string') content = { content }
      if (content.tts) {
        // TODO: check if the bot has SEND_TTS_MESSAGE
      }

      const result = await client.RequestManager.post(endpoints.CHANNEL_MESSAGES(data.id), content)
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
    nsfw: () => data.nsfw!,
    position: () => data.position!,
    parent_id: () => data.parent_id,
    // TODO: fix this from being number on allow and deny to being array of strings
    permission_overwrites: () => data.permission_overwrites,
    has_permissions: (id: string, permissions: Permission[]) => {
      if (id === guild.owner_id) return true

      const member = guild.members.get(id)
      if (!member)
        throw 'Invalid member id provided. This member was not found in the cache. Please fetch them with getMember on guild.'

      let permissionBits = member.roles().reduce((bits, role_id) => {
        const role = guild.roles.get(role_id)
        if (!role) return bits

        bits |= role.permissions

        return bits
      }, 0)

      data.permission_overwrites?.forEach(overwrite => {
        permissionBits = (permissionBits & ~overwrite.deny) | overwrite.allow
      })

      return permissions.every(permission => permissionBits & Permissions[permission])
    }
  }

  // Guild Text Channel
  if ([Channel_Types.GUILD_TEXT, Channel_Types.GUILD_NEWS].includes(data.type))
    return {
      ...base_guild_channel,
      ...base_text_channel,
      mention: () => `<#${data.id}>`
    }

  if (data.type === Channel_Types.GUILD_CATEGORY)
    return {
      ...base_guild_channel,
      children_ids: () =>
        Object.keys(guild.channels).filter(channel => guild.channels.get(channel).parent_id === data.id)
    }

  if (data.type === Channel_Types.GUILD_VOICE)
    return {
      ...base_guild_channel
    }

  return {
    ...data,
    mention: () => `<#${data.id}>`
  }
}
