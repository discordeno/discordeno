import type { RecursivePartial } from '@discordeno/types'
import type { Collection } from '@discordeno/utils'
import type { Bot } from './bot.js'
import type {
  ActivityInstance,
  ActivityLocation,
  Attachment,
  AvatarDecorationData,
  Channel,
  DefaultReactionEmoji,
  Emoji,
  Entitlement,
  ForumTag,
  Guild,
  GuildOnboarding,
  GuildOnboardingPrompt,
  GuildOnboardingPromptOption,
  Interaction,
  InteractionCallback,
  InteractionCallbackResponse,
  InteractionResource,
  Invite,
  InviteStageInstance,
  Member,
  Message,
  MessageCall,
  MessageInteraction,
  MessageInteractionMetadata,
  MessageReference,
  MessageSnapshot,
  Poll,
  PollAnswer,
  PollAnswerCount,
  PollMedia,
  PollResult,
  Role,
  ScheduledEvent,
  ScheduledEventRecurrenceRule,
  Sku,
  SoundboardSound,
  StageInstance,
  Sticker,
  Subscription,
  User,
  VoiceState,
  Webhook,
} from './transformers/index.js'

/**
 * All the objects that support desired properties
 *
 * @internal This is subject to breaking changes at any time
 */
export interface TransformersObjects {
  activityInstance: ActivityInstance
  activityLocation: ActivityLocation
  attachment: Attachment
  avatarDecorationData: AvatarDecorationData
  channel: Channel
  defaultReactionEmoji: DefaultReactionEmoji
  emoji: Emoji
  entitlement: Entitlement
  forumTag: ForumTag
  guild: Guild
  guildOnboarding: GuildOnboarding
  guildOnboardingPrompt: GuildOnboardingPrompt
  guildOnboardingPromptOption: GuildOnboardingPromptOption
  interaction: Interaction
  interactionCallback: InteractionCallback
  interactionCallbackResponse: InteractionCallbackResponse
  interactionResource: InteractionResource
  invite: Invite
  inviteStageInstance: InviteStageInstance
  member: Member
  message: Message
  messageCall: MessageCall
  messageInteraction: MessageInteraction
  messageInteractionMetadata: MessageInteractionMetadata
  messageReference: MessageReference
  messageSnapshot: MessageSnapshot
  poll: Poll
  pollAnswer: PollAnswer
  pollAnswerCount: PollAnswerCount
  pollMedia: PollMedia
  pollResult: PollResult
  role: Role
  scheduledEvent: ScheduledEvent
  scheduledEventRecurrenceRule: ScheduledEventRecurrenceRule
  sku: Sku
  stageInstance: StageInstance
  sticker: Sticker
  user: User
  voiceState: VoiceState
  webhook: Webhook
  subscription: Subscription
  soundboardSound: SoundboardSound
}

// NOTE: the top-level objects need both the dependencies and alwaysPresents even if empty when the key is specified, this is due the extends & nullability on DesiredPropertiesMetadata
//       internal properties needs to be in the alwaysPresents array, depending on an always present value is accepted

/** Metadata for typescript to create the correct types for desired properties */
interface TransformersDesiredPropertiesMetadata extends DesiredPropertiesMetadata {
  channel: {
    dependencies: {
      archived: ['toggles']
      invitable: ['toggles']
      locked: ['toggles']
      nsfw: ['toggles']
      newlyCreated: ['toggles']
      managed: ['toggles']
    }
    alwaysPresents: ['toggles', 'internalOverwrites', 'internalThreadMetadata']
  }

  guild: {
    dependencies: {
      threads: ['channels']
      features: ['toggles']
    }
    alwaysPresents: []
  }

  interaction: {
    dependencies: {
      respond: ['type', 'token', 'id']
      edit: ['type', 'token', 'id']
      deferEdit: ['type', 'token', 'id']
      defer: ['type', 'token', 'id']
      delete: ['type', 'token']
    }
    alwaysPresents: ['bot', 'acknowledged']
  }

  member: {
    dependencies: {
      deaf: ['toggles']
      mute: ['toggles']
      pending: ['toggles']
      flags: ['toggles']
      didRejoin: ['toggles']
      startedOnboarding: ['toggles']
      bypassesVerification: ['toggles']
      completedOnboarding: ['toggles']
    }
    alwaysPresents: []
  }

  message: {
    dependencies: {
      crossposted: ['flags']
      ephemeral: ['flags']
      failedToMentionSomeRolesInThread: ['flags']
      hasThread: ['flags']
      isCrosspost: ['flags']
      loading: ['flags']
      mentionedUserIds: ['mentions']
      mentionEveryone: ['bitfield']
      pinned: ['bitfield']
      sourceMessageDeleted: ['flags']
      suppressEmbeds: ['flags']
      suppressNotifications: ['flags']
      timestamp: ['id']
      tts: ['bitfield']
      urgent: ['flags']
    }
    alwaysPresents: ['bitfield', 'flags']
  }

  role: {
    dependencies: {
      hoist: ['toggles']
      managed: ['toggles']
      mentionable: ['toggles']
      premiumSubscriber: ['toggles']
      availableForPurchase: ['toggles']
      guildConnections: ['toggles']
    }
    alwaysPresents: ['internalTags']
  }

  user: {
    dependencies: {
      tag: ['username', 'discriminator']
      bot: ['toggles']
      system: ['toggles']
      mfaEnabled: ['toggles']
      verified: ['toggles']
    }
    alwaysPresents: []
  }

  emoji: {
    dependencies: {
      animated: ['toggles']
      available: ['toggles']
      managed: ['toggles']
      requireColons: ['toggles']
    }
    alwaysPresents: ['toggles']
  }
}

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
      ...desiredProperties.guild,
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
      appPermissions: defaultValue,
      authorizingIntegrationOwners: defaultValue,
      context: defaultValue,
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
      stageInstance: defaultValue,
      expiresAt: defaultValue,
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
    role: {
      name: defaultValue,
      guildId: defaultValue,
      position: defaultValue,
      color: defaultValue,
      id: defaultValue,
      permissions: defaultValue,
      icon: defaultValue,
      unicodeEmoji: defaultValue,
      flags: defaultValue,
      tags: defaultValue,
      toggles: defaultValue,
      ...desiredProperties.role,
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
      ...desiredProperties.user,
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
  } satisfies TransformersDesiredProperties as CompleteDesiredProperties<T, TDefault>
}

type KeyByValue<TObj, TValue> = {
  [Key in keyof TObj]: TObj[Key] extends TValue ? Key : never
}[keyof TObj]

type Complete<TObj, TDefault> = {
  [K in keyof TObj]-?: undefined extends TObj[K] ? TDefault : Exclude<TObj[K], undefined>
}

type JoinTuple<T extends string[], TDelimiter extends string> = T extends readonly [infer F extends string, ...infer R extends string[]]
  ? R['length'] extends 0
    ? F
    : `${F}${TDelimiter}${JoinTuple<R, TDelimiter>}`
  : ''

type DesiredPropertiesMetadata = {
  [K in keyof TransformersObjects]: {
    dependencies?: {
      [Key in keyof TransformersObjects[K]]?: (keyof TransformersObjects[K])[]
    }
    alwaysPresents?: (keyof TransformersObjects[K])[]
  }
}

type DesirableProperties<
  T extends TransformersObjects[keyof TransformersObjects],
  TKey extends keyof TransformersObjects = KeyByValue<TransformersObjects, T>,
> = Exclude<
  keyof T,
  // Exclude the props that depend on something else from the desirable properties
  | keyof TransformersDesiredPropertiesMetadata[TKey]['dependencies']
  // Check if all the keys are "always presents", if this is the case it means we did not specify any always present key
  | (keyof T extends NonNullable<TransformersDesiredPropertiesMetadata[TKey]['alwaysPresents']>[number]
      ? never
      : NonNullable<TransformersDesiredPropertiesMetadata[TKey]['alwaysPresents']>[number])
>

/** @internal This is subject to breaking changes without notices */
export type DesiredPropertiesMapper<T extends TransformersObjects[keyof TransformersObjects]> = {
  [Key in DesirableProperties<T>]: boolean
}

type AreDependenciesSatisfied<T, TDependencies extends Record<string, string[]> | undefined, TProps> = {
  [K in keyof T]: IsKeyDesired<T[K], TDependencies, TProps> extends true ? true : false
}

type IsKeyDesired<TKey, TDependencies extends Record<string, string[]> | undefined, TProps> = TKey extends keyof TProps // The key has a desired props?
  ? // Yes, is it true?
    TProps[TKey] extends true
    ? // Yes, this is a key to include
      true
    : // No, this is a key to exclude
      `This property is not set as desired in desiredProperties option in createBot(), so you can't use it. More info here: https://discordeno.js.org/desired-props`
  : // No, it is a props with dependencies?
    TKey extends keyof TDependencies
    ? // Yes, has all of its dependencies satisfied?
      AreDependenciesSatisfied<TDependencies[TKey], TDependencies, TProps> extends true[]
      ? // Yes, this is a key to include
        true
      : // No, this is a key to not include
        `This property depends on the following properties: ${JoinTuple<NonNullable<TDependencies>[TKey], ', '>}. Not all of these props are set as desired in desiredProperties option in createBot(), so you can't use it. More info here: https://discordeno.js.org/desired-props`
    : // No, we include it but it does not have neither props nor dependencies
      true

/** The behavior it should be used when resolving an undesired property */
export enum DesiredPropertiesBehavior {
  /** When this behavior is used the key will be missing completely */
  RemoveKey,
  /** When this behavior is used the key will be a string explaining why the property is disabled */
  ChangeType,
}

type RemoveKeyIfUndesired<Key, T, TProps extends TransformersDesiredProperties> = IsKeyDesired<
  Key,
  TransformersDesiredPropertiesMetadata[KeyByValue<TransformersObjects, T>]['dependencies'],
  TProps[KeyByValue<TransformersObjects, T>]
> extends true
  ? Key
  : never

type GetErrorWhenUndesired<
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
> = TIsDesired extends true ? TransformProperty<T[Key], TProps, TBehavior> : TIsDesired

type IsObject<T> = T extends object ? (T extends Function ? false : true) : false

// If the object is a transformed object, a collection of transformed object or an array of transformed objects we need to apply the desired props to them as well
export type TransformProperty<
  T,
  TProps extends TransformersDesiredProperties,
  TBehavior extends DesiredPropertiesBehavior,
> = T extends TransformersObjects[keyof TransformersObjects] // is T a transformed object?
  ? // Yes, apply the desired props
    SetupDesiredProps<T, TProps, TBehavior>
  : // No, is it a collection?
    T extends Collection<infer U, infer UObj>
    ? // Yes, check for nested proprieties
      Collection<U, TransformProperty<UObj, TProps, TBehavior>>
    : // No, is it an array?
      T extends Array<infer U>
      ? // Yes, apply the desired props
        TransformProperty<U, TProps, TBehavior>[]
      : // No, is it a Bot?
        T extends Bot
        ? // Yes, return a bot with the correct set of props & behavior
          Bot<TProps, TBehavior>
        : // No, is this a generic object? If so we need to ensure nested inside there aren't transformed objects
          IsObject<T> extends true
          ? // Yes, check of nested proprieties
            { [K in keyof T]: TransformProperty<T[K], TProps, TBehavior> }
          : // No, this is a normal value such as string / bigint / number
            T

export type SetupDesiredProps<
  T extends TransformersObjects[keyof TransformersObjects],
  TProps extends TransformersDesiredProperties,
  TBehavior extends DesiredPropertiesBehavior = DesiredPropertiesBehavior.RemoveKey,
> = {
  // When the behavior is to remove the key we use the RemoveKeyIfUndesired type helper else return the Key as is
  [Key in keyof T as TBehavior extends DesiredPropertiesBehavior.RemoveKey
    ? RemoveKeyIfUndesired<Key, T, TProps>
    : Key]: // When the behavior is to change the type we use the GetErrorWhenUndesired type helper else apply the desired props to the key and return
  TBehavior extends DesiredPropertiesBehavior.ChangeType
    ? GetErrorWhenUndesired<Key, T, TProps, TBehavior>
    : TransformProperty<T[Key], TProps, TBehavior>
}

export type TransformersDesiredProperties = {
  [Key in keyof TransformersObjects]: DesiredPropertiesMapper<TransformersObjects[Key]>
}

/** @internal This is subject to breaking changes without notices */
export type CompleteDesiredProperties<T extends RecursivePartial<TransformersDesiredProperties>, TTDefault extends boolean = false> = {
  [K in keyof TransformersDesiredProperties]: Complete<Partial<TransformersDesiredProperties[K]> & T[K], TTDefault>
}
