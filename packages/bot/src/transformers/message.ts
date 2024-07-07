import {
  DiscordApplicationIntegrationType,
  type DiscordMessage,
  type DiscordMessageCall,
  type DiscordMessageInteractionMetadata,
} from '@discordeno/types'
import { CHANNEL_MENTION_REGEX } from '../constants.js'
import { snowflakeToTimestamp, type Bot, type Message, type MessageBase, type MessageCall, type MessageInteractionMetadata } from '../index.js'
import { MessageFlags } from '../typings.js'
import { ToggleBitfield } from './toggles/ToggleBitfield.js'

const EMPTY_STRING = ''

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
  if (props.poll && payload.poll) message.poll = bot.transformers.poll(bot, payload.poll)
  if (props.call && payload.call) message.call = bot.transformers.messageCall(bot, payload.call)

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
  if (props.user && payload.user) metadata.user = bot.transformers.user(bot, payload.user)

  return bot.transformers.customizers.messageInteractionMetadata(bot, payload, metadata)
}

export function transformMessageCall(bot: Bot, payload: DiscordMessageCall): MessageCall {
  const call = {} as MessageCall
  const props = bot.transformers.desiredProperties.message.call

  if (props.participants && payload.participants) call.participants = payload.participants.map((x) => bot.transformers.snowflake(x))
  if (props.endedTimestamp && payload.ended_timestamp) call.endedTimestamp = Date.parse(payload.ended_timestamp)

  return bot.transformers.customizers.messageCall(bot, payload, call)
}
