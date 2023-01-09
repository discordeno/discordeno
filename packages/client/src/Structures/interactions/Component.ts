/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable no-useless-call */
/* eslint-disable @typescript-eslint/return-await */

import type { BigString, DiscordInteraction, MessageComponentTypes } from '@discordeno/types'
import { InteractionResponseTypes } from '@discordeno/types'
import type Client from '../../Client.js'
import type { AnyChannel, FileContent, InteractionApplicationCommandCallbackData, MessageWebhookContent, WebhookPayload } from '../../typings.js'
import type Guild from '../guilds/Guild.js'
import Member from '../guilds/Member.js'
import Message from '../Message.js'
import Permission from '../Permission.js'
import User from '../users/User.js'
import Interaction from './Interaction.js'

export class ComponentInteraction extends Interaction {
  /** The channel id where this interaction occurred in. */
  channelID: BigString
  /** The guild id where this interaction occurred in. */
  guildID?: BigString
  /** The member object if this interaction occurred in a guild. */
  member?: Member
  /** The user object for the user that created this interaction. */
  user: User
  /** The permissions the app or bot has within the channel, the interaction was sent from. */
  appPermissions?: Permission
  /** The message object, if this interaction occurred on a message. */
  message?: Message
  /** The custom id of the component. */
  customID: string
  /** The type of component. */
  componentType: MessageComponentTypes
  /** The values from a selector component. */
  values?: string[]

  constructor(data: DiscordInteraction, client: Client) {
    super(data, client)

    this.channelID = data.channel_id!
    // this.data = data.data;
    this.guildID = data.guild_id
    // Required to make a component
    this.customID = data.data!.custom_id!
    this.componentType = data.data!.component_type!
    this.values = data.data!.values

    if (data.member !== undefined && this.guild) {
      this.member = new Member(data.member, this.guild, this.client)
      this.guild.members.set(this.member.id, this.member)
    }

    if (data.message !== undefined) {
      this.message = new Message(data.message, this.client)
    }

    this.user = new User(data.user ?? data.member!.user, this.client)
    this.client.users.set(this.user.id, this.user)

    if (data.app_permissions !== undefined) {
      this.appPermissions = new Permission(data.app_permissions)
    }
  }

  /** The channel if cached, where this interaction occurred. */
  get channel(): AnyChannel | undefined {
    return this.channelID ? this.client.getChannel(this.channelID) : undefined
  }

  /** The guild if cached, where this interaction occurred. */
  get guild(): Guild | undefined {
    return this.guildID ? this.client.guilds.get(this.guildID) : undefined
  }

  /** Acknowledges the interaction with a defer message update response */
  async acknowledge(): Promise<void> {
    return await this.deferUpdate()
  }

  /** Respond to the interaction with a followup message. */
  async createFollowup(content: WebhookPayload, file?: FileContent | FileContent[]): Promise<Message> {
    if (!this.acknowledged) {
      throw new Error(
        'createFollowup cannot be used to acknowledge an interaction, please use acknowledge, createMessage, defer, deferUpdate, or editParent first.',
      )
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

    if (file) {
      content.file = file
    }

    return await this.client.executeWebhook.call(this.client, this.applicationID, this.token, { ...content, wait: true })
  }

  /**
   * Acknowledges the interaction with a message. If already acknowledged runs createFollowup
   * Note: You can **not** use more than 1 initial interaction response per interaction, use createFollowup if you have already responded with a different interaction response.
   */
  async createMessage(content: InteractionApplicationCommandCallbackData, file?: FileContent | FileContent[]): Promise<Message | undefined> {
    if (this.acknowledged) {
      return await this.createFollowup(content, file)
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

    await this.client.createInteractionResponse
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
  async defer(flags: number): Promise<void> {
    if (this.acknowledged) {
      throw new Error('You have already acknowledged this interaction.')
    }

    return await this.client.createInteractionResponse
      .call(this.client, this.id, this.token, {
        type: InteractionResponseTypes.DeferredChannelMessageWithSource,
        data: {
          flags: flags || 0,
        },
      })
      .then(() => this.update())
  }

  /**
   * Acknowledges the interaction with a defer message update response
   * Note: You can **not** use more than 1 initial interaction response per interaction.
   */
  async deferUpdate(): Promise<void> {
    if (this.acknowledged) {
      throw new Error('You have already acknowledged this interaction.')
    }

    return await this.client.createInteractionResponse
      .call(this.client, this.id, this.token, {
        type: InteractionResponseTypes.DeferredUpdateMessage,
      })
      .then(() => this.update())
  }

  /** Delete a message */
  async deleteMessage(messageID: BigString): Promise<void> {
    if (!this.acknowledged) {
      throw new Error(
        'deleteMessage cannot be used to acknowledge an interaction, please use acknowledge, createMessage, defer, deferUpdate, or editParent first.',
      )
    }

    return await this.client.deleteWebhookMessage.call(this.client, this.applicationID, this.token, messageID)
  }

  /**
   * Delete the parent message
   * Warning: Will error with ephemeral messages.
   */
  async deleteOriginalMessage(): Promise<void> {
    if (!this.acknowledged) {
      throw new Error(
        'deleteOriginalMessage cannot be used to acknowledge an interaction, please use acknowledge, createMessage, defer, deferUpdate, or editParent first.',
      )
    }

    return await this.client.deleteWebhookMessage.call(this.client, this.applicationID, this.token, '@original')
  }

  /** Edit a message */
  async editMessage(messageID: BigString, content: MessageWebhookContent, file?: FileContent | FileContent[]): Promise<Message> {
    if (!this.acknowledged) {
      throw new Error(
        'editMessage cannot be used to acknowledge an interaction, please use acknowledge, createMessage, defer, deferUpdate, or editParent first.',
      )
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

    if (file) {
      content.file = file
    }

    return await this.client.editWebhookMessage.call(this.client, this.applicationID, this.token, messageID, content)
  }

  /** Edit the parent message */
  async editOriginalMessage(content: MessageWebhookContent, file?: FileContent | FileContent[]): Promise<Message> {
    if (!this.acknowledged) {
      throw new Error(
        'editOriginalMessage cannot be used to acknowledge an interaction, please use acknowledge, createMessage, defer, deferUpdate, or editParent first.',
      )
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

    if (file) {
      content.file = file
    }

    return await this.client.editWebhookMessage.call(this.client, this.applicationID, this.token, '@original', content)
  }

  /**
   * Acknowledges the interaction by editing the parent message. If already acknowledged runs editOriginalMessage
   * Note: You can **not** use more than 1 initial interaction response per interaction, use edit if you have already responded with a different interaction response.
   * Warning: Will error with ephemeral messages.
   */
  async editParent(content: InteractionApplicationCommandCallbackData, file?: FileContent | FileContent[]): Promise<Message | undefined> {
    if (this.acknowledged) {
      return this.editOriginalMessage(content)
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

    await this.client.createInteractionResponse
      .call(
        this.client,
        this.id,
        this.token,
        {
          type: InteractionResponseTypes.UpdateMessage,
          data: content,
        },
        file,
      )
      .then(() => this.update())
  }

  /**
   * Get the parent message
   * Warning: Will error with ephemeral messages.
   */
  async getOriginalMessage(): Promise<Message> {
    if (!this.acknowledged) {
      throw new Error(
        'getOriginalMessage cannot be used to acknowledge an interaction, please use acknowledge, createMessage, defer, deferUpdate, or editParent first.',
      )
    }

    return this.client.getWebhookMessage.call(this.client, this.applicationID, this.token, '@original')
  }
}

export default ComponentInteraction
