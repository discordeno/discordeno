[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / JsonErrorCodes

# Enumeration: JsonErrorCodes

[@discordeno/gateway](../modules/discordeno_gateway.md).JsonErrorCodes

https://discord.com/developers/docs/topics/opcodes-and-status-codes#json

## Table of contents

### Enumeration Members

- [AMessageCanOnlyBePinnedInTheChannelItWasSentIn](discordeno_gateway.JsonErrorCodes.md#amessagecanonlybepinnedinthechannelitwassentin)
- [AMessageProvidedWasTooOldToBulkDelete](discordeno_gateway.JsonErrorCodes.md#amessageprovidedwastoooldtobulkdelete)
- [AThreadHasAlreadyBeenCreatedForThisMessage](discordeno_gateway.JsonErrorCodes.md#athreadhasalreadybeencreatedforthismessage)
- [AnApplicationCommandWithThatNameAlreadyExists](discordeno_gateway.JsonErrorCodes.md#anapplicationcommandwiththatnamealreadyexists)
- [AnInviteWasAcceptedToAGuildTheApplicationsBotIsNotIn](discordeno_gateway.JsonErrorCodes.md#aninvitewasacceptedtoaguildtheapplicationsbotisnotin)
- [ApiResourceIsCurrentlyOverloadedTryAgainALittleLater](discordeno_gateway.JsonErrorCodes.md#apiresourceiscurrentlyoverloadedtryagainalittlelater)
- [ApplicationInteractionFailedToSend](discordeno_gateway.JsonErrorCodes.md#applicationinteractionfailedtosend)
- [ApplicationNotYetAvailable](discordeno_gateway.JsonErrorCodes.md#applicationnotyetavailable)
- [BeforeValueIsEarlierThanTheThreadCreationDate](discordeno_gateway.JsonErrorCodes.md#beforevalueisearlierthanthethreadcreationdate)
- [BitrateIsTooHighForChannelOfThisType](discordeno_gateway.JsonErrorCodes.md#bitrateistoohighforchannelofthistype)
- [BotsCannotUseThisEndpoint](discordeno_gateway.JsonErrorCodes.md#botscannotusethisendpoint)
- [CannotDeleteAChannelRequiredForCommunityGuilds](discordeno_gateway.JsonErrorCodes.md#cannotdeleteachannelrequiredforcommunityguilds)
- [CannotEditMessageAuthoredByAnotherUser](discordeno_gateway.JsonErrorCodes.md#cannoteditmessageauthoredbyanotheruser)
- [CannotEditStickersWithinAMessage](discordeno_gateway.JsonErrorCodes.md#cannoteditstickerswithinamessage)
- [CannotExecuteActionOnADMChannel](discordeno_gateway.JsonErrorCodes.md#cannotexecuteactiononadmchannel)
- [CannotExecuteActionOnASystemMessage](discordeno_gateway.JsonErrorCodes.md#cannotexecuteactiononasystemmessage)
- [CannotExecuteActionOnThisChannelType](discordeno_gateway.JsonErrorCodes.md#cannotexecuteactiononthischanneltype)
- [CannotReplyWithoutPermissionToReadMessageHistory](discordeno_gateway.JsonErrorCodes.md#cannotreplywithoutpermissiontoreadmessagehistory)
- [CannotSelfRedeemThisGift](discordeno_gateway.JsonErrorCodes.md#cannotselfredeemthisgift)
- [CannotSendAnEmptyMessage](discordeno_gateway.JsonErrorCodes.md#cannotsendanemptymessage)
- [CannotSendMessagesInANonTextChannel](discordeno_gateway.JsonErrorCodes.md#cannotsendmessagesinanontextchannel)
- [CannotSendMessagesToThisUser](discordeno_gateway.JsonErrorCodes.md#cannotsendmessagestothisuser)
- [CannotUpdateAFinishedEvent](discordeno_gateway.JsonErrorCodes.md#cannotupdateafinishedevent)
- [ChannelVerificationLevelIsTooHighForYouToGainAccess](discordeno_gateway.JsonErrorCodes.md#channelverificationlevelistoohighforyoutogainaccess)
- [CommunityServerChannelsMustBeTextChannels](discordeno_gateway.JsonErrorCodes.md#communityserverchannelsmustbetextchannels)
- [ConnectionHasBeenRevoked](discordeno_gateway.JsonErrorCodes.md#connectionhasbeenrevoked)
- [ExplicitContentCannotBeSentToTheDesiredRecipient](discordeno_gateway.JsonErrorCodes.md#explicitcontentcannotbesenttothedesiredrecipient)
- [FailedToCreateStageNeededForStageEvent](discordeno_gateway.JsonErrorCodes.md#failedtocreatestageneededforstageevent)
- [FailedToResizeAssetBelowTheMaximumSize](discordeno_gateway.JsonErrorCodes.md#failedtoresizeassetbelowthemaximumsize)
- [FileUploadedExceedsTheMaximumSize](discordeno_gateway.JsonErrorCodes.md#fileuploadedexceedsthemaximumsize)
- [GeneralError](discordeno_gateway.JsonErrorCodes.md#generalerror)
- [GuildAlreadyHasTemplate](discordeno_gateway.JsonErrorCodes.md#guildalreadyhastemplate)
- [GuildPremiumSubscriptionLevelTooLow](discordeno_gateway.JsonErrorCodes.md#guildpremiumsubscriptionleveltoolow)
- [GuildWidgetDisabled](discordeno_gateway.JsonErrorCodes.md#guildwidgetdisabled)
- [InteractionHasAlreadyBeenAcknowledged](discordeno_gateway.JsonErrorCodes.md#interactionhasalreadybeenacknowledged)
- [InvalidAccountType](discordeno_gateway.JsonErrorCodes.md#invalidaccounttype)
- [InvalidActivityAction](discordeno_gateway.JsonErrorCodes.md#invalidactivityaction)
- [InvalidApiVersionProvided](discordeno_gateway.JsonErrorCodes.md#invalidapiversionprovided)
- [InvalidAuthenticationTokenProvided](discordeno_gateway.JsonErrorCodes.md#invalidauthenticationtokenprovided)
- [InvalidFileUploaded](discordeno_gateway.JsonErrorCodes.md#invalidfileuploaded)
- [InvalidFormBodyOrContentTypeProvided](discordeno_gateway.JsonErrorCodes.md#invalidformbodyorcontenttypeprovided)
- [InvalidGuild](discordeno_gateway.JsonErrorCodes.md#invalidguild)
- [InvalidJsonForUploadedLottieFile](discordeno_gateway.JsonErrorCodes.md#invalidjsonforuploadedlottiefile)
- [InvalidMFALevel](discordeno_gateway.JsonErrorCodes.md#invalidmfalevel)
- [InvalidMessageType](discordeno_gateway.JsonErrorCodes.md#invalidmessagetype)
- [InvalidOAuth2AccessTokenProvided](discordeno_gateway.JsonErrorCodes.md#invalidoauth2accesstokenprovided)
- [InvalidOAuth2State](discordeno_gateway.JsonErrorCodes.md#invalidoauth2state)
- [InvalidRecipients](discordeno_gateway.JsonErrorCodes.md#invalidrecipients)
- [InvalidRole](discordeno_gateway.JsonErrorCodes.md#invalidrole)
- [InvalidStickerSent](discordeno_gateway.JsonErrorCodes.md#invalidstickersent)
- [InvalidThreadNotificationSettings](discordeno_gateway.JsonErrorCodes.md#invalidthreadnotificationsettings)
- [InvalidWebhookTokenProvided](discordeno_gateway.JsonErrorCodes.md#invalidwebhooktokenprovided)
- [InviteCodeWasEitherInvalidOrTaken](discordeno_gateway.JsonErrorCodes.md#invitecodewaseitherinvalidortaken)
- [LottieAnimationMaximumDimensionsExceeded](discordeno_gateway.JsonErrorCodes.md#lottieanimationmaximumdimensionsexceeded)
- [MaxNumberOfDailyApplicationCommandCreatesHasBeenReached](discordeno_gateway.JsonErrorCodes.md#maxnumberofdailyapplicationcommandcreateshasbeenreached)
- [MaxNumberOfThreadParticipantsHasBeenReached](discordeno_gateway.JsonErrorCodes.md#maxnumberofthreadparticipantshasbeenreached)
- [MaximumNumberOfActiveAnnouncementThreadsReached](discordeno_gateway.JsonErrorCodes.md#maximumnumberofactiveannouncementthreadsreached)
- [MaximumNumberOfActiveThreadsReached](discordeno_gateway.JsonErrorCodes.md#maximumnumberofactivethreadsreached)
- [MaximumNumberOfAnimatedEmojisReached](discordeno_gateway.JsonErrorCodes.md#maximumnumberofanimatedemojisreached)
- [MaximumNumberOfAttachmentsInAMessageReached](discordeno_gateway.JsonErrorCodes.md#maximumnumberofattachmentsinamessagereached)
- [MaximumNumberOfBansFetchesHasBeenReached](discordeno_gateway.JsonErrorCodes.md#maximumnumberofbansfetcheshasbeenreached)
- [MaximumNumberOfBansForNonGuildMembersHaveBeenExceeded](discordeno_gateway.JsonErrorCodes.md#maximumnumberofbansfornonguildmembershavebeenexceeded)
- [MaximumNumberOfEditsToMessagesOlderThan1HourReachedTryAgainLater](discordeno_gateway.JsonErrorCodes.md#maximumnumberofeditstomessagesolderthan1hourreachedtryagainlater)
- [MaximumNumberOfEmojisReached](discordeno_gateway.JsonErrorCodes.md#maximumnumberofemojisreached)
- [MaximumNumberOfFriendsReached](discordeno_gateway.JsonErrorCodes.md#maximumnumberoffriendsreached)
- [MaximumNumberOfGuildChannelsReached](discordeno_gateway.JsonErrorCodes.md#maximumnumberofguildchannelsreached)
- [MaximumNumberOfGuildRolesReached](discordeno_gateway.JsonErrorCodes.md#maximumnumberofguildrolesreached)
- [MaximumNumberOfGuildWidgetSettingsUpdatesHasBeenReachedTryAgainLater](discordeno_gateway.JsonErrorCodes.md#maximumnumberofguildwidgetsettingsupdateshasbeenreachedtryagainlater)
- [MaximumNumberOfGuildsReached](discordeno_gateway.JsonErrorCodes.md#maximumnumberofguildsreached)
- [MaximumNumberOfInvitesReached](discordeno_gateway.JsonErrorCodes.md#maximumnumberofinvitesreached)
- [MaximumNumberOfPinnedThreadsInAForumChannelHasBeenReached](discordeno_gateway.JsonErrorCodes.md#maximumnumberofpinnedthreadsinaforumchannelhasbeenreached)
- [MaximumNumberOfPinsReachedForTheChannel](discordeno_gateway.JsonErrorCodes.md#maximumnumberofpinsreachedforthechannel)
- [MaximumNumberOfPruneRequestsHasBeenReachedTryAgainLater](discordeno_gateway.JsonErrorCodes.md#maximumnumberofprunerequestshasbeenreachedtryagainlater)
- [MaximumNumberOfReactionsReached](discordeno_gateway.JsonErrorCodes.md#maximumnumberofreactionsreached)
- [MaximumNumberOfRecipientsReached](discordeno_gateway.JsonErrorCodes.md#maximumnumberofrecipientsreached)
- [MaximumNumberOfServerCategoriesHasBeenReached](discordeno_gateway.JsonErrorCodes.md#maximumnumberofservercategorieshasbeenreached)
- [MaximumNumberOfServerMembersReached](discordeno_gateway.JsonErrorCodes.md#maximumnumberofservermembersreached)
- [MaximumNumberOfStickersReached](discordeno_gateway.JsonErrorCodes.md#maximumnumberofstickersreached)
- [MaximumNumberOfUncompletedGuildScheduledEventsReached](discordeno_gateway.JsonErrorCodes.md#maximumnumberofuncompletedguildscheduledeventsreached)
- [MaximumNumberOfWebhooksReached](discordeno_gateway.JsonErrorCodes.md#maximumnumberofwebhooksreached)
- [MaximumNumbersOfApplicationCommandsReached](discordeno_gateway.JsonErrorCodes.md#maximumnumbersofapplicationcommandsreached)
- [MaxiumNumberOfTagsInAForumChannelHasBeenReached](discordeno_gateway.JsonErrorCodes.md#maxiumnumberoftagsinaforumchannelhasbeenreached)
- [MessageWasBlockedByAutomaticModeration](discordeno_gateway.JsonErrorCodes.md#messagewasblockedbyautomaticmoderation)
- [MissingAccess](discordeno_gateway.JsonErrorCodes.md#missingaccess)
- [MissingRequiredOAuth2Scope](discordeno_gateway.JsonErrorCodes.md#missingrequiredoauth2scope)
- [NoUsersWithDiscordTagExist](discordeno_gateway.JsonErrorCodes.md#nouserswithdiscordtagexist)
- [NoteWasTooLong](discordeno_gateway.JsonErrorCodes.md#notewastoolong)
- [OAuth2ApplicationDoesNotHaveABot](discordeno_gateway.JsonErrorCodes.md#oauth2applicationdoesnothaveabot)
- [OAuth2ApplicationLimitReached](discordeno_gateway.JsonErrorCodes.md#oauth2applicationlimitreached)
- [OnlyBotsCanUseThisEndpoint](discordeno_gateway.JsonErrorCodes.md#onlybotscanusethisendpoint)
- [OnlyTheOwnerOfThisAccountCanPerformThisAction](discordeno_gateway.JsonErrorCodes.md#onlytheownerofthisaccountcanperformthisaction)
- [OwnershipCannotBeTransferredToABotUser](discordeno_gateway.JsonErrorCodes.md#ownershipcannotbetransferredtoabotuser)
- [PaymentSourceRequiredToRedeemGift](discordeno_gateway.JsonErrorCodes.md#paymentsourcerequiredtoredeemgift)
- [ProvidedTooFewOrTooManyMessagesToDeleteMustProvideAtLeast2AndFewerThan100MessagesToDelete](discordeno_gateway.JsonErrorCodes.md#providedtoofewortoomanymessagestodeletemustprovideatleast2andfewerthan100messagestodelete)
- [ReactionWasBlocked](discordeno_gateway.JsonErrorCodes.md#reactionwasblocked)
- [RequestEntityTooLargeTrySendingSomethingSmallerInSize](discordeno_gateway.JsonErrorCodes.md#requestentitytoolargetrysendingsomethingsmallerinsize)
- [SendMessagesHasBeenTemporarilyDisabled](discordeno_gateway.JsonErrorCodes.md#sendmessageshasbeentemporarilydisabled)
- [StickerAnimationDurationExceedsMaximumOf5Seconds](discordeno_gateway.JsonErrorCodes.md#stickeranimationdurationexceedsmaximumof5seconds)
- [StickerFrameCountExceedsMaximumOf1000Frames](discordeno_gateway.JsonErrorCodes.md#stickerframecountexceedsmaximumof1000frames)
- [StickerFrameRateIsEitherTooSmallOrTooLarge](discordeno_gateway.JsonErrorCodes.md#stickerframerateiseithertoosmallortoolarge)
- [StickerMaximumFramerateExceeded](discordeno_gateway.JsonErrorCodes.md#stickermaximumframerateexceeded)
- [TargetUserIsNotConnectedToVoice](discordeno_gateway.JsonErrorCodes.md#targetuserisnotconnectedtovoice)
- [TheChannelYouAreWritingHasHitTheWriteRateLimit](discordeno_gateway.JsonErrorCodes.md#thechannelyouarewritinghashitthewriteratelimit)
- [TheRequestBodyContainsInvalidJSON](discordeno_gateway.JsonErrorCodes.md#therequestbodycontainsinvalidjson)
- [TheStageIsAlreadyOpen](discordeno_gateway.JsonErrorCodes.md#thestageisalreadyopen)
- [TheWriteActionYouArePerformingOnTheServerHasHitTheWriteRateLimit](discordeno_gateway.JsonErrorCodes.md#thewriteactionyouareperformingontheserverhashitthewriteratelimit)
- [ThisActionCannotBePerformedDueToSlowmodeRateLimit](discordeno_gateway.JsonErrorCodes.md#thisactioncannotbeperformedduetoslowmoderatelimit)
- [ThisFeatureHasBeenTemporarilyDisabledServerSide](discordeno_gateway.JsonErrorCodes.md#thisfeaturehasbeentemporarilydisabledserverside)
- [ThisMessageCannotBeEditedDueToAnnouncementRateLimits](discordeno_gateway.JsonErrorCodes.md#thismessagecannotbeeditedduetoannouncementratelimits)
- [ThisMessageHasAlreadyBeenCrossposted](discordeno_gateway.JsonErrorCodes.md#thismessagehasalreadybeencrossposted)
- [ThisServerIsNotAvailableInYourLocation](discordeno_gateway.JsonErrorCodes.md#thisserverisnotavailableinyourlocation)
- [ThisServerNeedsMonetizationEnabledInOrderToPerformThisAction](discordeno_gateway.JsonErrorCodes.md#thisserverneedsmonetizationenabledinordertoperformthisaction)
- [ThisServerNeedsMoreBoostsToPerformThisAction](discordeno_gateway.JsonErrorCodes.md#thisserverneedsmorebooststoperformthisaction)
- [ThisUserBannedFromThisGuild](discordeno_gateway.JsonErrorCodes.md#thisuserbannedfromthisguild)
- [ThreadIsLocked](discordeno_gateway.JsonErrorCodes.md#threadislocked)
- [TitleWasBlockedByAutomaticModeration](discordeno_gateway.JsonErrorCodes.md#titlewasblockedbyautomaticmoderation)
- [TriedToPerformAnOperationOnAnArchivedThreadSuchAsEditingAMessageOrAddingAUserToTheThread](discordeno_gateway.JsonErrorCodes.md#triedtoperformanoperationonanarchivedthreadsuchaseditingamessageoraddingausertothethread)
- [TwoFactorIsRequiredForThisOperation](discordeno_gateway.JsonErrorCodes.md#twofactorisrequiredforthisoperation)
- [UnauthorizedProvideAValidTokenAndTryAgain](discordeno_gateway.JsonErrorCodes.md#unauthorizedprovideavalidtokenandtryagain)
- [UnderMinimumAge](discordeno_gateway.JsonErrorCodes.md#underminimumage)
- [UnknownAccount](discordeno_gateway.JsonErrorCodes.md#unknownaccount)
- [UnknownApplication](discordeno_gateway.JsonErrorCodes.md#unknownapplication)
- [UnknownApplicationCommand](discordeno_gateway.JsonErrorCodes.md#unknownapplicationcommand)
- [UnknownApplicationCommandPermissions](discordeno_gateway.JsonErrorCodes.md#unknownapplicationcommandpermissions)
- [UnknownBan](discordeno_gateway.JsonErrorCodes.md#unknownban)
- [UnknownBranch](discordeno_gateway.JsonErrorCodes.md#unknownbranch)
- [UnknownBuild](discordeno_gateway.JsonErrorCodes.md#unknownbuild)
- [UnknownChannel](discordeno_gateway.JsonErrorCodes.md#unknownchannel)
- [UnknownDiscoveryCategory](discordeno_gateway.JsonErrorCodes.md#unknowndiscoverycategory)
- [UnknownEmoji](discordeno_gateway.JsonErrorCodes.md#unknownemoji)
- [UnknownEntitlement](discordeno_gateway.JsonErrorCodes.md#unknownentitlement)
- [UnknownGiftCode](discordeno_gateway.JsonErrorCodes.md#unknowngiftcode)
- [UnknownGuild](discordeno_gateway.JsonErrorCodes.md#unknownguild)
- [UnknownGuildMemberVerificationForm](discordeno_gateway.JsonErrorCodes.md#unknownguildmemberverificationform)
- [UnknownGuildScheduledEvent](discordeno_gateway.JsonErrorCodes.md#unknownguildscheduledevent)
- [UnknownGuildScheduledEventUser](discordeno_gateway.JsonErrorCodes.md#unknownguildscheduledeventuser)
- [UnknownGuildTemplate](discordeno_gateway.JsonErrorCodes.md#unknownguildtemplate)
- [UnknownGuildWelcomeScreen](discordeno_gateway.JsonErrorCodes.md#unknownguildwelcomescreen)
- [UnknownIntegration](discordeno_gateway.JsonErrorCodes.md#unknownintegration)
- [UnknownInteraction](discordeno_gateway.JsonErrorCodes.md#unknowninteraction)
- [UnknownInvite](discordeno_gateway.JsonErrorCodes.md#unknowninvite)
- [UnknownLobby](discordeno_gateway.JsonErrorCodes.md#unknownlobby)
- [UnknownMember](discordeno_gateway.JsonErrorCodes.md#unknownmember)
- [UnknownMessage](discordeno_gateway.JsonErrorCodes.md#unknownmessage)
- [UnknownPermissionOverwrite](discordeno_gateway.JsonErrorCodes.md#unknownpermissionoverwrite)
- [UnknownPremiumServerSubscribeCooldown](discordeno_gateway.JsonErrorCodes.md#unknownpremiumserversubscribecooldown)
- [UnknownProvider](discordeno_gateway.JsonErrorCodes.md#unknownprovider)
- [UnknownRedistributable](discordeno_gateway.JsonErrorCodes.md#unknownredistributable)
- [UnknownRole](discordeno_gateway.JsonErrorCodes.md#unknownrole)
- [UnknownSKU](discordeno_gateway.JsonErrorCodes.md#unknownsku)
- [UnknownSession](discordeno_gateway.JsonErrorCodes.md#unknownsession)
- [UnknownStageInstance](discordeno_gateway.JsonErrorCodes.md#unknownstageinstance)
- [UnknownSticker](discordeno_gateway.JsonErrorCodes.md#unknownsticker)
- [UnknownStoreDirectoryLayout](discordeno_gateway.JsonErrorCodes.md#unknownstoredirectorylayout)
- [UnknownStoreListing](discordeno_gateway.JsonErrorCodes.md#unknownstorelisting)
- [UnknownStream](discordeno_gateway.JsonErrorCodes.md#unknownstream)
- [UnknownTag](discordeno_gateway.JsonErrorCodes.md#unknowntag)
- [UnknownToken](discordeno_gateway.JsonErrorCodes.md#unknowntoken)
- [UnknownUser](discordeno_gateway.JsonErrorCodes.md#unknownuser)
- [UnknownVoiceState](discordeno_gateway.JsonErrorCodes.md#unknownvoicestate)
- [UnknownWebhook](discordeno_gateway.JsonErrorCodes.md#unknownwebhook)
- [UnknownWebhookService](discordeno_gateway.JsonErrorCodes.md#unknownwebhookservice)
- [UploadedFileNotFound](discordeno_gateway.JsonErrorCodes.md#uploadedfilenotfound)
- [UploadedLottiesCannotContainRasterizedImagesSuchAsPngOrJpeg](discordeno_gateway.JsonErrorCodes.md#uploadedlottiescannotcontainrasterizedimagessuchaspngorjpeg)
- [WebhooksCanOnlyCreateThreadsInForumChannels](discordeno_gateway.JsonErrorCodes.md#webhookscanonlycreatethreadsinforumchannels)
- [YouAreNotAuthorizedToPerformThisActionOnThisApplication](discordeno_gateway.JsonErrorCodes.md#youarenotauthorizedtoperformthisactiononthisapplication)
- [YouAreOpeningDirectMessagesTooFast](discordeno_gateway.JsonErrorCodes.md#youareopeningdirectmessagestoofast)
- [YouLackPermissionsToPerformThatAction](discordeno_gateway.JsonErrorCodes.md#youlackpermissionstoperformthataction)
- [YouNeedToVerifyYourAccountInOrderToPerformThisAction](discordeno_gateway.JsonErrorCodes.md#youneedtoverifyyouraccountinordertoperformthisaction)
- [YourStageTopicOrServerNameOrServerDescriptionOrChannelNamesContainsWordsThatAreNotAllowedForPublicStages](discordeno_gateway.JsonErrorCodes.md#yourstagetopicorservernameorserverdescriptionorchannelnamescontainswordsthatarenotallowedforpublicstages)

## Enumeration Members

### AMessageCanOnlyBePinnedInTheChannelItWasSentIn

• **AMessageCanOnlyBePinnedInTheChannelItWasSentIn** = `50019`

#### Defined in

packages/types/dist/shared.d.ts:839

---

### AMessageProvidedWasTooOldToBulkDelete

• **AMessageProvidedWasTooOldToBulkDelete** = `50034`

#### Defined in

packages/types/dist/shared.d.ts:848

---

### AThreadHasAlreadyBeenCreatedForThisMessage

• **AThreadHasAlreadyBeenCreatedForThisMessage** = `160004`

#### Defined in

packages/types/dist/shared.d.ts:881

---

### AnApplicationCommandWithThatNameAlreadyExists

• **AnApplicationCommandWithThatNameAlreadyExists** = `40041`

#### Defined in

packages/types/dist/shared.d.ts:819

---

### AnInviteWasAcceptedToAGuildTheApplicationsBotIsNotIn

• **AnInviteWasAcceptedToAGuildTheApplicationsBotIsNotIn** = `50036`

#### Defined in

packages/types/dist/shared.d.ts:851

---

### ApiResourceIsCurrentlyOverloadedTryAgainALittleLater

• **ApiResourceIsCurrentlyOverloadedTryAgainALittleLater** = `130000`

#### Defined in

packages/types/dist/shared.d.ts:878

---

### ApplicationInteractionFailedToSend

• **ApplicationInteractionFailedToSend** = `40043`

#### Defined in

packages/types/dist/shared.d.ts:820

---

### ApplicationNotYetAvailable

• **ApplicationNotYetAvailable** = `110001`

#### Defined in

packages/types/dist/shared.d.ts:877

---

### BeforeValueIsEarlierThanTheThreadCreationDate

• **BeforeValueIsEarlierThanTheThreadCreationDate** = `50085`

#### Defined in

packages/types/dist/shared.d.ts:865

---

### BitrateIsTooHighForChannelOfThisType

• **BitrateIsTooHighForChannelOfThisType** = `30052`

#### Defined in

packages/types/dist/shared.d.ts:808

---

### BotsCannotUseThisEndpoint

• **BotsCannotUseThisEndpoint** = `20001`

#### Defined in

packages/types/dist/shared.d.ts:769

---

### CannotDeleteAChannelRequiredForCommunityGuilds

• **CannotDeleteAChannelRequiredForCommunityGuilds** = `50074`

#### Defined in

packages/types/dist/shared.d.ts:860

---

### CannotEditMessageAuthoredByAnotherUser

• **CannotEditMessageAuthoredByAnotherUser** = `50005`

#### Defined in

packages/types/dist/shared.d.ts:826

---

### CannotEditStickersWithinAMessage

• **CannotEditStickersWithinAMessage** = `50080`

#### Defined in

packages/types/dist/shared.d.ts:861

---

### CannotExecuteActionOnADMChannel

• **CannotExecuteActionOnADMChannel** = `50003`

#### Defined in

packages/types/dist/shared.d.ts:824

---

### CannotExecuteActionOnASystemMessage

• **CannotExecuteActionOnASystemMessage** = `50021`

#### Defined in

packages/types/dist/shared.d.ts:841

---

### CannotExecuteActionOnThisChannelType

• **CannotExecuteActionOnThisChannelType** = `50024`

#### Defined in

packages/types/dist/shared.d.ts:842

---

### CannotReplyWithoutPermissionToReadMessageHistory

• **CannotReplyWithoutPermissionToReadMessageHistory** = `160002`

#### Defined in

packages/types/dist/shared.d.ts:880

---

### CannotSelfRedeemThisGift

• **CannotSelfRedeemThisGift** = `50054`

#### Defined in

packages/types/dist/shared.d.ts:856

---

### CannotSendAnEmptyMessage

• **CannotSendAnEmptyMessage** = `50006`

#### Defined in

packages/types/dist/shared.d.ts:827

---

### CannotSendMessagesInANonTextChannel

• **CannotSendMessagesInANonTextChannel** = `50008`

#### Defined in

packages/types/dist/shared.d.ts:829

---

### CannotSendMessagesToThisUser

• **CannotSendMessagesToThisUser** = `50007`

#### Defined in

packages/types/dist/shared.d.ts:828

---

### CannotUpdateAFinishedEvent

• **CannotUpdateAFinishedEvent** = `180000`

#### Defined in

packages/types/dist/shared.d.ts:892

---

### ChannelVerificationLevelIsTooHighForYouToGainAccess

• **ChannelVerificationLevelIsTooHighForYouToGainAccess** = `50009`

#### Defined in

packages/types/dist/shared.d.ts:830

---

### CommunityServerChannelsMustBeTextChannels

• **CommunityServerChannelsMustBeTextChannels** = `50086`

#### Defined in

packages/types/dist/shared.d.ts:866

---

### ConnectionHasBeenRevoked

• **ConnectionHasBeenRevoked** = `40012`

#### Defined in

packages/types/dist/shared.d.ts:816

---

### ExplicitContentCannotBeSentToTheDesiredRecipient

• **ExplicitContentCannotBeSentToTheDesiredRecipient** = `20009`

#### Defined in

packages/types/dist/shared.d.ts:771

---

### FailedToCreateStageNeededForStageEvent

• **FailedToCreateStageNeededForStageEvent** = `180002`

#### Defined in

packages/types/dist/shared.d.ts:893

---

### FailedToResizeAssetBelowTheMaximumSize

• **FailedToResizeAssetBelowTheMaximumSize** = `50138`

#### Defined in

packages/types/dist/shared.d.ts:872

---

### FileUploadedExceedsTheMaximumSize

• **FileUploadedExceedsTheMaximumSize** = `50045`

#### Defined in

packages/types/dist/shared.d.ts:854

---

### GeneralError

• **GeneralError** = `0`

General error (such as a malformed request body, amongst other things)

#### Defined in

packages/types/dist/shared.d.ts:726

---

### GuildAlreadyHasTemplate

• **GuildAlreadyHasTemplate** = `30031`

#### Defined in

packages/types/dist/shared.d.ts:795

---

### GuildPremiumSubscriptionLevelTooLow

• **GuildPremiumSubscriptionLevelTooLow** = `20035`

#### Defined in

packages/types/dist/shared.d.ts:780

---

### GuildWidgetDisabled

• **GuildWidgetDisabled** = `50004`

#### Defined in

packages/types/dist/shared.d.ts:825

---

### InteractionHasAlreadyBeenAcknowledged

• **InteractionHasAlreadyBeenAcknowledged** = `40060`

#### Defined in

packages/types/dist/shared.d.ts:821

---

### InvalidAccountType

• **InvalidAccountType** = `50002`

#### Defined in

packages/types/dist/shared.d.ts:823

---

### InvalidActivityAction

• **InvalidActivityAction** = `50039`

#### Defined in

packages/types/dist/shared.d.ts:852

---

### InvalidApiVersionProvided

• **InvalidApiVersionProvided** = `50041`

#### Defined in

packages/types/dist/shared.d.ts:853

---

### InvalidAuthenticationTokenProvided

• **InvalidAuthenticationTokenProvided** = `50014`

#### Defined in

packages/types/dist/shared.d.ts:835

---

### InvalidFileUploaded

• **InvalidFileUploaded** = `50046`

#### Defined in

packages/types/dist/shared.d.ts:855

---

### InvalidFormBodyOrContentTypeProvided

• **InvalidFormBodyOrContentTypeProvided** = `50035`

Invalid form body (returned for both `application/json` and `multipart/form-data` bodies), or invalid `Content-Type` provided

#### Defined in

packages/types/dist/shared.d.ts:850

---

### InvalidGuild

• **InvalidGuild** = `50055`

#### Defined in

packages/types/dist/shared.d.ts:857

---

### InvalidJsonForUploadedLottieFile

• **InvalidJsonForUploadedLottieFile** = `170001`

#### Defined in

packages/types/dist/shared.d.ts:885

---

### InvalidMFALevel

• **InvalidMFALevel** = `50017`

#### Defined in

packages/types/dist/shared.d.ts:838

---

### InvalidMessageType

• **InvalidMessageType** = `50068`

#### Defined in

packages/types/dist/shared.d.ts:858

---

### InvalidOAuth2AccessTokenProvided

• **InvalidOAuth2AccessTokenProvided** = `50025`

#### Defined in

packages/types/dist/shared.d.ts:843

---

### InvalidOAuth2State

• **InvalidOAuth2State** = `50012`

#### Defined in

packages/types/dist/shared.d.ts:833

---

### InvalidRecipients

• **InvalidRecipients** = `50033`

#### Defined in

packages/types/dist/shared.d.ts:847

---

### InvalidRole

• **InvalidRole** = `50028`

#### Defined in

packages/types/dist/shared.d.ts:846

---

### InvalidStickerSent

• **InvalidStickerSent** = `50081`

#### Defined in

packages/types/dist/shared.d.ts:862

---

### InvalidThreadNotificationSettings

• **InvalidThreadNotificationSettings** = `50084`

#### Defined in

packages/types/dist/shared.d.ts:864

---

### InvalidWebhookTokenProvided

• **InvalidWebhookTokenProvided** = `50027`

#### Defined in

packages/types/dist/shared.d.ts:845

---

### InviteCodeWasEitherInvalidOrTaken

• **InviteCodeWasEitherInvalidOrTaken** = `50020`

#### Defined in

packages/types/dist/shared.d.ts:840

---

### LottieAnimationMaximumDimensionsExceeded

• **LottieAnimationMaximumDimensionsExceeded** = `170005`

#### Defined in

packages/types/dist/shared.d.ts:889

---

### MaxNumberOfDailyApplicationCommandCreatesHasBeenReached

• **MaxNumberOfDailyApplicationCommandCreatesHasBeenReached** = `30034`

#### Defined in

packages/types/dist/shared.d.ts:798

---

### MaxNumberOfThreadParticipantsHasBeenReached

• **MaxNumberOfThreadParticipantsHasBeenReached** = `30033`

#### Defined in

packages/types/dist/shared.d.ts:797

---

### MaximumNumberOfActiveAnnouncementThreadsReached

• **MaximumNumberOfActiveAnnouncementThreadsReached** = `160007`

#### Defined in

packages/types/dist/shared.d.ts:884

---

### MaximumNumberOfActiveThreadsReached

• **MaximumNumberOfActiveThreadsReached** = `160006`

#### Defined in

packages/types/dist/shared.d.ts:883

---

### MaximumNumberOfAnimatedEmojisReached

• **MaximumNumberOfAnimatedEmojisReached** = `30018`

#### Defined in

packages/types/dist/shared.d.ts:792

---

### MaximumNumberOfAttachmentsInAMessageReached

• **MaximumNumberOfAttachmentsInAMessageReached** = `30015`

#### Defined in

packages/types/dist/shared.d.ts:790

---

### MaximumNumberOfBansFetchesHasBeenReached

• **MaximumNumberOfBansFetchesHasBeenReached** = `30037`

#### Defined in

packages/types/dist/shared.d.ts:800

---

### MaximumNumberOfBansForNonGuildMembersHaveBeenExceeded

• **MaximumNumberOfBansForNonGuildMembersHaveBeenExceeded** = `30035`

#### Defined in

packages/types/dist/shared.d.ts:799

---

### MaximumNumberOfEditsToMessagesOlderThan1HourReachedTryAgainLater

• **MaximumNumberOfEditsToMessagesOlderThan1HourReachedTryAgainLater** = `30046`

#### Defined in

packages/types/dist/shared.d.ts:805

---

### MaximumNumberOfEmojisReached

• **MaximumNumberOfEmojisReached** = `30008`

#### Defined in

packages/types/dist/shared.d.ts:787

---

### MaximumNumberOfFriendsReached

• **MaximumNumberOfFriendsReached** = `30002`

#### Defined in

packages/types/dist/shared.d.ts:782

---

### MaximumNumberOfGuildChannelsReached

• **MaximumNumberOfGuildChannelsReached** = `30013`

#### Defined in

packages/types/dist/shared.d.ts:789

---

### MaximumNumberOfGuildRolesReached

• **MaximumNumberOfGuildRolesReached** = `30005`

#### Defined in

packages/types/dist/shared.d.ts:785

---

### MaximumNumberOfGuildWidgetSettingsUpdatesHasBeenReachedTryAgainLater

• **MaximumNumberOfGuildWidgetSettingsUpdatesHasBeenReachedTryAgainLater** = `30042`

#### Defined in

packages/types/dist/shared.d.ts:804

---

### MaximumNumberOfGuildsReached

• **MaximumNumberOfGuildsReached** = `30001`

#### Defined in

packages/types/dist/shared.d.ts:781

---

### MaximumNumberOfInvitesReached

• **MaximumNumberOfInvitesReached** = `30016`

#### Defined in

packages/types/dist/shared.d.ts:791

---

### MaximumNumberOfPinnedThreadsInAForumChannelHasBeenReached

• **MaximumNumberOfPinnedThreadsInAForumChannelHasBeenReached** = `30047`

#### Defined in

packages/types/dist/shared.d.ts:806

---

### MaximumNumberOfPinsReachedForTheChannel

• **MaximumNumberOfPinsReachedForTheChannel** = `30003`

#### Defined in

packages/types/dist/shared.d.ts:783

---

### MaximumNumberOfPruneRequestsHasBeenReachedTryAgainLater

• **MaximumNumberOfPruneRequestsHasBeenReachedTryAgainLater** = `30040`

#### Defined in

packages/types/dist/shared.d.ts:803

---

### MaximumNumberOfReactionsReached

• **MaximumNumberOfReactionsReached** = `30010`

#### Defined in

packages/types/dist/shared.d.ts:788

---

### MaximumNumberOfRecipientsReached

• **MaximumNumberOfRecipientsReached** = `30004`

#### Defined in

packages/types/dist/shared.d.ts:784

---

### MaximumNumberOfServerCategoriesHasBeenReached

• **MaximumNumberOfServerCategoriesHasBeenReached** = `30030`

#### Defined in

packages/types/dist/shared.d.ts:794

---

### MaximumNumberOfServerMembersReached

• **MaximumNumberOfServerMembersReached** = `30019`

#### Defined in

packages/types/dist/shared.d.ts:793

---

### MaximumNumberOfStickersReached

• **MaximumNumberOfStickersReached** = `30039`

#### Defined in

packages/types/dist/shared.d.ts:802

---

### MaximumNumberOfUncompletedGuildScheduledEventsReached

• **MaximumNumberOfUncompletedGuildScheduledEventsReached** = `30038`

#### Defined in

packages/types/dist/shared.d.ts:801

---

### MaximumNumberOfWebhooksReached

• **MaximumNumberOfWebhooksReached** = `30007`

#### Defined in

packages/types/dist/shared.d.ts:786

---

### MaximumNumbersOfApplicationCommandsReached

• **MaximumNumbersOfApplicationCommandsReached** = `30032`

#### Defined in

packages/types/dist/shared.d.ts:796

---

### MaxiumNumberOfTagsInAForumChannelHasBeenReached

• **MaxiumNumberOfTagsInAForumChannelHasBeenReached** = `30048`

#### Defined in

packages/types/dist/shared.d.ts:807

---

### MessageWasBlockedByAutomaticModeration

• **MessageWasBlockedByAutomaticModeration** = `200000`

#### Defined in

packages/types/dist/shared.d.ts:894

---

### MissingAccess

• **MissingAccess** = `50001`

#### Defined in

packages/types/dist/shared.d.ts:822

---

### MissingRequiredOAuth2Scope

• **MissingRequiredOAuth2Scope** = `50026`

#### Defined in

packages/types/dist/shared.d.ts:844

---

### NoUsersWithDiscordTagExist

• **NoUsersWithDiscordTagExist** = `80004`

#### Defined in

packages/types/dist/shared.d.ts:875

---

### NoteWasTooLong

• **NoteWasTooLong** = `50015`

#### Defined in

packages/types/dist/shared.d.ts:836

---

### OAuth2ApplicationDoesNotHaveABot

• **OAuth2ApplicationDoesNotHaveABot** = `50010`

#### Defined in

packages/types/dist/shared.d.ts:831

---

### OAuth2ApplicationLimitReached

• **OAuth2ApplicationLimitReached** = `50011`

#### Defined in

packages/types/dist/shared.d.ts:832

---

### OnlyBotsCanUseThisEndpoint

• **OnlyBotsCanUseThisEndpoint** = `20002`

#### Defined in

packages/types/dist/shared.d.ts:770

---

### OnlyTheOwnerOfThisAccountCanPerformThisAction

• **OnlyTheOwnerOfThisAccountCanPerformThisAction** = `20018`

#### Defined in

packages/types/dist/shared.d.ts:774

---

### OwnershipCannotBeTransferredToABotUser

• **OwnershipCannotBeTransferredToABotUser** = `50132`

#### Defined in

packages/types/dist/shared.d.ts:871

---

### PaymentSourceRequiredToRedeemGift

• **PaymentSourceRequiredToRedeemGift** = `50070`

#### Defined in

packages/types/dist/shared.d.ts:859

---

### ProvidedTooFewOrTooManyMessagesToDeleteMustProvideAtLeast2AndFewerThan100MessagesToDelete

• **ProvidedTooFewOrTooManyMessagesToDeleteMustProvideAtLeast2AndFewerThan100MessagesToDelete** = `50016`

#### Defined in

packages/types/dist/shared.d.ts:837

---

### ReactionWasBlocked

• **ReactionWasBlocked** = `90001`

#### Defined in

packages/types/dist/shared.d.ts:876

---

### RequestEntityTooLargeTrySendingSomethingSmallerInSize

• **RequestEntityTooLargeTrySendingSomethingSmallerInSize** = `40005`

#### Defined in

packages/types/dist/shared.d.ts:813

---

### SendMessagesHasBeenTemporarilyDisabled

• **SendMessagesHasBeenTemporarilyDisabled** = `40004`

#### Defined in

packages/types/dist/shared.d.ts:812

---

### StickerAnimationDurationExceedsMaximumOf5Seconds

• **StickerAnimationDurationExceedsMaximumOf5Seconds** = `170007`

#### Defined in

packages/types/dist/shared.d.ts:891

---

### StickerFrameCountExceedsMaximumOf1000Frames

• **StickerFrameCountExceedsMaximumOf1000Frames** = `170004`

#### Defined in

packages/types/dist/shared.d.ts:888

---

### StickerFrameRateIsEitherTooSmallOrTooLarge

• **StickerFrameRateIsEitherTooSmallOrTooLarge** = `170006`

#### Defined in

packages/types/dist/shared.d.ts:890

---

### StickerMaximumFramerateExceeded

• **StickerMaximumFramerateExceeded** = `170003`

#### Defined in

packages/types/dist/shared.d.ts:887

---

### TargetUserIsNotConnectedToVoice

• **TargetUserIsNotConnectedToVoice** = `40032`

#### Defined in

packages/types/dist/shared.d.ts:817

---

### TheChannelYouAreWritingHasHitTheWriteRateLimit

• **TheChannelYouAreWritingHasHitTheWriteRateLimit** = `20028`

#### Defined in

packages/types/dist/shared.d.ts:777

---

### TheRequestBodyContainsInvalidJSON

• **TheRequestBodyContainsInvalidJSON** = `50109`

#### Defined in

packages/types/dist/shared.d.ts:870

---

### TheStageIsAlreadyOpen

• **TheStageIsAlreadyOpen** = `150006`

#### Defined in

packages/types/dist/shared.d.ts:879

---

### TheWriteActionYouArePerformingOnTheServerHasHitTheWriteRateLimit

• **TheWriteActionYouArePerformingOnTheServerHasHitTheWriteRateLimit** = `20029`

#### Defined in

packages/types/dist/shared.d.ts:778

---

### ThisActionCannotBePerformedDueToSlowmodeRateLimit

• **ThisActionCannotBePerformedDueToSlowmodeRateLimit** = `20016`

#### Defined in

packages/types/dist/shared.d.ts:773

---

### ThisFeatureHasBeenTemporarilyDisabledServerSide

• **ThisFeatureHasBeenTemporarilyDisabledServerSide** = `40006`

#### Defined in

packages/types/dist/shared.d.ts:814

---

### ThisMessageCannotBeEditedDueToAnnouncementRateLimits

• **ThisMessageCannotBeEditedDueToAnnouncementRateLimits** = `20022`

#### Defined in

packages/types/dist/shared.d.ts:775

---

### ThisMessageHasAlreadyBeenCrossposted

• **ThisMessageHasAlreadyBeenCrossposted** = `40033`

#### Defined in

packages/types/dist/shared.d.ts:818

---

### ThisServerIsNotAvailableInYourLocation

• **ThisServerIsNotAvailableInYourLocation** = `50095`

#### Defined in

packages/types/dist/shared.d.ts:867

---

### ThisServerNeedsMonetizationEnabledInOrderToPerformThisAction

• **ThisServerNeedsMonetizationEnabledInOrderToPerformThisAction** = `50097`

#### Defined in

packages/types/dist/shared.d.ts:868

---

### ThisServerNeedsMoreBoostsToPerformThisAction

• **ThisServerNeedsMoreBoostsToPerformThisAction** = `50101`

#### Defined in

packages/types/dist/shared.d.ts:869

---

### ThisUserBannedFromThisGuild

• **ThisUserBannedFromThisGuild** = `40007`

#### Defined in

packages/types/dist/shared.d.ts:815

---

### ThreadIsLocked

• **ThreadIsLocked** = `160005`

#### Defined in

packages/types/dist/shared.d.ts:882

---

### TitleWasBlockedByAutomaticModeration

• **TitleWasBlockedByAutomaticModeration** = `200001`

#### Defined in

packages/types/dist/shared.d.ts:895

---

### TriedToPerformAnOperationOnAnArchivedThreadSuchAsEditingAMessageOrAddingAUserToTheThread

• **TriedToPerformAnOperationOnAnArchivedThreadSuchAsEditingAMessageOrAddingAUserToTheThread** = `50083`

#### Defined in

packages/types/dist/shared.d.ts:863

---

### TwoFactorIsRequiredForThisOperation

• **TwoFactorIsRequiredForThisOperation** = `60003`

#### Defined in

packages/types/dist/shared.d.ts:874

---

### UnauthorizedProvideAValidTokenAndTryAgain

• **UnauthorizedProvideAValidTokenAndTryAgain** = `40001`

#### Defined in

packages/types/dist/shared.d.ts:809

---

### UnderMinimumAge

• **UnderMinimumAge** = `20024`

#### Defined in

packages/types/dist/shared.d.ts:776

---

### UnknownAccount

• **UnknownAccount** = `10001`

#### Defined in

packages/types/dist/shared.d.ts:727

---

### UnknownApplication

• **UnknownApplication** = `10002`

#### Defined in

packages/types/dist/shared.d.ts:728

---

### UnknownApplicationCommand

• **UnknownApplicationCommand** = `10063`

#### Defined in

packages/types/dist/shared.d.ts:760

---

### UnknownApplicationCommandPermissions

• **UnknownApplicationCommandPermissions** = `10066`

#### Defined in

packages/types/dist/shared.d.ts:762

---

### UnknownBan

• **UnknownBan** = `10026`

#### Defined in

packages/types/dist/shared.d.ts:744

---

### UnknownBranch

• **UnknownBranch** = `10032`

#### Defined in

packages/types/dist/shared.d.ts:750

---

### UnknownBuild

• **UnknownBuild** = `10030`

#### Defined in

packages/types/dist/shared.d.ts:748

---

### UnknownChannel

• **UnknownChannel** = `10003`

#### Defined in

packages/types/dist/shared.d.ts:729

---

### UnknownDiscoveryCategory

• **UnknownDiscoveryCategory** = `10059`

#### Defined in

packages/types/dist/shared.d.ts:757

---

### UnknownEmoji

• **UnknownEmoji** = `10014`

#### Defined in

packages/types/dist/shared.d.ts:740

---

### UnknownEntitlement

• **UnknownEntitlement** = `10029`

#### Defined in

packages/types/dist/shared.d.ts:747

---

### UnknownGiftCode

• **UnknownGiftCode** = `10038`

#### Defined in

packages/types/dist/shared.d.ts:753

---

### UnknownGuild

• **UnknownGuild** = `10004`

#### Defined in

packages/types/dist/shared.d.ts:730

---

### UnknownGuildMemberVerificationForm

• **UnknownGuildMemberVerificationForm** = `10068`

#### Defined in

packages/types/dist/shared.d.ts:764

---

### UnknownGuildScheduledEvent

• **UnknownGuildScheduledEvent** = `10070`

#### Defined in

packages/types/dist/shared.d.ts:766

---

### UnknownGuildScheduledEventUser

• **UnknownGuildScheduledEventUser** = `10071`

#### Defined in

packages/types/dist/shared.d.ts:767

---

### UnknownGuildTemplate

• **UnknownGuildTemplate** = `10057`

#### Defined in

packages/types/dist/shared.d.ts:756

---

### UnknownGuildWelcomeScreen

• **UnknownGuildWelcomeScreen** = `10069`

#### Defined in

packages/types/dist/shared.d.ts:765

---

### UnknownIntegration

• **UnknownIntegration** = `10005`

#### Defined in

packages/types/dist/shared.d.ts:731

---

### UnknownInteraction

• **UnknownInteraction** = `10062`

#### Defined in

packages/types/dist/shared.d.ts:759

---

### UnknownInvite

• **UnknownInvite** = `10006`

#### Defined in

packages/types/dist/shared.d.ts:732

---

### UnknownLobby

• **UnknownLobby** = `10031`

#### Defined in

packages/types/dist/shared.d.ts:749

---

### UnknownMember

• **UnknownMember** = `10007`

#### Defined in

packages/types/dist/shared.d.ts:733

---

### UnknownMessage

• **UnknownMessage** = `10008`

#### Defined in

packages/types/dist/shared.d.ts:734

---

### UnknownPermissionOverwrite

• **UnknownPermissionOverwrite** = `10009`

#### Defined in

packages/types/dist/shared.d.ts:735

---

### UnknownPremiumServerSubscribeCooldown

• **UnknownPremiumServerSubscribeCooldown** = `10050`

#### Defined in

packages/types/dist/shared.d.ts:755

---

### UnknownProvider

• **UnknownProvider** = `10010`

#### Defined in

packages/types/dist/shared.d.ts:736

---

### UnknownRedistributable

• **UnknownRedistributable** = `10036`

#### Defined in

packages/types/dist/shared.d.ts:752

---

### UnknownRole

• **UnknownRole** = `10011`

#### Defined in

packages/types/dist/shared.d.ts:737

---

### UnknownSKU

• **UnknownSKU** = `10027`

#### Defined in

packages/types/dist/shared.d.ts:745

---

### UnknownSession

• **UnknownSession** = `10020`

#### Defined in

packages/types/dist/shared.d.ts:743

---

### UnknownStageInstance

• **UnknownStageInstance** = `10067`

#### Defined in

packages/types/dist/shared.d.ts:763

---

### UnknownSticker

• **UnknownSticker** = `10060`

#### Defined in

packages/types/dist/shared.d.ts:758

---

### UnknownStoreDirectoryLayout

• **UnknownStoreDirectoryLayout** = `10033`

#### Defined in

packages/types/dist/shared.d.ts:751

---

### UnknownStoreListing

• **UnknownStoreListing** = `10028`

#### Defined in

packages/types/dist/shared.d.ts:746

---

### UnknownStream

• **UnknownStream** = `10049`

#### Defined in

packages/types/dist/shared.d.ts:754

---

### UnknownTag

• **UnknownTag** = `10087`

#### Defined in

packages/types/dist/shared.d.ts:768

---

### UnknownToken

• **UnknownToken** = `10012`

#### Defined in

packages/types/dist/shared.d.ts:738

---

### UnknownUser

• **UnknownUser** = `10013`

#### Defined in

packages/types/dist/shared.d.ts:739

---

### UnknownVoiceState

• **UnknownVoiceState** = `10065`

#### Defined in

packages/types/dist/shared.d.ts:761

---

### UnknownWebhook

• **UnknownWebhook** = `10015`

#### Defined in

packages/types/dist/shared.d.ts:741

---

### UnknownWebhookService

• **UnknownWebhookService** = `10016`

#### Defined in

packages/types/dist/shared.d.ts:742

---

### UploadedFileNotFound

• **UploadedFileNotFound** = `50146`

#### Defined in

packages/types/dist/shared.d.ts:873

---

### UploadedLottiesCannotContainRasterizedImagesSuchAsPngOrJpeg

• **UploadedLottiesCannotContainRasterizedImagesSuchAsPngOrJpeg** = `170002`

#### Defined in

packages/types/dist/shared.d.ts:886

---

### WebhooksCanOnlyCreateThreadsInForumChannels

• **WebhooksCanOnlyCreateThreadsInForumChannels** = `220003`

#### Defined in

packages/types/dist/shared.d.ts:896

---

### YouAreNotAuthorizedToPerformThisActionOnThisApplication

• **YouAreNotAuthorizedToPerformThisActionOnThisApplication** = `20012`

#### Defined in

packages/types/dist/shared.d.ts:772

---

### YouAreOpeningDirectMessagesTooFast

• **YouAreOpeningDirectMessagesTooFast** = `40003`

#### Defined in

packages/types/dist/shared.d.ts:811

---

### YouLackPermissionsToPerformThatAction

• **YouLackPermissionsToPerformThatAction** = `50013`

#### Defined in

packages/types/dist/shared.d.ts:834

---

### YouNeedToVerifyYourAccountInOrderToPerformThisAction

• **YouNeedToVerifyYourAccountInOrderToPerformThisAction** = `40002`

#### Defined in

packages/types/dist/shared.d.ts:810

---

### YourStageTopicOrServerNameOrServerDescriptionOrChannelNamesContainsWordsThatAreNotAllowedForPublicStages

• **YourStageTopicOrServerNameOrServerDescriptionOrChannelNamesContainsWordsThatAreNotAllowedForPublicStages** = `20031`

#### Defined in

packages/types/dist/shared.d.ts:779
