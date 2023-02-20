/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-useless-call */
/* eslint-disable @typescript-eslint/return-await */
import { ApplicationCommandTypes, InteractionResponseTypes } from '@discordeno/types';

import Collection from '../../Collection.js';
import Channel from '../channels/Channel.js';
import Member from '../guilds/Member.js';
import Role from '../guilds/Role.js';
import Message from '../Message.js';
import User from '../users/User.js';
import Interaction from './Interaction.js';

import type {
  BigString,
  DiscordAttachment,
  DiscordInteraction,
  DiscordInteractionDataOption,
  DiscordMessageComponents,
  MessageComponentTypes,
} from '@discordeno/types'
import type Client from '../../Client.js'
import type { AnyChannel, FileContent, InteractionContent, InteractionContentEdit } from '../../typings.js'
export class CommandInteraction extends Interaction {
  channel: AnyChannel
  /** The type of component */
  componentType?: MessageComponentTypes
  /** The custom id provided for this component. */
  customId?: string
  /** The components if its a Modal Submit interaction. */
  components?: DiscordMessageComponents
  /** The values chosen by the user. */
  values?: string[]
  /** the type of the invoked command */
  commandType: ApplicationCommandTypes = ApplicationCommandTypes.ChatInput
  /** The Ids and Message objects */
  messages = new Collection<BigString, Message>()
  /** The Ids and User objects */
  users = new Collection<BigString, User>()
  /** The Ids and partial Member objects */
  members = new Collection<BigString, Member>()
  /** The Ids and Role objects */
  roles = new Collection<BigString, Role>()
  /** The Ids and partial Channel objects */
  channels = new Collection<BigString, Channel>()
  /** The ids and attachment objects */
  attachments = new Collection<BigString, DiscordAttachment>()
  /** The params + values from the user */
  options?: DiscordInteractionDataOption[]
  /** The target id if this is a context menu command. */
  targetID?: string
  /** the id of the guild the command is registered to */
  guildID?: string

  member?: Member
  user: User

  constructor(info: DiscordInteraction, client: Client) {
    super(info, client)

    this.channel = this.client.getChannel(info.channel_id!) ?? {
      id: info.channel_id!,
    }

    // this.data = info.data!;
    const guild = this.client.guilds.get(info.guild_id!)

    if (info.data?.resolved !== undefined) {
      // Users
      if (info.data.resolved.users !== undefined) {
        for (const u of Object.values(info.data.resolved.users)) {
          const user = new User(u, this.client)
          this.users.set(user.id, user)
        }
      }

      // Members
      if (info.data.resolved.members !== undefined) {
        for (const [, m] of Object.entries(info.data.resolved.members)) {
          // @ts-expect-error some eris magic at play here
          m.id = m
          // @ts-expect-error some eris magic at play here
          const member = new Member(m, guild, this.client)
          this.members.set(member.id, member)
        }
      }

      // Roles
      if (info.data.resolved.roles !== undefined) {
        for (const r of Object.values(info.data.resolved.roles)) {
          // @ts-expect-error some eris magic at play here
          const role = new Role(r, guild)
          this.roles.set(role.id, role)
        }
      }

      // Channels
      if (info.data.resolved.channels !== undefined) {
        for (const c of Object.values(info.data.resolved.channels)) {
          const channel = new Channel(c, this.client)
          this.channels.set(channel.id, channel)
        }
      }

      // Messages
      if (info.data.resolved.messages !== undefined) {
        for (const m of Object.values(info.data.resolved.messages)) {
          const message = new Message(m, this.client)
          this.messages.set(message.id, message)
        }
      }

      // Attachments
      if (info.data.resolved.attachments !== undefined) {
        for (const attachment of Object.values(info.data.resolved.attachments)) {
          this.attachments.set(attachment.id, attachment)
        }
      }
    }

    this.guildID = info.guild_id

    if (info.member !== undefined) {
      // @ts-expect-error some eris magic at play here
      this.member = new Member(info.member, guild, this.client)
      guild?.members.set(this.member.id, this.member)
    }

    this.user = new User(info.user ?? info.member!.user, this.client)
    this.client.users.set(this.user.id, this.user)

    if (info.data) {
      this.componentType = info.data.component_type
      this.customId = info.data.custom_id
      this.components = info.data.components
      this.values = info.data.values
      this.commandType = info.data.type
      this.options = info.data.options
      this.targetID = info.data.target_id
    }
  }

  get data() {
    return {
      component_type: this.componentType,
      custom_id: this.customId,
      components: this.components,
      values: this.values,
      type: this.commandType,
      resolved: {
        messages: this.messages.toRecord(),
        users: this.users.toRecord(),
        members: this.members.toRecord(),
        roles: this.roles.toRecord(),
        channels: this.channels.toRecord(),
        attachments: this.attachments.toRecord(),
      },
      options: this.options,
      target_id: this.targetID,
      guild_id: this.guildID,
    }
  }

  /**
   * Acknowledges the interaction with a defer response
   * Note: You can **not** use more than 1 initial interaction response per interaction.
   */
  async acknowledge(flags?: number): Promise<void> {
    return this.defer(flags)
  }

  /** Respond to the interaction with a followup message */
  async createFollowup(content: string | InteractionContent, file?: FileContent | FileContent[]): Promise<Message> {
    if (!this.acknowledged) {
      throw new Error('createFollowup cannot be used to acknowledge an interaction, please use acknowledge, createMessage, or defer first.')
    }
    if (content !== undefined) {
      if (typeof content !== 'object' || content === null) {
        content = {
          content: '' + content,
        }
      } else if (content.content !== undefined && typeof content.content !== 'string') {
        content.content = '' + content.content
      }
    }

    return await this.client.executeWebhook.call(this.client, this.applicationID, this.token, {
      ...content,
      wait: true,
      file,
    })
  }

  /**
   * Acknowledges the interaction with a message. If already acknowledged runs createFollowup
   * Note: You can **not** use more than 1 initial interaction response per interaction, use createFollowup if you have already responded with a different interaction response.
   */
  async createMessage(content: string | InteractionContent, file?: FileContent | FileContent[]): Promise<void> {
    if (this.acknowledged) {
      // @ts-expect-error some eris magic at play here
      return await this.createFollowup(content, file)
    }

    if (typeof content !== 'object' || content === null) {
      content = {
        content: '' + content,
      }
    } else if (content.content !== undefined && typeof content.content !== 'string') {
      content.content = '' + content.content
    }

    return this.client.createInteractionResponse
      .call(
        this.client,
        this.id,
        this.token,
        {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: content,
        },
        file,
      )
      .then(() => this.update())
  }

  /**
   * Acknowledges the interaction with a defer response
   * Note: You can **not** use more than 1 initial interaction response per interaction.
   */
  async defer(flags?: number): Promise<void> {
    if (this.acknowledged) {
      throw new Error('You have already acknowledged this interaction.')
    }
    return this.client.createInteractionResponse
      .call(this.client, this.id, this.token, {
        type: InteractionResponseTypes.DeferredChannelMessageWithSource,
        data: {
          flags: flags ?? 0,
        },
      })
      .then(() => this.update())
  }

  /** Delete a message */
  async deleteMessage(messageID: BigString): Promise<void> {
    if (!this.acknowledged) {
      throw new Error('deleteMessage cannot be used to acknowledge an interaction, please use acknowledge, createMessage, or defer first.')
    }
    return this.client.deleteWebhookMessage.call(this.client, this.applicationID, this.token, messageID)
  }

  /**
   * Delete the Original message
   * Warning: Will error with ephemeral messages.
   */
  async deleteOriginalMessage(): Promise<void> {
    if (!this.acknowledged) {
      throw new Error('deleteOriginalMessage cannot be used to acknowledge an interaction, please use acknowledge, createMessage, or defer first.')
    }
    return this.client.deleteWebhookMessage.call(this.client, this.applicationID, this.token, '@original')
  }

  /** Edit a message */
  async editMessage(messageID: BigString, content: string | InteractionContentEdit, file?: FileContent | FileContent[]): Promise<Message> {
    if (!this.acknowledged) {
      throw new Error('editMessage cannot be used to acknowledge an interaction, please use acknowledge, createMessage, or defer first.')
    }
    if (content !== undefined) {
      if (typeof content !== 'object' || content === null) {
        content = {
          content: '' + content,
        }
      } else if (content.content !== undefined && typeof content.content !== 'string') {
        content.content = '' + content.content
      }
    }

    return await this.client.editWebhookMessage.call(this.client, this.applicationID, this.token, messageID, {
      ...content,
      file,
    })
  }

  /** Edit the Original response message */
  async editOriginalMessage(content: string | InteractionContentEdit, file?: FileContent | FileContent[]): Promise<Message> {
    if (!this.acknowledged) {
      throw new Error('editOriginalMessage cannot be used to acknowledge an interaction, please use acknowledge, createMessage, or defer first.')
    }
    if (content !== undefined) {
      if (typeof content !== 'object' || content === null) {
        content = {
          content: '' + content,
        }
      } else if (content.content !== undefined && typeof content.content !== 'string') {
        content.content = '' + content.content
      }
    }

    return this.client.editWebhookMessage.call(this.client, this.applicationID, this.token, '@original', {
      ...content,
      file,
    })
  }

  /**
   * Get the Original response message
   * Warning: Will error with ephemeral messages.
   */
  async getOriginalMessage(): Promise<Message> {
    if (!this.acknowledged) {
      throw new Error('getOriginalMessage cannot be used to acknowledge an interaction, please use acknowledge, createMessage, or defer first.')
    }
    return this.client.getWebhookMessage.call(this.client, this.applicationID, this.token, '@original')
  }
}

export default CommandInteraction
