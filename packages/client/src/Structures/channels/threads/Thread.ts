/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-useless-call */
import type { BigString, DiscordChannel, GetMessagesOptions } from '@discordeno/types'
import type Client from '../../../Client.js'
import Collection from '../../../Collection.js'
import type { FileContent, GetMessageReactionOptions, MessageContent, MessageContentEdit, PurgeChannelOptions } from '../../../typings.js'
import type Message from '../../Message.js'
import type User from '../../users/User.js'
import GuildChannel from '../Guild.js'
import ThreadMember from './Member.js'

export class ThreadChannel extends GuildChannel {
  /** The cached messages that were sent in this channel. */
  messages: Collection<BigString, Message>
  /** The cached thread members that are in this channel. */
  members: Collection<BigString, ThreadMember>
  /** The id of the last message in this channel. */
  lastMessageID: BigString | null
  /** The id of the user who created this thread. */
  ownerID: BigString
  /** The approximate amount of members that have joined this thread. */
  memberCount?: number
  /** The approximate amount of messages in this channel. */
  messageCount?: number
  /** The rate limit that users can send messages in this channel. 0 means no rate limit has been enabled. */
  rateLimitPerUser?: number
  /** The data relevant to this thread. */
  threadMetadata?: {
    /** Timestamp when the thread's archive status was last changed, used for calculating recent activity */
    archiveTimestamp: number
    /** Whether the thread is archived. */
    archived: boolean
    /** Duration in minutes to automatically archive the thread after recent activity, either 60, 1440, 4320 or 10080 */
    autoArchiveDuration: number
    /** Whether the thread is locked. */
    locked: boolean
    /** Whether or not the thread is inviteable. */
    invitable?: boolean
  }

  /** The bot's thread member object if it has joined the thread. */
  member?: ThreadMember

  constructor(data: DiscordChannel, client: Client, messageLimit?: number) {
    super(data, client)

    this.members = new Collection()
    this.messages = new Collection()

    this.messages.limit = messageLimit ?? client.options.messageLimit
    this.lastMessageID = data.last_message_id ?? null
    this.ownerID = data.owner_id!

    this.update(data)
  }

  update(data: DiscordChannel): void {
    super.update(data)

    if (data.member_count !== undefined) {
      this.memberCount = data.member_count
    }
    if (data.message_count !== undefined) {
      this.messageCount = data.message_count
    }
    if (data.rate_limit_per_user !== undefined) {
      this.rateLimitPerUser = data.rate_limit_per_user
    }
    if (data.thread_metadata !== undefined) {
      this.threadMetadata = {
        archiveTimestamp: Date.parse(data.thread_metadata.archive_timestamp),
        archived: data.thread_metadata.archived,
        autoArchiveDuration: data.thread_metadata.auto_archive_duration,
        locked: data.thread_metadata.locked,
      }
    }
    if (data.member !== undefined) {
      this.member = new ThreadMember(data.member, this.client)
    }
  }

  async addMessageReaction(messageID: BigString, reaction: string): Promise<void> {
    return await this.client.addMessageReaction.call(this.client, this.id, messageID, reaction)
  }

  async createMessage(content: MessageContent, file?: FileContent | FileContent[]) {
    return await this.client.createMessage.call(this.client, this.id, content, file)
  }

  async deleteMessage(messageID: BigString, reason?: string): Promise<void> {
    return await this.client.deleteMessage.call(this.client, this.id, messageID, reason)
  }

  async deleteMessages(messageIDs: BigString[], reason?: string): Promise<void> {
    return await this.client.deleteMessages.call(this.client, this.id, messageIDs, reason)
  }

  async editMessage(messageID: BigString, content: MessageContentEdit) {
    return await this.client.editMessage.call(this.client, this.id, messageID, content)
  }

  async getMembers(): Promise<ThreadMember[]> {
    return await this.client.getThreadMembers.call(this.client, this.id)
  }

  async getMessage(messageID: BigString): Promise<Message> {
    return await this.client.getMessage.call(this.client, this.id, messageID)
  }

  async getMessageReaction(messageID: BigString, reaction: string, options?: GetMessageReactionOptions): Promise<User[]> {
    return await this.client.getMessageReaction.call(this.client, this.id, messageID, reaction, options)
  }

  async getMessages(options: GetMessagesOptions) {
    return await this.client.getMessages.call(this.client, this.id, options)
  }

  async getPins(): Promise<Message[]> {
    return await this.client.getPins.call(this.client, this.id)
  }

  async join(userID: BigString = '@me'): Promise<void> {
    return await this.client.joinThread.call(this.client, this.id, userID)
  }

  async leave(userID: BigString): Promise<void> {
    return await this.client.leaveThread.call(this.client, this.id, userID)
  }

  async pinMessage(messageID: BigString): Promise<void> {
    return await this.client.pinMessage.call(this.client, this.id, messageID)
  }

  async purge(options: PurgeChannelOptions): Promise<number> {
    return await this.client.purgeChannel.call(this.client, this.id, options)
  }

  async removeMessageReaction(messageID: BigString, reaction: string, userID: BigString = '@me') {
    return await this.client.removeMessageReaction.call(this.client, this.id, messageID, reaction, userID)
  }

  async removeMessageReactionEmoji(messageID: BigString, reaction: string): Promise<void> {
    return await this.client.removeMessageReactionEmoji.call(this.client, this.id, messageID, reaction)
  }

  async removeMessageReactions(messageID: BigString): Promise<void> {
    return await this.client.removeMessageReactions.call(this.client, this.id, messageID)
  }

  async sendTyping(): Promise<void> {
    return await this.client.sendChannelTyping.call(this.client, this.id)
  }

  async unpinMessage(messageID: BigString): Promise<void> {
    return await this.client.unpinMessage.call(this.client, this.id, messageID)
  }

  /**
   * @deprecated Use deleteMessage instead
   */
  async unsendMessage(messageID: BigString): Promise<void> {
    return await this.client.deleteMessage.call(this.client, this.id, messageID)
  }

  toJSON(props: string[] = []): Record<string, any> {
    return super.toJSON([
      'lastMessageID',
      'memberCount',
      'messageCount',
      'messages',
      'ownerID',
      'rateLimitPerUser',
      'threadMetadata',
      'member',
      ...props,
    ])
  }
}

export default ThreadChannel
