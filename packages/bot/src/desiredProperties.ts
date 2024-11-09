import type { RecursivePartial } from '@discordeno/types'

export interface TransformersDesiredProperties {
  activityInstance: {
    applicationId: boolean
    instanceId: boolean
    launchId: boolean
    location: boolean
    users: boolean
  }
  activityLocation: {
    id: boolean
    kind: boolean
    channelId: boolean
    guildId: boolean
  }
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
  interactionCallback: {
    id: boolean
    type: boolean
    activityInstanceId: boolean
    responseMessageId: boolean
    responseMessageLoading: boolean
    responseMessageEphemeral: boolean
  }
  interactionCallbackResponse: {
    interaction: boolean
    resource: boolean
  }
  interactionResource: {
    type: boolean
    activityInstance: boolean
    message: boolean
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
    banner: boolean
    permissions: boolean
    communicationDisabledUntil: boolean
    flags: boolean
    toggles: boolean
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
    interactionMetadata: boolean
    interaction: boolean
    member: boolean
    mentionedChannelIds: boolean
    mentionedRoleIds: boolean
    mentions: boolean
    messageReference: boolean
    referencedMessage: boolean
    messageSnapshots: boolean
    nonce: boolean
    reactions: boolean
    stickerItems: boolean
    thread: boolean
    type: boolean
    webhookId: boolean
    poll: boolean
    call: boolean
  }
  messageSnapshot: {
    message: boolean
  }
  messageInteractionMetadata: {
    id: boolean
    type: boolean
    user: boolean
    authorizingIntegrationOwners: boolean
    originalResponseMessageId: boolean
    interactedMessageId: boolean
    triggeringInteractionMetadata: boolean
    targetUser: boolean
    targetMessageId: boolean
  }
  messageInteraction: {
    id: boolean
    member: boolean
    name: boolean
    user: boolean
    type: boolean
  }
  messageReference: {
    messageId: boolean
    channelId: boolean
    guildId: boolean
  }
  messageCall: {
    participants: boolean
    endedTimestamp: boolean
  }
  role: {
    name: boolean
    guildId: boolean
    position: boolean
    color: boolean
    id: boolean
    permissions: boolean
    icon: boolean
    unicodeEmoji: boolean
    flags: boolean
    tags: boolean
    toggles: boolean
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
    recurrenceRule: boolean
  }
  scheduledEventRecurrenceRule: {
    start: boolean
    end: boolean
    frequency: boolean
    interval: boolean
    byWeekday: boolean
    byNWeekday: boolean
    byMonth: boolean
    byMonthDay: boolean
    byYearDay: boolean
    count: boolean
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
  subscription: {
    id: boolean
    userId: boolean
    skuIds: boolean
    entitlementIds: boolean
    currentPeriodStart: boolean
    currentPeriodEnd: boolean
    status: boolean
    canceledAt: boolean
    country: boolean
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
    email: boolean
    banner: boolean
    avatarDecorationData: boolean
    toggles: boolean
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
    prompts: boolean
    defaultChannelIds: boolean
    enabled: boolean
    mode: boolean
  }
  guildOnboardingPrompt: {
    id: boolean
    type: boolean
    options: boolean
    title: boolean
    singleSelect: boolean
    required: boolean
    inOnboarding: boolean
  }
  guildOnboardingPromptOption: {
    id: boolean
    channelIds: boolean
    roleIds: boolean
    emoji: boolean
    title: boolean
    description: boolean
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
    answers: boolean
    expiry: boolean
    allowMultiselect: boolean
    layoutType: boolean
    results: boolean
  }
  pollAnswer: {
    answerId: boolean
    pollMedia: boolean
  }
  pollResult: {
    isFinalized: boolean
    answerCounts: boolean
  }
  pollAnswerCount: {
    id: boolean
    count: boolean
    meVoted: boolean
  }
  pollMedia: {
    text: boolean
    emoji: boolean
  }
  soundboardSound: {
    name: boolean
    soundId: boolean
    volume: boolean
    emojiId: boolean
    emojiName: boolean
    guildId: boolean
    available: boolean
    user: boolean
  }
}

export function createDesiredPropertiesObject(
  desiredProperties: RecursivePartial<TransformersDesiredProperties>,
  defaultValue = false,
): TransformersDesiredProperties {
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
      nsfw: defaultValue,
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
      managed: defaultValue,
      parentId: defaultValue,
      memberCount: defaultValue,
      messageCount: defaultValue,
      archiveTimestamp: defaultValue,
      defaultAutoArchiveDuration: defaultValue,
      autoArchiveDuration: defaultValue,
      botIsMember: defaultValue,
      archived: defaultValue,
      locked: defaultValue,
      invitable: defaultValue,
      createTimestamp: defaultValue,
      newlyCreated: defaultValue,
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
      threads: defaultValue,
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
      flags: defaultValue,
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
      targetUser: defaultValue,
      targetMessageId: defaultValue,
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
    subscription: {
      id: defaultValue,
      userId: defaultValue,
      skuIds: defaultValue,
      entitlementIds: defaultValue,
      currentPeriodStart: defaultValue,
      currentPeriodEnd: defaultValue,
      status: defaultValue,
      canceledAt: defaultValue,
      country: defaultValue,
      ...desiredProperties.subscription,
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
    soundboardSound: {
      name: defaultValue,
      soundId: defaultValue,
      volume: defaultValue,
      emojiId: defaultValue,
      emojiName: defaultValue,
      guildId: defaultValue,
      available: defaultValue,
      user: defaultValue,
      ...desiredProperties.soundboardSound,
    },
  }
}
