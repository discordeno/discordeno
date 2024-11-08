import type {
  BigString,
  GetBans,
  GetEntitlements,
  GetGuildAuditLog,
  GetGuildPruneCountQuery,
  GetInvite,
  GetMessagesOptions,
  GetPollAnswerVotes,
  GetReactions,
  GetScheduledEventUsers,
  GetUserGuilds,
  InteractionCallbackOptions,
  ListArchivedThreads,
  ListGuildMembers,
  ListSkuSubscriptionsOptions,
} from '@discordeno/types'

export interface RestRoutes {
  /** A specific user route. */
  user: (id: BigString) => string
  // Gateway Bot
  gatewayBot: () => string
  // Standard Sticker Packs
  stickerPacks: () => string
  stickerPack: (stickerPackId: BigString) => string
  /** Routes for webhook related routes. */
  webhooks: {
    /** Route for managing the original message sent by a webhook. */
    original: (webhookId: BigString, token: string, options?: { threadId?: BigString }) => string
    /** Route for webhook with a id. */
    id: (webhookId: BigString) => string
    /** Route for handling a webhook with a token. */
    webhook: (webhookId: BigString, token: string, options?: { wait?: boolean; threadId?: BigString }) => string
    /** Route for handling a message that was sent through a webhook. */
    message: (webhookId: BigString, token: string, messageId: BigString, options?: { threadId?: BigString }) => string
  }
  /** Routes for channel related endpoints. */
  channels: {
    /** Route for handling bulk messages in a channel. */
    bulk: (channelId: BigString) => string
    /** Route for non-specific dm channel. */
    dm: () => string
    /** Route to add a user to an exiting group DM, requires an access token with the OAuth2 `gdm.join` scope */
    dmRecipient: (channelId: BigString, userId: BigString) => string
    /** Route for handling a specific pin. */
    pin: (channelId: BigString, messageId: BigString) => string
    /** Route for handling a channels pins. */
    pins: (channelId: BigString) => string
    /** Route for non-specific webhook in a channel. */
    webhooks: (channelId: BigString) => string
    /** Route for a specific channel. */
    channel: (channelId: BigString) => string
    /** Route for following a specific channel. */
    follow: (channelId: BigString) => string
    /** Route for managing a forum with a message. */
    forum: (channelId: BigString) => string
    /** Route for a specific channel's invites. */
    invites: (channelId: BigString) => string
    /** Route for a specific message */
    message: (channelId: BigString, id: BigString) => string
    /** Route for handling non-specific messages. */
    messages: (channelId: BigString, options?: GetMessagesOptions) => string
    /** Route for handling a specific overwrite. */
    overwrite: (channelId: BigString, overwriteId: BigString) => string
    /** Route for handling crossposting a specific message. */
    crosspost: (channelId: BigString, messageId: BigString) => string
    /** Route for handling non-specific stages */
    stages: () => string
    /** Route for handling a specific stage */
    stage: (channelId: BigString) => string
    /** Routes for handling thread related to a channel. */
    threads: {
      /** Route for thread a specific message. */
      message: (channelId: BigString, messageId: BigString) => string
      /** Route for thread without a message. */
      all: (channelId: BigString) => string
      /** Route for active threads. */
      active: (guildId: BigString) => string
      /** Route for members in a thread. */
      members: (channelId: BigString) => string
      /** Route for the bot member in a thread. */
      me: (channelId: BigString) => string
      /** Route for a specific member in a thread. */
      user: (channelId: BigString, userId: BigString) => string
      /** Route for handling archived threads. */
      archived: (channelId: BigString) => string
      /** Route for handling publically archived threads. */
      public: (channelId: BigString, options?: ListArchivedThreads) => string
      /** Route for handling private archived threads. */
      private: (channelId: BigString, options?: ListArchivedThreads) => string
      /** Route for handling private archived threads that the bot has joined. */
      joined: (channelId: BigString, options?: ListArchivedThreads) => string
    }
    /** Route for handling typing indicators in a c«hannel. */
    typing: (channelId: BigString) => string
    /** Routes for handling reactions on a message. */
    reactions: {
      /** Route for handling a bots reaction. */
      bot: (channelId: BigString, messageId: BigString, emoji: string) => string
      /** Route for handling a user's reactions. */
      user: (channelId: BigString, messageId: BigString, emoji: string, userId: BigString) => string
      /** Route for handling all the reactions on a message. */
      all: (channelId: BigString, messageId: BigString) => string
      /** Route for handling all reactions for a single emoji on a message. */
      emoji: (channelId: BigString, messageId: BigString, emoji: string, options?: GetReactions) => string
      /** Route for handling a specific reaction on a message. */
      message: (channelId: BigString, messageId: BigString, emoji: string, options?: GetReactions) => string
    }
    polls: {
      votes: (channelId: BigString, messageId: BigString, answerId: number, options?: GetPollAnswerVotes) => string
      expire: (channelId: BigString, messageId: BigString) => string
    }
  }
  /** Routes for guild related endpoints. */
  guilds: {
    /** Routes for handling a non-specific guild. */
    all: () => string
    /** Route for fetching an user guilds. Requires `guilds` OAuth2 scope */
    userGuilds: (options?: GetUserGuilds) => string
    /** Route for handling audit logs in a guild. */
    auditlogs: (guildId: BigString, options?: GetGuildAuditLog) => string
    /** Routes for a guilds automoderation. */
    automod: {
      /** Route for handling a guild's automoderation. */
      rules: (guildId: BigString) => string
      /** Route for handling a specific automoderation rule guild's */
      rule: (guildId: BigString, ruleId: BigString) => string
    }
    /** Routes for handling a guild's scheduled events. */
    events: {
      /** Route for handling non-specific scheduled event. */
      events: (guildId: BigString, withUserCount?: boolean) => string
      /** Route for handling a specific scheduled event. */
      event: (guildId: BigString, eventId: BigString, withUserCount?: boolean) => string
      /** Route for handling a scheduled event users. */
      users: (guildId: BigString, eventId: BigString, options?: GetScheduledEventUsers) => string
    }
    /** Route for handling non-specific channels in a guild */
    channels: (guildId: BigString) => string
    /** Route for handling a specific emoji. */
    emoji: (guildId: BigString, id: BigString) => string
    /** Route for handling non-specific emojis. */
    emojis: (guildId: BigString) => string
    /** Route for handling a specific guild. */
    guild: (guildId: BigString, withCounts?: boolean) => string
    /** Route for handling a specific integration. */
    integration: (guildId: BigString, integrationId: BigString) => string
    /** Route for handling non-specific integrations. */
    integrations: (guildId: BigString) => string
    /** Route for handling a specific guild invite. */
    invite: (inviteCode: string, options?: GetInvite) => string
    /** Route for handling non-specific invites in a guild. */
    invites: (guildId: BigString) => string
    /** Route for handling a bot leaving a guild. */
    leave: (guildId: BigString) => string
    /** Route for handling a guild's preview. */
    preview: (guildId: BigString) => string
    /** Route for handling pruning of a guild. */
    prune: (guildId: BigString, options?: GetGuildPruneCountQuery) => string
    /** Route for handling non-specific webhooks in a guild */
    webhooks: (guildId: BigString) => string
    /** Route for handling a guild's welcome screen. */
    welcome: (guildId: BigString) => string
    /** Route for handling a guild's widget. */
    widget: (guildId: BigString) => string
    /** Route for handling a guild's widget in the form of json. */
    widgetJson: (guildId: BigString) => string
    /** Route for handling a guilds mfa level. */
    mfa: (guildId: BigString) => string
    /** Routes for handling a guild's members. */
    members: {
      /** Route for handling a specific guild member's ban. */
      ban: (guildId: BigString, userId: BigString) => string
      /** Route for handling non-specific bans in a guild. */
      bans: (guildId: BigString, options?: GetBans) => string
      /** Route for bulk-banning members. */
      bulkBan: (guildId: BigString) => string
      /** Route for handling a the bot guild member. */
      bot: (guildId: BigString) => string
      /** Route for handling a specific guild member. */
      member: (guildId: BigString, userId: BigString) => string
      /** Route to get the authenticated user. Requires the `guilds.members.read` OAuth2 scope */
      currentMember: (guildId: BigString) => string
      /** Route for handling non-specific guild members. */
      members: (guildId: BigString, options?: ListGuildMembers) => string
      /** Route for handling member searching in a guild. */
      search: (guildId: BigString, query: string, options?: { limit?: number }) => string
      /** Route for handling pruning guild members. */
      prune: (guildId: BigString, options?: GetGuildPruneCountQuery) => string
    }
    /** Routes for handling a guild's templates. */
    templates: {
      /** Route for handling a specifc guild's templates with a code only. */
      code: (code: string) => string
      /** Route for handling a specific guild's template with a guild id and code. */
      guild: (guildId: BigString, code: string) => string
      /** Route for handling non-specific guild's templates. */
      all: (guildId: BigString) => string
    }
    /** Route for handling a guild's vanity url. */
    vanity: (guildId: BigString) => string
    /** Route for handling a guild's regions. */
    regions: (guildId: BigString) => string
    /** Routes for handling a guild's roles. */
    roles: {
      /** Route for handling a specific guild role. */
      one: (guildId: BigString, roleId: BigString) => string
      /** Route for handling a guild's roles. */
      all: (guildId: BigString) => string
      /** Route for handling a members roles in a guild. */
      member: (guildId: BigString, memberId: BigString, roleId: BigString) => string
    }
    /** Route for handling a specific guild sticker. */
    stickers: (guildId: BigString) => string
    /** Route for handling non-specific guild stickers. */
    sticker: (guildId: BigString, stickerId: BigString) => string
    /** Route for handling a voice state. */
    voice: (guildId: BigString, userId?: BigString) => string
    /** Route for the onboarding */
    onboarding: (guildId: BigString) => string
  }
  /** Routes for interaction related endpoints. */
  interactions: {
    /** Routes for interaction command related endpoints. */
    commands: {
      /** Route for non-specific commands. */
      commands: (applicationId: BigString) => string
      /** Route for guild related commands. */
      guilds: {
        /** Route for non-specific guild commands. */
        all: (applicationId: BigString, guildId: BigString) => string
        /** Route for a specific guild command. */
        one: (applicationId: BigString, guildId: BigString, commandId: BigString, withLocalizations?: boolean) => string
      }
      /** Route for non-specific command permissions. */
      permissions: (applicationId: BigString, guildId: BigString) => string
      /** Route for a specific command's permission. */
      permission: (applicationId: BigString, guildId: BigString, commandId: BigString) => string
      /** Route for a specific command. */
      command: (applicationId: BigString, commandId: BigString, withLocalizations?: boolean) => string
    }
    /** Routes for interaction response related endpoints. */
    responses: {
      /** Route for handling a callback response with id and token. */
      callback: (interactionId: BigString, token: string, options?: InteractionCallbackOptions) => string
      /** Route for handling the original response using id and token. */
      original: (interactionId: BigString, token: string) => string
      /** Route for handling a followup message from a interaction response. */
      message: (applicationId: BigString, token: string, messageId: BigString) => string
    }
  }
  /** Routes related to OAuth2 */
  oauth2: {
    /** Route to generate a new access token */
    tokenExchange: () => string
    /** Route to revoke an OAuth2 access_token */
    tokenRevoke: () => string
    /** Route to get information about the current authorization. Requires an access token */
    currentAuthorization: () => string
    /** Route to get information about the current application. */
    application: () => string
    /** Route to get the connection the user has. Requires the `connections` OAuth2 scope */
    connections: () => string
    /** Route to handling role-connection for an application */
    roleConnections: (applicationId: BigString) => string
  }
  /** Routes related to monetization (entitlements and SKU) */
  monetization: {
    /** Route to list / create entitlements */
    entitlements: (applicationId: BigString, options?: GetEntitlements) => string
    /** Route to delete an entitlement */
    entitlement: (applicationId: BigString, entitlementId: BigString) => string
    /** Route to consume an entitlement */
    consumeEntitlement: (applicationId: BigString, entitlementId: BigString) => string
    /** Route to list the SKUs */
    skus: (applicationId: BigString) => string
    /** Route to list the SKU subscriptions */
    subscriptions: (skuId: BigString, options?: ListSkuSubscriptionsOptions) => string
    /** Route to get a SKU subscription */
    subscription: (skuId: BigString, subscriptionId: BigString) => string
  }
  /** Routes related to soundboard sounds */
  soundboard: {
    /** Send a soundboard sound to a voice channel the user is connected to. */
    sendSound: (channelId: BigString) => string
    /** List the discord default soundboard sounds */
    listDefault: () => string
    /** Route for list/create a guild sounds */
    guildSounds: (guildId: BigString) => string
    /** Route for get/edit/delete of a guild sound */
    guildSound: (guildId: BigString, soundId: BigString) => string
  }
  /** Route to list / create an application emoji */
  applicationEmojis: (applicationId: BigString) => string
  /** Route to get / edit / delete an application emoji */
  applicationEmoji: (applicationId: BigString, emojiId: BigString) => string
  /** Get information about the current OAuth2 user / bot user. If used with a OAuth2 token requires the `identify` OAuth2 scope */
  currentUser: () => string
  /** Route to get and edit information about the current application. */
  application: () => string
  /** Route for get an activity instance */
  applicationActivityInstance: (applicationId: BigString, instanceId: string) => string
  /** Route for handling a sticker. */
  sticker: (stickerId: BigString) => string
  /** Route for handling all voice regions. */
  regions: () => string
}
