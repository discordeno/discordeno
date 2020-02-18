import Client from '../module/client'
import { Message_Create_Options } from '../types/message'

export const create_message = (data: Message_Create_Options, client: Client) => {
  const base_message = {
    type: () => data.type,
    timestamp: () => Date.parse(data.timestamp),
    content: () => data.content,
    reactions: () => data.reactions || [],
    guild_id: () => data.guild_id,
    webhook_id: () => data.webhook_id,
    message_reference: () => ({
      channel_id: data.message_reference?.channel_id,
      guild_id: data.message_reference?.guild_id,
      message_id: data.message_reference?.message_id,
    }),
    flags: () => data.flags || 0,
    channel_id: () => data.channel_id
  }

  if (!data.guild_id) {
    return {
      ...base_message
    }
  }

  return {

  }
}
