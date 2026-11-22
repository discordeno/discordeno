import type { RecursivePartial } from '@discordeno/types';
import type { Collection } from '@discordeno/utils';
import type { Bot } from './bot.js';
import type { InteractionResolvedDataChannel, InteractionResolvedDataMember } from './commandOptionsParser.js';
import type {
  Activity,
  ActivityAssets,
  ActivityEmoji,
  ActivityInstance,
  ActivityLocation,
  Application,
  ApplicationCommand,
  ApplicationCommandOption,
  ApplicationCommandOptionChoice,
  ApplicationCommandPermissions,
  Attachment,
  AuditLogEntry,
  AutoModerationAction,
  AutoModerationActionExecution,
  AutoModerationActionMetadata,
  AutoModerationRule,
  AutoModerationRuleTriggerMetadata,
  AvatarDecorationData,
  Channel,
  ChannelInfo,
  ChannelInfoData,
  Collectibles,
  Component,
  DefaultReactionEmoji,
  Embed,
  EmbedAuthor,
  EmbedFooter,
  EmbedImage,
  Emoji,
  Entitlement,
  ForumTag,
  Guild,
  GuildApplicationCommandPermissions,
  GuildOnboarding,
  GuildOnboardingPrompt,
  GuildOnboardingPromptOption,
  GuildWidget,
  GuildWidgetSettings,
  IncidentsData,
  Integration,
  IntegrationAccount,
  IntegrationApplication,
  Interaction,
  InteractionCallback,
  InteractionCallbackResponse,
  InteractionResource,
  Invite,
  InviteStageInstance,
  Lobby,
  LobbyInvite,
  LobbyMember,
  LobbyMessage,
  LobbyMessageLobbyMember,
  MediaGalleryItem,
  Member,
  Message,
  MessageCall,
  MessageInteraction,
  MessageInteractionMetadata,
  MessagePin,
  MessageReference,
  MessageSnapshot,
  Nameplate,
  OptionalAuditEntryInfo,
  Poll,
  PollAnswer,
  PollAnswerCount,
  PollMedia,
  PollResult,
  PresenceUpdate,
  Role,
  RoleColors,
  ScheduledEvent,
  ScheduledEventRecurrenceRule,
  SharedClientTheme,
  Sku,
  SoundboardSound,
  StageInstance,
  Sticker,
  StickerPack,
  Subscription,
  Team,
  TeamMember,
  Template,
  ThreadMember,
  ThreadMemberGuildCreate,
  UnfurledMediaItem,
  User,
  UserPrimaryGuild,
  VoiceRegion,
  VoiceState,
  Webhook,
  WelcomeScreen,
  WelcomeScreenChannel,
} from './transformers/types.js';

/**
 * All the objects that support desired properties
 *
 * @private This is subject to breaking changes at any time
 */
export interface TransformersObjects {
  activity: Activity;
  activityAssets: ActivityAssets;
  activityEmoji: ActivityEmoji;
  activityInstance: ActivityInstance;
  activityLocation: ActivityLocation;
  application: Application;
  applicationCommand: ApplicationCommand;
  applicationCommandOption: ApplicationCommandOption;
  applicationCommandOptionChoice: ApplicationCommandOptionChoice;
  applicationCommandPermissions: ApplicationCommandPermissions;
  attachment: Attachment;
  auditLogEntry: AuditLogEntry;
  autoModerationAction: AutoModerationAction;
  autoModerationActionExecution: AutoModerationActionExecution;
  autoModerationActionMetadata: AutoModerationActionMetadata;
  autoModerationRule: AutoModerationRule;
  autoModerationRuleTriggerMetadata: AutoModerationRuleTriggerMetadata;
  avatarDecorationData: AvatarDecorationData;
  channel: Channel;
  channelInfo: ChannelInfo;
  channelInfoData: ChannelInfoData;
  collectibles: Collectibles;
  component: Component;
  defaultReactionEmoji: DefaultReactionEmoji;
  embed: Embed;
  embedAuthor: EmbedAuthor;
  embedFooter: EmbedFooter;
  embedMedia: EmbedImage;
  emoji: Emoji;
  entitlement: Entitlement;
  forumTag: ForumTag;
  guild: Guild;
  guildApplicationCommandPermissions: GuildApplicationCommandPermissions;
  guildOnboarding: GuildOnboarding;
  guildOnboardingPrompt: GuildOnboardingPrompt;
  guildOnboardingPromptOption: GuildOnboardingPromptOption;
  guildWidget: GuildWidget;
  guildWidgetSettings: GuildWidgetSettings;
  incidentsData: IncidentsData;
  integration: Integration;
  integrationAccount: IntegrationAccount;
  integrationApplication: IntegrationApplication;
  interaction: Interaction;
  interactionCallback: InteractionCallback;
  interactionCallbackResponse: InteractionCallbackResponse;
  interactionResource: InteractionResource;
  invite: Invite;
  inviteStageInstance: InviteStageInstance;
  lobby: Lobby;
  lobbyInvite: LobbyInvite;
  lobbyMember: LobbyMember;
  lobbyMessage: LobbyMessage;
  lobbyMessageLobbyMember: LobbyMessageLobbyMember;
  mediaGalleryItem: MediaGalleryItem;
  member: Member;
  message: Message;
  messageCall: MessageCall;
  messageInteraction: MessageInteraction;
  messageInteractionMetadata: MessageInteractionMetadata;
  messagePin: MessagePin;
  messageReference: MessageReference;
  messageSnapshot: MessageSnapshot;
  nameplate: Nameplate;
  optionalAuditEntryInfo: OptionalAuditEntryInfo;
  poll: Poll;
  pollAnswer: PollAnswer;
  pollAnswerCount: PollAnswerCount;
  pollMedia: PollMedia;
  pollResult: PollResult;
  presence: PresenceUpdate;
  role: Role;
  roleColors: RoleColors;
  scheduledEvent: ScheduledEvent;
  scheduledEventRecurrenceRule: ScheduledEventRecurrenceRule;
  sharedClientTheme: SharedClientTheme;
  sku: Sku;
  soundboardSound: SoundboardSound;
  stageInstance: StageInstance;
  sticker: Sticker;
  stickerPack: StickerPack;
  subscription: Subscription;
  team: Team;
  teamMember: TeamMember;
  template: Template;
  threadMember: ThreadMember;
  threadMemberGuildCreate: ThreadMemberGuildCreate;
  unfurledMediaItem: UnfurledMediaItem;
  user: User;
  userPrimaryGuild: UserPrimaryGuild;
  voiceRegion: VoiceRegion;
  voiceState: VoiceState;
  webhook: Webhook;
  welcomeScreen: WelcomeScreen;
  welcomeScreenChannel: WelcomeScreenChannel;
}

/**
 * Metadata for typescript to create the correct types for desired properties
 *
 * @private This is subject to breaking changes without notices
 */
export const transformersDesiredPropertiesMetadata = {
  channel: {
    dependencies: {
      archived: ['toggles'],
      invitable: ['toggles'],
      locked: ['toggles'],
      nsfw: ['toggles'],
      newlyCreated: ['toggles'],
      managed: ['toggles'],
    },
    alwaysPresents: ['toggles', 'internalOverwrites', 'internalThreadMetadata'],
  },

  guild: {
    dependencies: {
      threads: ['channels'],
      features: ['toggles'],
    },
    alwaysPresents: [],
  },

  interaction: {
    dependencies: {
      respond: ['type', 'token', 'id'],
      sendFollowupMessage: ['token'],
      edit: ['type', 'token', 'id'],
      deferEdit: ['type', 'token', 'id'],
      defer: ['type', 'token', 'id'],
      delete: ['type', 'token'],
    },
    alwaysPresents: ['bot', 'acknowledged'],
  },

  member: {
    dependencies: {
      deaf: ['toggles'],
      mute: ['toggles'],
      pending: ['toggles'],
      flags: ['toggles'],
      didRejoin: ['toggles'],
      startedOnboarding: ['toggles'],
      bypassesVerification: ['toggles'],
      completedOnboarding: ['toggles'],
    },
    alwaysPresents: [],
  },

  message: {
    dependencies: {
      crossposted: ['flags'],
      ephemeral: ['flags'],
      failedToMentionSomeRolesInThread: ['flags'],
      hasThread: ['flags'],
      isCrosspost: ['flags'],
      loading: ['flags'],
      mentionedUserIds: ['mentions'],
      mentionEveryone: ['bitfield'],
      pinned: ['bitfield'],
      sourceMessageDeleted: ['flags'],
      suppressEmbeds: ['flags'],
      suppressNotifications: ['flags'],
      timestamp: ['id'],
      tts: ['bitfield'],
      urgent: ['flags'],
    },
    alwaysPresents: ['bitfield', 'flags'],
  },

  role: {
    dependencies: {
      hoist: ['toggles'],
      managed: ['toggles'],
      mentionable: ['toggles'],
      premiumSubscriber: ['toggles'],
      availableForPurchase: ['toggles'],
      guildConnections: ['toggles'],
    },
    alwaysPresents: ['internalTags'],
  },

  user: {
    dependencies: {
      tag: ['username', 'discriminator'],
      bot: ['toggles'],
      system: ['toggles'],
      mfaEnabled: ['toggles'],
      verified: ['toggles'],
      avatarUrl: ['avatar', 'id'],
      displayName: ['username', 'globalName'],
      defaultAvatarUrl: ['id', 'discriminator'],
      displayAvatarUrl: ['avatar', 'id', 'discriminator'],
      createdTimestamp: ['id'],
    },
    alwaysPresents: [],
  },

  emoji: {
    dependencies: {
      animated: ['toggles'],
      available: ['toggles'],
      managed: ['toggles'],
      requireColons: ['toggles'],
    },
    alwaysPresents: ['toggles'],
  },
} as const satisfies DesiredPropertiesMetadata;

/**
 * Metadata for typescript to create the correct types for desired properties
 *
 * @private This is subject to breaking changes without notices
 */
type TransformersDesiredPropertiesMetadata = CompleteByKeys<
  typeof transformersDesiredPropertiesMetadata,
  keyof DesiredPropertiesMetadata,
  { dependencies: {}; alwaysPresents: [] }
>;

export function createDesiredPropertiesObject<T extends RecursivePartial<TransformersDesiredProperties>, TDefault extends boolean = false>(
  desiredProperties: T,
  defaultValue: TDefault = false as TDefault,
): CompleteDesiredProperties<T, TDefault> {
  return {
    activity: {
      name: defaultValue,
      type: defaultValue,
      url: defaultValue,
      createdAt: defaultValue,
      timestamps: defaultValue,
      applicationId: defaultValue,
      statusDisplayType: defaultValue,
      details: defaultValue,
      detailsUrl: defaultValue,
      state: defaultValue,
      stateUrl: defaultValue,
      emoji: defaultValue,
      party: defaultValue,
      assets: defaultValue,
      secrets: defaultValue,
      instance: defaultValue,
      flags: defaultValue,
      buttons: defaultValue,
      ...desiredProperties.activity,
    },
    activityAssets: {
      largeImage: defaultValue,
      largeText: defaultValue,
      largeUrl: defaultValue,
      smallImage: defaultValue,
      smallText: defaultValue,
      smallUrl: defaultValue,
      inviteCoverImage: defaultValue,
      ...desiredProperties.activityAssets,
    },
    activityEmoji: {
      id: defaultValue,
      animated: defaultValue,
      name: defaultValue,
      ...desiredProperties.activityEmoji,
    },
    activityInstance: {
      applicationId: defaultValue,
      instanceId: defaultValue,
      launchId: defaultValue,
      location: defaultValue,
      users: defaultValue,
      ...desiredProperties.activityInstance,
    },
    activityLocation: {
      channelId: defaultValue,
      guildId: defaultValue,
      id: defaultValue,
      kind: defaultValue,
      ...desiredProperties.activityLocation,
    },
    application: {
      flags: defaultValue,
      flagsNew: defaultValue,
      icon: defaultValue,
      rpcOrigins: defaultValue,
      termsOfServiceUrl: defaultValue,
      privacyPolicyUrl: defaultValue,
      primarySkuId: defaultValue,
      slug: defaultValue,
      coverImage: defaultValue,
      owner: defaultValue,
      team: defaultValue,
      guildId: defaultValue,
      guild: defaultValue,
      id: defaultValue,
      name: defaultValue,
      description: defaultValue,
      botPublic: defaultValue,
      botRequireCodeGrant: defaultValue,
      verifyKey: defaultValue,
      customInstallUrl: defaultValue,
      approximateGuildCount: defaultValue,
      approximateUserInstallCount: defaultValue,
      approximateUserAuthorizationCount: defaultValue,
      installParams: defaultValue,
      bot: defaultValue,
      redirectUris: defaultValue,
      interactionsEndpointUrl: defaultValue,
      integrationTypesConfig: defaultValue,
      roleConnectionsVerificationUrl: defaultValue,
      tags: defaultValue,
      eventWebhooksUrl: defaultValue,
      eventWebhooksStatus: defaultValue,
      eventWebhooksTypes: defaultValue,
      ...desiredProperties.application,
    },
    applicationCommand: {
      options: defaultValue,
      description: defaultValue,
      guildId: defaultValue,
      nameLocalizations: defaultValue,
      descriptionLocalizations: defaultValue,
      defaultMemberPermissions: defaultValue,
      type: defaultValue,
      version: defaultValue,
      id: defaultValue,
      name: defaultValue,
      applicationId: defaultValue,
      dmPermission: defaultValue,
      ...desiredProperties.applicationCommand,
    },
    applicationCommandOption: {
      type: defaultValue,
      name: defaultValue,
      nameLocalizations: defaultValue,
      description: defaultValue,
      descriptionLocalizations: defaultValue,
      required: defaultValue,
      choices: defaultValue,
      options: defaultValue,
      channelTypes: defaultValue,
      minValue: defaultValue,
      maxValue: defaultValue,
      minLength: defaultValue,
      maxLength: defaultValue,
      autocomplete: defaultValue,
      fileTypes: defaultValue,
      ...desiredProperties.applicationCommandOption,
    },
    applicationCommandOptionChoice: {
      nameLocalizations: defaultValue,
      name: defaultValue,
      value: defaultValue,
      ...desiredProperties.applicationCommandOptionChoice,
    },
    applicationCommandPermissions: {
      id: defaultValue,
      type: defaultValue,
      permission: defaultValue,
      ...desiredProperties.applicationCommandPermissions,
    },
    attachment: {
      id: defaultValue,
      filename: defaultValue,
      title: defaultValue,
      contentType: defaultValue,
      size: defaultValue,
      url: defaultValue,
      proxyUrl: defaultValue,
      height: defaultValue,
      width: defaultValue,
      ephemeral: defaultValue,
      description: defaultValue,
      duration_secs: defaultValue,
      waveform: defaultValue,
      flags: defaultValue,
      application: defaultValue,
      clipCreatedAt: defaultValue,
      clipParticipants: defaultValue,
      placeholder: defaultValue,
      placeholderVersion: defaultValue,
      ...desiredProperties.attachment,
    },
    auditLogEntry: {
      id: defaultValue,
      userId: defaultValue,
      reason: defaultValue,
      changes: defaultValue,
      targetId: defaultValue,
      actionType: defaultValue,
      options: defaultValue,
      ...desiredProperties.auditLogEntry,
    },
    autoModerationAction: {
      type: defaultValue,
      metadata: defaultValue,
      ...desiredProperties.autoModerationAction,
    },
    autoModerationActionExecution: {
      channelId: defaultValue,
      messageId: defaultValue,
      alertSystemMessageId: defaultValue,
      guildId: defaultValue,
      userId: defaultValue,
      content: defaultValue,
      action: defaultValue,
      ruleTriggerType: defaultValue,
      ruleId: defaultValue,
      matchedKeyword: defaultValue,
      matchedContent: defaultValue,
      ...desiredProperties.autoModerationActionExecution,
    },
    autoModerationActionMetadata: {
      customMessage: defaultValue,
      durationSeconds: defaultValue,
      channelId: defaultValue,
      ...desiredProperties.autoModerationActionMetadata,
    },
    autoModerationRule: {
      triggerMetadata: defaultValue,
      id: defaultValue,
      name: defaultValue,
      guildId: defaultValue,
      eventType: defaultValue,
      triggerType: defaultValue,
      enabled: defaultValue,
      creatorId: defaultValue,
      exemptRoles: defaultValue,
      exemptChannels: defaultValue,
      actions: defaultValue,
      ...desiredProperties.autoModerationRule,
    },
    autoModerationRuleTriggerMetadata: {
      keywordFilter: defaultValue,
      regexPatterns: defaultValue,
      presets: defaultValue,
      allowList: defaultValue,
      mentionTotalLimit: defaultValue,
      mentionRaidProtectionEnabled: defaultValue,
      ...desiredProperties.autoModerationRuleTriggerMetadata,
    },
    channel: {
      type: defaultValue,
      position: defaultValue,
      name: defaultValue,
      topic: defaultValue,
      bitrate: defaultValue,
      userLimit: defaultValue,
      rateLimitPerUser: defaultValue,
      rtcRegion: defaultValue,
      videoQualityMode: defaultValue,
      guildId: defaultValue,
      lastPinTimestamp: defaultValue,
      permissionOverwrites: defaultValue,
      id: defaultValue,
      permissions: defaultValue,
      appPermissions: defaultValue,
      lastMessageId: defaultValue,
      ownerId: defaultValue,
      applicationId: defaultValue,
      parentId: defaultValue,
      memberCount: defaultValue,
      messageCount: defaultValue,
      defaultAutoArchiveDuration: defaultValue,
      flags: defaultValue,
      appliedTags: defaultValue,
      availableTags: defaultValue,
      defaultForumLayout: defaultValue,
      defaultReactionEmoji: defaultValue,
      defaultSortOrder: defaultValue,
      defaultThreadRateLimitPerUser: defaultValue,
      icon: defaultValue,
      member: defaultValue,
      recipients: defaultValue,
      totalMessageSent: defaultValue,
      threadMetadata: defaultValue,
      ...desiredProperties.channel,
    },
    channelInfo: {
      guildId: defaultValue,
      channels: defaultValue,
      ...desiredProperties.channelInfo,
    },
    channelInfoData: {
      id: defaultValue,
      voiceStartTime: defaultValue,
      status: defaultValue,
      ...desiredProperties.channelInfoData,
    },
    collectibles: {
      nameplate: defaultValue,
      ...desiredProperties.collectibles,
    },
    component: {
      type: defaultValue,
      customId: defaultValue,
      required: defaultValue,
      disabled: defaultValue,
      style: defaultValue,
      label: defaultValue,
      value: defaultValue,
      default: defaultValue,
      emoji: defaultValue,
      url: defaultValue,
      channelTypes: defaultValue,
      options: defaultValue,
      placeholder: defaultValue,
      minValues: defaultValue,
      maxValues: defaultValue,
      minLength: defaultValue,
      maxLength: defaultValue,
      components: defaultValue,
      defaultValues: defaultValue,
      skuId: defaultValue,
      id: defaultValue,
      accessory: defaultValue,
      content: defaultValue,
      description: defaultValue,
      spoiler: defaultValue,
      items: defaultValue,
      divider: defaultValue,
      spacing: defaultValue,
      file: defaultValue,
      media: defaultValue,
      accentColor: defaultValue,
      name: defaultValue,
      size: defaultValue,
      component: defaultValue,
      values: defaultValue,
      resolved: defaultValue,
      fileTypes: defaultValue,
      ...desiredProperties.component,
    },
    embed: {
      description: defaultValue,
      type: defaultValue,
      url: defaultValue,
      image: defaultValue,
      video: defaultValue,
      title: defaultValue,
      timestamp: defaultValue,
      color: defaultValue,
      footer: defaultValue,
      thumbnail: defaultValue,
      provider: defaultValue,
      author: defaultValue,
      fields: defaultValue,
      components: defaultValue,
      flags: defaultValue,
      ...desiredProperties.embed,
    },
    embedAuthor: {
      url: defaultValue,
      iconUrl: defaultValue,
      proxyIconUrl: defaultValue,
      name: defaultValue,
      ...desiredProperties.embedAuthor,
    },
    embedFooter: {
      iconUrl: defaultValue,
      proxyIconUrl: defaultValue,
      text: defaultValue,
      ...desiredProperties.embedFooter,
    },
    embedMedia: {
      proxyUrl: defaultValue,
      height: defaultValue,
      width: defaultValue,
      url: defaultValue,
      contentType: defaultValue,
      placeholder: defaultValue,
      placeholderVersion: defaultValue,
      description: defaultValue,
      flags: defaultValue,
      ...desiredProperties.embedMedia,
    },
    forumTag: {
      emojiId: defaultValue,
      emojiName: defaultValue,
      id: defaultValue,
      moderated: defaultValue,
      name: defaultValue,
      ...desiredProperties.forumTag,
    },
    emoji: {
      id: defaultValue,
      name: defaultValue,
      roles: defaultValue,
      user: defaultValue,
      ...desiredProperties.emoji,
    },
    defaultReactionEmoji: {
      emojiId: defaultValue,
      emojiName: defaultValue,
      ...desiredProperties.defaultReactionEmoji,
    },
    guild: {
      afkTimeout: defaultValue,
      approximateMemberCount: defaultValue,
      approximatePresenceCount: defaultValue,
      defaultMessageNotifications: defaultValue,
      description: defaultValue,
      explicitContentFilter: defaultValue,
      maxMembers: defaultValue,
      maxPresences: defaultValue,
      maxVideoChannelUsers: defaultValue,
      mfaLevel: defaultValue,
      name: defaultValue,
      channels: defaultValue,
      emojis: defaultValue,
      iconHash: defaultValue,
      large: defaultValue,
      members: defaultValue,
      owner: defaultValue,
      presences: defaultValue,
      roles: defaultValue,
      stickers: defaultValue,
      toggles: defaultValue,
      unavailable: defaultValue,
      voiceStates: defaultValue,
      widgetEnabled: defaultValue,
      nsfwLevel: defaultValue,
      preferredLocale: defaultValue,
      premiumSubscriptionCount: defaultValue,
      premiumTier: defaultValue,
      stageInstances: defaultValue,
      systemChannelFlags: defaultValue,
      vanityUrlCode: defaultValue,
      verificationLevel: defaultValue,
      welcomeScreen: defaultValue,
      discoverySplash: defaultValue,
      joinedAt: defaultValue,
      memberCount: defaultValue,
      shardId: defaultValue,
      icon: defaultValue,
      banner: defaultValue,
      splash: defaultValue,
      id: defaultValue,
      ownerId: defaultValue,
      permissions: defaultValue,
      afkChannelId: defaultValue,
      widgetChannelId: defaultValue,
      applicationId: defaultValue,
      systemChannelId: defaultValue,
      rulesChannelId: defaultValue,
      publicUpdatesChannelId: defaultValue,
      premiumProgressBarEnabled: defaultValue,
      safetyAlertsChannelId: defaultValue,
      maxStageVideoChannelUsers: defaultValue,
      incidentsData: defaultValue,
      ...desiredProperties.guild,
    },
    guildApplicationCommandPermissions: {
      id: defaultValue,
      guildId: defaultValue,
      applicationId: defaultValue,
      permissions: defaultValue,
      ...desiredProperties.guildApplicationCommandPermissions,
    },
    guildWidget: {
      id: defaultValue,
      name: defaultValue,
      members: defaultValue,
      channels: defaultValue,
      instantInvite: defaultValue,
      presenceCount: defaultValue,
      ...desiredProperties.guildWidget,
    },
    guildWidgetSettings: {
      channelId: defaultValue,
      enabled: defaultValue,
      ...desiredProperties.guildWidgetSettings,
    },
    incidentsData: {
      dmSpamDetectedAt: defaultValue,
      dmsDisabledUntil: defaultValue,
      invitesDisabledUntil: defaultValue,
      raidDetectedAt: defaultValue,
      ...desiredProperties.incidentsData,
    },
    integration: {
      user: defaultValue,
      enabled: defaultValue,
      syncing: defaultValue,
      roleId: defaultValue,
      enableEmoticons: defaultValue,
      expireBehavior: defaultValue,
      expireGracePeriod: defaultValue,
      syncedAt: defaultValue,
      subscriberCount: defaultValue,
      revoked: defaultValue,
      application: defaultValue,
      id: defaultValue,
      name: defaultValue,
      guildId: defaultValue,
      type: defaultValue,
      account: defaultValue,
      scopes: defaultValue,
      ...desiredProperties.integration,
    },
    integrationAccount: {
      id: defaultValue,
      name: defaultValue,
      ...desiredProperties.integrationAccount,
    },
    integrationApplication: {
      bot: defaultValue,
      icon: defaultValue,
      id: defaultValue,
      name: defaultValue,
      description: defaultValue,
      ...desiredProperties.integrationApplication,
    },
    interaction: {
      id: defaultValue,
      applicationId: defaultValue,
      type: defaultValue,
      guild: defaultValue,
      guildId: defaultValue,
      channel: defaultValue,
      channelId: defaultValue,
      member: defaultValue,
      user: defaultValue,
      token: defaultValue,
      version: defaultValue,
      message: defaultValue,
      data: defaultValue,
      locale: defaultValue,
      guildLocale: defaultValue,
      entitlements: defaultValue,
      appPermissions: defaultValue,
      authorizingIntegrationOwners: defaultValue,
      context: defaultValue,
      attachmentSizeLimit: defaultValue,
      ...desiredProperties.interaction,
    },
    interactionCallback: {
      type: defaultValue,
      id: defaultValue,
      activityInstanceId: defaultValue,
      responseMessageEphemeral: defaultValue,
      responseMessageId: defaultValue,
      responseMessageLoading: defaultValue,
      ...desiredProperties.interactionCallback,
    },
    interactionCallbackResponse: {
      interaction: defaultValue,
      resource: defaultValue,
      ...desiredProperties.interactionCallbackResponse,
    },
    interactionResource: {
      type: defaultValue,
      activityInstance: defaultValue,
      message: defaultValue,
      ...desiredProperties.interactionResource,
    },
    invite: {
      type: defaultValue,
      channelId: defaultValue,
      code: defaultValue,
      createdAt: defaultValue,
      guildId: defaultValue,
      inviter: defaultValue,
      maxAge: defaultValue,
      maxUses: defaultValue,
      targetType: defaultValue,
      targetUser: defaultValue,
      targetApplication: defaultValue,
      temporary: defaultValue,
      uses: defaultValue,
      approximateMemberCount: defaultValue,
      approximatePresenceCount: defaultValue,
      guildScheduledEvent: defaultValue,
      expiresAt: defaultValue,
      flags: defaultValue,
      roles: defaultValue,
      ...desiredProperties.invite,
    },
    member: {
      id: defaultValue,
      guildId: defaultValue,
      user: defaultValue,
      nick: defaultValue,
      roles: defaultValue,
      joinedAt: defaultValue,
      premiumSince: defaultValue,
      avatar: defaultValue,
      banner: defaultValue,
      permissions: defaultValue,
      communicationDisabledUntil: defaultValue,
      toggles: defaultValue,
      avatarDecorationData: defaultValue,
      collectibles: defaultValue,
      ...desiredProperties.member,
    },
    message: {
      activity: defaultValue,
      application: defaultValue,
      applicationId: defaultValue,
      attachments: defaultValue,
      author: defaultValue,
      channelId: defaultValue,
      components: defaultValue,
      content: defaultValue,
      editedTimestamp: defaultValue,
      embeds: defaultValue,
      guildId: defaultValue,
      id: defaultValue,
      interactionMetadata: defaultValue,
      interaction: defaultValue,
      member: defaultValue,
      mentionedChannelIds: defaultValue,
      mentionedRoleIds: defaultValue,
      mentions: defaultValue,
      channelType: defaultValue,
      messageReference: defaultValue,
      messageSnapshots: defaultValue,
      referencedMessage: defaultValue,
      nonce: defaultValue,
      reactions: defaultValue,
      stickerItems: defaultValue,
      thread: defaultValue,
      type: defaultValue,
      webhookId: defaultValue,
      poll: defaultValue,
      call: defaultValue,
      sharedClientTheme: defaultValue,
      resolved: defaultValue,
      ...desiredProperties.message,
    },
    messageSnapshot: {
      message: defaultValue,
      ...desiredProperties.messageSnapshot,
    },
    messageInteractionMetadata: {
      id: defaultValue,
      type: defaultValue,
      user: defaultValue,
      authorizingIntegrationOwners: defaultValue,
      originalResponseMessageId: defaultValue,
      interactedMessageId: defaultValue,
      triggeringInteractionMetadata: defaultValue,
      targetMessageId: defaultValue,
      targetUser: defaultValue,
      ...desiredProperties.messageInteractionMetadata,
    },
    messagePin: {
      message: defaultValue,
      pinnedAt: defaultValue,
      ...desiredProperties.messagePin,
    },
    messageInteraction: {
      id: defaultValue,
      member: defaultValue,
      name: defaultValue,
      type: defaultValue,
      user: defaultValue,
      ...desiredProperties.messageInteraction,
    },
    messageReference: {
      messageId: defaultValue,
      channelId: defaultValue,
      guildId: defaultValue,
      ...desiredProperties.messageReference,
    },
    messageCall: {
      participants: defaultValue,
      endedTimestamp: defaultValue,
      ...desiredProperties.messageCall,
    },
    nameplate: {
      skuId: defaultValue,
      asset: defaultValue,
      label: defaultValue,
      palette: defaultValue,
      ...desiredProperties.nameplate,
    },
    optionalAuditEntryInfo: {
      applicationId: defaultValue,
      autoModerationRuleName: defaultValue,
      autoModerationRuleTriggerType: defaultValue,
      channelId: defaultValue,
      count: defaultValue,
      deleteMemberDays: defaultValue,
      id: defaultValue,
      membersRemoved: defaultValue,
      messageId: defaultValue,
      roleName: defaultValue,
      type: defaultValue,
      integrationType: defaultValue,
      status: defaultValue,
      ...desiredProperties.optionalAuditEntryInfo,
    },
    presence: {
      desktop: defaultValue,
      mobile: defaultValue,
      web: defaultValue,
      vr: defaultValue,
      user: defaultValue,
      guildId: defaultValue,
      status: defaultValue,
      activities: defaultValue,
      ...desiredProperties.presence,
    },
    role: {
      name: defaultValue,
      guildId: defaultValue,
      position: defaultValue,
      color: defaultValue,
      colors: defaultValue,
      id: defaultValue,
      permissions: defaultValue,
      icon: defaultValue,
      unicodeEmoji: defaultValue,
      flags: defaultValue,
      tags: defaultValue,
      toggles: defaultValue,
      ...desiredProperties.role,
    },
    roleColors: {
      primaryColor: defaultValue,
      secondaryColor: defaultValue,
      tertiaryColor: defaultValue,
      ...desiredProperties.roleColors,
    },
    scheduledEvent: {
      id: defaultValue,
      guildId: defaultValue,
      channelId: defaultValue,
      creatorId: defaultValue,
      scheduledStartTime: defaultValue,
      scheduledEndTime: defaultValue,
      entityId: defaultValue,
      creator: defaultValue,
      name: defaultValue,
      description: defaultValue,
      privacyLevel: defaultValue,
      status: defaultValue,
      entityType: defaultValue,
      userCount: defaultValue,
      location: defaultValue,
      image: defaultValue,
      recurrenceRule: defaultValue,
      ...desiredProperties.scheduledEvent,
    },
    scheduledEventRecurrenceRule: {
      start: defaultValue,
      end: defaultValue,
      frequency: defaultValue,
      interval: defaultValue,
      byWeekday: defaultValue,
      byNWeekday: defaultValue,
      byMonth: defaultValue,
      byMonthDay: defaultValue,
      byYearDay: defaultValue,
      count: defaultValue,
      ...desiredProperties.scheduledEventRecurrenceRule,
    },
    sharedClientTheme: {
      colors: defaultValue,
      baseMix: defaultValue,
      gradientAngle: defaultValue,
      baseTheme: defaultValue,
      ...desiredProperties.sharedClientTheme,
    },
    stageInstance: {
      id: defaultValue,
      guildId: defaultValue,
      channelId: defaultValue,
      topic: defaultValue,
      guildScheduledEventId: defaultValue,
      ...desiredProperties.stageInstance,
    },
    inviteStageInstance: {
      members: defaultValue,
      participantCount: defaultValue,
      speakerCount: defaultValue,
      topic: defaultValue,
      ...desiredProperties.inviteStageInstance,
    },
    mediaGalleryItem: {
      media: defaultValue,
      description: defaultValue,
      spoiler: defaultValue,
      ...desiredProperties.mediaGalleryItem,
    },
    sticker: {
      id: defaultValue,
      packId: defaultValue,
      name: defaultValue,
      description: defaultValue,
      tags: defaultValue,
      type: defaultValue,
      formatType: defaultValue,
      available: defaultValue,
      guildId: defaultValue,
      user: defaultValue,
      sortValue: defaultValue,
      ...desiredProperties.sticker,
    },
    stickerPack: {
      coverStickerId: defaultValue,
      bannerAssetId: defaultValue,
      id: defaultValue,
      name: defaultValue,
      description: defaultValue,
      stickers: defaultValue,
      skuId: defaultValue,
      ...desiredProperties.stickerPack,
    },
    team: {
      icon: defaultValue,
      id: defaultValue,
      name: defaultValue,
      ownerUserId: defaultValue,
      members: defaultValue,
      ...desiredProperties.team,
    },
    teamMember: {
      membershipState: defaultValue,
      teamId: defaultValue,
      user: defaultValue,
      role: defaultValue,
      ...desiredProperties.teamMember,
    },
    template: {
      description: defaultValue,
      isDirty: defaultValue,
      name: defaultValue,
      creatorId: defaultValue,
      createdAt: defaultValue,
      code: defaultValue,
      usageCount: defaultValue,
      creator: defaultValue,
      updatedAt: defaultValue,
      sourceGuildId: defaultValue,
      serializedSourceGuild: defaultValue,
      ...desiredProperties.template,
    },
    threadMember: {
      flags: defaultValue,
      id: defaultValue,
      userId: defaultValue,
      joinTimestamp: defaultValue,
      member: defaultValue,
      ...desiredProperties.threadMember,
    },
    threadMemberGuildCreate: {
      joinTimestamp: defaultValue,
      ...desiredProperties.threadMemberGuildCreate,
    },
    unfurledMediaItem: {
      url: defaultValue,
      proxyUrl: defaultValue,
      height: defaultValue,
      width: defaultValue,
      contentType: defaultValue,
      attachmentId: defaultValue,
      flags: defaultValue,
      placeholder: defaultValue,
      placeholderVersion: defaultValue,
      contentScanMetadata: defaultValue,
      ...desiredProperties.unfurledMediaItem,
    },
    user: {
      username: defaultValue,
      globalName: defaultValue,
      locale: defaultValue,
      flags: defaultValue,
      premiumType: defaultValue,
      publicFlags: defaultValue,
      accentColor: defaultValue,
      id: defaultValue,
      discriminator: defaultValue,
      avatar: defaultValue,
      email: defaultValue,
      banner: defaultValue,
      avatarDecorationData: defaultValue,
      toggles: defaultValue,
      collectibles: defaultValue,
      primaryGuild: defaultValue,
      ...desiredProperties.user,
    },
    userPrimaryGuild: {
      identityGuildId: defaultValue,
      identityEnabled: defaultValue,
      tag: defaultValue,
      badge: defaultValue,
      ...desiredProperties.userPrimaryGuild,
    },
    avatarDecorationData: {
      asset: defaultValue,
      skuId: defaultValue,
      ...desiredProperties.avatarDecorationData,
    },
    voiceRegion: {
      id: defaultValue,
      name: defaultValue,
      custom: defaultValue,
      optimal: defaultValue,
      deprecated: defaultValue,
      ...desiredProperties.voiceRegion,
    },
    webhook: {
      id: defaultValue,
      type: defaultValue,
      guildId: defaultValue,
      channelId: defaultValue,
      user: defaultValue,
      name: defaultValue,
      avatar: defaultValue,
      token: defaultValue,
      applicationId: defaultValue,
      sourceGuild: defaultValue,
      sourceChannel: defaultValue,
      url: defaultValue,
      ...desiredProperties.webhook,
    },
    guildOnboarding: {
      defaultChannelIds: defaultValue,
      enabled: defaultValue,
      guildId: defaultValue,
      mode: defaultValue,
      prompts: defaultValue,
      ...desiredProperties.guildOnboarding,
    },
    guildOnboardingPrompt: {
      id: defaultValue,
      inOnboarding: defaultValue,
      options: defaultValue,
      required: defaultValue,
      singleSelect: defaultValue,
      title: defaultValue,
      type: defaultValue,
      ...desiredProperties.guildOnboardingPrompt,
    },
    guildOnboardingPromptOption: {
      channelIds: defaultValue,
      description: defaultValue,
      emoji: defaultValue,
      id: defaultValue,
      roleIds: defaultValue,
      title: defaultValue,
      ...desiredProperties.guildOnboardingPromptOption,
    },
    entitlement: {
      id: defaultValue,
      skuId: defaultValue,
      userId: defaultValue,
      guildId: defaultValue,
      applicationId: defaultValue,
      type: defaultValue,
      deleted: defaultValue,
      startsAt: defaultValue,
      endsAt: defaultValue,
      consumed: defaultValue,
      ...desiredProperties.entitlement,
    },
    sku: {
      id: defaultValue,
      type: defaultValue,
      applicationId: defaultValue,
      name: defaultValue,
      slug: defaultValue,
      flags: defaultValue,
      ...desiredProperties.sku,
    },
    voiceState: {
      requestToSpeakTimestamp: defaultValue,
      channelId: defaultValue,
      guildId: defaultValue,
      toggles: defaultValue,
      sessionId: defaultValue,
      userId: defaultValue,
      ...desiredProperties.voiceState,
    },
    poll: {
      question: defaultValue,
      answers: defaultValue,
      expiry: defaultValue,
      layoutType: defaultValue,
      allowMultiselect: defaultValue,
      results: defaultValue,
      ...desiredProperties.poll,
    },
    pollAnswer: {
      answerId: defaultValue,
      pollMedia: defaultValue,
      ...desiredProperties.pollAnswer,
    },
    pollResult: {
      isFinalized: defaultValue,
      answerCounts: defaultValue,
      ...desiredProperties.pollResult,
    },
    pollAnswerCount: {
      id: defaultValue,
      count: defaultValue,
      meVoted: defaultValue,
      ...desiredProperties.pollAnswerCount,
    },
    pollMedia: {
      text: defaultValue,
      emoji: defaultValue,
      ...desiredProperties.pollMedia,
    },
    subscription: {
      canceledAt: defaultValue,
      country: defaultValue,
      currentPeriodEnd: defaultValue,
      currentPeriodStart: defaultValue,
      renewalSkuIds: defaultValue,
      entitlementIds: defaultValue,
      id: defaultValue,
      skuIds: defaultValue,
      status: defaultValue,
      userId: defaultValue,
      ...desiredProperties.subscription,
    },
    soundboardSound: {
      available: defaultValue,
      emojiId: defaultValue,
      emojiName: defaultValue,
      guildId: defaultValue,
      name: defaultValue,
      soundId: defaultValue,
      user: defaultValue,
      volume: defaultValue,
      ...desiredProperties.soundboardSound,
    },
    lobby: {
      id: defaultValue,
      applicationId: defaultValue,
      metadata: defaultValue,
      members: defaultValue,
      linkedChannel: defaultValue,
      ...desiredProperties.lobby,
    },
    lobbyMember: {
      id: defaultValue,
      metadata: defaultValue,
      flags: defaultValue,
      additionalName: defaultValue,
      ...desiredProperties.lobbyMember,
    },
    lobbyMessage: {
      id: defaultValue,
      content: defaultValue,
      applicationId: defaultValue,
      flags: defaultValue,
      author: defaultValue,
      lobbyMember: defaultValue,
      channelId: defaultValue,
      lobbyId: defaultValue,
      metadata: defaultValue,
      moderationMetadata: defaultValue,
      type: defaultValue,
      ...desiredProperties.lobbyMessage,
    },
    lobbyMessageLobbyMember: {
      additionalName: defaultValue,
      ...desiredProperties.lobbyMessageLobbyMember,
    },
    lobbyInvite: {
      code: defaultValue,
      ...desiredProperties.lobbyInvite,
    },
    welcomeScreen: {
      description: defaultValue,
      welcomeChannels: defaultValue,
      ...desiredProperties.welcomeScreen,
    },
    welcomeScreenChannel: {
      channelId: defaultValue,
      description: defaultValue,
      emojiId: defaultValue,
      emojiName: defaultValue,
      ...desiredProperties.welcomeScreenChannel,
    },
  } satisfies TransformersDesiredProperties as CompleteDesiredProperties<T, TDefault>;
}

/** @private This is subject to breaking changes without notices */
export type Equals<T1, T2> = Required<T1> extends Required<T2> ? (Required<T2> extends Required<T1> ? true : false) : false;

/** @private This is subject to breaking changes without notices */
export type KeyByValue<TObj, TValue> = {
  [Key in keyof TObj]: Equals<TObj[Key], TValue> extends true ? Key : never;
}[keyof TObj];

/** @private This is subject to breaking changes without notices */
export type Complete<TObj, TDefault> = {
  [K in keyof TObj]-?: undefined extends TObj[K] ? TDefault : Exclude<TObj[K], undefined>;
};

/** @private This is subject to breaking changes without notices */
export type CompleteByKeys<TObj, Keys extends string, TDefault> = {
  [K in Keys]-?: K extends keyof TObj ? (undefined extends TObj[K] ? TDefault : Exclude<TObj[K], undefined>) : TDefault;
};

/** @private This is subject to breaking changes without notices */
export type JoinTuple<T extends string[], TDelimiter extends string> = T extends readonly [infer F extends string, ...infer R extends string[]]
  ? R['length'] extends 0
    ? F
    : `${F}${TDelimiter}${JoinTuple<R, TDelimiter>}`
  : '';

/** @private This is subject to breaking changes without notices */
export type DesiredPropertiesMetadata = {
  [K in keyof TransformersObjects]?: {
    dependencies: {
      [Key in keyof TransformersObjects[K]]?: (keyof TransformersObjects[K])[];
    };
    alwaysPresents: (keyof TransformersObjects[K])[];
  };
};

/** @private This is subject to breaking changes without notices */
export type DesirableProperties<T extends TransformersObjects[keyof TransformersObjects]> = Exclude<
  keyof T,
  // Exclude the props that depend on something else from the desirable properties
  | keyof TransformersDesiredPropertiesMetadata[KeyByValue<TransformersObjects, T>]['dependencies']
  // Exclude the props that are always present
  | TransformersDesiredPropertiesMetadata[KeyByValue<TransformersObjects, T>]['alwaysPresents'][number]
>;

/** @private This is subject to breaking changes without notices */
export type DesiredPropertiesMapper<T extends TransformersObjects[keyof TransformersObjects]> = {
  [Key in DesirableProperties<T>]: boolean;
};

declare const TypeErrorSymbol: unique symbol;

/** @private This is subject to breaking changes without notices */
export interface DesiredPropertiesError<T extends string> {
  [TypeErrorSymbol]: T;
}

/** @private This is subject to breaking changes without notices */
export type AreDependenciesSatisfied<T, TDependencies extends Record<string, string[]> | undefined, TProps> = {
  [K in keyof T]: IsKeyDesired<T[K], TDependencies, TProps> extends true ? true : false;
};

/** @private This is subject to breaking changes without notices */
export type IsKeyDesired<TKey, TDependencies extends Record<string, string[]> | undefined, TProps> = TProps extends never // If the props are never, all props are allowed
  ? true
  : TKey extends keyof TProps // The key has a desired props?
    ? // Yes, is it true?
      TProps[TKey] extends true
      ? // Yes, this is a key to include
        true
      : // No, this is a key to exclude
        DesiredPropertiesError<`This property is not set as desired in desiredProperties option in createBot(), so you can't use it. More info here: https://discordeno.js.org/desired-props`>
    : // No, it is a props with dependencies?
      TKey extends keyof TDependencies
      ? // Yes, has all of its dependencies satisfied?
        AreDependenciesSatisfied<TDependencies[TKey], TDependencies, TProps> extends true[]
        ? // Yes, this is a key to include
          true
        : // No, this is a key to not include
          DesiredPropertiesError<`This property depends on the following properties: ${JoinTuple<NonNullable<TDependencies>[TKey], ', '>}. Not all of these props are set as desired in desiredProperties option in createBot(), so you can't use it. More info here: https://discordeno.js.org/desired-props`>
      : // No, we include it but it does not have neither props nor dependencies
        true;

/** The behavior it should be used when resolving an undesired property */
export enum DesiredPropertiesBehavior {
  /** When this behavior is used the key will be missing completely */
  RemoveKey,
  /** When this behavior is used the key will be a string explaining why the property is disabled */
  ChangeType,
}

/** @private This is subject to breaking changes without notices */
export type RemoveKeyIfUndesired<Key, T, TProps extends TransformersDesiredProperties> =
  IsKeyDesired<
    Key,
    TransformersDesiredPropertiesMetadata[KeyByValue<TransformersObjects, T>]['dependencies'],
    TProps[KeyByValue<TransformersObjects, T>]
  > extends true
    ? Key
    : never;

/** @private This is subject to breaking changes without notices */
export type GetErrorWhenUndesired<
  Key extends keyof T,
  T,
  TProps extends TransformersDesiredProperties,
  TBehavior extends DesiredPropertiesBehavior,
  // This generic value is used as an alias
  TIsDesired = IsKeyDesired<
    Key,
    TransformersDesiredPropertiesMetadata[KeyByValue<TransformersObjects, T>]['dependencies'],
    TProps[KeyByValue<TransformersObjects, T>]
  >,
> = TIsDesired extends true ? TransformProperty<T[Key], TProps, TBehavior> : TIsDesired;

/** @private This is subject to breaking changes without notices */
export type IsObject<T> = T extends object ? (T extends Function ? false : true) : false;

// If the object is a transformed object, a collection of transformed object or an array of transformed objects we need to apply the desired props to them as well
// NOTE: changing the order of these ternaries can cause bugs, for this reason we check in this order:
//      - Is it an array?
//      - Is it a collection?
//      - Is it a bot?
//      - Is it a function? (before the transformed object check, since a function can structurally match a transformed object, e.g. `Function.name` matches `{ name: string }`)
//      - Is it a transformed object?
//      - Is it an interaction resolved data member?
//      - Is it an interaction resolved data channel?
//      - Is it an object?
//      - It's not an object

/**
 * Transform a generic object properties based on the desired properties and behavior for other transformer objects in the object.
 */
export type TransformProperty<T, TProps extends TransformersDesiredProperties, TBehavior extends DesiredPropertiesBehavior> =
  T extends Array<infer U> // is it an array?
    ? // Yes, apply the desired props
      TransformProperty<U, TProps, TBehavior>[]
    : // No, is it a collection?
      T extends Collection<infer U, infer UObj>
      ? // Yes, check for nested proprieties
        Collection<U, TransformProperty<UObj, TProps, TBehavior>>
      : // No, is it a Bot?
        Equals<T, Bot> extends true
        ? // Yes, return a bot with the correct set of props & behavior
          Bot<TProps, TBehavior>
        : // No, is it an async function?
          T extends (...args: infer P) => Promise<infer R>
          ? // Yes, we need to ensure we transform the return type as well
            (...args: P) => Promise<TransformProperty<R, TProps, TBehavior>>
          : // No, is it any other function?
            T extends Function
            ? // Yes, keep it as is
              T
            : // No, is it a transformed object? | This needs to be an exact match, a structural `extends` would also match unrelated objects (e.g. any object sharing a key with an all-optional transformed object like `Embed`)
              [KeyByValue<TransformersObjects, T>] extends [never]
              ? // No, is it an interaction resolved data member? | We need to check this here because the type itself has not way of getting the desired props
                Equals<T, InteractionResolvedDataMember<TransformersDesiredProperties, DesiredPropertiesBehavior>> extends true
                ? // Yes, apply the desired props
                  InteractionResolvedDataMember<TProps, TBehavior>
                : // No, is it an interaction resolved data channel? | We need to check this here because the type itself has not way of getting the desired props
                  Equals<T, InteractionResolvedDataChannel<TransformersDesiredProperties, DesiredPropertiesBehavior>> extends true
                  ? // Yes, apply the desired props
                    InteractionResolvedDataChannel<TProps, TBehavior>
                  : // Is it an object?
                    IsObject<T> extends true
                    ? // Yes, we need to ensure we transform the nested properties as well
                      { [K in keyof T]: TransformProperty<T[K], TProps, TBehavior> }
                    : // No, this is a normal value such as string / bigint / number
                      T
              : // Yes, apply the desired props
                SetupDesiredProps<T, TProps, TBehavior>;

/**
 * Apply desired properties to an object.
 *
 * @remarks
 * If the object is not a transformed object that supports desired properties this function behaves the same as TransformProperty on the entire object
 */
export type SetupDesiredProps<
  T,
  TProps extends TransformersDesiredProperties,
  TBehavior extends DesiredPropertiesBehavior = DesiredPropertiesBehavior.RemoveKey,
> = {
  // When the behavior is to remove the key we use the RemoveKeyIfUndesired type helper else return the Key as is
  [Key in keyof T as TBehavior extends DesiredPropertiesBehavior.RemoveKey
    ? RemoveKeyIfUndesired<Key, T, TProps>
    : Key]: // When the behavior is to change the type we use the GetErrorWhenUndesired type helper else apply the desired props to the key and return
  TBehavior extends DesiredPropertiesBehavior.ChangeType
    ? GetErrorWhenUndesired<Key, T, TProps, TBehavior>
    : TransformProperty<T[Key], TProps, TBehavior>;
};

/**
 * The desired properties for each transformer object.
 */
export type TransformersDesiredProperties = {
  [Key in keyof TransformersObjects]: DesiredPropertiesMapper<TransformersObjects[Key]>;
};

/** @private This is subject to breaking changes without notices */
export type CompleteDesiredProperties<T extends RecursivePartial<TransformersDesiredProperties>, TTDefault extends boolean = false> = {
  [K in keyof TransformersDesiredProperties]: Complete<Partial<TransformersDesiredProperties[K]> & T[K], TTDefault>;
};
