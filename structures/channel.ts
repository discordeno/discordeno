import {
  Channel_Create_Payload,
  Channel_Types,
  Get_Messages_After,
  Get_Messages_Around,
  Get_Messages,
  Get_Messages_Before,
  MessageContent,
  Create_Invite_Options
} from "../types/channel.ts"
import Client from "../module/client.ts"
import { endpoints } from "../constants/discord.ts"
import { create_message, Message } from "./message.ts"
import { Message_Create_Options } from "../types/message.ts"
import { calculate_permissions, bot_has_permission } from "../utils/permissions.ts"
import { Permissions } from "../types/permission.ts"
import { Errors } from "../types/errors.ts"

export const create_channel = (data: Channel_Create_Payload, client: Client) => {
  const base_channel = {
    /** The raw channel data */
    raw: () => data,
    /** The unique id of the channel */
    id: data.id,
    /** The type of the channel. */
    type: () => data.type,
    /** The id of the guild where this channel exists */
    guild_id: () => data.guild_id,
    /** The permission overwrites for this channel */
    permission_overwrites: () =>
      data.permission_overwrites
        ? data.permission_overwrites.map(perm => ({
            ...perm,
            allow: calculate_permissions(perm.allow),
            deny: calculate_permissions(perm.deny)
          }))
        : [],
    /** Whether this channel is nsfw or not */
    nsfw: () => false
  }

  const base_text_channel = {
    ...base_channel,
    /** A short collection of recently sent messages since bot started. */
    messages: new Map<string, Message>(),
    /** The last message id in this channel */
    last_message_id: () => data.last_message_id,
    /** Fetch a single message from the server. Requires VIEW_CHANNEL and READ_MESSAGE_HISTORY */
    get_message: async (id: string) => {
      if (data.guild_id) {
        if (!bot_has_permission(data.guild_id, client.bot_id, [Permissions.VIEW_CHANNEL]))
          throw new Error(Errors.MISSING_VIEW_CHANNEL)
        if (!bot_has_permission(data.guild_id, client.bot_id, [Permissions.READ_MESSAGE_HISTORY]))
          throw new Error(Errors.MISSING_READ_MESSAGE_HISTORY)
      }
      const result = await client.discordRequestManager.get(endpoints.CHANNEL_MESSAGE(data.id, id))
      return create_message(result, client)
    },
    /** Fetches between 2-100 messages. Requires VIEW_CHANNEL and READ_MESSAGE_HISTORY */
    get_messages: async (options?: Get_Messages_After | Get_Messages_Before | Get_Messages_Around | Get_Messages) => {
      if (data.guild_id) {
        if (!bot_has_permission(data.guild_id, client.bot_id, [Permissions.VIEW_CHANNEL]))
          throw new Error(Errors.MISSING_VIEW_CHANNEL)
        if (!bot_has_permission(data.guild_id, client.bot_id, [Permissions.READ_MESSAGE_HISTORY]))
          throw new Error(Errors.MISSING_READ_MESSAGE_HISTORY)
      }

      if (options?.limit && options.limit > 100) return

      const result = (await client.discordRequestManager.get(
        endpoints.CHANNEL_MESSAGES(data.id),
        options
      )) as Message_Create_Options[]
      return result.map(res => create_message(res, client))
    },
    /** Get pinned messages in this channel. */
    get_pins: async () => {
      const result = (await client.discordRequestManager.get(
        endpoints.CHANNEL_PINS(data.id)
      )) as Message_Create_Options[]
      return result.map(res => create_message(res, client))
    },
    /** Send a message to the channel. Requires SEND_MESSAGES permission. */
    send_message: async (content: string | MessageContent) => {
      if (typeof content === "string") content = { content }

      if (data.guild_id) {
        if (!bot_has_permission(data.guild_id, client.bot_id, [Permissions.SEND_MESSAGES]))
          throw new Error(Errors.MISSING_SEND_MESSAGES)
        if (content.tts && !bot_has_permission(data.guild_id, client.bot_id, [Permissions.SEND_TTS_MESSAGES]))
          throw new Error(Errors.MISSING_SEND_TTS_MESSAGE)
      }

      if (content.content && content.content.length > 2000) throw new Error(Errors.MESSAGE_MAX_LENGTH)

      const result = await client.discordRequestManager.post(endpoints.CHANNEL_MESSAGES(data.id), content)
      return create_message(result, client)
    }
  }

  // If it is a dm channel
  if (data.type === Channel_Types.DM) return base_text_channel

  // GUILD CHANNEL ONLY
  const base_guild_channel = {
    ...base_channel,
    /** Whether this channel NSFW enabled. */
    nsfw: () => data.nsfw!,
    /** The position of the channel in the server. */
    position: () => data.position!,
    /** The category id for this channel. */
    parent_id: () => data.parent_id
  }

  // Guild Text Channel
  if ([Channel_Types.GUILD_TEXT, Channel_Types.GUILD_NEWS].includes(data.type)) {
    return {
      ...base_guild_channel,
      ...base_text_channel,
      /** The topic of the channel */
      topic: () => data.topic,
      /** The mention of the channel */
      mention: () => `<#${data.id}>`,
      /** Delete messages from the channel. 2-100. Requires the MANAGE_MESSAGES permission */
      delete_messages: (ids: string[], reason?: string) => {
        if (data.guild_id && !bot_has_permission(data.guild_id, client.bot_id, [Permissions.MANAGE_MESSAGES]))
          throw new Error(Errors.MISSING_MANAGE_MESSAGES)
        if (ids.length < 2) throw new Error(Errors.DELETE_MESSAGES_MIN)

        if (ids.length > 100)
          console.warn(
            `This endpoint only accepts a maximum of 100 messages. Deleting the first 100 message ids provided.`
          )

        return client.discordRequestManager.post(endpoints.CHANNEL_BULK_DELETE(data.id), {
          messages: ids.splice(0, 100),
          reason
        })
      },
      /** Gets the invites for this channel. Requires MANAGE_CHANNEL */
      get_invites: () => {
        if (data.guild_id && !bot_has_permission(data.guild_id, client.bot_id, [Permissions.MANAGE_CHANNELS]))
          throw new Error(Errors.MISSING_MANAGE_CHANNELS)
        return client.discordRequestManager.get(endpoints.CHANNEL_INVITES(data.id))
      },
      /** Creates a new invite for this channel. Requires CREATE_INSTANT_INVITE */
      create_invite: (options: Create_Invite_Options) => {
        if (data.guild_id && !bot_has_permission(data.guild_id, client.bot_id, [Permissions.CREATE_INSTANT_INVITE]))
          throw new Error(Errors.MISSING_CREATE_INSTANT_INVITE)
        return client.discordRequestManager.post(endpoints.CHANNEL_INVITES(data.id), options)
      },
      /** Gets the webhooks for this channel. Requires MANAGE_WEBHOOKS */
      get_webhooks: () => {
        if (data.guild_id && !bot_has_permission(data.guild_id, client.bot_id, [Permissions.MANAGE_WEBHOOKS]))
          throw new Error(Errors.MISSING_MANAGE_WEBHOOKS)
        return client.discordRequestManager.get(endpoints.CHANNEL_WEBHOOKS(data.id))
      }
    }
  }

  if (data.type === Channel_Types.GUILD_CATEGORY) return base_guild_channel

  if (data.type === Channel_Types.GUILD_VOICE) {
    return {
      ...base_guild_channel,
      // TODO: after learning opus and stuff
      /** Join a voice channel. */
      join: () => {},
      /** Leave a voice channel */
      leave: () => {}
    }
  }

  return {
    ...data,
    ...base_channel,
    /** The channel mention */
    mention: () => `<#${data.id}>`
  }
}
