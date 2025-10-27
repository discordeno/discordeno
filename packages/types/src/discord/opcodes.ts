/** Types for: https://discord.com/developers/docs/topics/opcodes-and-status-codes */

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes */
export enum GatewayOpcodes {
  /** An event was dispatched. */
  Dispatch,
  /** Fired periodically by the client to keep the connection alive. */
  Heartbeat,
  /** Starts a new session during the initial handshake. */
  Identify,
  /** Update the client's presence. */
  PresenceUpdate,
  /** Used to join/leave or move between voice channels. */
  VoiceStateUpdate,
  /** Resume a previous session that was disconnected. */
  Resume = 6,
  /** You should attempt to reconnect and resume immediately. */
  Reconnect,
  /** Request information about offline guild members in a large guild. */
  RequestGuildMembers,
  /** The session has been invalidated. You should reconnect and identify/resume accordingly. */
  InvalidSession,
  /** Sent immediately after connecting, contains the `heartbeat_interval` to use. */
  Hello,
  /** Sent in response to receiving a heartbeat to acknowledge that it has been received. */
  HeartbeatACK,
  /** Used to request soundboard sounds for a list of guilds. */
  RequestSoundboardSounds = 31,
}

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes */
export enum GatewayCloseEventCodes {
  /** A normal closure of the gateway. You may attempt to reconnect. */
  NormalClosure = 1000,
  /** The endpoint is going away. Invalidates bot and bot will appear offline.  */
  GoingAway = 1001,
  /** We're not sure what went wrong. Try reconnecting? */
  UnknownError = 4000,
  /** You sent an invalid [Gateway opcode](https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes) or an invalid payload for an opcode. Don't do that! */
  UnknownOpcode,
  /** You sent an invalid [payload](https://discord.com/developers/docs/topics/gateway#sending-payloads) to us. Don't do that! */
  DecodeError,
  /** You sent us a payload prior to [identifying](https://discord.com/developers/docs/topics/gateway-events#identify), or this session has been invalidated. */
  NotAuthenticated,
  /** The account token sent with your [identify payload](https://discord.com/developers/docs/topics/gateway-events#identify) is incorrect. */
  AuthenticationFailed,
  /** You sent more than one identify payload. Don't do that! */
  AlreadyAuthenticated,
  /** The sequence sent when [resuming](https://discord.com/developers/docs/topics/gateway-events#resume) the session was invalid. Reconnect and start a new session. */
  InvalidSeq = 4007,
  /** Woah nelly! You're sending payloads to us too quickly. Slow it down! You will be disconnected on receiving this. */
  RateLimited,
  /** Your session timed out. Reconnect and start a new one. */
  SessionTimedOut,
  /** You sent us an invalid [shard when identifying](https://discord.com/developers/docs/topics/gateway#sharding). */
  InvalidShard,
  /** The session would have handled too many guilds - you are required to [shard](https://discord.com/developers/docs/topics/gateway#sharding) your connection in order to connect. */
  ShardingRequired,
  /** You sent an invalid version for the gateway. */
  InvalidApiVersion,
  /** You sent an invalid intent for a [Gateway Intent](https://discord.com/developers/docs/topics/gateway#gateway-intents). You may have incorrectly calculated the bitwise value. */
  InvalidIntents,
  /** You sent a disallowed intent for a [Gateway Intent](https://discord.com/developers/docs/topics/gateway#gateway-intents). You may have tried to specify an intent that you [have not enabled or are not approved for](https://discord.com/developers/docs/topics/gateway#privileged-intents). */
  DisallowedIntents,
}

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#json-json-error-codes */
export enum HTTPJsonErrorCodes {
  /** General error (such as a malformed request body, amongst other things) */
  General = 0,

  /** Unknown account */
  UnknownAccount = 10001,
  /** Unknown application */
  UnknownApplication = 10002,
  /** Unknown channel */
  UnknownChannel = 10003,
  /** Unknown guild */
  UnknownGuild = 10004,
  /** Unknown integration */
  UnknownIntegration = 10005,
  /** Unknown invite */
  UnknownInvite = 10006,
  /** Unknown member */
  UnknownMember = 10007,
  /** Unknown message */
  UnknownMessage = 10008,
  /** Unknown permission overwrite */
  UnknownPermissionOverwrite = 10009,
  /** Unknown provider */
  UnknownProvider = 10010,
  /** Unknown role */
  UnknownRole = 10011,
  /** Unknown token */
  UnknownToken = 10012,
  /** Unknown user */
  UnknownUser = 10013,
  /** Unknown emoji */
  UnknownEmoji = 10014,
  /** Unknown webhook */
  UnknownWebhook = 10015,
  /** Unknown webhook service */
  UnknownWebhookService = 10016,
  /** Unknown session */
  UnknownSession = 10020,
  /** Unknown Asset */
  UnknownAsset = 10021,
  /** Unknown ban */
  UnknownBan = 10026,
  /** Unknown SKU */
  UnknownSKU = 10027,
  /** Unknown Store Listing */
  UnknownStoreListing = 10028,
  /** Unknown entitlement */
  UnknownEntitlement = 10029,
  /** Unknown build */
  UnknownBuild = 10030,
  /** Unknown lobby */
  UnknownLobby = 10031,
  /** Unknown branch */
  UnknownBranch = 10032,
  /** Unknown store directory layout */
  UnknownStoreDirectoryLayout = 10033,
  /** Unknown redistributable */
  UnknownRedistributable = 10036,
  /** Unknown gift code */
  UnknownGiftCode = 10038,
  /** Unknown stream */
  UnknownStream = 10049,
  /** Unknown premium server subscribe cooldown */
  UnknownPremiumServerSubscribeCooldown = 10050,
  /** Unknown guild template */
  UnknownGuildTemplate = 10057,
  /** Unknown discoverable server category */
  UnknownDiscoverableServerCategory = 10059,
  /** Unknown sticker */
  UnknownSticker = 10060,
  /** Unknown sticker pack */
  UnknownStickerPack = 10061,
  /** Unknown interaction */
  UnknownInteraction = 10062,
  /** Unknown application command */
  UnknownApplicationCommand = 10063,
  /** Unknown voice state */
  UnknownVoiceState = 10065,
  /** Unknown application command permissions */
  UnknownApplicationCommandPermissions = 10066,
  /** Unknown Stage Instance */
  UnknownStageInstance = 10067,
  /** Unknown Guild Member Verification Form */
  UnknownGuildMemberVerificationForm = 10068,
  /** Unknown Guild Welcome Screen */
  UnknownGuildWelcomeScreen = 10069,
  /** Unknown Guild Scheduled Event */
  UnknownGuildScheduledEvent = 10070,
  /** Unknown Guild Scheduled Event User */
  UnknownGuildScheduledEventUser = 10071,
  /** Unknown Tag */
  UnknownTag = 10087,
  /** Unknown sound */
  UnknownSound = 10097,

  /** Bots cannot use this endpoint */
  BotsCannotUseThis = 20001,
  /** Only bots can use this endpoint */
  OnlyBotsCanUseThis = 20002,
  /** Explicit content cannot be sent to the desired recipient(s) */
  ExplicitContent = 20009,
  /** You are not authorized to perform this action on this application */
  UnauthorizedAction = 20012,
  /** This action cannot be performed due to slowmode rate limit */
  SlowmodeRateLimit = 20016,
  /** Only the owner of this account can perform this action */
  OnlyOwnerCanDo = 20018,
  /** This message cannot be edited due to announcement rate limits */
  AnnouncementRateLimits = 20022,
  /** Under minimum age */
  UnderMinimumAge = 20024,
  /** The channel you are writing has hit the write rate limit */
  ChannelWriteRateLimit = 20028,
  /** The write action you are performing on the server has hit the write rate limit */
  ServerWriteRateLimit = 20029,
  /** Your Stage topic, server name, server description, or channel names contain words that are not allowed */
  BadWords = 20031,
  /** Guild premium subscription level too low */
  PremiumSubscriptionTooLow = 20035,

  /** Maximum number of guilds reached (100) */
  MaxGuildsReached = 30001,
  /** Maximum number of friends reached (1000) */
  MaxFriendsReached = 30002,
  /** Maximum number of pins reached for the channel (50) */
  MaxPinsReached = 30003,
  /** Maximum number of recipients reached (10) */
  MaxRecipientsReached = 30004,
  /** Maximum number of guild roles reached (250) */
  MaxRolesReached = 30005,
  /** Maximum number of webhooks reached (15) */
  MaxWebhooksReached = 30007,
  /** Maximum number of emojis reached */
  MaxEmojisReached = 30008,
  /** Maximum number of reactions reached (20) */
  MaxReactionsReached = 30010,
  /** Maximum number of group DMs reached (10) */
  MaxGroupDMsReached = 30011,
  /** Maximum number of guild channels reached (500) */
  MaxChannelsReached = 30013,
  /** Maximum number of attachments in a message reached (10) */
  MaxAttachmentsReached = 30015,
  /** Maximum number of invites reached (1000) */
  MaxInvitesReached = 30016,
  /** Maximum number of animated emojis reached */
  MaxAnimatedEmojisReached = 30018,
  /** Maximum number of server members reached */
  MaxMembersReached = 30019,
  /** Maximum number of server categories has been reached (5) */
  MaxCategoriesReached = 30030,
  /** Guild already has a template */
  AlreadyHasTemplate = 30031,
  /** Maximum number of application commands reached */
  MaxApplicationCommandsReached = 30032,
  /** Maximum number of thread participants has been reached (1000) */
  MaxThreadParticipantsReached = 30033,
  /** Maximum number of daily application command creates has been reached (200) */
  MaxDailyCommandCreatesReached = 30034,
  /** Maximum number of bans for non-guild members have been exceeded */
  MaxNonGuildBansExceeded = 30035,
  /** Maximum number of bans fetches has been reached */
  MaxBansFetchesReached = 30037,
  /** Maximum number of uncompleted guild scheduled events reached (100) */
  MaxUncompletedEventsReached = 30038,
  /** Maximum number of stickers reached */
  MaxStickersReached = 30039,
  /** Maximum number of prune requests has been reached. Try again later */
  MaxPruneRequestsReached = 30040,
  /** Maximum number of guild widget settings updates has been reached. Try again later */
  MaxWidgetUpdatesReached = 30042,
  /** Maximum number of soundboard sounds reached */
  MaxSoundboardSoundsReached = 30045,
  /** Maximum number of edits to messages older than 1 hour reached. Try again later */
  MaxOldMessageEditsReached = 30046,
  /** Maximum number of pinned threads in a forum channel has been reached */
  MaxPinnedThreadsReached = 30047,
  /** Maximum number of tags in a forum channel has been reached */
  MaxTagsReached = 30048,
  /** Bitrate is too high for channel of this type */
  BitrateTooHigh = 30052,
  /** Maximum number of premium emojis reached (25) */
  MaxPremiumEmojisReached = 30056,
  /** Maximum number of webhooks per guild reached (1000) */
  MaxWebhooksPerGuildReached = 30058,
  /** Maximum number of channel permission overwrites reached (1000) */
  MaxChannelPermissionOverwritesReached = 30060,
  /** The channels for this guild are too large */
  ChannelsTooLarge = 30061,

  /** Unauthorized. Provide a valid token and try again */
  Unauthorized = 40001,
  /** You need to verify your account in order to perform this action */
  VerifyAccount = 40002,
  /** You are opening direct messages too fast */
  DMsTooFast = 40003,
  /** Send messages has been temporarily disabled */
  SendMessagesDisabled = 40004,
  /** Request entity too large. Try sending something smaller in size */
  RequestTooLarge = 40005,
  /** This feature has been temporarily disabled server-side */
  FeatureDisabled = 40006,
  /** The user is banned from this guild */
  UserBanned = 40007,
  /** Connection has been revoked */
  ConnectionRevoked = 40012,
  /** Only consumable SKUs can be consumed */
  OnlyConsumableSKUs = 40018,
  /** You can only delete sandbox entitlements. */
  OnlyDeleteSandboxEntitlements = 40019,
  /** Target user is not connected to voice */
  UserNotConnectedToVoice = 40032,
  /** This message has already been crossposted */
  AlreadyCrossposted = 40033,
  /** An application command with that name already exists */
  DuplicateCommandName = 40041,
  /** Application interaction failed to send */
  InteractionFailedToSend = 40043,
  /** Cannot send a message in a forum channel */
  NoForumMessages = 40058,
  /** Interaction has already been acknowledged */
  InteractionAcknowledged = 40060,
  /** Tag names must be unique */
  UniqueTagNames = 40061,
  /** Service resource is being rate limited */
  ServiceRateLimited = 40062,
  /** There are no tags available that can be set by non-moderators */
  NoTagsForNonMods = 40066,
  /** A tag is required to create a forum post in this channel */
  TagRequiredForForumPost = 40067,
  /** An entitlement has already been granted for this resource */
  EntitlementAlreadyGranted = 40074,
  /** This interaction has hit the maximum number of follow up messages */
  MaxFollowUpMessages = 40094,
  /** Cloudflare is blocking your request. This can often be resolved by setting a proper User Agent */
  CloudflareBlocked = 40333,

  /** Missing access */
  MissingAccess = 50001,
  /** Invalid account type */
  InvalidAccountType = 50002,
  /** Cannot execute action on a DM channel */
  NoDMAction = 50003,
  /** Guild widget disabled */
  WidgetDisabled = 50004,
  /** Cannot edit a message authored by another user */
  EditOtherUsersMessage = 50005,
  /** Cannot send an empty message */
  EmptyMessage = 50006,
  /** Cannot send messages to this user */
  CantMessageUser = 50007,
  /** Cannot send messages in a non-text channel */
  NoTextChannelMessages = 50008,
  /** Channel verification level is too high for you to gain access */
  HighVerification = 50009,
  /** OAuth2 application does not have a bot */
  NoOAuth2Bot = 50010,
  /** OAuth2 application limit reached */
  OAuth2LimitReached = 50011,
  /** Invalid OAuth2 state */
  InvalidOAuth2State = 50012,
  /** You lack permissions to perform that action */
  MissingPermissions = 50013,
  /** Invalid authentication token provided */
  InvalidToken = 50014,
  /** Note was too long */
  NoteTooLong = 50015,
  /** Provided too few or too many messages to delete. Must provide at least 2 and fewer than 100 messages to delete */
  BadBulkDelete = 50016,
  /** Invalid MFA Level */
  InvalidMFALevel = 50017,
  /** A message can only be pinned to the channel it was sent in */
  BadPin = 50019,
  /** Invite code was either invalid or taken */
  InvalidInvite = 50020,
  /** Cannot execute action on a system message */
  SystemMessageAction = 50021,
  /** Cannot execute action on this channel type */
  BadChannelType = 50024,
  /** Invalid OAuth2 access token provided */
  InvalidOAuth2Token = 50025,
  /** Missing required OAuth2 scope */
  MissingOAuth2Scope = 50026,
  /** Invalid webhook token provided */
  InvalidWebhookToken = 50027,
  /** Invalid role */
  InvalidRole = 50028,
  /** Invalid Recipient(s) */
  InvalidRecipients = 50033,
  /** A message provided was too old to bulk delete */
  OldBulkDelete = 50034,
  /** Invalid form body (returned for both application/json and multipart/form-data bodies), or invalid Content-Type provided */
  InvalidFormBody = 50035,
  /** An invite was accepted to a guild the application's bot is not in */
  InviteForOtherBot = 50036,
  /** Invalid Activity Action */
  InvalidActivityAction = 50039,
  /** Invalid API version provided */
  InvalidAPIVersion = 50041,
  /** File uploaded exceeds the maximum size */
  FileTooLarge = 50045,
  /** Invalid file uploaded */
  InvalidFile = 50046,
  /** Cannot self-redeem this gift */
  SelfRedeemGift = 50054,
  /** Invalid Guild */
  InvalidGuild = 50055,
  /** Invalid SKU */
  InvalidSKU = 50057,
  /** Invalid request origin */
  InvalidRequestOrigin = 50067,
  /** Invalid message type */
  InvalidMessageType = 50068,
  /** Payment source required to redeem gift */
  PaymentRequiredForGift = 50070,
  /** Cannot modify a system webhook */
  ModifySystemWebhook = 50073,
  /** Cannot delete a channel required for Community guilds */
  DeleteCommunityChannel = 50074,
  /** Cannot edit stickers within a message */
  EditMessageStickers = 50080,
  /** Invalid sticker sent */
  InvalidSticker = 50081,
  /** Tried to perform an operation on an archived thread, such as editing a message or adding a user to the thread */
  ArchivedThreadAction = 50083,
  /** Invalid thread notification settings */
  InvalidThreadSettings = 50084,
  /** before value is earlier than the thread creation date */
  BeforeThreadCreation = 50085,
  /** Community server channels must be text channels */
  CommunityTextChannelsOnly = 50086,
  /** The entity type of the event is different from the entity you are trying to start the event for */
  EventTypeMismatch = 50091,
  /** This server is not available in your location */
  ServerUnavailable = 50095,
  /** This server needs monetization enabled in order to perform this action */
  MonetizationRequired = 50097,
  /** This server needs more boosts to perform this action */
  BoostsRequired = 50101,
  /** The request body contains invalid JSON. */
  InvalidJSON = 50109,
  /** The provided file is invalid. */
  InvalidProvidedFile = 50110,
  /** The provided file type is invalid. */
  InvalidProvidedFileType = 50123,
  /** The provided file duration exceeds maximum of 5.2 seconds. */
  FileDurationTooLong = 50124,
  /** Owner cannot be pending member */
  OwnerCannotBePending = 50131,
  /** Ownership cannot be transferred to a bot user */
  BotCannotBeOwner = 50132,
  /** Failed to resize asset below the maximum size: 262144 */
  ResizeAssetFailed = 50138,
  /** Cannot mix subscription and non subscription roles for an emoji */
  MixEmojiRoles = 50144,
  /** Cannot convert between premium emoji and normal emoji */
  ConvertEmojiTypes = 50145,
  /** Uploaded file not found. */
  UploadedFileNotFound = 50146,
  /** The specified emoji is invalid */
  SpecifiedEmojiInvalid = 50151,
  /** Voice messages do not support additional content. */
  VoiceMessageBadContent = 50159,
  /** Voice messages must have a single audio attachment. */
  VoiceMessageNoAttachment = 50160,
  /** Voice messages must have supporting metadata. */
  VoiceMessageNoMetadata = 50161,
  /** Voice messages cannot be edited. */
  VoiceMessageCannotEdit = 50162,
  /** Cannot delete guild subscription integration */
  DeleteSubscriptionIntegration = 50163,
  /** You cannot send voice messages in this channel. */
  NoVoiceMessages = 50173,
  /** The user account must first be verified */
  AccountNotVerified = 50178,
  /** The provided file does not have a valid duration. */
  InvalidFileDuration = 50192,
  /** You do not have permission to send this sticker. */
  NoStickerPermission = 50600,

  /** Two factor is required for this operation */
  TwoFactorRequired = 60003,

  /** No users with DiscordTag exist */
  NoDiscordTagUsers = 80004,

  /** Reaction was blocked */
  ReactionBlocked = 90001,
  /** User cannot use burst reactions */
  NoBurstReactions = 90002,

  /** Application not yet available. Try again later */
  AppNotAvailable = 110001,

  /** API resource is currently overloaded. Try again a little later */
  APIOverloaded = 130000,

  /** The Stage is already open */
  StageOpen = 150006,

  /** Cannot reply without permission to read message history */
  ReplyNoHistory = 160002,
  /** A thread has already been created for this message */
  ThreadExists = 160004,
  /** Thread is locked */
  ThreadLocked = 160005,
  /** Maximum number of active threads reached */
  MaxActiveThreads = 160006,
  /** Maximum number of active announcement threads reached */
  MaxActiveAnnouncementThreads = 160007,

  /** Invalid JSON for uploaded Lottie file */
  InvalidLottieJSON = 170001,
  /** Uploaded Lotties cannot contain rasterized images such as PNG or JPEG */
  LottieRasterImages = 170002,
  /** Sticker maximum framerate exceeded */
  StickerFramerateTooHigh = 170003,
  /** Sticker frame count exceeds maximum of 1000 frames */
  StickerFrameCountTooHigh = 170004,
  /** Lottie animation maximum dimensions exceeded */
  LottieTooLarge = 170005,
  /** Sticker frame rate is either too small or too large */
  StickerFramerateInvalid = 170006,
  /** Sticker animation duration exceeds maximum of 5 seconds */
  StickerDurationTooLong = 170007,

  /** Cannot update a finished event */
  FinishedEventUpdate = 180000,
  /** Failed to create stage needed for stage event */
  StageCreationFailed = 180002,

  /** Message was blocked by automatic moderation */
  MessageBlocked = 200000,
  /** Title was blocked by automatic moderation */
  TitleBlocked = 200001,

  /** Webhooks posted to forum channels must have a thread_name or thread_id */
  WebhookNeedsThreadInfo = 220001,
  /** Webhooks posted to forum channels cannot have both a thread_name and thread_id */
  WebhookTooMuchThreadInfo = 220002,

  /** Webhooks can only create threads in forum channels */
  WebhookOnlyThreads = 220003,
  /** Webhook services cannot be used in forum channels */
  WebhookNoServices = 220004,

  /** Message blocked by harmful links filter */
  HarmfulLinks = 240000,

  /** Cannot enable onboarding, requirements are not met */
  OnboardingRequirementsNotMet = 350000,
  /** Cannot update onboarding while below requirements */
  OnboardingBelowRequirements = 350001,

  /** Access to file uploads has been limited for this guild */
  FileUploadsLimited = 400001,

  /** Failed to ban users */
  BanFailed = 500000,

  /** Poll voting blocked */
  PollBlocked = 520000,
  /** Poll expired */
  PollExpired = 520001,
  /** Invalid channel type for poll creation */
  PollBadChannelType = 520002,
  /** Cannot edit a poll message */
  PollEditBlocked = 520003,
  /** Cannot use an emoji included with the poll */
  PollEmojiBlocked = 520004,
  /** Cannot expire a non-poll message */
  NotAPoll = 520006,
}
