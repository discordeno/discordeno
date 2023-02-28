/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-useless-call */

import {
  MessageTypes,
  type DiscordEmbed,
  type DiscordMessageActivity,
  type DiscordStickerItem,
  type DiscordApplication,
  type DiscordAttachment,
  type DiscordMemberWithUser,
  type DiscordMessage,
  type DiscordMessageComponents,
  type InteractionTypes,
} from '@discordeno/types'
import Base from '../Base.js'
import type Client from '../Client.js'
import { MESSAGE_LINK } from '../Endpoints.js'
import { MessageFlags, type GetMessageReactionOptions, type MessageContentEdit, type MessageWebhookContent } from '../typings.js'
import type NewsChannel from './channels/News.js'
import type PrivateChannel from './channels/Private.js'
import type TextChannel from './channels/Text.js'
import type TextVoiceChannel from './channels/TextVoice.js'
import type NewsThreadChannel from './channels/threads/NewsThread.js'
import type PrivateThreadChannel from './channels/threads/PrivateThread.js'
import type PublicThreadChannel from './channels/threads/PublicThread.js'
import type Guild from './guilds/Guild.js'
import Member from './guilds/Member.js'
import User from './users/User.js'

export class Message extends Base {
  /** The client manager. */
  client: Client
  /** Timestamp of message creation */
  timestamp: number
  /** The type of the message */
  type: MessageTypes
  /** The channel the message is in. Can be partial with only the id if the channel is not cached. */
  channel: PrivateChannel | TextChannel | NewsChannel | NewsThreadChannel | PublicThreadChannel | PrivateThreadChannel | TextVoiceChannel
  /** The message content. */
  content: string
  /** An object containing the reactions on the message. Each key is a reaction emoji and each value is an object with properties `me` (Boolean) and `count` (Number) for that specific reaction emoji. */
  reactions: Record<string, { me: boolean; count: number }>
  /** The ID of the guild this message is in (undefined if in DMs) */
  guildID?: string
  /** ID of the webhook that sent the message */
  webhookID?: string
  /** An object containing the reference to the original message if it is a crossposted message or reply */
  messageReference?: {
    /** The id of the original message this message was crossposted from */
    messageID?: string
    /** The id of the channel this message was crossposted from */
    channelID?: string
    /** The id of the guild this message was crossposted from */
    guildID?: string
  } | null

  /** The flags that are enabled on this message. */
  flags: number
  /** The message author */
  author: User
  /** The message author with server-specific data */
  member?: Member
  /** The message that was replied to. If undefined, message data was not received. If null, the message was deleted. */
  referencedMessage?: Message | null
  /** An object containing info about the interaction the message is responding to, if applicable */
  interaction?: {
    /** The id of the interaction */
    id: string
    /** The type of interaction */
    type: InteractionTypes
    /** The name of the command */
    name: string
    /** The user who invoked the interaction */
    user: User
    /** The member who invoked the interaction */
    member?: Member
  }

  /** Array of mentioned users */
  mentions: User[] = []
  /** Array of mentioned roles' ids */
  roleMentions: string[] = []
  /** Array of attachments */
  attachments: DiscordAttachment[] = []
  /** Array of embeds */
  embeds: DiscordEmbed[] = []
  /** The stickers sent with the message */
  stickerItems: DiscordStickerItem[] = []
  /** An array of component objects */
  components: DiscordMessageComponents = []
  /** The activity specified in the message */
  activity?: DiscordMessageActivity
  /** The application of the activity in the message */
  application?: Partial<DiscordApplication>
  /** The ID of the interaction's application */
  applicationID?: string
  /** Timestamp of latest message edit */
  editedTimestamp?: number
  /** Whether the message mentions everyone/here or not */
  mentionEveryone: boolean = false
  /** Whether the message is pinned or not */
  pinned: boolean = false
  /** Whether to play the message using TTS or not */
  tts: boolean = false

  constructor(data: DiscordMessage, client: Client) {
    super(data.id)

    this.client = client
    this.timestamp = Date.parse(data.timestamp)

    this.type = data.type || MessageTypes.Default
    this.timestamp = Date.parse(data.timestamp)
    // @ts-expect-error eris js hack
    this.channel = this.client.getChannel(data.channel_id) ?? {
      id: data.channel_id,
    }
    this.content = ''
    this.reactions = {}
    this.guildID = data.guild_id
    this.webhookID = data.webhook_id

    if (data.message_reference) {
      this.messageReference = {
        messageID: data.message_reference.message_id,
        channelID: data.message_reference.channel_id,
        guildID: data.message_reference.guild_id,
      }
    } else {
      this.messageReference = null
    }

    this.flags = data.flags ?? 0

    this.author = new User(data.author, client)
    if (!data.webhook_id) {
      this.client.users.set(this.author.id, this.author)
    }

    if (data.referenced_message) {
      const channel = this.client.getChannel(data.referenced_message.channel_id) as TextChannel
      this.referencedMessage = new Message(data.referenced_message, this.client)

      if (channel) {
        channel.messages.set(this.referencedMessage.id, this.referencedMessage)
      }
    } else {
      this.referencedMessage = data.referenced_message
    }

    if (data.interaction) {
      this.interaction = {
        id: data.interaction.id,
        type: data.interaction.type,
        name: data.interaction.name,
        user: new User(data.interaction.user, client),
      }

      if (data.interaction.member) {
        data.interaction.member.user = data.interaction.user

        if (this.guild) {
          this.interaction.member = new Member(
            // @ts-expect-error some eris magic at play here
            data.interaction.member,
            this.guild,
            client,
          )
          this.guild.members.set(this.interaction.member.id, this.interaction.member)
        } else {
          // @ts-expect-error some eris magic at play here
          interactionMember = data.interaction.member
        }
      } else if (this.guild?.members.has(data.interaction.user.id)) {
        this.interaction.member = this.guild.members.get(data.interaction.user.id)
      }
    }

    if (this.guild) {
      if (data.member) {
        data.member.user = data.author
        this.member = new Member(data.member as DiscordMemberWithUser, this.guild, client)
        this.guild.members.set(this.member.id, this.member)
      } else if (this.guild.members.has(this.author.id)) {
        this.member = this.guild.members.get(this.author.id)
      }
    }

    this.update(data)
  }

  /**
   * @deprecated Use `.client` instead.
   */
  get _client(): Client {
    return this.client
  }

  get guild(): Guild | undefined {
    return this.guildID ? this.client.guilds.get(this.guildID) : undefined
  }

  update(data: DiscordMessage) {
    if (data.pinned !== undefined) this.pinned = !!data.pinned

    if (data.tts !== undefined) this.tts = data.tts
    if (data.attachments !== undefined) this.attachments = data.attachments
    if (data.embeds !== undefined) this.embeds = data.embeds
    if (data.flags !== undefined) this.flags = data.flags
    if (data.activity !== undefined) this.activity = data.activity
    if (data.components !== undefined) this.components = data.components
    if (data.application !== undefined) this.application = data.application

    if (data.edited_timestamp) this.editedTimestamp = Date.parse(data.edited_timestamp)
    if (data.application_id !== undefined) this.applicationID = data.application_id
    if (data.sticker_items !== undefined) this.stickerItems = data.sticker_items

    if (data.content !== undefined) {
      this.content = data.content || ''
      this.mentionEveryone = !!data.mention_everyone
      this.mentions = []

      for (const mention of data.mentions ?? []) {
        const user = new User(mention, this.client)
        this.client.users.set(user.id, user)

        if (mention.member && this.guild) {
          mention.member.user = mention
          this.guild.members.set(mention.id, new Member(mention.member as DiscordMemberWithUser, this.guild, this.client))
        }
      }

      if (data.mention_roles) this.roleMentions = data.mention_roles
    }

    if (data.reactions) {
      for (const reaction of data.reactions ?? []) {
        this.reactions[reaction.emoji.id ? `${reaction.emoji.name}:${reaction.emoji.id}` : reaction.emoji.name!] = {
          count: reaction.count,
          me: reaction.me,
        }
      }
    }
  }

  get channelMentions(): string[] {
    return (this.content.match(/<#[0-9]+>/g) ?? []).map((mention) => mention.substring(2, mention.length - 1))
  }

  get cleanContent() {
    let cleanContent = this.content?.replace(/<a?(:\w+:)[0-9]+>/g, '$1') || ''

    let authorName = this.author.username
    if (this.guild) {
      const member = this.guild.members.get(this.author.id)
      if (member?.nick) {
        authorName = member.nick
      }
    }
    cleanContent = cleanContent.replace(new RegExp(`<@!?${this.author.id}>`, 'g'), '@\u200b' + authorName)

    if (this.mentions) {
      this.mentions.forEach((mention) => {
        if (this.guild) {
          const member = this.guild.members.get(mention.id)
          if (member?.nick) {
            cleanContent = cleanContent.replace(new RegExp(`<@!?${mention.id}>`, 'g'), '@\u200b' + member.nick)
          }
        }
        cleanContent = cleanContent.replace(new RegExp(`<@!?${mention.id}>`, 'g'), '@\u200b' + mention.username)
      })
    }

    if (this.guild && this.roleMentions) {
      for (const roleID of this.roleMentions) {
        const role = this.guild.roles.get(roleID)
        const roleName = role ? role.name : 'deleted-role'
        cleanContent = cleanContent.replace(new RegExp(`<@&${roleID}>`, 'g'), '@\u200b' + roleName)
      }
    }

    this.channelMentions.forEach((id) => {
      const channel = this.client.getChannel(id) as TextChannel
      if (channel?.name && channel.mention) {
        cleanContent = cleanContent.replace(channel.mention, '#' + channel.name)
      }
    })

    return cleanContent.replace(/@everyone/g, '@\u200beveryone').replace(/@here/g, '@\u200bhere')
  }

  get jumpLink() {
    return `${this.client.CLIENT_URL}${MESSAGE_LINK(this.guildID ?? '@me', this.channel.id, this.id)}`
  }

  /** Add a reaction to a message */
  async addReaction(reaction: string): Promise<void> {
    if (this.flags & MessageFlags.EPHEMERAL) {
      throw new Error('Ephemeral messages cannot have reactions')
    }
    return await this.client.addMessageReaction.call(this.client, this.channel.id, this.id, reaction)
  }

  /** Create a thread with this message */
  async createThreadWithMessage(options: {
    name: string
    autoArchiveDuration: 60 | 1440 | 4320 | 10080
  }): Promise<NewsThreadChannel | PublicThreadChannel> {
    return await this.client.createThreadWithMessage.call(this.client, this.channel.id, this.id, options)
  }

  /** Crosspost (publish) a message to subscribed channels (NewsChannel only) */
  async crosspost(): Promise<Message> {
    if (this.flags & MessageFlags.EPHEMERAL) {
      throw new Error('Ephemeral messages cannot be crossposted')
    }

    return await this.client.crosspostMessage.call(this.client, this.channel.id, this.id)
  }

  /** Delete the message */
  async delete(reason?: string): Promise<void> {
    if (this.flags & MessageFlags.EPHEMERAL) {
      throw new Error('Ephemeral messages cannot be deleted')
    }

    return await this.client.deleteMessage.call(this.client, this.channel.id, this.id, reason)
  }

  /** Delete the message as a webhook */
  async deleteWebhook(token: string): Promise<void> {
    if (!this.webhookID) throw new Error('Message is not a webhook')
    if (this.flags & MessageFlags.EPHEMERAL) throw new Error('Ephemeral messages cannot be deleted')

    return await this.client.deleteWebhookMessage.call(this.client, this.webhookID, token, this.id)
  }

  /** Edit the message */
  async edit(content: MessageContentEdit): Promise<Message> {
    if (this.flags & MessageFlags.EPHEMERAL) {
      throw new Error('Ephemeral messages cannot be edited via this method')
    }

    return await this.client.editMessage.call(this.client, this.channel.id, this.id, content)
  }

  /** Edit the message as a webhook */
  async editWebhook(token: string, options: MessageWebhookContent): Promise<Message> {
    if (!this.webhookID) {
      throw new Error('Message is not a webhook')
    }

    return await this.client.editWebhookMessage.call(this.client, this.webhookID, token, this.id, options)
  }

  /** Get a list of users who reacted with a specific reaction */
  async getReaction(reaction: string, options?: GetMessageReactionOptions): Promise<User[]> {
    if (this.flags & MessageFlags.EPHEMERAL) {
      throw new Error('Ephemeral messages cannot have reactions')
    }

    return await this.client.getMessageReaction.call(this.client, this.channel.id, this.id, reaction, options)
  }

  /** Pin the message */
  async pin(): Promise<void> {
    if (this.flags & MessageFlags.EPHEMERAL) {
      throw new Error('Ephemeral messages cannot be pinned')
    }

    return await this.client.pinMessage.call(this.client, this.channel.id, this.id)
  }

  /** Remove a reaction from a message */
  async removeReaction(reaction: string): Promise<void> {
    if (this.flags & MessageFlags.EPHEMERAL) {
      throw new Error('Ephemeral messages cannot have reactions')
    }

    return await this.client.removeMessageReaction.call(this.client, this.channel.id, this.id, reaction)
  }

  /** Remove all reactions from a message for a single emoji */
  async removeReactionEmoji(reaction: string): Promise<void> {
    if (this.flags & MessageFlags.EPHEMERAL) {
      throw new Error('Ephemeral messages cannot have reactions')
    }

    return await this.client.removeMessageReactionEmoji.call(this.client, this.channel.id, this.id, reaction)
  }

  /** Remove all reactions from a message */
  async removeReactions(): Promise<void> {
    if (this.flags & MessageFlags.EPHEMERAL) {
      throw new Error('Ephemeral messages cannot have reactions')
    }

    return await this.client.removeMessageReactions.call(this.client, this.channel.id, this.id)
  }

  /** Unpin the message */
  async unpin(): Promise<void> {
    if (this.flags & MessageFlags.EPHEMERAL) {
      throw new Error('Ephemeral messages cannot be pinned')
    }

    return await this.client.unpinMessage.call(this.client, this.channel.id, this.id)
  }

  toJSON(props: string[] = []): Record<string, any> {
    return super.toJSON([
      'activity',
      'application',
      'attachments',
      'author',
      'content',
      'editedTimestamp',
      'embeds',
      'flags',
      'guildID',
      'hit',
      'member',
      'mentionEveryone',
      'mentions',
      'messageReference',
      'pinned',
      'reactions',
      'referencedMesssage',
      'roleMentions',
      'stickers',
      'stickerItems',
      'timestamp',
      'tts',
      'type',
      'webhookID',
      ...props,
    ])
  }
}

export default Message
