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
  DiscordChannel,
  DiscordCreateApplicationCommand,
  DiscordEmbed,
  DiscordEmoji,
  DiscordGetGatewayBot,
  DiscordGuild,
  DiscordGuildApplicationCommandPermissions,
  DiscordGuildWidget,
  DiscordGuildWidgetSettings,
  DiscordIntegrationCreateUpdate,
  DiscordInteraction,
  DiscordInteractionDataOption,
  DiscordInviteCreate,
  DiscordMember,
  DiscordMessage,
  DiscordPresenceUpdate,
  DiscordRole,
  DiscordScheduledEvent,
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
import { bigintToSnowflake, snowflakeToBigint, type Bot } from './index.js'
import { transformActivity, type Activity } from './transformers/activity.js'
import { transformApplication, type Application } from './transformers/application.js'
import { transformApplicationCommand, type ApplicationCommand } from './transformers/applicationCommand.js'
import { transformApplicationCommandOption, type ApplicationCommandOption } from './transformers/applicationCommandOption.js'
import { transformApplicationCommandOptionChoice, type ApplicationCommandOptionChoice } from './transformers/applicationCommandOptionChoice.js'
import { transformApplicationCommandPermission, type ApplicationCommandPermission } from './transformers/applicationCommandPermission.js'
import { transformAttachment, type Attachment } from './transformers/attachment.js'
import { transformAuditLogEntry, type AuditLogEntry } from './transformers/auditLogEntry.js'
import { transformAutoModerationActionExecution, type AutoModerationActionExecution } from './transformers/automodActionExecution.js'
import { transformAutoModerationRule, type AutoModerationRule } from './transformers/automodRule.js'
import { transformChannel, type Channel } from './transformers/channel.js'
import { transformComponent, type Component } from './transformers/component.js'
import { transformEmbed, type Embed } from './transformers/embed.js'
import { transformEmoji, type Emoji } from './transformers/emoji.js'
import { transformGatewayBot, type GetGatewayBot } from './transformers/gatewayBot.js'
import { transformGuild, type Guild } from './transformers/guild.js'
import {
  transformActivityToDiscordActivity,
  transformApplicationCommandOptionChoiceToDiscordApplicationCommandOptionChoice,
  transformApplicationCommandOptionToDiscordApplicationCommandOption,
  transformApplicationCommandToDiscordApplicationCommand,
  transformApplicationToDiscordApplication,
  transformAttachmentToDiscordAttachment,
  transformComponentToDiscordComponent,
  transformEmbedToDiscordEmbed,
  transformMemberToDiscordMember,
  transformTeamToDiscordTeam,
  transformUserToDiscordUser,
} from './transformers/index.js'
import { transformIntegration, type Integration } from './transformers/integration.js'
import { transformInteraction, transformInteractionDataOption, type Interaction, type InteractionDataOption } from './transformers/interaction.js'
import { transformInvite, type Invite } from './transformers/invite.js'
import { transformMember, type Member } from './transformers/member.js'
import { transformMessage, type Message } from './transformers/message.js'
import { transformPresence, type PresenceUpdate } from './transformers/presence.js'
import { transformAllowedMentionsToDiscordAllowedMentions } from './transformers/reverse/allowedMentions.js'
import { transformCreateApplicationCommandToDiscordCreateApplicationCommand } from './transformers/reverse/createApplicationCommand.js'
import { transformInteractionResponseToDiscordInteractionResponse } from './transformers/reverse/interactionResponse.js'
import { transformRole, type Role } from './transformers/role.js'
import { transformScheduledEvent, type ScheduledEvent } from './transformers/scheduledEvent.js'
import { transformStageInstance, type StageInstance } from './transformers/stageInstance.js'
import { transformSticker, transformStickerPack, type Sticker, type StickerPack } from './transformers/sticker.js'
import { transformTeam, type Team } from './transformers/team.js'
import { transformTemplate, type Template } from './transformers/template.js'
import { transformThreadMember, type ThreadMember } from './transformers/threadMember.js'
import { transformUser, type User } from './transformers/user.js'
import { transformVoiceRegion, type VoiceRegions } from './transformers/voiceRegion.js'
import { transformVoiceState, type VoiceState } from './transformers/voiceState.js'
import { transformWebhook, type Webhook } from './transformers/webhook.js'
import { transformWelcomeScreen, type WelcomeScreen } from './transformers/welcomeScreen.js'
import { transformWidget, type GuildWidget } from './transformers/widget.js'
import { transformWidgetSettings, type GuildWidgetSettings } from './transformers/widgetSettings.js'
import type { BotInteractionResponse, DiscordComponent, DiscordInteractionResponse } from './typings.js'

export interface Transformers {
  customizers: {
    channel: (bot: Bot, payload: DiscordChannel, channel: Channel) => any
    interaction: (bot: Bot, payload: DiscordInteraction, interaction: Interaction) => any
    message: (bot: Bot, payload: DiscordMessage, message: Message) => any
    user: (bot: Bot, payload: DiscordUser, user: User) => any
    member: (bot: Bot, payload: DiscordMember, member: Member) => any
    role: (bot: Bot, payload: DiscordRole, role: Role) => any
  }
  desiredProperties: {
    attachment: {
      id: boolean
      filename: boolean
      contentType: boolean
      size: boolean
      url: boolean
      proxyUrl: boolean
      height: boolean
      width: boolean
      ephemeral: boolean
      description: boolean
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
      autoArchiveDuration: boolean
      botIsMember: boolean
      archived: boolean
      locked: boolean
      invitable: boolean
      createTimestamp: boolean
      newlyCreated: boolean
      flags: boolean
    }
    emoji: {
      id: boolean
      name: boolean
      roles: boolean
      user: boolean
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
      stageInstances: boolean
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
    }
    interaction: {
      id: boolean
      applicationId: boolean
      type: boolean
      guildId: boolean
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
    }
    invite: {
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
  gatewayBot: (payload: DiscordGetGatewayBot) => GetGatewayBot
  automodRule: (bot: Bot, payload: DiscordAutoModerationRule) => AutoModerationRule
  automodActionExecution: (bot: Bot, payload: DiscordAutoModerationActionExecution) => AutoModerationActionExecution
  channel: (bot: Bot, payload: { channel: DiscordChannel } & { guildId?: BigString }) => Channel
  guild: (bot: Bot, payload: { guild: DiscordGuild } & { shardId: number }) => Guild
  user: (bot: Bot, payload: DiscordUser) => User
  member: (bot: Bot, payload: DiscordMember, guildId: BigString, userId: BigString) => Member
  message: (bot: Bot, payload: DiscordMessage) => Message
  role: (bot: Bot, payload: { role: DiscordRole } & { guildId: BigString }) => Role
  voiceState: (bot: Bot, payload: { voiceState: DiscordVoiceState } & { guildId: bigint }) => VoiceState
  interaction: (bot: Bot, payload: DiscordInteraction) => Interaction
  interactionDataOptions: (bot: Bot, payload: DiscordInteractionDataOption) => InteractionDataOption
  integration: (bot: Bot, payload: DiscordIntegrationCreateUpdate) => Integration
  invite: (bot: Bot, invite: DiscordInviteCreate) => Invite
  application: (bot: Bot, payload: DiscordApplication) => Application
  team: (bot: Bot, payload: DiscordTeam) => Team
  emoji: (bot: Bot, payload: DiscordEmoji) => Emoji
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
  welcomeScreen: (bot: Bot, payload: DiscordWelcomeScreen) => WelcomeScreen
  voiceRegion: (bot: Bot, payload: DiscordVoiceRegion) => VoiceRegions
  widget: (bot: Bot, payload: DiscordGuildWidget) => GuildWidget
  widgetSettings: (bot: Bot, payload: DiscordGuildWidgetSettings) => GuildWidgetSettings
  stageInstance: (bot: Bot, payload: DiscordStageInstance) => StageInstance
  sticker: (bot: Bot, payload: DiscordSticker) => Sticker
  stickerPack: (bot: Bot, payload: DiscordStickerPack) => StickerPack
  applicationCommandOptionChoice: (bot: Bot, payload: DiscordApplicationCommandOptionChoice) => ApplicationCommandOptionChoice
  template: (bot: Bot, payload: DiscordTemplate) => Template
}

export function createTransformers(options: Partial<Transformers>): Transformers {
  return {
    customizers: {
      channel(bot, payload, channel) {
        return channel
      },
      interaction(bot, payload, interaction) {
        return interaction
      },
      member(bot, payload, member) {
        return member
      },
      message(bot, payload, message) {
        return message
      },
      role(bot, payload, role) {
        return role
      },
      user(bot, payload, user) {
        return user
      },
    },
    desiredProperties: {
      attachment: {
        id: false,
        filename: false,
        contentType: false,
        size: false,
        url: false,
        proxyUrl: false,
        height: false,
        width: false,
        ephemeral: false,
        description: false,
      },
      channel: {
        type: false,
        position: false,
        name: false,
        topic: false,
        nsfw: false,
        bitrate: false,
        userLimit: false,
        rateLimitPerUser: false,
        rtcRegion: false,
        videoQualityMode: false,
        guildId: false,
        lastPinTimestamp: false,
        permissionOverwrites: false,
        id: false,
        permissions: false,
        lastMessageId: false,
        ownerId: false,
        applicationId: false,
        managed: false,
        parentId: false,
        memberCount: false,
        messageCount: false,
        archiveTimestamp: false,
        autoArchiveDuration: false,
        botIsMember: false,
        archived: false,
        locked: false,
        invitable: false,
        createTimestamp: false,
        newlyCreated: false,
        flags: false,
      },
      emoji: {
        id: false,
        name: false,
        roles: false,
        user: false,
      },
      guild: {
        afkTimeout: false,
        approximateMemberCount: false,
        approximatePresenceCount: false,
        defaultMessageNotifications: false,
        description: false,
        explicitContentFilter: false,
        maxMembers: false,
        maxPresences: false,
        maxVideoChannelUsers: false,
        mfaLevel: false,
        name: false,
        nsfwLevel: false,
        preferredLocale: false,
        premiumSubscriptionCount: false,
        premiumTier: false,
        stageInstances: false,
        systemChannelFlags: false,
        vanityUrlCode: false,
        verificationLevel: false,
        welcomeScreen: false,
        discoverySplash: false,
        joinedAt: false,
        memberCount: false,
        shardId: false,
        icon: false,
        banner: false,
        splash: false,
        id: false,
        ownerId: false,
        permissions: false,
        afkChannelId: false,
        widgetChannelId: false,
        applicationId: false,
        systemChannelId: false,
        rulesChannelId: false,
        publicUpdatesChannelId: false,
        premiumProgressBarEnabled: false,
      },
      interaction: {
        id: false,
        applicationId: false,
        type: false,
        guildId: false,
        channelId: false,
        member: false,
        user: false,
        token: false,
        version: false,
        message: false,
        data: false,
        locale: false,
        guildLocale: false,
        appPermissions: false,
      },
      invite: {
        channelId: false,
        code: false,
        createdAt: false,
        guildId: false,
        inviter: false,
        maxAge: false,
        maxUses: false,
        targetType: false,
        targetUser: false,
        targetApplication: false,
        temporary: false,
        uses: false,
      },
      member: {
        id: false,
        guildId: false,
        user: false,
        nick: false,
        roles: false,
        joinedAt: false,
        premiumSince: false,
        avatar: false,
        permissions: false,
        communicationDisabledUntil: false,
        deaf: false,
        mute: false,
        pending: false,
      },
      message: {
        activity: false,
        application: false,
        applicationId: false,
        attachments: false,
        author: false,
        channelId: false,
        components: false,
        content: false,
        editedTimestamp: false,
        embeds: false,
        guildId: false,
        id: false,
        interaction: {
          id: false,
          member: false,
          name: false,
          type: false,
          user: false,
        },
        member: false,
        mentionedChannelIds: false,
        mentionedRoleIds: false,
        mentions: false,
        messageReference: {
          messageId: false,
          channelId: false,
          guildId: false,
        },
        nonce: false,
        reactions: false,
        stickerItems: false,
        thread: false,
        type: false,
        webhookId: false,
      },
      role: {
        name: false,
        guildId: false,
        position: false,
        color: false,
        id: false,
        botId: false,
        integrationId: false,
        permissions: false,
        icon: false,
        unicodeEmoji: false,
        mentionable: false,
        hoist: false,
        managed: false,
        subscriptionListingId: false,
      },
      scheduledEvent: {
        id: false,
        guildId: false,
        channelId: false,
        creatorId: false,
        scheduledStartTime: false,
        scheduledEndTime: false,
        entityId: false,
        creator: false,
        name: false,
        description: false,
        privacyLevel: false,
        status: false,
        entityType: false,
        userCount: false,
        location: false,
        image: false,
      },
      stageInstance: {
        id: false,
        guildId: false,
        channelId: false,
        topic: false,
        guildScheduledEventId: false,
      },
      sticker: {
        id: false,
        packId: false,
        name: false,
        description: false,
        tags: false,
        type: false,
        formatType: false,
        available: false,
        guildId: false,
        user: false,
        sortValue: false,
      },
      user: {
        username: false,
        globalName: false,
        locale: false,
        flags: false,
        premiumType: false,
        publicFlags: false,
        accentColor: false,
        id: false,
        discriminator: false,
        avatar: false,
        bot: false,
        system: false,
        mfaEnabled: false,
        verified: false,
        email: false,
        banner: false,
      },
      webhook: {
        id: false,
        type: false,
        guildId: false,
        channelId: false,
        user: false,
        name: false,
        avatar: false,
        token: false,
        applicationId: false,
        sourceGuild: false,
        sourceChannel: false,
        url: false,
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
    component: options.component ?? transformComponent,
    embed: options.embed ?? transformEmbed,
    emoji: options.emoji ?? transformEmoji,
    guild: options.guild ?? transformGuild,
    integration: options.integration ?? transformIntegration,
    interaction: options.interaction ?? transformInteraction,
    interactionDataOptions: options.interactionDataOptions ?? transformInteractionDataOption,
    invite: options.invite ?? transformInvite,
    member: options.member ?? transformMember,
    message: options.message ?? transformMessage,
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
    welcomeScreen: options.welcomeScreen ?? transformWelcomeScreen,
    voiceRegion: options.voiceRegion ?? transformVoiceRegion,
    widget: options.widget ?? transformWidget,
    widgetSettings: options.widgetSettings ?? transformWidgetSettings,
    stageInstance: options.stageInstance ?? transformStageInstance,
    sticker: options.sticker ?? transformSticker,
    stickerPack: options.stickerPack ?? transformStickerPack,
    gatewayBot: options.gatewayBot ?? transformGatewayBot,
    applicationCommandOptionChoice: options.applicationCommandOptionChoice ?? transformApplicationCommandOptionChoice,
    template: options.template ?? transformTemplate,
  }
}
