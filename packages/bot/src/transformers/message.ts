import {
  type DiscordApplication,
  DiscordApplicationIntegrationType,
  type DiscordMessage,
  type DiscordMessageCall,
  type DiscordMessageInteractionMetadata,
  type DiscordMessageSnapshot,
  MessageFlags,
} from '@discordeno/types'
import { CHANNEL_MENTION_REGEX } from '../constants.js'
import {
  type InternalBot,
  type Message,
  type MessageCall,
  type MessageInteractionMetadata,
  type MessageSnapshot,
  snowflakeToTimestamp,
} from '../index.js'
import { ToggleBitfield } from './toggles/ToggleBitfield.js'

const EMPTY_STRING = ''

export const baseMessage: InternalBot['transformers']['$inferredTypes']['message'] = {
  // This allows typescript to still check for type errors on functions below
  ...(undefined as unknown as InternalBot['transformers']['$inferredTypes']['message']),

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

export function transformMessage(
  bot: InternalBot,
  payload: { message: DiscordMessage; shardId: number },
): typeof bot.transformers.$inferredTypes.message {
  const guildId = payload.message.guild_id ? bot.transformers.snowflake(payload.message.guild_id) : undefined
  const userId = payload.message.author?.id ? bot.transformers.snowflake(payload.message.author.id) : undefined

  const message: Message = Object.create(baseMessage)
  message.bitfield = new ToggleBitfield()
  message.flags = new ToggleBitfield(payload.message.flags)

  const props = bot.transformers.desiredProperties.message

  if (props.author && payload.message.author) message.author = bot.transformers.user(bot, payload.message.author)
  if (props.application && payload.message.application)
    message.application = bot.transformers.application(bot, {
      application: payload.message.application as DiscordApplication,
      shardId: payload.shardId,
    })
  if (props.applicationId && payload.message.application_id) message.applicationId = bot.transformers.snowflake(payload.message.application_id)
  if (props.attachments && payload.message.attachments?.length)
    message.attachments = payload.message.attachments.map((attachment) => bot.transformers.attachment(bot, attachment))
  if (props.channelId && payload.message.channel_id) message.channelId = bot.transformers.snowflake(payload.message.channel_id)
  if (props.components && payload.message.components?.length)
    message.components = payload.message.components.map((comp) => bot.transformers.component(bot, comp))
  if (props.content) message.content = payload.message.content ?? EMPTY_STRING
  if (props.editedTimestamp && payload.message.edited_timestamp) message.editedTimestamp = Date.parse(payload.message.edited_timestamp)
  if (props.embeds && payload.message.embeds?.length) message.embeds = payload.message.embeds.map((embed) => bot.transformers.embed(bot, embed))
  if (props.guildId && guildId) message.guildId = guildId
  if (props.id && payload.message.id) message.id = bot.transformers.snowflake(payload.message.id)
  if (props.interactionMetadata && payload.message.interaction_metadata)
    message.interactionMetadata = bot.transformers.messageInteractionMetadata(bot, payload.message.interaction_metadata)
  if (props.interaction && payload.message.interaction) {
    const interaction = {} as NonNullable<Message['interaction']>
    const messageInteractionProps = bot.transformers.desiredProperties.messageInteraction

    if (messageInteractionProps.id) {
      interaction.id = bot.transformers.snowflake(payload.message.interaction.id)
    }
    if (messageInteractionProps.member && payload.message.interaction.member) {
      // @ts-expect-error TODO: partial - check why this is partial and handle as needed
      interaction.member = bot.transformers.member(bot, payload.message.interaction.member, guildId, payload.message.interaction.user.id)
    }
    if (messageInteractionProps.name) {
      interaction.name = payload.message.interaction.name
    }
    if (messageInteractionProps.type) {
      interaction.type = payload.message.interaction.type
    }
    if (messageInteractionProps.user) {
      interaction.user = bot.transformers.user(bot, payload.message.interaction.user)
    }

    message.interaction = interaction
  }
  if (props.member && guildId && userId && payload.message.member)
    message.member = bot.transformers.member(bot, payload.message.member, guildId, userId)
  if (payload.message.mention_everyone) message.mentionEveryone = true
  if (props.mentionedChannelIds && payload.message.mention_channels?.length) {
    message.mentionedChannelIds = [
      // Keep any ids tht discord sends
      ...(payload.message.mention_channels ?? []).map((m) => bot.transformers.snowflake(m.id)),
      // Add any other ids that can be validated in a channel mention format
      ...(payload.message.content?.match(CHANNEL_MENTION_REGEX) ?? []).map((text) =>
        // converts the <#123> into 123
        bot.transformers.snowflake(text.substring(2, text.length - 1)),
      ),
    ]
  }
  if (props.mentionedRoleIds && payload.message.mention_roles?.length)
    message.mentionedRoleIds = payload.message.mention_roles.map((id) => bot.transformers.snowflake(id))
  if (props.mentions && payload.message.mentions?.length) message.mentions = payload.message.mentions.map((user) => bot.transformers.user(bot, user))
  if (props.messageReference && payload.message.message_reference) {
    const reference = {} as NonNullable<Message['messageReference']>
    const messageReferenceProps = bot.transformers.desiredProperties.messageReference

    if (messageReferenceProps.channelId && payload.message.message_reference.channel_id) {
      reference.channelId = bot.transformers.snowflake(payload.message.message_reference.channel_id)
    }
    if (messageReferenceProps.guildId && payload.message.message_reference.guild_id) {
      reference.guildId = bot.transformers.snowflake(payload.message.message_reference.guild_id)
    }
    if (messageReferenceProps.messageId && payload.message.message_reference.message_id) {
      reference.messageId = bot.transformers.snowflake(payload.message.message_reference.message_id)
    }

    message.messageReference = reference
  }
  if (props.referencedMessage && payload.message.referenced_message)
    message.referencedMessage = bot.transformers.message(bot, { message: payload.message.referenced_message, shardId: payload.shardId })
  if (props.messageSnapshots && payload.message.message_snapshots)
    message.messageSnapshots = payload.message.message_snapshots.map((snap) =>
      bot.transformers.messageSnapshot(bot, { messageSnapshot: snap, shardId: payload.shardId }),
    )
  if (props.nonce && payload.message.nonce) message.nonce = payload.message.nonce
  if (payload.message.pinned) message.pinned = true
  if (props.reactions && payload.message.reactions?.length) {
    message.reactions = payload.message.reactions.map((reaction) => ({
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
  if (props.stickerItems && payload.message.sticker_items?.length)
    message.stickerItems = payload.message.sticker_items.map((item) => ({
      id: bot.transformers.snowflake(item.id),
      name: item.name,
      formatType: item.format_type,
    }))
  if (payload.message.tts) message.tts = true
  if (props.thread && payload.message.thread) message.thread = bot.transformers.channel(bot, { channel: payload.message.thread, guildId })
  if (props.type) message.type = payload.message.type
  if (props.webhookId && payload.message.webhook_id) message.webhookId = bot.transformers.snowflake(payload.message.webhook_id)
  if (props.poll && payload.message.poll) message.poll = bot.transformers.poll(bot, payload.message.poll)
  if (props.call && payload.message.call) message.call = bot.transformers.messageCall(bot, payload.message.call)

  return bot.transformers.customizers.message(bot, payload.message, message)
}

export function transformMessageSnapshot(
  bot: InternalBot,
  payload: { messageSnapshot: DiscordMessageSnapshot; shardId: number },
): typeof bot.transformers.$inferredTypes.messageSnapshot {
  const props = bot.transformers.desiredProperties.messageSnapshot
  const messageSnapshot = {} as MessageSnapshot

  if (props.message && payload.messageSnapshot.message)
    messageSnapshot.message = bot.transformers.message(bot, { message: payload.messageSnapshot.message as DiscordMessage, shardId: payload.shardId })

  return bot.transformers.customizers.messageSnapshot(bot, payload.messageSnapshot, messageSnapshot)
}

export function transformMessageInteractionMetadata(
  bot: InternalBot,
  payload: DiscordMessageInteractionMetadata,
): typeof bot.transformers.$inferredTypes.messageInteractionMetadata {
  const props = bot.transformers.desiredProperties.messageInteractionMetadata
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
  if (props.originalResponseMessageId && payload.original_response_message_id)
    metadata.originalResponseMessageId = bot.transformers.snowflake(payload.original_response_message_id)
  if (props.type) metadata.type = payload.type
  if (props.user && payload.user) metadata.user = bot.transformers.user(bot, payload.user)
  // Application command metadata
  if ('target_user' in payload) {
    if (props.targetUser && payload.target_user) metadata.targetUser = bot.transformers.user(bot, payload.target_user)
    if (props.targetMessageId && payload.target_message_id) metadata.targetMessageId = bot.transformers.snowflake(payload.target_message_id)
  }
  // Message component metadata
  if ('interacted_message_id' in payload) {
    if (props.interactedMessageId && payload.interacted_message_id)
      metadata.interactedMessageId = bot.transformers.snowflake(payload.interacted_message_id)
  }
  // Modal submit metadata
  if ('triggering_interaction_metadata' in payload) {
    if (props.triggeringInteractionMetadata && payload.triggering_interaction_metadata)
      metadata.triggeringInteractionMetadata = bot.transformers.messageInteractionMetadata(bot, payload.triggering_interaction_metadata)
  }

  return bot.transformers.customizers.messageInteractionMetadata(bot, payload, metadata)
}

export function transformMessageCall(bot: InternalBot, payload: DiscordMessageCall): typeof bot.transformers.$inferredTypes.messageCall {
  const call = {} as MessageCall
  const props = bot.transformers.desiredProperties.messageCall

  if (props.participants && payload.participants) call.participants = payload.participants.map((x) => bot.transformers.snowflake(x))
  if (props.endedTimestamp && payload.ended_timestamp) call.endedTimestamp = Date.parse(payload.ended_timestamp)

  return bot.transformers.customizers.messageCall(bot, payload, call)
}
