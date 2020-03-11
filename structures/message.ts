import Client from "../module/client.ts"
import { Message_Create_Options } from "../types/message.ts"
import { endpoints } from "../constants/discord.ts"
import { MessageContent } from "../types/channel.ts"
import { cache } from "../utils/cache.ts"
import { create_user } from "./user.ts"
import { User_Payload } from "../types/guild.ts"
import { Channel } from "../types/return-type.ts"
import { bot_has_permission } from "../utils/permissions.ts"
import { Errors } from "../types/errors.ts"
import { Permissions } from "../types/permission.ts"

export const create_message = (data: Message_Create_Options, client: Client) => ({
  raw: () => data,
  author: () => create_user({ ...data.author, avatar: data.author.avatar || "" }),
  id: () => data.id,
  type: () => data.type,
  timestamp: () => Date.parse(data.timestamp),
  content: () => data.content,
  reactions: () => data.reactions || [],
  guild_id: () => data.guild_id,
  webhook_id: () => data.webhook_id,
  mentions_everyone: () => data.mentions_everyone,
  mentions: () => data.mentions.map(m => m.member.id),
  mention_roles: () => data.mention_roles,
  mention_channels: () => data.mention_channels?.map(c => c.id) || [],
  pinned: () => data.pinned,
  edited_timestamp: () => (data.edited_timestamp ? Date.parse(data.edited_timestamp) : undefined),
  tts: () => data.tts,
  attachments: () => data.attachments,
  embeds: () => data.embeds,
  activity: () => data.activity,
  applications: () => data.applications,
  message_reference: () => ({
    channel_id: data.message_reference?.channel_id,
    guild_id: data.message_reference?.guild_id,
    message_id: data.message_reference?.message_id
  }),
  flags: () => data.flags || 0,
  channel_id: () => data.channel_id,
  channel: () => cache.channels.get(data.channel_id) as Channel,

  delete: (reason: string) => {
    if (data.guild_id && !bot_has_permission(data.guild_id, client.bot_id, [Permissions.MANAGE_MESSAGES]))
      throw new Error(Errors.MISSING_MANAGE_MESSAGES)
    if (data.author.id !== client.bot_id) {
    }

    client.discordRequestManager.delete(endpoints.CHANNEL_MESSAGE(data.channel_id, data.id), { reason })
  },
  /** Pin a message in a channel. Requires MANAGE_MESSAGES. Max pins allowed in a channel = 50. */
  pin: () => {
    if (data.guild_id && !bot_has_permission(data.guild_id, client.bot_id, [Permissions.MANAGE_MESSAGES]))
      throw new Error(Errors.MISSING_MANAGE_MESSAGES)
    client.discordRequestManager.put(endpoints.CHANNEL_MESSAGE(data.channel_id, data.id))
  },
  unpin: () => {
    if (data.guild_id && !bot_has_permission(data.guild_id, client.bot_id, [Permissions.MANAGE_MESSAGES]))
      throw new Error(Errors.MISSING_MANAGE_MESSAGES)
    client.discordRequestManager.delete(endpoints.CHANNEL_MESSAGE(data.channel_id, data.id))
  },
  /** Create a reaction for the message. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. Requires READ_MESSAGE_HISTORY and ADD_REACTIONS */
  add_reaction: (reaction: string) => {
    client.discordRequestManager.put(endpoints.CHANNEL_MESSAGE_REACTION_ME(data.channel_id, data.id, reaction))
  },
  /** Removes a reaction from the bot on this message. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. */
  remove_reaction: (reaction: string) => {
    client.discordRequestManager.delete(endpoints.CHANNEL_MESSAGE_REACTION_ME(data.channel_id, data.id, reaction))
  },
  /** Removes all reactions for all emojis on this message. */
  remove_all_reactions: () => {
    if (data.guild_id && !bot_has_permission(data.guild_id, client.bot_id, [Permissions.MANAGE_MESSAGES]))
      throw new Error(Errors.MISSING_MANAGE_MESSAGES)
    client.discordRequestManager.delete(endpoints.CHANNEL_MESSAGE_REACTIONS(data.channel_id, data.id))
  },
  /** Removes all reactions for a single emoji on this message. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. */
  remove_reaction_emoji: (reaction: string) => {
    if (data.guild_id && !bot_has_permission(data.guild_id, client.bot_id, [Permissions.MANAGE_MESSAGES]))
      throw new Error(Errors.MISSING_MANAGE_MESSAGES)
    client.discordRequestManager.delete(endpoints.CHANNEL_MESSAGE_REACTION(data.channel_id, data.id, reaction))
  },
  /** Get a list of users that reacted with this emoji. */
  get_reactions: async (reaction: string) => {
    const result = (await client.discordRequestManager.get(
      endpoints.CHANNEL_MESSAGE_REACTION(data.channel_id, data.id, reaction)
    )) as User_Payload[]
    return result.map(res => create_user(res))
  },
  /** Edit the message. */
  edit: async (content: string | MessageContent) => {
    if (data.author.id !== client.bot_id) throw "You can only edit a message that was sent by the bot."

    if (typeof content === "string") content = { content }

    if (data.guild_id) {
      if (!bot_has_permission(data.guild_id, client.bot_id, [Permissions.SEND_MESSAGES]))
        throw new Error(Errors.MISSING_SEND_MESSAGES)

      if (content.tts && !bot_has_permission(data.guild_id, client.bot_id, [Permissions.SEND_TTS_MESSAGES]))
        throw new Error(Errors.MISSING_SEND_TTS_MESSAGE)
    }

    if (content.content && content.content.length > 2000) throw new Error(Errors.MESSAGE_MAX_LENGTH)

    const result = await client.discordRequestManager.patch(endpoints.CHANNEL_MESSAGES(data.id), content)
    return create_message(result, client)
  }
})

export type Message = ReturnType<typeof create_message>
