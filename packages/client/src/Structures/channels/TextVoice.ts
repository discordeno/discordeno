/* eslint-disable no-useless-call */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { DiscordChannel, GetMessagesOptions } from '@discordeno/types'
import type Client from '../../Client.js'
import Collection from '../../Collection.js'
import type {
  CreateInviteOptions,
  FileContent,
  GetMessageReactionOptions,
  MessageContent,
  MessageContentEdit,
  PurgeChannelOptions,
} from '../../typings.js'
import type Message from '../Message.js'
import VoiceChannel from './Voice.js'

/**
 * Represents a Text-in-Voice channel. See VoiceChannel for more properties and methods.
 * @extends VoiceChannel
 * @prop {String} lastMessageID The ID of the last message in this channel
 * @prop {Collection<Message>} messages Collection of Messages in this channel
 * @prop {Number} rateLimitPerUser The ratelimit of the channel, in seconds. 0 means no ratelimit is enabled
 */
export class TextVoiceChannel extends VoiceChannel {
  lastMessageID: string | null
  messages: Collection<string, Message>
  rateLimitPerUser: number | null

  constructor(data: DiscordChannel, client: Client, messageLimit?: number) {
    super(data, client)

    this.messages = new Collection()
    if (messageLimit == null) this.messages.limit = client.options.messageLimit
    else this.messages.limit = messageLimit

    this.lastMessageID = data.last_message_id ?? null
    this.rateLimitPerUser = data.rate_limit_per_user == null ? null : data.rate_limit_per_user
  }

  update(data: DiscordChannel) {
    super.update(data)
    // "not yet, possibly TBD"
    if (data.rate_limit_per_user !== undefined) {
      this.rateLimitPerUser = data.rate_limit_per_user
    }
  }

  /**
   * Add a reaction to a message
   * @arg {String} messageID The ID of the message
   * @arg {String} reaction The reaction (Unicode string if Unicode emoji, `emojiName:emojiID` if custom emoji)
   * @returns {Promise}
   */
  async addMessageReaction(messageID: string, reaction: string) {
    return await this.client.addMessageReaction.call(this.client, this.id, messageID, reaction)
  }

  /**
   * Create an invite for the channel
   * @arg {Object} [options] Invite generation options
   * @arg {Number} [options.maxAge] How long the invite should last in seconds
   * @arg {Number} [options.maxUses] How many uses the invite should last for
   * @arg {Boolean} [options.temporary] Whether the invite grants temporary membership or not
   * @arg {Boolean} [options.unique] Whether the invite is unique or not
   * @arg {String} [reason] The reason to be displayed in audit logs
   * @returns {Promise<Invite>}
   */
  async createInvite(options: CreateInviteOptions, reason: string) {
    return await this.client.createChannelInvite.call(this.client, this.id, options, reason)
  }

  /**
   * Create a message in the channel
   * Note: If you want to DM someone, the user ID is **not** the DM channel ID. use Client.getDMChannel() to get the DM channel ID for a user
   * @arg {String | Object} content A string or object. If an object is passed:
   * @arg {Object} [content.allowedMentions] A list of mentions to allow (overrides default)
   * @arg {Boolean} [content.allowedMentions.everyone] Whether or not to allow @everyone/@here.
   * @arg {Boolean | Array<String>} [content.allowedMentions.roles] Whether or not to allow all role mentions, or an array of specific role mentions to allow.
   * @arg {Boolean | Array<String>} [content.allowedMentions.users] Whether or not to allow all user mentions, or an array of specific user mentions to allow.
   * @arg {Boolean} [options.allowedMentions.repliedUser] Whether or not to mention the author of the message being replied to
   * @arg {Array<Object>} [content.components] An array of component objects
   * @arg {String} [content.components[].custom_id] The ID of the component (type 2 style 0-4 and type 3 only)
   * @arg {Boolean} [content.components[].disabled] Whether the component is disabled (type 2 and 3 only)
   * @arg {Object} [content.components[].emoji] The emoji to be displayed in the component (type 2)
   * @arg {String} [content.components[].label] The label to be displayed in the component (type 2)
   * @arg {Number} [content.components[].max_values] The maximum number of items that can be chosen (1-25, default 1)
   * @arg {Number} [content.components[].min_values] The minimum number of items that must be chosen (0-25, default 1)
   * @arg {Array<Object>} [content.components[].options] The options for this component (type 3 only)
   * @arg {Boolean} [content.components[].options[].default] Whether this option should be the default value selected
   * @arg {String} [content.components[].options[].description] The description for this option
   * @arg {Object} [content.components[].options[].emoji] The emoji to be displayed in this option
   * @arg {String} content.components[].options[].label The label for this option
   * @arg {Number | String} content.components[].options[].value The value for this option
   * @arg {String} [content.components[].placeholder] The placeholder text for the component when no option is selected (type 3 only)
   * @arg {Number} [content.components[].style] The style of the component (type 2 only) - If 0-4, `custom_id` is required; if 5, `url` is required
   * @arg {Number} content.components[].type The type of component - If 1, it is a collection and a `components` array (nested) is required; if 2, it is a button; if 3, it is a select menu
   * @arg {String} [content.components[].url] The URL that the component should open for users (type 2 style 5 only)
   * @arg {String} content.content A content string
   * @arg {Array<Object>} [content.embeds] An array of embed objects. See [the official Discord API documentation entry](https://discord.com/developers/docs/resources/channel#embed-object) for object structure
   * @arg {Object} [content.messageReference] The message reference, used when replying to messages
   * @arg {String} [content.messageReference.channelID] The channel ID of the referenced message
   * @arg {Boolean} [content.messageReference.failIfNotExists=true] Whether to throw an error if the message reference doesn't exist. If false, and the referenced message doesn't exist, the message is created without a referenced message
   * @arg {String} [content.messageReference.guildID] The guild ID of the referenced message
   * @arg {String} content.messageReference.messageID The message ID of the referenced message. This cannot reference a system message
   * @arg {Array<String>} [content.stickerIDs] An array of IDs corresponding to the stickers to send
   * @arg {Boolean} [content.tts] Set the message TTS flag
   * @arg {Object} [file] A file object
   * @arg {Buffer} file.file A buffer containing file data
   * @arg {String} file.name What to name the file
   * @returns {Promise<Message>}
   */
  async createMessage(content: MessageContent, file?: FileContent | FileContent[]) {
    return await this.client.createMessage.call(this.client, this.id, content, file)
  }

  /**
   * Delete a message
   * @arg {String} messageID The ID of the message
   * @arg {String} [reason] The reason to be displayed in audit logs
   * @returns {Promise}
   */
  async deleteMessage(messageID: string, reason: string) {
    return await this.client.deleteMessage.call(this.client, this.id, messageID, reason)
  }

  /**
   * Bulk delete messages (bot accounts only)
   * @arg {Array<String>} messageIDs Array of message IDs to delete
   * @arg {String} [reason] The reason to be displayed in audit logs
   * @returns {Promise}
   */
  async deleteMessages(messageIDs: string[], reason: string) {
    return await this.client.deleteMessages.call(this.client, this.id, messageIDs, reason)
  }

  /**
   * Edit a message
   * @arg {String} messageID The ID of the message
   * @arg {String | Array | Object} content A string, array of strings, or object. If an object is passed:
   * @arg {Object} [content.allowedMentions] A list of mentions to allow (overrides default)
   * @arg {Boolean} [content.allowedMentions.everyone] Whether or not to allow @everyone/@here.
   * @arg {Boolean | Array<String>} [content.allowedMentions.roles] Whether or not to allow all role mentions, or an array of specific role mentions to allow.
   * @arg {Boolean | Array<String>} [content.allowedMentions.users] Whether or not to allow all user mentions, or an array of specific user mentions to allow.
   * @arg {Array<Object>} [content.components] An array of component objects
   * @arg {String} [content.components[].custom_id] The ID of the component (type 2 style 0-4 and type 3 only)
   * @arg {Boolean} [content.components[].disabled] Whether the component is disabled (type 2 and 3 only)
   * @arg {Object} [content.components[].emoji] The emoji to be displayed in the component (type 2)
   * @arg {String} [content.components[].label] The label to be displayed in the component (type 2)
   * @arg {Number} [content.components[].max_values] The maximum number of items that can be chosen (1-25, default 1)
   * @arg {Number} [content.components[].min_values] The minimum number of items that must be chosen (0-25, default 1)
   * @arg {Array<Object>} [content.components[].options] The options for this component (type 3 only)
   * @arg {Boolean} [content.components[].options[].default] Whether this option should be the default value selected
   * @arg {String} [content.components[].options[].description] The description for this option
   * @arg {Object} [content.components[].options[].emoji] The emoji to be displayed in this option
   * @arg {String} content.components[].options[].label The label for this option
   * @arg {Number | String} content.components[].options[].value The value for this option
   * @arg {String} [content.components[].placeholder] The placeholder text for the component when no option is selected (type 3 only)
   * @arg {Number} [content.components[].style] The style of the component (type 2 only) - If 0-4, `custom_id` is required; if 5, `url` is required
   * @arg {Number} content.components[].type The type of component - If 1, it is a collection and a `components` array (nested) is required; if 2, it is a button; if 3, it is a select menu
   * @arg {String} [content.components[].url] The URL that the component should open for users (type 2 style 5 only)
   * @arg {String} content.content A content string
   * @arg {Boolean} [content.disableEveryone] Whether to filter @everyone/@here or not (overrides default)
   * @arg {Array<Object>} [content.embeds] An array of embed objects. See [the official Discord API documentation entry](https://discord.com/developers/docs/resources/channel#embed-object) for object structure
   * @arg {Number} [content.flags] A number representing the flags to apply to the message. See [the official Discord API documentation entry](https://discord.com/developers/docs/resources/channel#message-object-message-flags) for flags reference
   * @returns {Promise<Message>}
   */
  async editMessage(messageID: string, content: MessageContentEdit) {
    return await this.client.editMessage.call(this.client, this.id, messageID, content)
  }

  /**
   * Get all invites in the channel
   * @returns {Promise<Array<Invite>>}
   */
  async getInvites() {
    return await this.client.getChannelInvites.call(this.client, this.id)
  }

  /**
   * Get a previous message in the channel
   * @arg {String} messageID The ID of the message
   * @returns {Promise<Message>}
   */
  async getMessage(messageID: string) {
    return await this.client.getMessage.call(this.client, this.id, messageID)
  }

  /**
   * Get a list of users who reacted with a specific reaction
   * @arg {String} messageID The ID of the message
   * @arg {String} reaction The reaction (Unicode string if Unicode emoji, `emojiName:emojiID` if custom emoji)
   * @arg {Object} [options] Options for the request. If this is a number, it is treated as `options.limit` ([DEPRECATED] behavior)
   * @arg {Number} [options.limit=100] The maximum number of users to get
   * @arg {String} [options.after] Get users after this user ID
   * @returns {Promise<Array<User>>}
   */
  async getMessageReaction(messageID: string, reaction: string, options: GetMessageReactionOptions) {
    return await this.client.getMessageReaction.call(this.client, this.id, messageID, reaction, options)
  }

  /**
   * Get previous messages in the channel
   * @arg {Object} [options] Options for the request. If this is a number ([DEPRECATED] behavior), it is treated as `options.limit`
   * @arg {String} [options.after] Get messages after this message ID
   * @arg {String} [options.around] Get messages around this message ID (does not work with limit > 100)
   * @arg {String} [options.before] Get messages before this message ID
   * @arg {Number} [options.limit=50] The max number of messages to get
   * @returns {Promise<Array<Message>>}
   */
  async getMessages(options: GetMessagesOptions) {
    return await this.client.getMessages.call(this.client, this.id, options)
  }

  /**
   * Purge previous messages in the channel with an optional filter (bot accounts only)
   * @arg {Object} options Options for the request. If this is a number ([DEPRECATED] behavior), it is treated as `options.limit`
   * @arg {String} [options.after] Get messages after this message ID
   * @arg {String} [options.before] Get messages before this message ID
   * @arg {Function} [options.filter] Optional filter function that returns a boolean when passed a Message object
   * @arg {Number} options.limit The max number of messages to search through, -1 for no limit
   * @arg {String} [options.reason] The reason to be displayed in audit logs
   * @returns {Promise<Number>} Resolves with the number of messages deleted
   */
  async purge(options: PurgeChannelOptions) {
    return await this.client.purgeChannel.call(this.client, this.id, options)
  }

  /**
   * Remove a reaction from a message
   * @arg {String} messageID The ID of the message
   * @arg {String} reaction The reaction (Unicode string if Unicode emoji, `emojiName:emojiID` if custom emoji)
   * @arg {String} [userID="@me"] The ID of the user to remove the reaction for
   * @returns {Promise}
   */
  async removeMessageReaction(messageID: string, reaction: string, userID: string) {
    return await this.client.removeMessageReaction.call(this.client, this.id, messageID, reaction, userID)
  }

  /**
   * Remove all reactions from a message for a single emoji
   * @arg {String} messageID The ID of the message
   * @arg {String} reaction The reaction (Unicode string if Unicode emoji, `emojiName:emojiID` if custom emoji)
   * @returns {Promise}
   */
  async removeMessageReactionEmoji(messageID: string, reaction: string) {
    return await this.client.removeMessageReactionEmoji.call(this.client, this.id, messageID, reaction)
  }

  /**
   * Remove all reactions from a message
   * @arg {String} messageID The ID of the message
   * @returns {Promise}
   */
  async removeMessageReactions(messageID: string) {
    return await this.client.removeMessageReactions.call(this.client, this.id, messageID)
  }

  /**
   * Send typing status in the channel
   * @returns {Promise}
   */
  async sendTyping() {
    return await this.client.sendChannelTyping.call(this.client, this.id)
  }

  toJSON(props: string[] = []): Record<string, any> {
    return super.toJSON(['lastMessageID', 'messages', 'rateLimitPerUser', ...props])
  }
}

export default TextVoiceChannel
