import {
  DiscordApplicationIntegrationType,
  type DiscordMessage,
  type DiscordMessageInteractionMetadata,
  type InteractionTypes,
  type MessageActivityTypes,
  type MessageTypes,
  type StickerFormatTypes,
} from '@discordeno/types'
import { CHANNEL_MENTION_REGEX } from '../constants.js'
import { snowflakeToTimestamp, type Bot } from '../index.js'
import { MessageFlags } from '../typings.js'
import type { Attachment } from './attachment.js'
import type { Channel } from './channel.js'
import type { Component } from './component.js'
import type { Embed } from './embed.js'
import type { Emoji } from './emoji.js'
import type { Member } from './member.js'
import { ToggleBitfield } from './toggles/ToggleBitfield.js'
import type { User } from './user.js'

const baseMessage: Partial<Message> & MessageBase = {
  get crossposted() {
    return this.flags?.contains(MessageFlags.Crossposted) ?? false
  },
  set crossposted(value: boolean) {
    if (!this.flags) return
    if (value) this.flags.add(MessageFlags.Crossposted)
    else this.flags.remove(MessageFlags.Crossposted)
  },
  get ephemeral() {
    return this.flags?.contains(MessageFlags.Ephemeral) ?? false
  },
  set ephemeral(value: boolean) {
    if (!this.flags) return
    if (value) this.flags.add(MessageFlags.Ephemeral)
    else this.flags.remove(MessageFlags.Ephemeral)
  },
  get failedToMentionSomeRolesInThread() {
    return this.flags?.contains(MessageFlags.FailedToMentionSomeRolesInThread) ?? false
  },
  set failedToMentionSomeRolesInThread(value: boolean) {
    if (!this.flags) return
    if (value) this.flags.add(MessageFlags.FailedToMentionSomeRolesInThread)
    else this.flags.remove(MessageFlags.FailedToMentionSomeRolesInThread)
  },
  get hasThread() {
    return this.flags?.contains(MessageFlags.HasThread) ?? false
  },
  set hasThread(value: boolean) {
    if (!this.flags) return
    if (value) this.flags.add(MessageFlags.HasThread)
    else this.flags.remove(MessageFlags.HasThread)
  },
  get isCrosspost() {
    return this.flags?.contains(MessageFlags.IsCrosspost) ?? false
  },
  set isCrosspost(value: boolean) {
    if (!this.flags) return
    if (value) this.flags.add(MessageFlags.IsCrosspost)
    else this.flags.remove(MessageFlags.IsCrosspost)
  },
  get loading() {
    return this.flags?.contains(MessageFlags.Loading) ?? false
  },
  set loading(value: boolean) {
    if (!this.flags) return
    if (value) this.flags.add(MessageFlags.Loading)
    else this.flags.remove(MessageFlags.Loading)
  },
  get mentionedUserIds() {
    return this.mentions?.map((user) => user.id) ?? []
  },
  get mentionEveryone() {
    return this.bitfield?.contains(2) ?? false
  },
  set mentionEveryone(value: boolean) {
    if (!this.bitfield) return
    if (value) this.bitfield.add(2)
    else this.bitfield.remove(2)
  },
  get pinned() {
    return this.bitfield?.contains(3) ?? false
  },
  set pinned(value: boolean) {
    if (!this.bitfield) return
    if (value) this.bitfield.add(3)
    else this.bitfield.remove(3)
  },
  get sourceMessageDeleted() {
    return this.flags?.contains(MessageFlags.SourceMessageDeleted) ?? false
  },
  set sourceMessageDeleted(value: boolean) {
    if (!this.flags) return
    if (value) this.flags.add(MessageFlags.SourceMessageDeleted)
    else this.flags.remove(MessageFlags.SourceMessageDeleted)
  },
  get suppressEmbeds() {
    return this.flags?.contains(MessageFlags.SuppressEmbeds) ?? false
  },
  set suppressEmbeds(value: boolean) {
    if (!this.flags) return
    if (value) this.flags.add(MessageFlags.SuppressEmbeds)
    else this.flags.remove(MessageFlags.SuppressEmbeds)
  },
  get suppressNotifications() {
    return this.flags?.contains(MessageFlags.SuppressNotifications) ?? false
  },
  set suppressNotifications(value: boolean) {
    if (!this.flags) return
    if (value) this.flags.add(MessageFlags.SuppressNotifications)
    else this.flags.remove(MessageFlags.SuppressNotifications)
  },
  get timestamp() {
    return this.id ? snowflakeToTimestamp(this.id) : 0
  },
  get tts() {
    return this.bitfield?.contains(1) ?? false
  },
  set tts(value: boolean) {
    if (!this.bitfield) return
    if (value) this.bitfield.add(1)
    else this.bitfield.remove(1)
  },
  get urgent() {
    return this.flags?.contains(MessageFlags.Urgent) ?? false
  },
  set urgent(value: boolean) {
    if (!this.flags) return
    if (value) this.flags.add(MessageFlags.Urgent)
    else this.flags.remove(MessageFlags.Urgent)
  },
}

export interface MessageBase {
  /** Holds all the boolean values on this message. */
  bitfield?: ToggleBitfield
  /** Whether this message has been published to subscribed channels (via Channel Following) */
  crossposted: boolean
  /** Whether this message is only visible to the user who invoked the Interaction */
  ephemeral: boolean
  /** Whether this message failed to mention some roles and add their members to the thread */
  failedToMentionSomeRolesInThread: boolean
  /** Message flags combined as a bitfield */
  flags?: ToggleBitfield
  /** Whether this message has an associated thread, with the same id as the message */
  hasThread: boolean
  /** Whether this message originated from a message in another channel (via Channel Following) */
  isCrosspost: boolean
  /** Whether this message is an Interaction Response and the bot is "thinking" */
  loading: boolean
  /** The ids of the users who were mentioned in this message. */
  mentionedUserIds: bigint[]
  /** Whether this message mentions everyone */
  mentionEveryone: boolean
  /** Whether this message is pinned */
  pinned: boolean
  /** Whether the source message for this crosspost has been deleted (via Channel Following) */
  sourceMessageDeleted: boolean
  /** Whether do not include any embeds when serializing this message */
  suppressEmbeds: boolean
  /** Whether this message will not trigger push and desktop notifications */
  suppressNotifications: boolean
  /** The timestamp in milliseconds when this message was created */
  timestamp: number
  /** Whether this was a TTS message. */
  tts: boolean
  /** Whether this message came from the urgent message system */
  urgent: boolean
}

export interface Message extends MessageBase {
  /** Sent with Rich Presence-related chat embeds */
  activity?: {
    /** Type of message activity */
    type: MessageActivityTypes
    /** party_id from a Rich Presence event */
    partyId?: string
  }
  /** if the message is an Interaction or application-owned webhook, this is the id of the application */
  applicationId?: bigint
  /** Any attached files on this message. */
  attachments?: Attachment[]
  /** The author of this message (not guaranteed to be a valid user) Note: The author object follows the structure of the user object, but is only a valid user in the case where the message is generated by a user or bot user. If the message is generated by a webhook, the author object corresponds to the webhook's id, username, and avatar. You can tell if a message is generated by a webhook by checking for the webhook_id on the message object. */
  author: User
  /** id of the channel the message was sent in */
  channelId: bigint
  /** The components related to this message */
  components: Component[]
  /** Contents of the message */
  content: string
  /** The timestamp in milliseconds when this message was edited last. */
  editedTimestamp?: number
  /** Any embedded content */
  embeds?: Embed[]
  /** id of the guild the message was sent in Note: For MESSAGE_CREATE and MESSAGE_UPDATE events, the message object may not contain a guild_id or member field since the events are sent directly to the receiving user and the bot who sent the message, rather than being sent through the guild like non-ephemeral messages. */
  guildId?: bigint
  /** id of the message */
  id: bigint
  /** sent if the message is sent as a result of an interaction */
  interactionMetadata?: MessageInteractionMetadata
  /**
   * Sent if the message is a response to an Interaction
   *
   * @deprecated Deprecated in favor of {@link interactionMetadata}
   */
  interaction?: {
    /** Id of the interaction */
    id: bigint
    /** The member who invoked the interaction in the guild  */
    member?: Member
    /** The name of the ApplicationCommand including the name of the subcommand/subcommand group */
    name: string
    /** The type of interaction */
    type: InteractionTypes
    /** The user who invoked the interaction */
    user: User
  }
  /** Member properties for this message's author Note: The member object exists in MESSAGE_CREATE and MESSAGE_UPDATE events from text-based guild channels. This allows bots to obtain real-time member data without requiring bots to store member state in memory. */
  member?: Member
  /** Users specifically mentioned in the message Note: The user objects in the mentions array will only have the partial member field present in MESSAGE_CREATE and MESSAGE_UPDATE events from text-based guild channels. */
  mentions?: User[]
  /** Channels specifically mentioned in this message Note: Not all channel mentions in a message will appear in mention_channels. Only textual channels that are visible to everyone in a discoverable guild will ever be included. Only crossposted messages (via Channel Following) currently include mention_channels at all. If no mentions in the message meet these requirements, this field will not be sent. */
  mentionedChannelIds?: bigint[]
  /** Roles specifically mentioned in this message */
  mentionedRoleIds?: bigint[]
  /** Data showing the source of a crossposted channel follow add, pin or reply message */
  messageReference?: {
    /** id of the originating message's channel Note: channel_id is optional when creating a reply, but will always be present when receiving an event/response that includes this data model. */
    channelId?: bigint
    /** id of the originating message's guild */
    guildId?: bigint
    /** id of the originating message */
    messageId?: bigint
  }
  /** Used for validating a message was sent */
  nonce?: string | number
  /** Reactions on this message. */
  reactions?: Array<{
    /** Whether the current user reacted using this emoji */
    me: boolean
    /**	Whether the current user super-reacted using this emoji */
    meBurst: boolean
    /** Times this emoji has been used to react */
    count: number
    /**	Reaction count details object */
    countDetails: {
      /** Count of super reactions */
      burst: number
      /**	Count of normal reactions */
      normal: number
    }
    /** Emoji information */
    emoji: Emoji
    /** HEX colors used for super reaction */
    burstColors: string[]
  }>
  /** Sent if the message contains stickers */
  stickerItems?: Array<{
    /** The id of this sticker. */
    id: bigint
    /** The name of this sticker. */
    name: string
    /** The type of this stickers format. */
    formatType: StickerFormatTypes
  }>
  /** Type of message */
  type: MessageTypes
  /** The thread that was started from this message, includes thread member object  */
  thread?: Channel
  /** If the message is generated by a webhook, this is the webhook's id */
  webhookId?: bigint
}

const EMPTY_STRING = ''

export function transformMessage(bot: Bot, payload: DiscordMessage): Message {
  const guildId = payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined
  const userId = bot.transformers.snowflake(payload.author.id)

  const message: Message = Object.create(baseMessage)
  message.bitfield = new ToggleBitfield()
  message.flags = new ToggleBitfield(payload.flags)

  const props = bot.transformers.desiredProperties.message

  if (props.author && payload.author) message.author = bot.transformers.user(bot, payload.author)
  if (props.applicationId && payload.application_id) message.applicationId = bot.transformers.snowflake(payload.application_id)
  if (props.attachments && payload.attachments?.length)
    message.attachments = payload.attachments.map((attachment) => bot.transformers.attachment(bot, attachment))
  if (props.channelId && payload.channel_id) message.channelId = bot.transformers.snowflake(payload.channel_id)
  if (props.components && payload.components?.length) message.components = payload.components.map((comp) => bot.transformers.component(bot, comp))
  if (props.content && payload.content) message.content = payload.content ?? EMPTY_STRING
  if (props.editedTimestamp && payload.edited_timestamp) message.editedTimestamp = Date.parse(payload.edited_timestamp)
  if (props.embeds && payload.embeds?.length) message.embeds = payload.embeds.map((embed) => bot.transformers.embed(bot, embed))
  if (props.guildId && guildId) message.guildId = guildId
  if (props.id && payload.id) message.id = bot.transformers.snowflake(payload.id)
  if (payload.interaction_metadata) message.interactionMetadata = transformMessageInteractionMetadata(bot, payload.interaction_metadata)
  if (payload.interaction) {
    const interaction = {} as NonNullable<Message['interaction']>
    let edited = false
    if (props.interaction.id) {
      interaction.id = bot.transformers.snowflake(payload.interaction.id)
      edited = true
    }
    if (props.interaction.member && payload.interaction.member) {
      // @ts-expect-error TODO: partial - check why this is partial and handle as needed
      interaction.member = bot.transformers.member(bot, payload.interaction.member, guildId, payload.interaction.user.id)
      edited = true
    }
    if (props.interaction.name) {
      interaction.name = payload.interaction.name
      edited = true
    }
    if (props.interaction.type) {
      interaction.type = payload.interaction.type
      edited = true
    }
    if (props.interaction.user) {
      interaction.user = bot.transformers.user(bot, payload.interaction.user)
      edited = true
    }

    if (edited) message.interaction = interaction
  }
  if (props.member && guildId && payload.member) message.member = bot.transformers.member(bot, payload.member, guildId, userId)
  if (payload.mention_everyone) message.mentionEveryone = true
  if (props.mentionedChannelIds && payload.mention_channels?.length) {
    message.mentionedChannelIds = [
      // Keep any ids tht discord sends
      ...(payload.mention_channels ?? []).map((m) => bot.transformers.snowflake(m.id)),
      // Add any other ids that can be validated in a channel mention format
      ...(payload.content?.match(CHANNEL_MENTION_REGEX) ?? []).map((text) =>
        // converts the <#123> into 123
        bot.transformers.snowflake(text.substring(2, text.length - 1)),
      ),
    ]
  }
  if (props.mentionedRoleIds && payload.mention_roles?.length)
    message.mentionedRoleIds = payload.mention_roles.map((id) => bot.transformers.snowflake(id))
  if (props.mentions && payload.mentions?.length) message.mentions = payload.mentions.map((user) => bot.transformers.user(bot, user))
  if (payload.message_reference) {
    const reference = {} as NonNullable<Message['messageReference']>
    let edited = false

    if (props.messageReference.channelId && payload.message_reference.channel_id) {
      reference.channelId = bot.transformers.snowflake(payload.message_reference.channel_id)
      edited = true
    }
    if (props.messageReference.guildId && payload.message_reference.guild_id) {
      reference.guildId = bot.transformers.snowflake(payload.message_reference.guild_id)
      edited = true
    }
    if (props.messageReference.messageId && payload.message_reference.message_id) {
      reference.messageId = bot.transformers.snowflake(payload.message_reference.message_id)
      edited = true
    }

    if (edited) message.messageReference = reference
  }
  if (props.nonce && payload.nonce) message.nonce = payload.nonce
  if (payload.pinned) message.pinned = true
  if (props.reactions && payload.reactions?.length) {
    message.reactions = payload.reactions.map((reaction) => ({
      me: reaction.me,
      meBurst: reaction.me_burst,
      count: reaction.count,
      countDetails: {
        burst: reaction.count_details.burst,
        normal: reaction.count_details.normal,
      },
      emoji: bot.transformers.emoji(bot, reaction.emoji),
      burstColors: reaction.burst_colors,
    }))
  }
  if (props.stickerItems && payload.sticker_items?.length)
    message.stickerItems = payload.sticker_items.map((item) => ({
      id: bot.transformers.snowflake(item.id),
      name: item.name,
      formatType: item.format_type,
    }))
  if (payload.tts) message.tts = true
  if (props.thread && payload.thread) message.thread = bot.transformers.channel(bot, { channel: payload.thread, guildId })
  if (props.type) message.type = payload.type
  if (props.webhookId && payload.webhook_id) message.webhookId = bot.transformers.snowflake(payload.webhook_id)

  return bot.transformers.customizers.message(bot, payload, message)
}

export function transformMessageInteractionMetadata(bot: Bot, payload: DiscordMessageInteractionMetadata): MessageInteractionMetadata {
  const props = bot.transformers.desiredProperties.message.interactionMetadata
  const metadata = {} as MessageInteractionMetadata

  if (props.id) metadata.id = bot.transformers.snowflake(payload.id)
  if (props.authorizingIntegrationOwners) {
    metadata.authorizingIntegrationOwners = {}
    if (payload.authorizing_integration_owners['0'])
      metadata.authorizingIntegrationOwners[DiscordApplicationIntegrationType.GuildInstall] = bot.transformers.snowflake(
        payload.authorizing_integration_owners['0'],
      )
    if (payload.authorizing_integration_owners['1'])
      metadata.authorizingIntegrationOwners[DiscordApplicationIntegrationType.UserInstall] = bot.transformers.snowflake(
        payload.authorizing_integration_owners['1'],
      )
  }
  if (props.interactedMessageId && payload.interacted_message_id)
    metadata.interactedMessageId = bot.transformers.snowflake(payload.interacted_message_id)
  if (props.originalResponseMessageId && payload.original_response_message_id)
    metadata.originalResponseMessageId = bot.transformers.snowflake(payload.original_response_message_id)
  if (props.triggeringInteractionMetadata && payload.triggering_interaction_metadata)
    metadata.triggeringInteractionMetadata = transformMessageInteractionMetadata(bot, payload.triggering_interaction_metadata)
  if (props.type) metadata.type = payload.type
  if (props.userId) metadata.userId = bot.transformers.snowflake(payload.user_id)

  return bot.transformers.customizers.messageInteractionMetadata(bot, payload, metadata)
}

export interface MessageInteractionMetadata {
  /** Id of the interaction */
  id: bigint
  /** The type of interaction */
  type: InteractionTypes
  /** ID of the user who triggered the interaction */
  userId: bigint
  /** IDs for installation context(s) related to an interaction */
  authorizingIntegrationOwners: Partial<Record<DiscordApplicationIntegrationType, bigint>>
  /** ID of the original response message, present only on follow-up messages */
  originalResponseMessageId?: bigint
  /** ID of the message that contained interactive component, present only on messages created from component interactions */
  interactedMessageId?: bigint
  /** Metadata for the interaction that was used to open the modal, present only on modal submit interactions */
  triggeringInteractionMetadata?: MessageInteractionMetadata
}
