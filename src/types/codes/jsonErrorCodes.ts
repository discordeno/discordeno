/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#json */
export enum JsonErrorCodes {
  /** General error (such as a malformed request body, amongst other things) */
  GeneralError,
  /** Unknown account */
  UnknownAccount = 10001,
  /** Unknown application */
  UnknownApplication,
  /** Unknown channel */
  UnknownChannel,
  /** Unknown guild */
  UnknownGuild,
  /** Unknown integration */
  UnknownIntegration,
  /** Unknown invite */
  UnknownInvite,
  /** Unknown member */
  UnknownMember,
  /** Unknown message */
  UnknownMessage,
  /** Unknown permission overwrite */
  UnknownPermissionOverwrite,
  /** Unknown provider */
  UnknownProvider,
  /** Unknown role */
  UnknownRole,
  /** Unknown token */
  UnknownToken,
  /** Unknown user */
  UnknownUser,
  /** Unknown emoji */
  UnknownEmoji,
  /** Unknown webhook */
  UnknownWebhook,
  /** Unknown webhook service */
  UnknownWebhookService,
  /** Unknown session */
  UnknownSession = 10020,
  /** Unknown ban */
  UnknownBan = 10026,
  /** Unknown SKU */
  UnknownSKU,
  /** Unknown Store Listing */
  UnknownStoreListing,
  /** Unknown entitlement */
  UnknownEntitlement,
  /** Unknown build */
  UnknownBuild,
  /** Unknown lobby */
  UnknownLobby,
  /** Unknown branch */
  UnknownBranch,
  /** Unknown store directory layout */
  UnknownStoreDirectoryLayout,
  /** Unknown redistributable */
  UnknownRedistributable = 10036,
  /** Unknown gift code */
  UnknownGiftCode = 10038,
  /** Unknown stream */
  UnknownStream = 10049,
  /** Unknown premium server subscribe cooldown */
  UnknownPremiumServerSubscribeCooldown,
  /** Unknown guild template */
  UnknownGuildTemplate = 10057,
  /** Unknown discoverable server category */
  UnknownDiscoveryCategory = 10059,
  /** Unknown sticker */
  UnknownSticker,
  /** Unknown interaction */
  UnknownInteraction = 10062,
  /** Unknown application command */
  UnknownApplicationCommand = 10063,
  /** Unknown application command permissions */
  UnknownApplicationCommandPermissions = 10066,
  /** Unknown Stage Instance */
  UnknownStageInstance,
  /** Unknown Guild Member Verification Form */
  UnknownGuildMemberVerificationForm,
  /** Unknown Guild Welcome Screen */
  UnknownGuildWelcomeScreen,
  /** Unknown Guild Scheduled Event */
  UnknownGuildScheduledEvent,
  /** Unknown Guild Scheduled Event User */
  UnknownGuildScheduledEventUser,
  /** Bots cannot use this endpoint */
  BotsCannotUseThisEndpoint = 20001,
  /** Only bots can use this endpoint */
  OnlyBotsCanUseThisEndpoint,
  /** Explicit content cannot be sent to the desired recipient(s) */
  ExplicitContentCannotBeSentToTheDesiredRecipient = 20009,
  /** You are not authorized to perform this action on this application */
  YouAreNotAuthorizedToPerformThisActionOnThisApplication = 20012,
  /** This action cannot be performed due to slowmode rate limit */
  ThisActionCannotBePerformedDueToSlowmodeRateLimit = 20016,
  /** Only the owner of this account can perform this action */
  OnlyTheOwnerOfThisAccountCanPerformThisAction = 20018,
  /** This message cannot be edited due to announcement rate limits */
  ThisMessageCannotBeEditedDueToAnnouncementRateLimits = 20022,
  /** The channel you are writing has hit the write rate limit */
  TheChannelYouAreWritingHasHitTheWriteRateLimit = 20028,
  /** The channel you are writing has hit the write rate limit */
  TheWriteActionYouArePerformingOnTheServerHasHitTheWriteRateLimit,
  /** Your Stage topic, server name, server description, or channel names contain words that are not allowed */
  YourStageTopicOrServerNameOrServerDescriptionOrChannelNamesContainsWordsThatAreNotAllowedForPublicStages = 20031,
  /** Guild premium subscription level too low */
  GuildPremiumSubscriptionLevelTooLow = 20035,
  /** Maximum number of guilds reached (100) */
  MaximumNumberOfGuildsReached = 30001,
  /** Maximum number of friends reached (1000) */
  MaximumNumberOfFriendsReached,
  /** Maximum number of pins reached for the channel (50) */
  MaximumNumberOfPinsReachedForTheChannel,
  /** Maximum number of recipients reached (10) */
  MaximumNumberOfRecipientsReached,
  /** Maximum number of guild roles reached (250) */
  MaximumNumberOfGuildRolesReached,
  /** Maximum number of webhooks reached (10) */
  MaximumNumberOfWebhooksReached = 30007,
  /** Maximum number of emojis reached */
  MaximumNumberOfEmojisReached,
  /** Maximum number of reactions reached (20) */
  MaximumNumberOfReactionsReached = 30010,
  /** Maximum number of guild channels reached (500) */
  MaximumNumberOfGuildChannelsReached = 30013,
  /** Maximum number of attachments in a message reached (10) */
  MaximumNumberOfAttachmentsInAMessageReached = 30015,
  /** Maximum number of invites reached (1000) */
  MaximumNumberOfInvitesReached,
  /** Maximum number of animated emojis reached */
  MaximumNumberOfAnimatedEmojisReached = 30018,
  /** Maximum number of server members reached */
  MaximumNumberOfServerMembersReached,
  /** Maximum number of server categories has been reached (5) */
  MaximumNumberOfServerCategoriesHasBeenReached = 30030,
  /** Guild already has a template */
  GuildAlreadyHasTemplate = 30031,
  /** Max number of thread participants has been reached (1000) */
  MaxNumberOfThreadParticipantsHasBeenReached = 30033,
  /** Maximum number of bans for non-guild members have been exceeded */
  MaximumNumberOfBansForNonGuildMembersHaveBeenExceeded = 30035,
  /** Maximum number of bans fetches has been reached */
  MaximumNumberOfBansFetchesHasBeenReached = 30037,
  /** Maximum number of uncompleted guild scheduled events reached (100) */
  MaximumNumberOfUncompletedGuildScheduledEventsReached = 30038,
  /** Maximum number of stickers reached */
  MaximumNumberOfStickersReached = 30039,
  /** Maximum number of prune requests has been reached. Try again later */
  MaximumNumberOfPruneRequestsHasBeenReachedTryAgainLater,
  /** Maximum number of prune requests has been reached. Try again later */
  MaximumNumberOfGuildWidgetSettingsUpdatesHasBeenReachedTryAgainLater = 30042,
  /** Unauthorized. Provide a valid token and try again */
  UnauthorizedProvideAValidTokenAndTryAgain = 40001,
  /** You need to verify your account in order to perform this action */
  YouNeedToVerifyYourAccountInOrderToPerformThisAction,
  /** You are opening direct messages too fast */
  YouAreOpeningDirectMessagesTooFast,
  /** Request entity too large. Try sending something smaller in size */
  RequestEntityTooLargeTrySendingSomethingSmallerInSize = 40005,
  /** This feature has been temporarily disabled server-side */
  ThisFeatureHasBeenTemporarilyDisabledServerSide,
  /** The user is banned from this guild */
  ThisUserBannedFromThisGuild,
  /** Target user is not connected to voice */
  TargetUserIsNotConnectedToVoice = 40032,
  /** This message has already been crossposted */
  ThisMessageHasAlreadyBeenCrossposted = 40033,
  /** An application command with that name already exists */
  AnApplicationCommandWithThatNameAlreadyExists = 40041,
  /** Missing access */
  MissingAccess = 50001,
  /** Invalid account type */
  InvalidAccountType,
  /** Cannot execute action on a DM channel */
  CannotExecuteActionOnADMChannel,
  /** Guild widget disabled */
  GuildWidgetDisabled,
  /** Cannot edit a message authored by another user */
  CannotEditMessageAuthoredByAnotherUser,
  /** Cannot send an empty message */
  CannotSendAnEmptyMessage,
  /** Cannot send an empty message */
  CannotSendMessagesToThisUser,
  /** Cannot send messages in a voice channel */
  CannotSendMessagesInAVoiceChannel,
  /** Channel verification level is too high for you to gain access */
  ChannelVerificationLevelIsTooHighForYouToGainAccess,
  /** OAuth2 application does not have a bot */
  OAuth2ApplicationDoesNotHaveABot,
  /** OAuth2 application limit reached */
  OAuth2ApplicationLimitReached,
  /** Invalid OAuth2 state */
  InvalidOAuth2State,
  /** You lack permissions to perform that action */
  YouLackPermissionsToPerformThatAction,
  /** Invalid authentication token provided */
  InvalidAuthenticationTokenProvided,
  /** Note was too long */
  NoteWasTooLong,
  /** Provided too few or too many messages to delete. Must provide at least 2 and fewer than 100 messages to delete */
  ProvidedTooFewOrTooManyMessagesToDeleteMustProvideAtLeast2AndFewerThan100MessagesToDelete,
  /** A message can only be pinned to the channel it was sent in */
  AMessageCanOnlyBePinnedInTheChannelItWasSentIn = 50019,
  /** Invite code was either invalid or taken */
  InviteCodeWasEitherInvalidOrTaken,
  /** Cannot execute action on a system message */
  CannotExecuteActionOnASystemMessage,
  /** Cannot execute action on this channel type */
  CannotExecuteActionOnThisChannelType = 50024,
  /** Invalid OAuth2 access token provided */
  InvalidOAuth2AccessTokenProvided,
  /** Missing required OAuth2 scope */
  MissingRequiredOAuth2Scope,
  /** Invalid webhook token provided */
  InvalidWebhookTokenProvided,
  /** Invalid role */
  InvalidRole,
  /** Invalid Recipient(s) */
  InvalidRecipients = 50033,
  /** A message provided was too old to bulk delete */
  AMessageProvidedWasTooOldToBulkDelete,
  /** Invalid form body (returned for both `application/json` and `multipart/form-data` bodies), or invalid `Content-Type` provided */
  InvalidFormBodyOrContentTypeProvided,
  /** An invite was accepted to a guild the application's bot is not in */
  AnInviteWasAcceptedToAGuildTheApplicationsBotIsNotIn,
  /** Invalid API version provided */
  InvalidApiVersionProvided = 50041,
  /** File uploaded exceeds the maximum size */
  FileUploadedExceedsTheMaximumSize = 50045,
  /** Invalid file uploaded */
  InvalidFileUploaded,
  /** Cannot self-redeem this gift */
  CannotSelfRedeemThisGift = 50054,
  /** Invalid Guild */
  InvalidGuild,
  /** Payment source required to redeem gift */
  PaymentSourceRequiredToRedeemGift = 50070,
  /** Cannot delete a channel required for Community guilds */
  CannotDeleteAChannelRequiredForCommunityGuilds = 50074,
  /** Invalid sticker sent */
  InvalidStickerSent = 50081,
  /** Tried to perform an operation on an archived thread, such as editing a message or adding a user to the thread */
  TriedToPerformAnOperationOnAnArchivedThreadSuchAsEditingAMessageOrAddingAUserToTheThread = 50083,
  /** Invalid thread notification settings */
  InvalidThreadNotificationSettings,
  /** `before` value is earlier than the thread creation date */
  BeforeValueIsEarlierThanTheThreadCreationDate,
  /** This server is not available in your location */
  ThisServerIsNotAvailableInYourLocation = 50095,
  /** This server needs monetization enabled in order to perform this action */
  ThisServerNeedsMonetizationEnabledInOrderToPerformThisAction = 50097,
  /** This server needs more boosts to perform this action */
  ThisServerNeedsMoreBoostsToPerformThisAction = 50101,
  /** The request body contains invalid JSON. */
  TheRequestBodyContainsInvalidJSON = 50109,
  TwoFactorIsRequiredForThisOperation = 60003,
  /** No users with DiscordTag exist */
  NoUsersWithDiscordTagExist = 80004,
  /** Reaction was blocked */
  ReactionWasBlocked = 90001,
  /** API resource is currently overloaded. Try again a little later */
  ApiResourceIsCurrentlyOverloadedTryAgainALittleLater = 130000,
  /** The Stage is already open */
  TheStageIsAlreadyOpen = 150006,
  /** Cannot reply without permission to read message history */
  CannotReplyWithoutPermissionToReadMessageHistory = 160002,
  /** A thread has already been created for this message */
  AThreadHasAlreadyBeenCreatedForThisMessage = 160004,
  /** Thread is locked */
  ThreadIsLocked = 160005,
  /** Maximum number of active threads reached */
  MaximumNumberOfActiveThreadsReached = 160006,
  /** Maximum number of active announcement threads reached */
  MaximumNumberOfActiveAnnouncementThreadsReached = 160007,
  /** Invalid JSON for uploaded Lottie file */
  InvalidJsonForUploadedLottieFile = 170001,
  /** Uploaded Lotties cannot contain rasterized images such as PNG or JPEG */
  UploadedLottiesCannotContainRasterizedImagesSuchAsPngOrJpeg,
  /** Sticker maximum framerate exceeded */
  StickerMaximumFramerateExceeded,
  /** Sticker frame count exceeds maximum of 1000 frames */
  StickerFrameCountExceedsMaximumOf1000Frames,
  /** Lottie animation maximum dimensions exceeded */
  LottieAnimationMaximumDimensionsExceeded,
  /** Sticker frame rate is either too small or too large */
  StickerFrameRateIsEitherTooSmallOrTooLarge,
  /** Sticker animation duration exceeds maximum of 5 seconds */
  StickerAnimationDurationExceedsMaximumOf5Seconds,
  /** Cannot update a finished event */
  CannotUpdateAFinishedEvent = 180000,
  /** Failed to create stage needed for stage event */
  FailedToCreateStageNeededForStageEvent = 180002,
}
