import type {
  AllowedMentions,
  BigString,
  CreateApplicationCommand,
  DiscordActivity,
  DiscordAllowedMentions,
  DiscordApplication,
  DiscordApplicationCommand,
  DiscordApplicationCommandOption,
  DiscordApplicationCommandOptionChoice,
  DiscordAttachment,
  DiscordAuditLogEntry,
  DiscordAutoModerationActionExecution,
  DiscordAutoModerationRule,
  DiscordAvatarDecorationData,
  DiscordChannel,
  DiscordCreateApplicationCommand,
  DiscordDefaultReactionEmoji,
  DiscordEmbed,
  DiscordEmoji,
  DiscordEntitlement,
  DiscordForumTag,
  DiscordGetGatewayBot,
  DiscordGuild,
  DiscordGuildApplicationCommandPermissions,
  DiscordGuildOnboarding,
  DiscordGuildWidget,
  DiscordGuildWidgetSettings,
  DiscordIntegrationCreateUpdate,
  DiscordInteraction,
  DiscordInteractionDataOption,
  DiscordInviteCreate,
  DiscordInviteMetadata,
  DiscordInviteStageInstance,
  DiscordMember,
  DiscordMessage,
  DiscordMessageCall,
  DiscordMessageInteractionMetadata,
  DiscordPoll,
  DiscordPollMedia,
  DiscordPresenceUpdate,
  DiscordRole,
  DiscordScheduledEvent,
  DiscordSku,
  DiscordStageInstance,
  DiscordSticker,
  DiscordStickerPack,
  DiscordTeam,
  DiscordTemplate,
  DiscordThreadMember,
  DiscordUser,
  DiscordVoiceRegion,
  DiscordVoiceState,
  DiscordWebhook,
  DiscordWelcomeScreen,
} from '@discordeno/types'
import { logger } from '@discordeno/utils'
import { type Bot, bigintToSnowflake, snowflakeToBigint } from './index.js'
import { type Activity, transformActivity } from './transformers/activity.js'
import { type Application, transformApplication } from './transformers/application.js'
import { type ApplicationCommand, transformApplicationCommand } from './transformers/applicationCommand.js'
import { type ApplicationCommandOption, transformApplicationCommandOption } from './transformers/applicationCommandOption.js'
import { type ApplicationCommandOptionChoice, transformApplicationCommandOptionChoice } from './transformers/applicationCommandOptionChoice.js'
import { type ApplicationCommandPermission, transformApplicationCommandPermission } from './transformers/applicationCommandPermission.js'
import { type Attachment, transformAttachment } from './transformers/attachment.js'
import { type AuditLogEntry, transformAuditLogEntry } from './transformers/auditLogEntry.js'
import { type AutoModerationActionExecution, transformAutoModerationActionExecution } from './transformers/automodActionExecution.js'
import { type AutoModerationRule, transformAutoModerationRule } from './transformers/automodRule.js'
import { type Channel, type ForumTag, transformChannel, transformForumTag } from './transformers/channel.js'
import { type Component, transformComponent } from './transformers/component.js'
import { type Embed, transformEmbed } from './transformers/embed.js'
import { type DefaultReactionEmoji, type Emoji, transformDefaultReactionEmoji, transformEmoji } from './transformers/emoji.js'
import { type Entitlement, transformEntitlement } from './transformers/entitlement.js'
import { type GetGatewayBot, transformGatewayBot } from './transformers/gatewayBot.js'
import { type Guild, transformGuild } from './transformers/guild.js'
import {
  type AvatarDecorationData,
  transformActivityToDiscordActivity,
  transformApplicationCommandOptionChoiceToDiscordApplicationCommandOptionChoice,
  transformApplicationCommandOptionToDiscordApplicationCommandOption,
  transformApplicationCommandToDiscordApplicationCommand,
  transformApplicationToDiscordApplication,
  transformAttachmentToDiscordAttachment,
  transformAvatarDecorationData,
  transformComponentToDiscordComponent,
  transformEmbedToDiscordEmbed,
  transformMemberToDiscordMember,
  transformTeamToDiscordTeam,
  transformUserToDiscordUser,
} from './transformers/index.js'
import { type Integration, transformIntegration } from './transformers/integration.js'
import { type Interaction, type InteractionDataOption, transformInteraction, transformInteractionDataOption } from './transformers/interaction.js'
import { type Invite, transformInvite } from './transformers/invite.js'
import { type Member, transformMember } from './transformers/member.js'
import {
  type Message,
  type MessageCall,
  type MessageInteractionMetadata,
  transformMessage,
  transformMessageCall,
  transformMessageInteractionMetadata,
} from './transformers/message.js'
import { type GuildOnboarding, transformGuildOnboarding } from './transformers/onboarding.js'
import { type Poll, type PollMedia, transformPoll, transformPollMedia } from './transformers/poll.js'
import { type PresenceUpdate, transformPresence } from './transformers/presence.js'
import { transformAllowedMentionsToDiscordAllowedMentions } from './transformers/reverse/allowedMentions.js'
import { transformCreateApplicationCommandToDiscordCreateApplicationCommand } from './transformers/reverse/createApplicationCommand.js'
import { transformInteractionResponseToDiscordInteractionResponse } from './transformers/reverse/interactionResponse.js'
import { type Role, transformRole } from './transformers/role.js'
import { type ScheduledEvent, transformScheduledEvent } from './transformers/scheduledEvent.js'
import { type Sku, transformSku } from './transformers/sku.js'
import { type StageInstance, transformStageInstance } from './transformers/stageInstance.js'
import { type InviteStageInstance, transformInviteStageInstance } from './transformers/stageInviteInstance.js'
import { type Sticker, type StickerPack, transformSticker, transformStickerPack } from './transformers/sticker.js'
import { type Team, transformTeam } from './transformers/team.js'
import { type Template, transformTemplate } from './transformers/template.js'
import {
  type ThreadMember,
  type ThreadMemberGuildCreate,
  transformThreadMember,
  transformThreadMemberGuildCreate,
} from './transformers/threadMember.js'
import { type User, transformUser } from './transformers/user.js'
import { type VoiceRegion, transformVoiceRegion } from './transformers/voiceRegion.js'
import { type VoiceState, transformVoiceState } from './transformers/voiceState.js'
import { type Webhook, transformWebhook } from './transformers/webhook.js'
import { type WelcomeScreen, transformWelcomeScreen } from './transformers/welcomeScreen.js'
import { type GuildWidget, transformWidget } from './transformers/widget.js'
import { type GuildWidgetSettings, transformWidgetSettings } from './transformers/widgetSettings.js'
import type { BotInteractionResponse, DiscordComponent, DiscordInteractionResponse, DiscordThreadMemberGuildCreate } from './typings.js'

export interface Transformers {
  customizers: {
    channel: (bot: Bot, payload: DiscordChannel, channel: Channel) => any
    forumTag: (bot: Bot, payload: DiscordForumTag, forumTag: ForumTag) => any
    interaction: (bot: Bot, payload: { interaction: DiscordInteraction; shardId: number }, interaction: Interaction) => any
    message: (bot: Bot, payload: DiscordMessage, message: Message) => any
    messageInteractionMetadata: (bot: Bot, payload: DiscordMessageInteractionMetadata, metadata: MessageInteractionMetadata) => any
    messageCall: (bot: Bot, payload: DiscordMessageCall, call: MessageCall) => any
    user: (bot: Bot, payload: DiscordUser, user: User) => any
    member: (bot: Bot, payload: DiscordMember, member: Member) => any
    role: (bot: Bot, payload: DiscordRole, role: Role) => any
    automodRule: (bot: Bot, payload: DiscordAutoModerationRule, automodRule: AutoModerationRule) => any
    automodActionExecution: (bot: Bot, payload: DiscordAutoModerationActionExecution, automodActionExecution: AutoModerationActionExecution) => any
    guild: (bot: Bot, payload: DiscordGuild, guild: Guild) => any
    voiceState: (bot: Bot, payload: DiscordVoiceState, voiceState: VoiceState) => any
    interactionDataOptions: (bot: Bot, payload: DiscordInteractionDataOption, interactionDataOptions: InteractionDataOption) => any
    integration: (bot: Bot, payload: DiscordIntegrationCreateUpdate, integration: Integration) => any
    invite: (bot: Bot, payload: DiscordInviteCreate | DiscordInviteMetadata, invite: Invite) => any
    application: (bot: Bot, payload: DiscordApplication, application: Application) => any
    team: (bot: Bot, payload: DiscordTeam, team: Team) => any
    emoji: (bot: Bot, payload: DiscordEmoji, emoji: Emoji) => any
    defaultReactionEmoji: (bot: Bot, payload: DiscordDefaultReactionEmoji, defaultReactionEmoji: DefaultReactionEmoji) => any
    activity: (bot: Bot, payload: DiscordActivity, activity: Activity) => any
    presence: (bot: Bot, payload: DiscordPresenceUpdate, presence: PresenceUpdate) => any
    attachment: (bot: Bot, payload: DiscordAttachment, attachment: Attachment) => any
    embed: (bot: Bot, payload: DiscordEmbed, embed: Embed) => any
    component: (bot: Bot, payload: DiscordComponent, component: Component) => any
    webhook: (bot: Bot, payload: DiscordWebhook, webhook: Webhook) => any
    auditLogEntry: (bot: Bot, payload: DiscordAuditLogEntry, auditLogEntry: AuditLogEntry) => any
    applicationCommand: (bot: Bot, payload: DiscordApplicationCommand, applicationCommand: ApplicationCommand) => any
    applicationCommandOption: (bot: Bot, payload: DiscordApplicationCommandOption, applicationCommandOption: ApplicationCommandOption) => any
    applicationCommandPermission: (
      bot: Bot,
      payload: DiscordGuildApplicationCommandPermissions,
      applicationCommandPermission: ApplicationCommandPermission,
    ) => any
    scheduledEvent: (bot: Bot, payload: DiscordScheduledEvent, scheduledEvent: ScheduledEvent) => any
    threadMember: (bot: Bot, payload: DiscordThreadMember, threadMember: ThreadMember) => any
    threadMemberGuildCreate: (bot: Bot, payload: DiscordThreadMemberGuildCreate, threadMemberGuildCreate: ThreadMemberGuildCreate) => any
    welcomeScreen: (bot: Bot, payload: DiscordWelcomeScreen, welcomeScreen: WelcomeScreen) => any
    voiceRegion: (bot: Bot, payload: DiscordVoiceRegion, voiceRegion: VoiceRegion) => any
    gatewayBot: (bot: Bot, payload: DiscordGetGatewayBot, getGatewayBot: GetGatewayBot) => any
    widget: (bot: Bot, payload: DiscordGuildWidget, widget: GuildWidget) => any
    widgetSettings: (bot: Bot, payload: DiscordGuildWidgetSettings, widgetSettings: GuildWidgetSettings) => any
    stageInstance: (bot: Bot, payload: DiscordStageInstance, stageInstance: StageInstance) => any
    inviteStageInstance: (bot: Bot, payload: DiscordInviteStageInstance, inviteStageInstance: InviteStageInstance) => any
    sticker: (bot: Bot, payload: DiscordSticker, sticker: Sticker) => any
    stickerPack: (bot: Bot, payload: DiscordStickerPack, stickerPack: StickerPack) => any
    applicationCommandOptionChoice: (
      bot: Bot,
      payload: DiscordApplicationCommandOptionChoice,
      applicationCommandOptionChoice: ApplicationCommandOptionChoice,
    ) => any
    template: (bot: Bot, payload: DiscordTemplate, template: Template) => any
    guildOnboarding: (bot: Bot, payload: DiscordGuildOnboarding, onboarding: GuildOnboarding) => any
    entitlement: (bot: Bot, payload: DiscordEntitlement, entitlement: Entitlement) => any
    sku: (bot: Bot, payload: DiscordSku, sku: Sku) => any
    poll: (bot: Bot, payload: DiscordPoll, poll: Poll) => any
    pollMedia: (bot: Bot, payload: DiscordPollMedia, pollMedia: PollMedia) => any
    avatarDecorationData: (bot: Bot, payload: DiscordAvatarDecorationData, avatarDecorationData: AvatarDecorationData) => any
  }
  desiredProperties: {
    attachment: {
      id: boolean
      filename: boolean
      title: boolean
      contentType: boolean
      size: boolean
      url: boolean
      proxyUrl: boolean
      height: boolean
      width: boolean
      ephemeral: boolean
      description: boolean
      duration_secs: boolean
      waveform: boolean
      flags: boolean
    }
    channel: {
      type: boolean
      position: boolean
      name: boolean
      topic: boolean
      nsfw: boolean
      bitrate: boolean
      userLimit: boolean
      rateLimitPerUser: boolean
      rtcRegion: boolean
      videoQualityMode: boolean
      guildId: boolean
      lastPinTimestamp: boolean
      permissionOverwrites: boolean
      id: boolean
      permissions: boolean
      lastMessageId: boolean
      ownerId: boolean
      applicationId: boolean
      managed: boolean
      parentId: boolean
      memberCount: boolean
      messageCount: boolean
      archiveTimestamp: boolean
      defaultAutoArchiveDuration: boolean
      autoArchiveDuration: boolean
      botIsMember: boolean
      archived: boolean
      locked: boolean
      invitable: boolean
      createTimestamp: boolean
      newlyCreated: boolean
      flags: boolean
      recipients: boolean
      icon: boolean
      member: boolean
      totalMessageSent: boolean
      availableTags: boolean
      appliedTags: boolean
      defaultReactionEmoji: boolean
      defaultThreadRateLimitPerUser: boolean
      defaultSortOrder: boolean
      defaultForumLayout: boolean
    }
    forumTag: {
      id: boolean
      name: boolean
      moderated: boolean
      emojiId: boolean
      emojiName: boolean
    }
    emoji: {
      id: boolean
      name: boolean
      roles: boolean
      user: boolean
    }
    defaultReactionEmoji: {
      emojiId: boolean
      emojiName: boolean
    }
    guild: {
      afkTimeout: boolean
      approximateMemberCount: boolean
      approximatePresenceCount: boolean
      defaultMessageNotifications: boolean
      description: boolean
      explicitContentFilter: boolean
      maxMembers: boolean
      maxPresences: boolean
      maxVideoChannelUsers: boolean
      mfaLevel: boolean
      name: boolean
      nsfwLevel: boolean
      preferredLocale: boolean
      premiumSubscriptionCount: boolean
      premiumTier: boolean
      toggles: boolean
      stageInstances: boolean
      channels: boolean
      members: boolean
      roles: boolean
      emojis: boolean
      stickers: boolean
      threads: boolean
      voiceStates: boolean
      large: boolean
      owner: boolean
      widgetEnabled: boolean
      unavailable: boolean
      iconHash: boolean
      presences: boolean
      systemChannelFlags: boolean
      vanityUrlCode: boolean
      verificationLevel: boolean
      welcomeScreen: boolean
      discoverySplash: boolean
      joinedAt: boolean
      memberCount: boolean
      shardId: boolean
      icon: boolean
      banner: boolean
      splash: boolean
      id: boolean
      ownerId: boolean
      permissions: boolean
      afkChannelId: boolean
      widgetChannelId: boolean
      applicationId: boolean
      systemChannelId: boolean
      rulesChannelId: boolean
      publicUpdatesChannelId: boolean
      premiumProgressBarEnabled: boolean
      safetyAlertsChannelId: boolean
    }
    interaction: {
      id: boolean
      applicationId: boolean
      type: boolean
      guild: boolean
      guildId: boolean
      channel: boolean
      channelId: boolean
      member: boolean
      user: boolean
      token: boolean
      version: boolean
      message: boolean
      data: boolean
      locale: boolean
      guildLocale: boolean
      appPermissions: boolean
      authorizingIntegrationOwners: boolean
      context: boolean
    }
    invite: {
      type: boolean
      channelId: boolean
      code: boolean
      createdAt: boolean
      guildId: boolean
      inviter: boolean
      maxAge: boolean
      maxUses: boolean
      targetType: boolean
      targetUser: boolean
      targetApplication: boolean
      temporary: boolean
      uses: boolean
      approximateMemberCount: boolean
      approximatePresenceCount: boolean
      guildScheduledEvent: boolean
      stageInstance: boolean
      expiresAt: boolean
    }
    member: {
      id: boolean
      guildId: boolean
      user: boolean
      nick: boolean
      roles: boolean
      joinedAt: boolean
      premiumSince: boolean
      avatar: boolean
      permissions: boolean
      communicationDisabledUntil: boolean
      deaf: boolean
      mute: boolean
      pending: boolean
      avatarDecorationData: boolean
    }
    message: {
      activity: boolean
      application: boolean
      applicationId: boolean
      attachments: boolean
      author: boolean
      channelId: boolean
      components: boolean
      content: boolean
      editedTimestamp: boolean
      embeds: boolean
      guildId: boolean
      id: boolean
      interactionMetadata: {
        id: boolean
        type: boolean
        user: boolean
        authorizingIntegrationOwners: boolean
        originalResponseMessageId: boolean
        interactedMessageId: boolean
        triggeringInteractionMetadata: boolean
      }
      interaction: {
        id: boolean
        member: boolean
        name: boolean
        user: boolean
        type: boolean
      }
      member: boolean
      mentionedChannelIds: boolean
      mentionedRoleIds: boolean
      mentions: boolean
      messageReference: {
        messageId: boolean
        channelId: boolean
        guildId: boolean
      }
      nonce: boolean
      reactions: boolean
      stickerItems: boolean
      thread: boolean
      type: boolean
      webhookId: boolean
      poll: boolean
      call: {
        participants: boolean
        endedTimestamp: boolean
      }
    }
    role: {
      name: boolean
      guildId: boolean
      position: boolean
      color: boolean
      id: boolean
      botId: boolean
      integrationId: boolean
      permissions: boolean
      icon: boolean
      unicodeEmoji: boolean
      mentionable: boolean
      hoist: boolean
      managed: boolean
      subscriptionListingId: boolean
      flags: boolean
    }
    scheduledEvent: {
      id: boolean
      guildId: boolean
      channelId: boolean
      creatorId: boolean
      scheduledStartTime: boolean
      scheduledEndTime: boolean
      entityId: boolean
      creator: boolean
      name: boolean
      description: boolean
      privacyLevel: boolean
      status: boolean
      entityType: boolean
      userCount: boolean
      location: boolean
      image: boolean
    }
    stageInstance: {
      id: boolean
      guildId: boolean
      channelId: boolean
      topic: boolean
      guildScheduledEventId: boolean
    }
    inviteStageInstance: {
      members: boolean
      participantCount: boolean
      speakerCount: boolean
      topic: boolean
    }
    sticker: {
      id: boolean
      packId: boolean
      name: boolean
      description: boolean
      tags: boolean
      type: boolean
      formatType: boolean
      available: boolean
      guildId: boolean
      user: boolean
      sortValue: boolean
    }
    user: {
      username: boolean
      globalName: boolean
      locale: boolean
      flags: boolean
      premiumType: boolean
      publicFlags: boolean
      accentColor: boolean
      id: boolean
      discriminator: boolean
      avatar: boolean
      bot: boolean
      system: boolean
      mfaEnabled: boolean
      verified: boolean
      email: boolean
      banner: boolean
      avatarDecorationData: boolean
    }
    avatarDecorationData: {
      asset: boolean
      skuId: boolean
    }
    webhook: {
      id: boolean
      type: boolean
      guildId: boolean
      channelId: boolean
      user: boolean
      name: boolean
      avatar: boolean
      token: boolean
      applicationId: boolean
      sourceGuild: boolean
      sourceChannel: boolean
      url: boolean
    }
    guildOnboarding: {
      guildId: boolean
      prompts: {
        id: boolean
        type: boolean
        options: {
          id: boolean
          channelIds: boolean
          roleIds: boolean
          emoji: boolean
          title: boolean
          description: boolean
        }
        title: boolean
        singleSelect: boolean
        required: boolean
        inOnboarding: boolean
      }
      defaultChannelIds: boolean
      enabled: boolean
      mode: boolean
    }
    entitlement: {
      id: boolean
      skuId: boolean
      userId: boolean
      guildId: boolean
      applicationId: boolean
      type: boolean
      deleted: boolean
      startsAt: boolean
      endsAt: boolean
      consumed: boolean
    }
    sku: {
      id: boolean
      type: boolean
      applicationId: boolean
      name: boolean
      slug: boolean
      flags: boolean
    }
    voiceState: {
      requestToSpeakTimestamp: boolean
      channelId: boolean
      guildId: boolean
      toggles: boolean
      sessionId: boolean
      userId: boolean
    }
    poll: {
      question: boolean
      answers: {
        answerId: boolean
        pollMedia: boolean
      }
      expiry: boolean
      allowMultiselect: boolean
      layoutType: boolean
      results: {
        isFinalized: boolean
        answerCounts: {
          id: boolean
          count: boolean
          meVoted: boolean
        }
      }
    }
    pollMedia: {
      text: boolean
      emoji: boolean
    }
  }
  reverse: {
    allowedMentions: (bot: Bot, payload: AllowedMentions) => DiscordAllowedMentions
    embed: (bot: Bot, payload: Embed) => DiscordEmbed
    component: (bot: Bot, payload: Component) => DiscordComponent
    activity: (bot: Bot, payload: Activity) => DiscordActivity
    member: (bot: Bot, payload: Member) => DiscordMember
    user: (bot: Bot, payload: User) => DiscordUser
    team: (bot: Bot, payload: Team) => DiscordTeam
    application: (bot: Bot, payload: Application) => DiscordApplication
    snowflake: (snowflake: BigString) => string
    createApplicationCommand: (bot: Bot, payload: CreateApplicationCommand) => DiscordCreateApplicationCommand
    applicationCommand: (bot: Bot, payload: ApplicationCommand) => DiscordApplicationCommand
    applicationCommandOption: (bot: Bot, payload: ApplicationCommandOption) => DiscordApplicationCommandOption
    applicationCommandOptionChoice: (bot: Bot, payload: ApplicationCommandOptionChoice) => DiscordApplicationCommandOptionChoice
    interactionResponse: (bot: Bot, payload: BotInteractionResponse) => DiscordInteractionResponse
    attachment: (bot: Bot, payload: Attachment) => DiscordAttachment
  }
  snowflake: (snowflake: BigString) => bigint
  gatewayBot: (bot: Bot, payload: DiscordGetGatewayBot) => GetGatewayBot
  automodRule: (bot: Bot, payload: DiscordAutoModerationRule) => AutoModerationRule
  automodActionExecution: (bot: Bot, payload: DiscordAutoModerationActionExecution) => AutoModerationActionExecution
  channel: (bot: Bot, payload: { channel: DiscordChannel } & { guildId?: BigString }) => Channel
  forumTag: (bot: Bot, payload: DiscordForumTag) => ForumTag
  guild: (bot: Bot, payload: { guild: DiscordGuild } & { shardId: number }) => Guild
  user: (bot: Bot, payload: DiscordUser) => User
  member: (bot: Bot, payload: DiscordMember, guildId: BigString, userId: BigString) => Member
  message: (bot: Bot, payload: DiscordMessage) => Message
  messageInteractionMetadata: (bot: Bot, payload: DiscordMessageInteractionMetadata) => MessageInteractionMetadata
  messageCall: (bot: Bot, payload: DiscordMessageCall) => MessageCall
  role: (bot: Bot, payload: { role: DiscordRole } & { guildId: BigString }) => Role
  voiceState: (bot: Bot, payload: { voiceState: DiscordVoiceState } & { guildId: bigint }) => VoiceState
  interaction: (bot: Bot, payload: { interaction: DiscordInteraction; shardId: number }) => Interaction
  interactionDataOptions: (bot: Bot, payload: DiscordInteractionDataOption) => InteractionDataOption
  integration: (bot: Bot, payload: DiscordIntegrationCreateUpdate) => Integration
  invite: (bot: Bot, payload: { invite: DiscordInviteCreate | DiscordInviteMetadata; shardId: number }) => Invite
  application: (bot: Bot, payload: { application: DiscordApplication; shardId: number }) => Application
  team: (bot: Bot, payload: DiscordTeam) => Team
  emoji: (bot: Bot, payload: DiscordEmoji) => Emoji
  defaultReactionEmoji: (bot: Bot, payload: DiscordDefaultReactionEmoji) => DefaultReactionEmoji
  activity: (bot: Bot, payload: DiscordActivity) => Activity
  presence: (bot: Bot, payload: DiscordPresenceUpdate) => PresenceUpdate
  attachment: (bot: Bot, payload: DiscordAttachment) => Attachment
  embed: (bot: Bot, payload: DiscordEmbed) => Embed
  component: (bot: Bot, payload: DiscordComponent) => Component
  webhook: (bot: Bot, payload: DiscordWebhook) => Webhook
  auditLogEntry: (bot: Bot, payload: DiscordAuditLogEntry) => AuditLogEntry
  applicationCommand: (bot: Bot, payload: DiscordApplicationCommand) => ApplicationCommand
  applicationCommandOption: (bot: Bot, payload: DiscordApplicationCommandOption) => ApplicationCommandOption
  applicationCommandPermission: (bot: Bot, payload: DiscordGuildApplicationCommandPermissions) => ApplicationCommandPermission
  scheduledEvent: (bot: Bot, payload: DiscordScheduledEvent) => ScheduledEvent
  threadMember: (bot: Bot, payload: DiscordThreadMember) => ThreadMember
  threadMemberGuildCreate: (bot: Bot, payload: DiscordThreadMemberGuildCreate) => ThreadMemberGuildCreate
  welcomeScreen: (bot: Bot, payload: DiscordWelcomeScreen) => WelcomeScreen
  voiceRegion: (bot: Bot, payload: DiscordVoiceRegion) => VoiceRegion
  widget: (bot: Bot, payload: DiscordGuildWidget) => GuildWidget
  widgetSettings: (bot: Bot, payload: DiscordGuildWidgetSettings) => GuildWidgetSettings
  stageInstance: (bot: Bot, payload: DiscordStageInstance) => StageInstance
  inviteStageInstance: (bot: Bot, payload: DiscordInviteStageInstance & { guildId: BigString }) => InviteStageInstance

  sticker: (bot: Bot, payload: DiscordSticker) => Sticker
  stickerPack: (bot: Bot, payload: DiscordStickerPack) => StickerPack
  applicationCommandOptionChoice: (bot: Bot, payload: DiscordApplicationCommandOptionChoice) => ApplicationCommandOptionChoice
  template: (bot: Bot, payload: DiscordTemplate) => Template
  guildOnboarding: (bot: Bot, payload: DiscordGuildOnboarding) => GuildOnboarding
  entitlement: (bot: Bot, payload: DiscordEntitlement) => Entitlement
  sku: (bot: Bot, payload: DiscordSku) => Sku
  poll: (bot: Bot, payload: DiscordPoll) => Poll
  pollMedia: (bot: Bot, payload: DiscordPollMedia) => PollMedia
  avatarDecorationData: (bot: Bot, payload: DiscordAvatarDecorationData) => AvatarDecorationData
}

export interface CreateTransformerOptions {
  defaultDesiredPropertiesValue: boolean
  logger?: Pick<typeof logger, 'debug' | 'info' | 'warn' | 'error' | 'fatal'>
}

export function createTransformers(options: Partial<Transformers>, opts?: CreateTransformerOptions): Transformers {
  if (opts?.defaultDesiredPropertiesValue) {
    const log = opts.logger ?? logger

    log.warn('[Transformers] WARNING WARNING WARNING!')
    log.warn(
      '[Transformers] The defaultDesiredPropertiesValue property is being used and it is NOT RECOMMENDED. In fact it was WARNED AGAINST. It is extremely bad practice.',
    )
    log.warn('[Transformers] It is a bit painful to work with and get started, but it has massive long term benefits.')
    log.warn('[Transformers] ----------------------------------------------------------------')
  }

  return {
    customizers: {
      channel(_bot, _payload, channel) {
        return channel
      },
      forumTag(_bot, _payload, forumTag) {
        return forumTag
      },
      interaction(_bot, _payload, interaction) {
        return interaction
      },
      member(_bot, _payload, member) {
        return member
      },
      message(_bot, _payload, message) {
        return message
      },
      messageInteractionMetadata(_bot, _payload, metadata) {
        return metadata
      },
      messageCall(_bot, _payload, call) {
        return call
      },
      role(_bot, _payload, role) {
        return role
      },
      user(_bot, _payload, user) {
        return user
      },
      activity(_bot, _payload, activity) {
        return activity
      },
      application(_bot, _payload, application) {
        return application
      },
      applicationCommand(_bot, _payload, applicationCommand) {
        return applicationCommand
      },
      applicationCommandOption(_bot, _payload, applicationCommandOption) {
        return applicationCommandOption
      },
      applicationCommandOptionChoice(_bot, _payload, applicationCommandOptionChoice) {
        return applicationCommandOptionChoice
      },
      applicationCommandPermission(_bot, _payload, applicationCommandPermission) {
        return applicationCommandPermission
      },
      attachment(_bot, _payload, attachment) {
        return attachment
      },
      auditLogEntry(_bot, _payload, auditLogEntry) {
        return auditLogEntry
      },
      automodActionExecution(_bot, _payload, automodActionExecution) {
        return automodActionExecution
      },
      automodRule(_bot, _payload, automodRule) {
        return automodRule
      },
      component(_bot, _payload, component) {
        return component
      },
      embed(_bot, _payload, embed) {
        return embed
      },
      emoji(_bot, _payload, emoji) {
        return emoji
      },
      defaultReactionEmoji(_bot, _payload, defaultReactionEmoji) {
        return defaultReactionEmoji
      },
      guild(_bot, _payload, guild) {
        return guild
      },
      integration(_bot, _payload, integration) {
        return integration
      },
      interactionDataOptions(_bot, _payload, interactionDataOptions) {
        return interactionDataOptions
      },
      invite(_bot, _payload, invite) {
        return invite
      },
      presence(_bot, _payload, presence) {
        return presence
      },
      scheduledEvent(_bot, _payload, scheduledEvent) {
        return scheduledEvent
      },
      stageInstance(_bot, _payload, stageInstance) {
        return stageInstance
      },
      inviteStageInstance(_bot, _payload, inviteStageInstance) {
        return inviteStageInstance
      },
      sticker(_bot, _payload, sticker) {
        return sticker
      },
      stickerPack(_bot, _payload, stickerPack) {
        return stickerPack
      },
      team(_bot, _payload, team) {
        return team
      },
      template(_bot, _payload, template) {
        return template
      },
      threadMember(_bot, _payload, threadMember) {
        return threadMember
      },
      threadMemberGuildCreate(_bot, _payload, threadMemberGuildCreate) {
        return threadMemberGuildCreate
      },
      voiceRegion(_bot, _payload, voiceRegion) {
        return voiceRegion
      },
      voiceState(_bot, _payload, voiceState) {
        return voiceState
      },
      gatewayBot(_bot, _payload, getGatewayBot) {
        return getGatewayBot
      },
      webhook(_bot, _payload, webhook) {
        return webhook
      },
      welcomeScreen(_bot, _payload, welcomeScreen) {
        return welcomeScreen
      },
      widget(_bot, _payload, widget) {
        return widget
      },
      widgetSettings(_bot, _payload, widgetSettings) {
        return widgetSettings
      },
      guildOnboarding(_bot, _payload, onboarding) {
        return onboarding
      },
      entitlement(_bot, _payload, entitlement) {
        return entitlement
      },
      sku(_bot, _payload, sku) {
        return sku
      },
      poll(_bot, _payload, poll) {
        return poll
      },
      pollMedia(_bot, _payload, pollMedia) {
        return pollMedia
      },
      avatarDecorationData(_bot, _payload, avatarDecorationData) {
        return avatarDecorationData
      },
    },
    desiredProperties: {
      attachment: {
        id: opts?.defaultDesiredPropertiesValue ?? false,
        filename: opts?.defaultDesiredPropertiesValue ?? false,
        title: opts?.defaultDesiredPropertiesValue ?? false,
        contentType: opts?.defaultDesiredPropertiesValue ?? false,
        size: opts?.defaultDesiredPropertiesValue ?? false,
        url: opts?.defaultDesiredPropertiesValue ?? false,
        proxyUrl: opts?.defaultDesiredPropertiesValue ?? false,
        height: opts?.defaultDesiredPropertiesValue ?? false,
        width: opts?.defaultDesiredPropertiesValue ?? false,
        ephemeral: opts?.defaultDesiredPropertiesValue ?? false,
        description: opts?.defaultDesiredPropertiesValue ?? false,
        duration_secs: opts?.defaultDesiredPropertiesValue ?? false,
        waveform: opts?.defaultDesiredPropertiesValue ?? false,
        flags: opts?.defaultDesiredPropertiesValue ?? false,
      },
      channel: {
        type: opts?.defaultDesiredPropertiesValue ?? false,
        position: opts?.defaultDesiredPropertiesValue ?? false,
        name: opts?.defaultDesiredPropertiesValue ?? false,
        topic: opts?.defaultDesiredPropertiesValue ?? false,
        nsfw: opts?.defaultDesiredPropertiesValue ?? false,
        bitrate: opts?.defaultDesiredPropertiesValue ?? false,
        userLimit: opts?.defaultDesiredPropertiesValue ?? false,
        rateLimitPerUser: opts?.defaultDesiredPropertiesValue ?? false,
        rtcRegion: opts?.defaultDesiredPropertiesValue ?? false,
        videoQualityMode: opts?.defaultDesiredPropertiesValue ?? false,
        guildId: opts?.defaultDesiredPropertiesValue ?? false,
        lastPinTimestamp: opts?.defaultDesiredPropertiesValue ?? false,
        permissionOverwrites: opts?.defaultDesiredPropertiesValue ?? false,
        id: opts?.defaultDesiredPropertiesValue ?? false,
        permissions: opts?.defaultDesiredPropertiesValue ?? false,
        lastMessageId: opts?.defaultDesiredPropertiesValue ?? false,
        ownerId: opts?.defaultDesiredPropertiesValue ?? false,
        applicationId: opts?.defaultDesiredPropertiesValue ?? false,
        managed: opts?.defaultDesiredPropertiesValue ?? false,
        parentId: opts?.defaultDesiredPropertiesValue ?? false,
        memberCount: opts?.defaultDesiredPropertiesValue ?? false,
        messageCount: opts?.defaultDesiredPropertiesValue ?? false,
        archiveTimestamp: opts?.defaultDesiredPropertiesValue ?? false,
        defaultAutoArchiveDuration: opts?.defaultDesiredPropertiesValue ?? false,
        autoArchiveDuration: opts?.defaultDesiredPropertiesValue ?? false,
        botIsMember: opts?.defaultDesiredPropertiesValue ?? false,
        archived: opts?.defaultDesiredPropertiesValue ?? false,
        locked: opts?.defaultDesiredPropertiesValue ?? false,
        invitable: opts?.defaultDesiredPropertiesValue ?? false,
        createTimestamp: opts?.defaultDesiredPropertiesValue ?? false,
        newlyCreated: opts?.defaultDesiredPropertiesValue ?? false,
        flags: opts?.defaultDesiredPropertiesValue ?? false,
        appliedTags: opts?.defaultDesiredPropertiesValue ?? false,
        availableTags: opts?.defaultDesiredPropertiesValue ?? false,
        defaultForumLayout: opts?.defaultDesiredPropertiesValue ?? false,
        defaultReactionEmoji: opts?.defaultDesiredPropertiesValue ?? false,
        defaultSortOrder: opts?.defaultDesiredPropertiesValue ?? false,
        defaultThreadRateLimitPerUser: opts?.defaultDesiredPropertiesValue ?? false,
        icon: opts?.defaultDesiredPropertiesValue ?? false,
        member: opts?.defaultDesiredPropertiesValue ?? false,
        recipients: opts?.defaultDesiredPropertiesValue ?? false,
        totalMessageSent: opts?.defaultDesiredPropertiesValue ?? false,
      },
      forumTag: {
        emojiId: opts?.defaultDesiredPropertiesValue ?? false,
        emojiName: opts?.defaultDesiredPropertiesValue ?? false,
        id: opts?.defaultDesiredPropertiesValue ?? false,
        moderated: opts?.defaultDesiredPropertiesValue ?? false,
        name: opts?.defaultDesiredPropertiesValue ?? false,
      },
      emoji: {
        id: opts?.defaultDesiredPropertiesValue ?? false,
        name: opts?.defaultDesiredPropertiesValue ?? false,
        roles: opts?.defaultDesiredPropertiesValue ?? false,
        user: opts?.defaultDesiredPropertiesValue ?? false,
      },
      defaultReactionEmoji: {
        emojiId: opts?.defaultDesiredPropertiesValue ?? false,
        emojiName: opts?.defaultDesiredPropertiesValue ?? false,
      },
      guild: {
        afkTimeout: opts?.defaultDesiredPropertiesValue ?? false,
        approximateMemberCount: opts?.defaultDesiredPropertiesValue ?? false,
        approximatePresenceCount: opts?.defaultDesiredPropertiesValue ?? false,
        defaultMessageNotifications: opts?.defaultDesiredPropertiesValue ?? false,
        description: opts?.defaultDesiredPropertiesValue ?? false,
        explicitContentFilter: opts?.defaultDesiredPropertiesValue ?? false,
        maxMembers: opts?.defaultDesiredPropertiesValue ?? false,
        maxPresences: opts?.defaultDesiredPropertiesValue ?? false,
        maxVideoChannelUsers: opts?.defaultDesiredPropertiesValue ?? false,
        mfaLevel: opts?.defaultDesiredPropertiesValue ?? false,
        name: opts?.defaultDesiredPropertiesValue ?? false,
        channels: opts?.defaultDesiredPropertiesValue ?? false,
        emojis: opts?.defaultDesiredPropertiesValue ?? false,
        iconHash: opts?.defaultDesiredPropertiesValue ?? false,
        large: opts?.defaultDesiredPropertiesValue ?? false,
        members: opts?.defaultDesiredPropertiesValue ?? false,
        owner: opts?.defaultDesiredPropertiesValue ?? false,
        presences: opts?.defaultDesiredPropertiesValue ?? false,
        roles: opts?.defaultDesiredPropertiesValue ?? false,
        stickers: opts?.defaultDesiredPropertiesValue ?? false,
        threads: opts?.defaultDesiredPropertiesValue ?? false,
        toggles: opts?.defaultDesiredPropertiesValue ?? false,
        unavailable: opts?.defaultDesiredPropertiesValue ?? false,
        voiceStates: opts?.defaultDesiredPropertiesValue ?? false,
        widgetEnabled: opts?.defaultDesiredPropertiesValue ?? false,
        nsfwLevel: opts?.defaultDesiredPropertiesValue ?? false,
        preferredLocale: opts?.defaultDesiredPropertiesValue ?? false,
        premiumSubscriptionCount: opts?.defaultDesiredPropertiesValue ?? false,
        premiumTier: opts?.defaultDesiredPropertiesValue ?? false,
        stageInstances: opts?.defaultDesiredPropertiesValue ?? false,
        systemChannelFlags: opts?.defaultDesiredPropertiesValue ?? false,
        vanityUrlCode: opts?.defaultDesiredPropertiesValue ?? false,
        verificationLevel: opts?.defaultDesiredPropertiesValue ?? false,
        welcomeScreen: opts?.defaultDesiredPropertiesValue ?? false,
        discoverySplash: opts?.defaultDesiredPropertiesValue ?? false,
        joinedAt: opts?.defaultDesiredPropertiesValue ?? false,
        memberCount: opts?.defaultDesiredPropertiesValue ?? false,
        shardId: opts?.defaultDesiredPropertiesValue ?? false,
        icon: opts?.defaultDesiredPropertiesValue ?? false,
        banner: opts?.defaultDesiredPropertiesValue ?? false,
        splash: opts?.defaultDesiredPropertiesValue ?? false,
        id: opts?.defaultDesiredPropertiesValue ?? false,
        ownerId: opts?.defaultDesiredPropertiesValue ?? false,
        permissions: opts?.defaultDesiredPropertiesValue ?? false,
        afkChannelId: opts?.defaultDesiredPropertiesValue ?? false,
        widgetChannelId: opts?.defaultDesiredPropertiesValue ?? false,
        applicationId: opts?.defaultDesiredPropertiesValue ?? false,
        systemChannelId: opts?.defaultDesiredPropertiesValue ?? false,
        rulesChannelId: opts?.defaultDesiredPropertiesValue ?? false,
        publicUpdatesChannelId: opts?.defaultDesiredPropertiesValue ?? false,
        premiumProgressBarEnabled: opts?.defaultDesiredPropertiesValue ?? false,
        safetyAlertsChannelId: opts?.defaultDesiredPropertiesValue ?? false,
      },
      interaction: {
        id: opts?.defaultDesiredPropertiesValue ?? false,
        applicationId: opts?.defaultDesiredPropertiesValue ?? false,
        type: opts?.defaultDesiredPropertiesValue ?? false,
        guild: opts?.defaultDesiredPropertiesValue ?? false,
        guildId: opts?.defaultDesiredPropertiesValue ?? false,
        channel: opts?.defaultDesiredPropertiesValue ?? false,
        channelId: opts?.defaultDesiredPropertiesValue ?? false,
        member: opts?.defaultDesiredPropertiesValue ?? false,
        user: opts?.defaultDesiredPropertiesValue ?? false,
        token: opts?.defaultDesiredPropertiesValue ?? false,
        version: opts?.defaultDesiredPropertiesValue ?? false,
        message: opts?.defaultDesiredPropertiesValue ?? false,
        data: opts?.defaultDesiredPropertiesValue ?? false,
        locale: opts?.defaultDesiredPropertiesValue ?? false,
        guildLocale: opts?.defaultDesiredPropertiesValue ?? false,
        appPermissions: opts?.defaultDesiredPropertiesValue ?? false,
        authorizingIntegrationOwners: opts?.defaultDesiredPropertiesValue ?? false,
        context: opts?.defaultDesiredPropertiesValue ?? false,
      },
      invite: {
        type: opts?.defaultDesiredPropertiesValue ?? false,
        channelId: opts?.defaultDesiredPropertiesValue ?? false,
        code: opts?.defaultDesiredPropertiesValue ?? false,
        createdAt: opts?.defaultDesiredPropertiesValue ?? false,
        guildId: opts?.defaultDesiredPropertiesValue ?? false,
        inviter: opts?.defaultDesiredPropertiesValue ?? false,
        maxAge: opts?.defaultDesiredPropertiesValue ?? false,
        maxUses: opts?.defaultDesiredPropertiesValue ?? false,
        targetType: opts?.defaultDesiredPropertiesValue ?? false,
        targetUser: opts?.defaultDesiredPropertiesValue ?? false,
        targetApplication: opts?.defaultDesiredPropertiesValue ?? false,
        temporary: opts?.defaultDesiredPropertiesValue ?? false,
        uses: opts?.defaultDesiredPropertiesValue ?? false,
        approximateMemberCount: opts?.defaultDesiredPropertiesValue ?? false,
        approximatePresenceCount: opts?.defaultDesiredPropertiesValue ?? false,
        guildScheduledEvent: opts?.defaultDesiredPropertiesValue ?? false,
        stageInstance: opts?.defaultDesiredPropertiesValue ?? false,
        expiresAt: opts?.defaultDesiredPropertiesValue ?? false,
      },
      member: {
        id: opts?.defaultDesiredPropertiesValue ?? false,
        guildId: opts?.defaultDesiredPropertiesValue ?? false,
        user: opts?.defaultDesiredPropertiesValue ?? false,
        nick: opts?.defaultDesiredPropertiesValue ?? false,
        roles: opts?.defaultDesiredPropertiesValue ?? false,
        joinedAt: opts?.defaultDesiredPropertiesValue ?? false,
        premiumSince: opts?.defaultDesiredPropertiesValue ?? false,
        avatar: opts?.defaultDesiredPropertiesValue ?? false,
        permissions: opts?.defaultDesiredPropertiesValue ?? false,
        communicationDisabledUntil: opts?.defaultDesiredPropertiesValue ?? false,
        deaf: opts?.defaultDesiredPropertiesValue ?? false,
        mute: opts?.defaultDesiredPropertiesValue ?? false,
        pending: opts?.defaultDesiredPropertiesValue ?? false,
        avatarDecorationData: opts?.defaultDesiredPropertiesValue ?? false,
      },
      message: {
        activity: opts?.defaultDesiredPropertiesValue ?? false,
        application: opts?.defaultDesiredPropertiesValue ?? false,
        applicationId: opts?.defaultDesiredPropertiesValue ?? false,
        attachments: opts?.defaultDesiredPropertiesValue ?? false,
        author: opts?.defaultDesiredPropertiesValue ?? false,
        channelId: opts?.defaultDesiredPropertiesValue ?? false,
        components: opts?.defaultDesiredPropertiesValue ?? false,
        content: opts?.defaultDesiredPropertiesValue ?? false,
        editedTimestamp: opts?.defaultDesiredPropertiesValue ?? false,
        embeds: opts?.defaultDesiredPropertiesValue ?? false,
        guildId: opts?.defaultDesiredPropertiesValue ?? false,
        id: opts?.defaultDesiredPropertiesValue ?? false,
        interactionMetadata: {
          id: opts?.defaultDesiredPropertiesValue ?? false,
          type: opts?.defaultDesiredPropertiesValue ?? false,
          user: opts?.defaultDesiredPropertiesValue ?? false,
          authorizingIntegrationOwners: opts?.defaultDesiredPropertiesValue ?? false,
          originalResponseMessageId: opts?.defaultDesiredPropertiesValue ?? false,
          interactedMessageId: opts?.defaultDesiredPropertiesValue ?? false,
          triggeringInteractionMetadata: opts?.defaultDesiredPropertiesValue ?? false,
        },
        interaction: {
          id: opts?.defaultDesiredPropertiesValue ?? false,
          member: opts?.defaultDesiredPropertiesValue ?? false,
          name: opts?.defaultDesiredPropertiesValue ?? false,
          type: opts?.defaultDesiredPropertiesValue ?? false,
          user: opts?.defaultDesiredPropertiesValue ?? false,
        },
        member: opts?.defaultDesiredPropertiesValue ?? false,
        mentionedChannelIds: opts?.defaultDesiredPropertiesValue ?? false,
        mentionedRoleIds: opts?.defaultDesiredPropertiesValue ?? false,
        mentions: opts?.defaultDesiredPropertiesValue ?? false,
        messageReference: {
          messageId: opts?.defaultDesiredPropertiesValue ?? false,
          channelId: opts?.defaultDesiredPropertiesValue ?? false,
          guildId: opts?.defaultDesiredPropertiesValue ?? false,
        },
        nonce: opts?.defaultDesiredPropertiesValue ?? false,
        reactions: opts?.defaultDesiredPropertiesValue ?? false,
        stickerItems: opts?.defaultDesiredPropertiesValue ?? false,
        thread: opts?.defaultDesiredPropertiesValue ?? false,
        type: opts?.defaultDesiredPropertiesValue ?? false,
        webhookId: opts?.defaultDesiredPropertiesValue ?? false,
        poll: opts?.defaultDesiredPropertiesValue ?? false,
        call: {
          participants: opts?.defaultDesiredPropertiesValue ?? false,
          endedTimestamp: opts?.defaultDesiredPropertiesValue ?? false,
        },
      },
      role: {
        name: opts?.defaultDesiredPropertiesValue ?? false,
        guildId: opts?.defaultDesiredPropertiesValue ?? false,
        position: opts?.defaultDesiredPropertiesValue ?? false,
        color: opts?.defaultDesiredPropertiesValue ?? false,
        id: opts?.defaultDesiredPropertiesValue ?? false,
        botId: opts?.defaultDesiredPropertiesValue ?? false,
        integrationId: opts?.defaultDesiredPropertiesValue ?? false,
        permissions: opts?.defaultDesiredPropertiesValue ?? false,
        icon: opts?.defaultDesiredPropertiesValue ?? false,
        unicodeEmoji: opts?.defaultDesiredPropertiesValue ?? false,
        mentionable: opts?.defaultDesiredPropertiesValue ?? false,
        hoist: opts?.defaultDesiredPropertiesValue ?? false,
        managed: opts?.defaultDesiredPropertiesValue ?? false,
        subscriptionListingId: opts?.defaultDesiredPropertiesValue ?? false,
        flags: opts?.defaultDesiredPropertiesValue ?? false,
      },
      scheduledEvent: {
        id: opts?.defaultDesiredPropertiesValue ?? false,
        guildId: opts?.defaultDesiredPropertiesValue ?? false,
        channelId: opts?.defaultDesiredPropertiesValue ?? false,
        creatorId: opts?.defaultDesiredPropertiesValue ?? false,
        scheduledStartTime: opts?.defaultDesiredPropertiesValue ?? false,
        scheduledEndTime: opts?.defaultDesiredPropertiesValue ?? false,
        entityId: opts?.defaultDesiredPropertiesValue ?? false,
        creator: opts?.defaultDesiredPropertiesValue ?? false,
        name: opts?.defaultDesiredPropertiesValue ?? false,
        description: opts?.defaultDesiredPropertiesValue ?? false,
        privacyLevel: opts?.defaultDesiredPropertiesValue ?? false,
        status: opts?.defaultDesiredPropertiesValue ?? false,
        entityType: opts?.defaultDesiredPropertiesValue ?? false,
        userCount: opts?.defaultDesiredPropertiesValue ?? false,
        location: opts?.defaultDesiredPropertiesValue ?? false,
        image: opts?.defaultDesiredPropertiesValue ?? false,
      },
      stageInstance: {
        id: opts?.defaultDesiredPropertiesValue ?? false,
        guildId: opts?.defaultDesiredPropertiesValue ?? false,
        channelId: opts?.defaultDesiredPropertiesValue ?? false,
        topic: opts?.defaultDesiredPropertiesValue ?? false,
        guildScheduledEventId: opts?.defaultDesiredPropertiesValue ?? false,
      },
      inviteStageInstance: {
        members: opts?.defaultDesiredPropertiesValue ?? false,
        participantCount: opts?.defaultDesiredPropertiesValue ?? false,
        speakerCount: opts?.defaultDesiredPropertiesValue ?? false,
        topic: opts?.defaultDesiredPropertiesValue ?? false,
      },
      sticker: {
        id: opts?.defaultDesiredPropertiesValue ?? false,
        packId: opts?.defaultDesiredPropertiesValue ?? false,
        name: opts?.defaultDesiredPropertiesValue ?? false,
        description: opts?.defaultDesiredPropertiesValue ?? false,
        tags: opts?.defaultDesiredPropertiesValue ?? false,
        type: opts?.defaultDesiredPropertiesValue ?? false,
        formatType: opts?.defaultDesiredPropertiesValue ?? false,
        available: opts?.defaultDesiredPropertiesValue ?? false,
        guildId: opts?.defaultDesiredPropertiesValue ?? false,
        user: opts?.defaultDesiredPropertiesValue ?? false,
        sortValue: opts?.defaultDesiredPropertiesValue ?? false,
      },
      user: {
        username: opts?.defaultDesiredPropertiesValue ?? false,
        globalName: opts?.defaultDesiredPropertiesValue ?? false,
        locale: opts?.defaultDesiredPropertiesValue ?? false,
        flags: opts?.defaultDesiredPropertiesValue ?? false,
        premiumType: opts?.defaultDesiredPropertiesValue ?? false,
        publicFlags: opts?.defaultDesiredPropertiesValue ?? false,
        accentColor: opts?.defaultDesiredPropertiesValue ?? false,
        id: opts?.defaultDesiredPropertiesValue ?? false,
        discriminator: opts?.defaultDesiredPropertiesValue ?? false,
        avatar: opts?.defaultDesiredPropertiesValue ?? false,
        bot: opts?.defaultDesiredPropertiesValue ?? false,
        system: opts?.defaultDesiredPropertiesValue ?? false,
        mfaEnabled: opts?.defaultDesiredPropertiesValue ?? false,
        verified: opts?.defaultDesiredPropertiesValue ?? false,
        email: opts?.defaultDesiredPropertiesValue ?? false,
        banner: opts?.defaultDesiredPropertiesValue ?? false,
        avatarDecorationData: opts?.defaultDesiredPropertiesValue ?? false,
      },
      avatarDecorationData: {
        asset: opts?.defaultDesiredPropertiesValue ?? false,
        skuId: opts?.defaultDesiredPropertiesValue ?? false,
      },
      webhook: {
        id: opts?.defaultDesiredPropertiesValue ?? false,
        type: opts?.defaultDesiredPropertiesValue ?? false,
        guildId: opts?.defaultDesiredPropertiesValue ?? false,
        channelId: opts?.defaultDesiredPropertiesValue ?? false,
        user: opts?.defaultDesiredPropertiesValue ?? false,
        name: opts?.defaultDesiredPropertiesValue ?? false,
        avatar: opts?.defaultDesiredPropertiesValue ?? false,
        token: opts?.defaultDesiredPropertiesValue ?? false,
        applicationId: opts?.defaultDesiredPropertiesValue ?? false,
        sourceGuild: opts?.defaultDesiredPropertiesValue ?? false,
        sourceChannel: opts?.defaultDesiredPropertiesValue ?? false,
        url: opts?.defaultDesiredPropertiesValue ?? false,
      },
      guildOnboarding: {
        defaultChannelIds: opts?.defaultDesiredPropertiesValue ?? false,
        enabled: opts?.defaultDesiredPropertiesValue ?? false,
        guildId: opts?.defaultDesiredPropertiesValue ?? false,
        mode: opts?.defaultDesiredPropertiesValue ?? false,
        prompts: {
          id: opts?.defaultDesiredPropertiesValue ?? false,
          inOnboarding: opts?.defaultDesiredPropertiesValue ?? false,
          options: {
            channelIds: opts?.defaultDesiredPropertiesValue ?? false,
            description: opts?.defaultDesiredPropertiesValue ?? false,
            emoji: opts?.defaultDesiredPropertiesValue ?? false,
            id: opts?.defaultDesiredPropertiesValue ?? false,
            roleIds: opts?.defaultDesiredPropertiesValue ?? false,
            title: opts?.defaultDesiredPropertiesValue ?? false,
          },
          required: opts?.defaultDesiredPropertiesValue ?? false,
          singleSelect: opts?.defaultDesiredPropertiesValue ?? false,
          title: opts?.defaultDesiredPropertiesValue ?? false,
          type: opts?.defaultDesiredPropertiesValue ?? false,
        },
      },
      entitlement: {
        id: opts?.defaultDesiredPropertiesValue ?? false,
        skuId: opts?.defaultDesiredPropertiesValue ?? false,
        userId: opts?.defaultDesiredPropertiesValue ?? false,
        guildId: opts?.defaultDesiredPropertiesValue ?? false,
        applicationId: opts?.defaultDesiredPropertiesValue ?? false,
        type: opts?.defaultDesiredPropertiesValue ?? false,
        deleted: opts?.defaultDesiredPropertiesValue ?? false,
        startsAt: opts?.defaultDesiredPropertiesValue ?? false,
        endsAt: opts?.defaultDesiredPropertiesValue ?? false,
        consumed: opts?.defaultDesiredPropertiesValue ?? false,
      },
      sku: {
        id: opts?.defaultDesiredPropertiesValue ?? false,
        type: opts?.defaultDesiredPropertiesValue ?? false,
        applicationId: opts?.defaultDesiredPropertiesValue ?? false,
        name: opts?.defaultDesiredPropertiesValue ?? false,
        slug: opts?.defaultDesiredPropertiesValue ?? false,
        flags: opts?.defaultDesiredPropertiesValue ?? false,
      },
      voiceState: {
        requestToSpeakTimestamp: opts?.defaultDesiredPropertiesValue ?? false,
        channelId: opts?.defaultDesiredPropertiesValue ?? false,
        guildId: opts?.defaultDesiredPropertiesValue ?? false,
        toggles: opts?.defaultDesiredPropertiesValue ?? false,
        sessionId: opts?.defaultDesiredPropertiesValue ?? false,
        userId: opts?.defaultDesiredPropertiesValue ?? false,
      },
      poll: {
        question: opts?.defaultDesiredPropertiesValue ?? false,
        answers: {
          answerId: opts?.defaultDesiredPropertiesValue ?? false,
          pollMedia: opts?.defaultDesiredPropertiesValue ?? false,
        },
        expiry: opts?.defaultDesiredPropertiesValue ?? false,
        layoutType: opts?.defaultDesiredPropertiesValue ?? false,
        allowMultiselect: opts?.defaultDesiredPropertiesValue ?? false,
        results: {
          isFinalized: opts?.defaultDesiredPropertiesValue ?? false,
          answerCounts: {
            id: opts?.defaultDesiredPropertiesValue ?? false,
            count: opts?.defaultDesiredPropertiesValue ?? false,
            meVoted: opts?.defaultDesiredPropertiesValue ?? false,
          },
        },
      },
      pollMedia: {
        text: opts?.defaultDesiredPropertiesValue ?? false,
        emoji: opts?.defaultDesiredPropertiesValue ?? false,
      },
    },
    reverse: {
      allowedMentions: options.reverse?.allowedMentions ?? transformAllowedMentionsToDiscordAllowedMentions,
      embed: options.reverse?.embed ?? transformEmbedToDiscordEmbed,
      component: options.reverse?.component ?? transformComponentToDiscordComponent,
      activity: options.reverse?.activity ?? transformActivityToDiscordActivity,
      member: options.reverse?.member ?? transformMemberToDiscordMember,
      user: options.reverse?.user ?? transformUserToDiscordUser,
      team: options.reverse?.team ?? transformTeamToDiscordTeam,
      application: options.reverse?.application ?? transformApplicationToDiscordApplication,
      snowflake: options.reverse?.snowflake ?? bigintToSnowflake,
      createApplicationCommand: options.reverse?.createApplicationCommand ?? transformCreateApplicationCommandToDiscordCreateApplicationCommand,
      applicationCommand: options.reverse?.applicationCommand ?? transformApplicationCommandToDiscordApplicationCommand,
      applicationCommandOption: options.reverse?.applicationCommandOption ?? transformApplicationCommandOptionToDiscordApplicationCommandOption,
      applicationCommandOptionChoice:
        options.reverse?.applicationCommandOptionChoice ?? transformApplicationCommandOptionChoiceToDiscordApplicationCommandOptionChoice,
      interactionResponse: options.reverse?.interactionResponse ?? transformInteractionResponseToDiscordInteractionResponse,
      attachment: options.reverse?.attachment ?? transformAttachmentToDiscordAttachment,
    },
    automodRule: options.automodRule ?? transformAutoModerationRule,
    automodActionExecution: options.automodActionExecution ?? transformAutoModerationActionExecution,
    activity: options.activity ?? transformActivity,
    application: options.application ?? transformApplication,
    attachment: options.attachment ?? transformAttachment,
    channel: options.channel ?? transformChannel,
    forumTag: options.forumTag ?? transformForumTag,
    component: options.component ?? transformComponent,
    embed: options.embed ?? transformEmbed,
    emoji: options.emoji ?? transformEmoji,
    defaultReactionEmoji: options.defaultReactionEmoji ?? transformDefaultReactionEmoji,
    guild: options.guild ?? transformGuild,
    integration: options.integration ?? transformIntegration,
    interaction: options.interaction ?? transformInteraction,
    interactionDataOptions: options.interactionDataOptions ?? transformInteractionDataOption,
    invite: options.invite ?? transformInvite,
    member: options.member ?? transformMember,
    message: options.message ?? transformMessage,
    messageInteractionMetadata: options.messageInteractionMetadata ?? transformMessageInteractionMetadata,
    messageCall: options.messageCall ?? transformMessageCall,
    presence: options.presence ?? transformPresence,
    role: options.role ?? transformRole,
    user: options.user ?? transformUser,
    team: options.team ?? transformTeam,
    voiceState: options.voiceState ?? transformVoiceState,
    snowflake: options.snowflake ?? snowflakeToBigint,
    webhook: options.webhook ?? transformWebhook,
    auditLogEntry: options.auditLogEntry ?? transformAuditLogEntry,
    applicationCommand: options.applicationCommand ?? transformApplicationCommand,
    applicationCommandOption: options.applicationCommandOption ?? transformApplicationCommandOption,
    applicationCommandPermission: options.applicationCommandPermission ?? transformApplicationCommandPermission,
    scheduledEvent: options.scheduledEvent ?? transformScheduledEvent,
    threadMember: options.threadMember ?? transformThreadMember,
    threadMemberGuildCreate: options.threadMemberGuildCreate ?? transformThreadMemberGuildCreate,
    welcomeScreen: options.welcomeScreen ?? transformWelcomeScreen,
    voiceRegion: options.voiceRegion ?? transformVoiceRegion,
    widget: options.widget ?? transformWidget,
    widgetSettings: options.widgetSettings ?? transformWidgetSettings,
    stageInstance: options.stageInstance ?? transformStageInstance,
    inviteStageInstance: options.inviteStageInstance ?? transformInviteStageInstance,
    sticker: options.sticker ?? transformSticker,
    stickerPack: options.stickerPack ?? transformStickerPack,
    gatewayBot: options.gatewayBot ?? transformGatewayBot,
    applicationCommandOptionChoice: options.applicationCommandOptionChoice ?? transformApplicationCommandOptionChoice,
    template: options.template ?? transformTemplate,
    guildOnboarding: options.guildOnboarding ?? transformGuildOnboarding,
    entitlement: options.entitlement ?? transformEntitlement,
    sku: options.sku ?? transformSku,
    poll: options.poll ?? transformPoll,
    pollMedia: options.pollMedia ?? transformPollMedia,
    avatarDecorationData: options.avatarDecorationData ?? transformAvatarDecorationData,
  }
}
