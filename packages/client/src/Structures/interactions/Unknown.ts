/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-useless-call */

import type { DiscordInteraction } from '@discordeno/types'
import { InteractionResponseTypes } from '@discordeno/types'
import type Client from '../../Client.js'
import type {
  ApplicationCommandOptionChoice,
  FileContent,
  InteractionContent,
  InteractionContentEdit,
  InteractionResponse,
  PossiblyUncachedTextable,
  TextableChannel,
} from '../../typings.js'
import Member from '../guilds/Member.js'
import Message from '../Message.js'
import Permission from '../Permission.js'
import User from '../users/User.js'
import Interaction from './Interaction.js'

export class UnknownInteraction<T extends PossiblyUncachedTextable = TextableChannel> extends Interaction {
  channel?: T
  data?: unknown
  guildID?: string
  member?: Member
  message?: Message
  type: number = 0
  user?: User
  appPermissions?: Permission

  constructor(data: DiscordInteraction, client: Client) {
    super(data, client)

    if (data.channel_id !== undefined) {
      this.channel = (this.client.getChannel(data.channel_id) as unknown as T) || {
        id: data.channel_id,
      }
    }

    if (data.data !== undefined) {
      this.data = data.data
    }

    if (data.guild_id !== undefined) {
      this.guildID = data.guild_id
    }

    if (data.member !== undefined) {
      const guild = this.client.guilds.get(data.guild_id ?? '')!
      this.member = new Member(data.member, guild, this.client)
      guild.members.set(this.member.id, this.member)
    }

    if (data.message !== undefined) {
      this.message = new Message(data.message, this.client)
    }

    if (data.user !== undefined) {
      this.user = new User(data.user, this.client)
      this.client.users.set(this.user.id, this.user)
    }

    if (data.app_permissions !== undefined) {
      this.appPermissions = new Permission(data.app_permissions)
    }
  }

  /**
   * Acknowledges the autocomplete interaction with a result of choices.
   * Note: You can **not** use more than 1 initial interaction response per interaction.
   * @arg {Object} data The data object
   * @arg {Number} data.type The type of [interaction response](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type) to send
   * @arg {Object} data.data The data to return to discord
   * @returns {Promise}
   */
  async acknowledge(data: InteractionResponse) {
    if (this.acknowledged) {
      throw new Error('You have already acknowledged this interaction.')
    }
    return await this.client.createInteractionResponse.call(this.client, this.id, this.token, data).then(() => this.update())
  }

  /**
   * Respond to the interaction with a followup message
   * @arg {String | Object} content A string or object. If an object is passed:
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
   * @arg {String} [content.content] A content string
   * @arg {Object} [content.embed] An embed object. See [the official Discord API documentation entry](https://discord.com/developers/docs/resources/channel#embed-object) for object structure
   * @arg {Array<Object>} [options.embeds] An array of embed objects. See [the official Discord API documentation entry](https://discord.com/developers/docs/resources/channel#embed-object) for object structure
   * @arg {Number} [content.flags] 64 for Ephemeral
   * @arg {Boolean} [content.tts] Set the message TTS flag
   * @arg {Object | Array<Object>} [file] A file object (or an Array of them)
   * @arg {Buffer} file.file A buffer containing file data
   * @arg {String} file.name What to name the file
   * @returns {Promise<Message?>}
   */
  async createFollowup(content: string | InteractionContent, file?: FileContent | FileContent[]) {
    if (!this.acknowledged) {
      throw new Error(
        'createFollowup cannot be used to acknowledge an interaction, please use acknowledge, createMessage, defer, deferUpdate, editParent, pong, or result first.',
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
    return await this.client.executeWebhook.call(this.client, this.applicationID, this.token, Object.assign({ wait: true as true }, content))
  }

  /**
   * Acknowledges the interaction with a message. If already acknowledged runs createFollowup
   * Note: You can **not** use more than 1 initial interaction response per interaction, use createFollowup if you have already responded with a different interaction response.
   * @arg {String | Object} content A string or object. If an object is passed:
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
   * @arg {String} [content.content] A content string
   * @arg {Object} [content.embed] An embed object. See [the official Discord API documentation entry](https://discord.com/developers/docs/resources/channel#embed-object) for object structure
   * @arg {Array<Object>} [content.embeds] An array of embed objects. See [the official Discord API documentation entry](https://discord.com/developers/docs/resources/channel#embed-object) for object structure
   * @arg {Boolean} [content.flags] 64 for Ephemeral
   * @arg {Boolean} [content.tts] Set the message TTS flag
   * @arg {Object | Array<Object>} [file] A file object (or an Array of them)
   * @arg {Buffer} file.file A buffer containing file data
   * @arg {String} file.name What to name the file
   * @returns {Promise}
   */
  async createMessage(content: string | InteractionContent, file?: FileContent | FileContent[]) {
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

    return await this.client.createInteractionResponse
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
   * @arg {Number} [flags] 64 for Ephemeral
   * @returns {Promise}
   */
  async defer(flags: number) {
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
   * Acknowledges the interaction with a defer message update response (Message Component only)
   * Note: You can **not** use more than 1 initial interaction response per interaction.
   * @returns {Promise}
   */
  async deferUpdate() {
    if (this.acknowledged) {
      throw new Error('You have already acknowledged this interaction.')
    }
    return await this.client.createInteractionResponse
      .call(this.client, this.id, this.token, {
        type: InteractionResponseTypes.DeferredUpdateMessage,
      })
      .then(() => this.update())
  }

  /**
   * Delete a message
   * @arg {String} messageID the id of the message to delete, or "@original" for the original response.
   * @returns {Promise}
   */
  async deleteMessage(messageID: string) {
    if (!this.acknowledged) {
      throw new Error(
        'deleteMessage cannot be used to acknowledge an interaction, please use acknowledge, createMessage, defer, deferUpdate, editParent, or pong first.',
      )
    }
    return await this.client.deleteWebhookMessage.call(this.client, this.applicationID, this.token, messageID)
  }

  /**
   * Delete the Original message (or the parent message for components)
   * Warning: Will error with ephemeral messages.
   * @returns {Promise}
   */
  async deleteOriginalMessage() {
    if (!this.acknowledged) {
      throw new Error(
        'deleteOriginalMessage cannot be used to acknowledge an interaction, please use acknowledge, createMessage, defer, deferUpdate, editParent, or pong first.',
      )
    }
    return await this.client.deleteWebhookMessage.call(this.client, this.applicationID, this.token, '@original')
  }

  /**
   * Edit a message
   * @arg {String} messageID the id of the message to edit, or "@original" for the original response.
   * @arg {Object} content Interaction message edit options
   * @arg {Object} [content.allowedMentions] A list of mentions to allow (overrides default)
   * @arg {Boolean} [content.allowedMentions.everyone] Whether or not to allow @everyone/@here.
   * @arg {Boolean} [content.allowedMentions.repliedUser] Whether or not to mention the author of the message being replied to.
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
   * @arg {String} [content.content] A content string
   * @arg {Object} [content.embed] An embed object. See [the official Discord API documentation entry](https://discord.com/developers/docs/resources/channel#embed-object) for object structure
   * @arg {Array<Object>} [content.embeds] An array of embed objects. See [the official Discord API documentation entry](https://discord.com/developers/docs/resources/channel#embed-object) for object structure
   * @arg {Object | Array<Object>} [file] A file object (or an Array of them)
   * @arg {Buffer} file.file A buffer containing file data
   * @arg {String} file.name What to name the file
   * @returns {Promise<Message>}
   */
  async editMessage(messageID: string, content: string | InteractionContentEdit, file?: FileContent | FileContent[]) {
    if (!this.acknowledged) {
      throw new Error(
        'editMessage cannot be used to acknowledge an interaction, please use acknowledge, createMessage, defer, deferUpdate, editParent, pong, or result first.',
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

  /**
   * Edit the Original response message
   * @arg {Object} content Interaction message edit options (or the parent message for components)
   * @arg {Object} [content.allowedMentions] A list of mentions to allow (overrides default)
   * @arg {Boolean} [content.allowedMentions.everyone] Whether or not to allow @everyone/@here.
   * @arg {Boolean} [content.allowedMentions.repliedUser] Whether or not to mention the author of the message being replied to.
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
   * @arg {String} [content.content] A content string
   * @arg {Object} [content.embed] An embed object. See [the official Discord API documentation entry](https://discord.com/developers/docs/resources/channel#embed-object) for object structure
   * @arg {Array<Object>} [content.embeds] An array of embed objects. See [the official Discord API documentation entry](https://discord.com/developers/docs/resources/channel#embed-object) for object structure
   * @arg {Object | Array<Object>} [file] A file object (or an Array of them)
   * @arg {Buffer} file.file A buffer containing file data
   * @arg {String} file.name What to name the file
   * @returns {Promise<Message>}
   */
  async editOriginalMessage(content: string | InteractionContentEdit, file?: FileContent | FileContent[]) {
    if (!this.acknowledged) {
      throw new Error(
        'editOriginalMessage cannot be used to acknowledge an interaction, please use acknowledge, createMessage, defer, deferUpdate, editParent, pong, or result first.',
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
   * Acknowledges the interaction by editing the parent message. If already acknowledged runs editOriginalMessage (Message Component only)
   * Note: You can **not** use more than 1 initial interaction response per interaction, use edit if you have already responded with a different interaction response.
   * Warning: Will error with ephemeral messages.
   * @arg {String | Object} content What to edit the message with
   * @arg {Object} [content.allowedMentions] A list of mentions to allow (overrides default)
   * @arg {Boolean} [content.allowedMentions.everyone] Whether or not to allow @everyone/@here.
   * @arg {Boolean} [content.allowedMentions.repliedUser] Whether or not to mention the author of the message being replied to.
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
   * @arg {String} [content.content] A content string
   * @arg {Object} [content.embed] An embed object. See [the official Discord API documentation entry](https://discord.com/developers/docs/resources/channel#embed-object) for object structure
   * @arg {Array<Object>} [content.embeds] An array of embed objects. See [the official Discord API documentation entry](https://discord.com/developers/docs/resources/channel#embed-object) for object structure
   * @arg {Boolean} [content.flags] 64 for Ephemeral
   * @arg {Boolean} [content.tts] Set the message TTS flag
   * @arg {Object | Array<Object>} [file] A file object (or an Array of them)
   * @arg {Buffer} file.file A buffer containing file data
   * @arg {String} file.name What to name the file
   * @returns {Promise}
   */
  async editParent(content: InteractionContentEdit, file?: FileContent | FileContent[]) {
    if (this.acknowledged) {
      return await this.editOriginalMessage(content)
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

    return await this.client.createInteractionResponse
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
   * Get the Original response message (or the parent message for components)
   * Warning: Will error with ephemeral messages.
   * @returns {Promise<Message>}
   */
  async getOriginalMessage() {
    if (!this.acknowledged) {
      throw new Error(
        'getOriginalMessage cannot be used to acknowledge an interaction, please use acknowledge, createMessage, defer, deferUpdate, editParent, or pong first.',
      )
    }
    return await this.client.getWebhookMessage.call(this.client, this.applicationID, this.token, '@original')
  }

  /**
   * Acknowledges the ping interaction with a pong response (Ping Only)
   * Note: You can **not** use more than 1 initial interaction response per interaction.
   * @returns {Promise}
   */
  async pong() {
    if (this.acknowledged) {
      throw new Error('You have already acknowledged this interaction.')
    }
    return await this.client.createInteractionResponse
      .call(this.client, this.id, this.token, {
        type: InteractionResponseTypes.Pong,
      })
      .then(() => this.update())
  }

  /**
   * Acknowledges the autocomplete interaction with a result of choices.
   * Note: You can **not** use more than 1 initial interaction response per interaction.
   * @arg {Array<Object>} choices The autocomplete choices to return to the user
   * @arg {String | Number} choices[].name The choice display name
   * @arg {String} choices[].value The choice value to return to the bot
   * @returns {Promise}
   */
  async result(choices: ApplicationCommandOptionChoice[]) {
    if (this.acknowledged) {
      throw new Error('You have already acknowledged this interaction.')
    }
    return await this.client.createInteractionResponse
      .call(this.client, this.id, this.token, {
        type: InteractionResponseTypes.ApplicationCommandAutocompleteResult,
        data: { choices },
      })
      .then(() => this.update())
  }
}

export default UnknownInteraction
