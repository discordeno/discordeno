import type { RecursivePartial } from '@discordeno/types';
import type { Collection } from '@discordeno/utils';
import type { Bot } from './bot.js';
import type { InteractionResolvedDataChannel, InteractionResolvedDataMember } from './commandOptionsParser.js';
import type {
  ActivityInstance,
  ActivityLocation,
  Attachment,
  AvatarDecorationData,
  Channel,
  Collectibles,
  Component,
  DefaultReactionEmoji,
  Emoji,
  Entitlement,
  ForumTag,
  Guild,
  GuildOnboarding,
  GuildOnboardingPrompt,
  GuildOnboardingPromptOption,
  IncidentsData,
  Interaction,
  InteractionCallback,
  InteractionCallbackResponse,
  InteractionResource,
  Invite,
  InviteStageInstance,
  Lobby,
  LobbyMember,
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
  Poll,
  PollAnswer,
  PollAnswerCount,
  PollMedia,
  PollResult,
  Role,
  RoleColors,
  ScheduledEvent,
  ScheduledEventRecurrenceRule,
  Sku,
  SoundboardSound,
  StageInstance,
  Sticker,
  Subscription,
  UnfurledMediaItem,
  User,
  UserPrimaryGuild,
  VoiceState,
  Webhook,
} from './transformers/types.js';

/**
 * All the objects that support desired properties
 *
 * @private This is subject to breaking changes at any time
 */
export interface TransformersObjects {
  activityInstance: ActivityInstance;
  activityLocation: ActivityLocation;
  attachment: Attachment;
  avatarDecorationData: AvatarDecorationData;
  channel: Channel;
  collectibles: Collectibles;
  component: Component;
  defaultReactionEmoji: DefaultReactionEmoji;
  emoji: Emoji;
  entitlement: Entitlement;
  forumTag: ForumTag;
  guild: Guild;
  guildOnboarding: GuildOnboarding;
  guildOnboardingPrompt: GuildOnboardingPrompt;
  guildOnboardingPromptOption: GuildOnboardingPromptOption;
  incidentsData: IncidentsData;
  interaction: Interaction;
  interactionCallback: InteractionCallback;
  interactionCallbackResponse: InteractionCallbackResponse;
  interactionResource: InteractionResource;
  invite: Invite;
  inviteStageInstance: InviteStageInstance;
  lobby: Lobby;
  lobbyMember: LobbyMember;
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
  poll: Poll;
  pollAnswer: PollAnswer;
  pollAnswerCount: PollAnswerCount;
  pollMedia: PollMedia;
  pollResult: PollResult;
  role: Role;
  roleColors: RoleColors;
  scheduledEvent: ScheduledEvent;
  scheduledEventRecurrenceRule: ScheduledEventRecurrenceRule;
  sku: Sku;
  soundboardSound: SoundboardSound;
  stageInstance: StageInstance;
  sticker: Sticker;
  subscription: Subscription;
  unfurledMediaItem: UnfurledMediaItem;
  user: User;
  userPrimaryGuild: UserPrimaryGuild;
  voiceState: VoiceState;
  webhook: Webhook;
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
      ...desiredProperties.attachment,
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
      ...desiredProperties.component,
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
    incidentsData: {
      dmSpamDetectedAt: defaultValue,
      dmsDisabledUntil: defaultValue,
      invitesDisabledUntil: defaultValue,
      raidDetectedAt: defaultValue,
      ...desiredProperties.incidentsData,
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
    unfurledMediaItem: {
      url: defaultValue,
      proxyUrl: defaultValue,
      height: defaultValue,
      width: defaultValue,
      contentType: defaultValue,
      attachmentId: defaultValue,
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
      ...desiredProperties.lobbyMember,
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
export type RemoveKeyIfUndesired<Key, T, TProps extends TransformersDesiredProperties> = IsKeyDesired<
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
//      - Is it a transformed object?
//      - Is it an interaction resolved data member?
//      - Is it an interaction resolved data channel?
//      - Is it an object?
//      - It's not an object

/**
 * Transform a generic object properties based on the desired properties and behavior for other transformer objects in the object.
 */
export type TransformProperty<T, TProps extends TransformersDesiredProperties, TBehavior extends DesiredPropertiesBehavior> = T extends Array<infer U> // is it an array?
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
      : // No, is it a transformed object?
        T extends TransformersObjects[keyof TransformersObjects]
        ? // Yes, apply the desired props
          SetupDesiredProps<T, TProps, TBehavior>
        : // No, is it an interaction resolved data member? | We need to check this here because the type itself has not way of getting the desired props
          Equals<T, InteractionResolvedDataMember<TransformersDesiredProperties, DesiredPropertiesBehavior>> extends true
          ? // Yes, apply the desired props
            InteractionResolvedDataMember<TProps, TBehavior>
          : // No, is it an interaction resolved data channel? | We need to check this here because the type itself has not way of getting the desired props
            Equals<T, InteractionResolvedDataChannel<TransformersDesiredProperties, DesiredPropertiesBehavior>> extends true
            ? // Yes, apply the desired props
              InteractionResolvedDataChannel<TProps, TBehavior>
            : // Is it a function?
              T extends (...args: infer P) => Promise<infer R>
              ? // Yes, we need to ensure we transform the return type as well
                (...args: P) => Promise<TransformProperty<R, TProps, TBehavior>>
              : // Is it an object?
                IsObject<T> extends true
                ? // Yes, we need to ensure we transform the nested properties as well
                  { [K in keyof T]: TransformProperty<T[K], TProps, TBehavior> }
                : // No, this is a normal value such as string / bigint / number
                  T;

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
