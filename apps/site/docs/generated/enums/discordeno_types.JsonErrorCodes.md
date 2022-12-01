[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / JsonErrorCodes

# Enumeration: JsonErrorCodes

[@discordeno/types](../modules/discordeno_types.md).JsonErrorCodes

https://discord.com/developers/docs/topics/opcodes-and-status-codes#json

## Table of contents

### Enumeration Members

- [AMessageCanOnlyBePinnedInTheChannelItWasSentIn](discordeno_types.JsonErrorCodes.md#amessagecanonlybepinnedinthechannelitwassentin)
- [AMessageProvidedWasTooOldToBulkDelete](discordeno_types.JsonErrorCodes.md#amessageprovidedwastoooldtobulkdelete)
- [AThreadHasAlreadyBeenCreatedForThisMessage](discordeno_types.JsonErrorCodes.md#athreadhasalreadybeencreatedforthismessage)
- [AnApplicationCommandWithThatNameAlreadyExists](discordeno_types.JsonErrorCodes.md#anapplicationcommandwiththatnamealreadyexists)
- [AnInviteWasAcceptedToAGuildTheApplicationsBotIsNotIn](discordeno_types.JsonErrorCodes.md#aninvitewasacceptedtoaguildtheapplicationsbotisnotin)
- [ApiResourceIsCurrentlyOverloadedTryAgainALittleLater](discordeno_types.JsonErrorCodes.md#apiresourceiscurrentlyoverloadedtryagainalittlelater)
- [ApplicationInteractionFailedToSend](discordeno_types.JsonErrorCodes.md#applicationinteractionfailedtosend)
- [ApplicationNotYetAvailable](discordeno_types.JsonErrorCodes.md#applicationnotyetavailable)
- [BeforeValueIsEarlierThanTheThreadCreationDate](discordeno_types.JsonErrorCodes.md#beforevalueisearlierthanthethreadcreationdate)
- [BitrateIsTooHighForChannelOfThisType](discordeno_types.JsonErrorCodes.md#bitrateistoohighforchannelofthistype)
- [BotsCannotUseThisEndpoint](discordeno_types.JsonErrorCodes.md#botscannotusethisendpoint)
- [CannotDeleteAChannelRequiredForCommunityGuilds](discordeno_types.JsonErrorCodes.md#cannotdeleteachannelrequiredforcommunityguilds)
- [CannotEditMessageAuthoredByAnotherUser](discordeno_types.JsonErrorCodes.md#cannoteditmessageauthoredbyanotheruser)
- [CannotEditStickersWithinAMessage](discordeno_types.JsonErrorCodes.md#cannoteditstickerswithinamessage)
- [CannotExecuteActionOnADMChannel](discordeno_types.JsonErrorCodes.md#cannotexecuteactiononadmchannel)
- [CannotExecuteActionOnASystemMessage](discordeno_types.JsonErrorCodes.md#cannotexecuteactiononasystemmessage)
- [CannotExecuteActionOnThisChannelType](discordeno_types.JsonErrorCodes.md#cannotexecuteactiononthischanneltype)
- [CannotReplyWithoutPermissionToReadMessageHistory](discordeno_types.JsonErrorCodes.md#cannotreplywithoutpermissiontoreadmessagehistory)
- [CannotSelfRedeemThisGift](discordeno_types.JsonErrorCodes.md#cannotselfredeemthisgift)
- [CannotSendAnEmptyMessage](discordeno_types.JsonErrorCodes.md#cannotsendanemptymessage)
- [CannotSendMessagesInANonTextChannel](discordeno_types.JsonErrorCodes.md#cannotsendmessagesinanontextchannel)
- [CannotSendMessagesToThisUser](discordeno_types.JsonErrorCodes.md#cannotsendmessagestothisuser)
- [CannotUpdateAFinishedEvent](discordeno_types.JsonErrorCodes.md#cannotupdateafinishedevent)
- [ChannelVerificationLevelIsTooHighForYouToGainAccess](discordeno_types.JsonErrorCodes.md#channelverificationlevelistoohighforyoutogainaccess)
- [CommunityServerChannelsMustBeTextChannels](discordeno_types.JsonErrorCodes.md#communityserverchannelsmustbetextchannels)
- [ConnectionHasBeenRevoked](discordeno_types.JsonErrorCodes.md#connectionhasbeenrevoked)
- [ExplicitContentCannotBeSentToTheDesiredRecipient](discordeno_types.JsonErrorCodes.md#explicitcontentcannotbesenttothedesiredrecipient)
- [FailedToCreateStageNeededForStageEvent](discordeno_types.JsonErrorCodes.md#failedtocreatestageneededforstageevent)
- [FailedToResizeAssetBelowTheMaximumSize](discordeno_types.JsonErrorCodes.md#failedtoresizeassetbelowthemaximumsize)
- [FileUploadedExceedsTheMaximumSize](discordeno_types.JsonErrorCodes.md#fileuploadedexceedsthemaximumsize)
- [GeneralError](discordeno_types.JsonErrorCodes.md#generalerror)
- [GuildAlreadyHasTemplate](discordeno_types.JsonErrorCodes.md#guildalreadyhastemplate)
- [GuildPremiumSubscriptionLevelTooLow](discordeno_types.JsonErrorCodes.md#guildpremiumsubscriptionleveltoolow)
- [GuildWidgetDisabled](discordeno_types.JsonErrorCodes.md#guildwidgetdisabled)
- [InteractionHasAlreadyBeenAcknowledged](discordeno_types.JsonErrorCodes.md#interactionhasalreadybeenacknowledged)
- [InvalidAccountType](discordeno_types.JsonErrorCodes.md#invalidaccounttype)
- [InvalidActivityAction](discordeno_types.JsonErrorCodes.md#invalidactivityaction)
- [InvalidApiVersionProvided](discordeno_types.JsonErrorCodes.md#invalidapiversionprovided)
- [InvalidAuthenticationTokenProvided](discordeno_types.JsonErrorCodes.md#invalidauthenticationtokenprovided)
- [InvalidFileUploaded](discordeno_types.JsonErrorCodes.md#invalidfileuploaded)
- [InvalidFormBodyOrContentTypeProvided](discordeno_types.JsonErrorCodes.md#invalidformbodyorcontenttypeprovided)
- [InvalidGuild](discordeno_types.JsonErrorCodes.md#invalidguild)
- [InvalidJsonForUploadedLottieFile](discordeno_types.JsonErrorCodes.md#invalidjsonforuploadedlottiefile)
- [InvalidMFALevel](discordeno_types.JsonErrorCodes.md#invalidmfalevel)
- [InvalidMessageType](discordeno_types.JsonErrorCodes.md#invalidmessagetype)
- [InvalidOAuth2AccessTokenProvided](discordeno_types.JsonErrorCodes.md#invalidoauth2accesstokenprovided)
- [InvalidOAuth2State](discordeno_types.JsonErrorCodes.md#invalidoauth2state)
- [InvalidRecipients](discordeno_types.JsonErrorCodes.md#invalidrecipients)
- [InvalidRole](discordeno_types.JsonErrorCodes.md#invalidrole)
- [InvalidStickerSent](discordeno_types.JsonErrorCodes.md#invalidstickersent)
- [InvalidThreadNotificationSettings](discordeno_types.JsonErrorCodes.md#invalidthreadnotificationsettings)
- [InvalidWebhookTokenProvided](discordeno_types.JsonErrorCodes.md#invalidwebhooktokenprovided)
- [InviteCodeWasEitherInvalidOrTaken](discordeno_types.JsonErrorCodes.md#invitecodewaseitherinvalidortaken)
- [LottieAnimationMaximumDimensionsExceeded](discordeno_types.JsonErrorCodes.md#lottieanimationmaximumdimensionsexceeded)
- [MaxNumberOfDailyApplicationCommandCreatesHasBeenReached](discordeno_types.JsonErrorCodes.md#maxnumberofdailyapplicationcommandcreateshasbeenreached)
- [MaxNumberOfThreadParticipantsHasBeenReached](discordeno_types.JsonErrorCodes.md#maxnumberofthreadparticipantshasbeenreached)
- [MaximumNumberOfActiveAnnouncementThreadsReached](discordeno_types.JsonErrorCodes.md#maximumnumberofactiveannouncementthreadsreached)
- [MaximumNumberOfActiveThreadsReached](discordeno_types.JsonErrorCodes.md#maximumnumberofactivethreadsreached)
- [MaximumNumberOfAnimatedEmojisReached](discordeno_types.JsonErrorCodes.md#maximumnumberofanimatedemojisreached)
- [MaximumNumberOfAttachmentsInAMessageReached](discordeno_types.JsonErrorCodes.md#maximumnumberofattachmentsinamessagereached)
- [MaximumNumberOfBansFetchesHasBeenReached](discordeno_types.JsonErrorCodes.md#maximumnumberofbansfetcheshasbeenreached)
- [MaximumNumberOfBansForNonGuildMembersHaveBeenExceeded](discordeno_types.JsonErrorCodes.md#maximumnumberofbansfornonguildmembershavebeenexceeded)
- [MaximumNumberOfEditsToMessagesOlderThan1HourReachedTryAgainLater](discordeno_types.JsonErrorCodes.md#maximumnumberofeditstomessagesolderthan1hourreachedtryagainlater)
- [MaximumNumberOfEmojisReached](discordeno_types.JsonErrorCodes.md#maximumnumberofemojisreached)
- [MaximumNumberOfFriendsReached](discordeno_types.JsonErrorCodes.md#maximumnumberoffriendsreached)
- [MaximumNumberOfGuildChannelsReached](discordeno_types.JsonErrorCodes.md#maximumnumberofguildchannelsreached)
- [MaximumNumberOfGuildRolesReached](discordeno_types.JsonErrorCodes.md#maximumnumberofguildrolesreached)
- [MaximumNumberOfGuildWidgetSettingsUpdatesHasBeenReachedTryAgainLater](discordeno_types.JsonErrorCodes.md#maximumnumberofguildwidgetsettingsupdateshasbeenreachedtryagainlater)
- [MaximumNumberOfGuildsReached](discordeno_types.JsonErrorCodes.md#maximumnumberofguildsreached)
- [MaximumNumberOfInvitesReached](discordeno_types.JsonErrorCodes.md#maximumnumberofinvitesreached)
- [MaximumNumberOfPinnedThreadsInAForumChannelHasBeenReached](discordeno_types.JsonErrorCodes.md#maximumnumberofpinnedthreadsinaforumchannelhasbeenreached)
- [MaximumNumberOfPinsReachedForTheChannel](discordeno_types.JsonErrorCodes.md#maximumnumberofpinsreachedforthechannel)
- [MaximumNumberOfPruneRequestsHasBeenReachedTryAgainLater](discordeno_types.JsonErrorCodes.md#maximumnumberofprunerequestshasbeenreachedtryagainlater)
- [MaximumNumberOfReactionsReached](discordeno_types.JsonErrorCodes.md#maximumnumberofreactionsreached)
- [MaximumNumberOfRecipientsReached](discordeno_types.JsonErrorCodes.md#maximumnumberofrecipientsreached)
- [MaximumNumberOfServerCategoriesHasBeenReached](discordeno_types.JsonErrorCodes.md#maximumnumberofservercategorieshasbeenreached)
- [MaximumNumberOfServerMembersReached](discordeno_types.JsonErrorCodes.md#maximumnumberofservermembersreached)
- [MaximumNumberOfStickersReached](discordeno_types.JsonErrorCodes.md#maximumnumberofstickersreached)
- [MaximumNumberOfUncompletedGuildScheduledEventsReached](discordeno_types.JsonErrorCodes.md#maximumnumberofuncompletedguildscheduledeventsreached)
- [MaximumNumberOfWebhooksReached](discordeno_types.JsonErrorCodes.md#maximumnumberofwebhooksreached)
- [MaximumNumbersOfApplicationCommandsReached](discordeno_types.JsonErrorCodes.md#maximumnumbersofapplicationcommandsreached)
- [MaxiumNumberOfTagsInAForumChannelHasBeenReached](discordeno_types.JsonErrorCodes.md#maxiumnumberoftagsinaforumchannelhasbeenreached)
- [MessageWasBlockedByAutomaticModeration](discordeno_types.JsonErrorCodes.md#messagewasblockedbyautomaticmoderation)
- [MissingAccess](discordeno_types.JsonErrorCodes.md#missingaccess)
- [MissingRequiredOAuth2Scope](discordeno_types.JsonErrorCodes.md#missingrequiredoauth2scope)
- [NoUsersWithDiscordTagExist](discordeno_types.JsonErrorCodes.md#nouserswithdiscordtagexist)
- [NoteWasTooLong](discordeno_types.JsonErrorCodes.md#notewastoolong)
- [OAuth2ApplicationDoesNotHaveABot](discordeno_types.JsonErrorCodes.md#oauth2applicationdoesnothaveabot)
- [OAuth2ApplicationLimitReached](discordeno_types.JsonErrorCodes.md#oauth2applicationlimitreached)
- [OnlyBotsCanUseThisEndpoint](discordeno_types.JsonErrorCodes.md#onlybotscanusethisendpoint)
- [OnlyTheOwnerOfThisAccountCanPerformThisAction](discordeno_types.JsonErrorCodes.md#onlytheownerofthisaccountcanperformthisaction)
- [OwnershipCannotBeTransferredToABotUser](discordeno_types.JsonErrorCodes.md#ownershipcannotbetransferredtoabotuser)
- [PaymentSourceRequiredToRedeemGift](discordeno_types.JsonErrorCodes.md#paymentsourcerequiredtoredeemgift)
- [ProvidedTooFewOrTooManyMessagesToDeleteMustProvideAtLeast2AndFewerThan100MessagesToDelete](discordeno_types.JsonErrorCodes.md#providedtoofewortoomanymessagestodeletemustprovideatleast2andfewerthan100messagestodelete)
- [ReactionWasBlocked](discordeno_types.JsonErrorCodes.md#reactionwasblocked)
- [RequestEntityTooLargeTrySendingSomethingSmallerInSize](discordeno_types.JsonErrorCodes.md#requestentitytoolargetrysendingsomethingsmallerinsize)
- [SendMessagesHasBeenTemporarilyDisabled](discordeno_types.JsonErrorCodes.md#sendmessageshasbeentemporarilydisabled)
- [StickerAnimationDurationExceedsMaximumOf5Seconds](discordeno_types.JsonErrorCodes.md#stickeranimationdurationexceedsmaximumof5seconds)
- [StickerFrameCountExceedsMaximumOf1000Frames](discordeno_types.JsonErrorCodes.md#stickerframecountexceedsmaximumof1000frames)
- [StickerFrameRateIsEitherTooSmallOrTooLarge](discordeno_types.JsonErrorCodes.md#stickerframerateiseithertoosmallortoolarge)
- [StickerMaximumFramerateExceeded](discordeno_types.JsonErrorCodes.md#stickermaximumframerateexceeded)
- [TargetUserIsNotConnectedToVoice](discordeno_types.JsonErrorCodes.md#targetuserisnotconnectedtovoice)
- [TheChannelYouAreWritingHasHitTheWriteRateLimit](discordeno_types.JsonErrorCodes.md#thechannelyouarewritinghashitthewriteratelimit)
- [TheRequestBodyContainsInvalidJSON](discordeno_types.JsonErrorCodes.md#therequestbodycontainsinvalidjson)
- [TheStageIsAlreadyOpen](discordeno_types.JsonErrorCodes.md#thestageisalreadyopen)
- [TheWriteActionYouArePerformingOnTheServerHasHitTheWriteRateLimit](discordeno_types.JsonErrorCodes.md#thewriteactionyouareperformingontheserverhashitthewriteratelimit)
- [ThisActionCannotBePerformedDueToSlowmodeRateLimit](discordeno_types.JsonErrorCodes.md#thisactioncannotbeperformedduetoslowmoderatelimit)
- [ThisFeatureHasBeenTemporarilyDisabledServerSide](discordeno_types.JsonErrorCodes.md#thisfeaturehasbeentemporarilydisabledserverside)
- [ThisMessageCannotBeEditedDueToAnnouncementRateLimits](discordeno_types.JsonErrorCodes.md#thismessagecannotbeeditedduetoannouncementratelimits)
- [ThisMessageHasAlreadyBeenCrossposted](discordeno_types.JsonErrorCodes.md#thismessagehasalreadybeencrossposted)
- [ThisServerIsNotAvailableInYourLocation](discordeno_types.JsonErrorCodes.md#thisserverisnotavailableinyourlocation)
- [ThisServerNeedsMonetizationEnabledInOrderToPerformThisAction](discordeno_types.JsonErrorCodes.md#thisserverneedsmonetizationenabledinordertoperformthisaction)
- [ThisServerNeedsMoreBoostsToPerformThisAction](discordeno_types.JsonErrorCodes.md#thisserverneedsmorebooststoperformthisaction)
- [ThisUserBannedFromThisGuild](discordeno_types.JsonErrorCodes.md#thisuserbannedfromthisguild)
- [ThreadIsLocked](discordeno_types.JsonErrorCodes.md#threadislocked)
- [TitleWasBlockedByAutomaticModeration](discordeno_types.JsonErrorCodes.md#titlewasblockedbyautomaticmoderation)
- [TriedToPerformAnOperationOnAnArchivedThreadSuchAsEditingAMessageOrAddingAUserToTheThread](discordeno_types.JsonErrorCodes.md#triedtoperformanoperationonanarchivedthreadsuchaseditingamessageoraddingausertothethread)
- [TwoFactorIsRequiredForThisOperation](discordeno_types.JsonErrorCodes.md#twofactorisrequiredforthisoperation)
- [UnauthorizedProvideAValidTokenAndTryAgain](discordeno_types.JsonErrorCodes.md#unauthorizedprovideavalidtokenandtryagain)
- [UnderMinimumAge](discordeno_types.JsonErrorCodes.md#underminimumage)
- [UnknownAccount](discordeno_types.JsonErrorCodes.md#unknownaccount)
- [UnknownApplication](discordeno_types.JsonErrorCodes.md#unknownapplication)
- [UnknownApplicationCommand](discordeno_types.JsonErrorCodes.md#unknownapplicationcommand)
- [UnknownApplicationCommandPermissions](discordeno_types.JsonErrorCodes.md#unknownapplicationcommandpermissions)
- [UnknownBan](discordeno_types.JsonErrorCodes.md#unknownban)
- [UnknownBranch](discordeno_types.JsonErrorCodes.md#unknownbranch)
- [UnknownBuild](discordeno_types.JsonErrorCodes.md#unknownbuild)
- [UnknownChannel](discordeno_types.JsonErrorCodes.md#unknownchannel)
- [UnknownDiscoveryCategory](discordeno_types.JsonErrorCodes.md#unknowndiscoverycategory)
- [UnknownEmoji](discordeno_types.JsonErrorCodes.md#unknownemoji)
- [UnknownEntitlement](discordeno_types.JsonErrorCodes.md#unknownentitlement)
- [UnknownGiftCode](discordeno_types.JsonErrorCodes.md#unknowngiftcode)
- [UnknownGuild](discordeno_types.JsonErrorCodes.md#unknownguild)
- [UnknownGuildMemberVerificationForm](discordeno_types.JsonErrorCodes.md#unknownguildmemberverificationform)
- [UnknownGuildScheduledEvent](discordeno_types.JsonErrorCodes.md#unknownguildscheduledevent)
- [UnknownGuildScheduledEventUser](discordeno_types.JsonErrorCodes.md#unknownguildscheduledeventuser)
- [UnknownGuildTemplate](discordeno_types.JsonErrorCodes.md#unknownguildtemplate)
- [UnknownGuildWelcomeScreen](discordeno_types.JsonErrorCodes.md#unknownguildwelcomescreen)
- [UnknownIntegration](discordeno_types.JsonErrorCodes.md#unknownintegration)
- [UnknownInteraction](discordeno_types.JsonErrorCodes.md#unknowninteraction)
- [UnknownInvite](discordeno_types.JsonErrorCodes.md#unknowninvite)
- [UnknownLobby](discordeno_types.JsonErrorCodes.md#unknownlobby)
- [UnknownMember](discordeno_types.JsonErrorCodes.md#unknownmember)
- [UnknownMessage](discordeno_types.JsonErrorCodes.md#unknownmessage)
- [UnknownPermissionOverwrite](discordeno_types.JsonErrorCodes.md#unknownpermissionoverwrite)
- [UnknownPremiumServerSubscribeCooldown](discordeno_types.JsonErrorCodes.md#unknownpremiumserversubscribecooldown)
- [UnknownProvider](discordeno_types.JsonErrorCodes.md#unknownprovider)
- [UnknownRedistributable](discordeno_types.JsonErrorCodes.md#unknownredistributable)
- [UnknownRole](discordeno_types.JsonErrorCodes.md#unknownrole)
- [UnknownSKU](discordeno_types.JsonErrorCodes.md#unknownsku)
- [UnknownSession](discordeno_types.JsonErrorCodes.md#unknownsession)
- [UnknownStageInstance](discordeno_types.JsonErrorCodes.md#unknownstageinstance)
- [UnknownSticker](discordeno_types.JsonErrorCodes.md#unknownsticker)
- [UnknownStoreDirectoryLayout](discordeno_types.JsonErrorCodes.md#unknownstoredirectorylayout)
- [UnknownStoreListing](discordeno_types.JsonErrorCodes.md#unknownstorelisting)
- [UnknownStream](discordeno_types.JsonErrorCodes.md#unknownstream)
- [UnknownTag](discordeno_types.JsonErrorCodes.md#unknowntag)
- [UnknownToken](discordeno_types.JsonErrorCodes.md#unknowntoken)
- [UnknownUser](discordeno_types.JsonErrorCodes.md#unknownuser)
- [UnknownVoiceState](discordeno_types.JsonErrorCodes.md#unknownvoicestate)
- [UnknownWebhook](discordeno_types.JsonErrorCodes.md#unknownwebhook)
- [UnknownWebhookService](discordeno_types.JsonErrorCodes.md#unknownwebhookservice)
- [UploadedFileNotFound](discordeno_types.JsonErrorCodes.md#uploadedfilenotfound)
- [UploadedLottiesCannotContainRasterizedImagesSuchAsPngOrJpeg](discordeno_types.JsonErrorCodes.md#uploadedlottiescannotcontainrasterizedimagessuchaspngorjpeg)
- [WebhooksCanOnlyCreateThreadsInForumChannels](discordeno_types.JsonErrorCodes.md#webhookscanonlycreatethreadsinforumchannels)
- [YouAreNotAuthorizedToPerformThisActionOnThisApplication](discordeno_types.JsonErrorCodes.md#youarenotauthorizedtoperformthisactiononthisapplication)
- [YouAreOpeningDirectMessagesTooFast](discordeno_types.JsonErrorCodes.md#youareopeningdirectmessagestoofast)
- [YouLackPermissionsToPerformThatAction](discordeno_types.JsonErrorCodes.md#youlackpermissionstoperformthataction)
- [YouNeedToVerifyYourAccountInOrderToPerformThisAction](discordeno_types.JsonErrorCodes.md#youneedtoverifyyouraccountinordertoperformthisaction)
- [YourStageTopicOrServerNameOrServerDescriptionOrChannelNamesContainsWordsThatAreNotAllowedForPublicStages](discordeno_types.JsonErrorCodes.md#yourstagetopicorservernameorserverdescriptionorchannelnamescontainswordsthatarenotallowedforpublicstages)

## Enumeration Members

### AMessageCanOnlyBePinnedInTheChannelItWasSentIn

• **AMessageCanOnlyBePinnedInTheChannelItWasSentIn** = `50019`

#### Defined in

[packages/types/src/shared.ts:890](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L890)

---

### AMessageProvidedWasTooOldToBulkDelete

• **AMessageProvidedWasTooOldToBulkDelete** = `50034`

#### Defined in

[packages/types/src/shared.ts:899](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L899)

---

### AThreadHasAlreadyBeenCreatedForThisMessage

• **AThreadHasAlreadyBeenCreatedForThisMessage** = `160004`

#### Defined in

[packages/types/src/shared.ts:932](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L932)

---

### AnApplicationCommandWithThatNameAlreadyExists

• **AnApplicationCommandWithThatNameAlreadyExists** = `40041`

#### Defined in

[packages/types/src/shared.ts:870](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L870)

---

### AnInviteWasAcceptedToAGuildTheApplicationsBotIsNotIn

• **AnInviteWasAcceptedToAGuildTheApplicationsBotIsNotIn** = `50036`

#### Defined in

[packages/types/src/shared.ts:902](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L902)

---

### ApiResourceIsCurrentlyOverloadedTryAgainALittleLater

• **ApiResourceIsCurrentlyOverloadedTryAgainALittleLater** = `130000`

#### Defined in

[packages/types/src/shared.ts:929](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L929)

---

### ApplicationInteractionFailedToSend

• **ApplicationInteractionFailedToSend** = `40043`

#### Defined in

[packages/types/src/shared.ts:871](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L871)

---

### ApplicationNotYetAvailable

• **ApplicationNotYetAvailable** = `110001`

#### Defined in

[packages/types/src/shared.ts:928](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L928)

---

### BeforeValueIsEarlierThanTheThreadCreationDate

• **BeforeValueIsEarlierThanTheThreadCreationDate** = `50085`

#### Defined in

[packages/types/src/shared.ts:916](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L916)

---

### BitrateIsTooHighForChannelOfThisType

• **BitrateIsTooHighForChannelOfThisType** = `30052`

#### Defined in

[packages/types/src/shared.ts:859](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L859)

---

### BotsCannotUseThisEndpoint

• **BotsCannotUseThisEndpoint** = `20001`

#### Defined in

[packages/types/src/shared.ts:820](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L820)

---

### CannotDeleteAChannelRequiredForCommunityGuilds

• **CannotDeleteAChannelRequiredForCommunityGuilds** = `50074`

#### Defined in

[packages/types/src/shared.ts:911](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L911)

---

### CannotEditMessageAuthoredByAnotherUser

• **CannotEditMessageAuthoredByAnotherUser** = `50005`

#### Defined in

[packages/types/src/shared.ts:877](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L877)

---

### CannotEditStickersWithinAMessage

• **CannotEditStickersWithinAMessage** = `50080`

#### Defined in

[packages/types/src/shared.ts:912](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L912)

---

### CannotExecuteActionOnADMChannel

• **CannotExecuteActionOnADMChannel** = `50003`

#### Defined in

[packages/types/src/shared.ts:875](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L875)

---

### CannotExecuteActionOnASystemMessage

• **CannotExecuteActionOnASystemMessage** = `50021`

#### Defined in

[packages/types/src/shared.ts:892](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L892)

---

### CannotExecuteActionOnThisChannelType

• **CannotExecuteActionOnThisChannelType** = `50024`

#### Defined in

[packages/types/src/shared.ts:893](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L893)

---

### CannotReplyWithoutPermissionToReadMessageHistory

• **CannotReplyWithoutPermissionToReadMessageHistory** = `160002`

#### Defined in

[packages/types/src/shared.ts:931](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L931)

---

### CannotSelfRedeemThisGift

• **CannotSelfRedeemThisGift** = `50054`

#### Defined in

[packages/types/src/shared.ts:907](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L907)

---

### CannotSendAnEmptyMessage

• **CannotSendAnEmptyMessage** = `50006`

#### Defined in

[packages/types/src/shared.ts:878](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L878)

---

### CannotSendMessagesInANonTextChannel

• **CannotSendMessagesInANonTextChannel** = `50008`

#### Defined in

[packages/types/src/shared.ts:880](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L880)

---

### CannotSendMessagesToThisUser

• **CannotSendMessagesToThisUser** = `50007`

#### Defined in

[packages/types/src/shared.ts:879](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L879)

---

### CannotUpdateAFinishedEvent

• **CannotUpdateAFinishedEvent** = `180000`

#### Defined in

[packages/types/src/shared.ts:943](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L943)

---

### ChannelVerificationLevelIsTooHighForYouToGainAccess

• **ChannelVerificationLevelIsTooHighForYouToGainAccess** = `50009`

#### Defined in

[packages/types/src/shared.ts:881](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L881)

---

### CommunityServerChannelsMustBeTextChannels

• **CommunityServerChannelsMustBeTextChannels** = `50086`

#### Defined in

[packages/types/src/shared.ts:917](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L917)

---

### ConnectionHasBeenRevoked

• **ConnectionHasBeenRevoked** = `40012`

#### Defined in

[packages/types/src/shared.ts:867](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L867)

---

### ExplicitContentCannotBeSentToTheDesiredRecipient

• **ExplicitContentCannotBeSentToTheDesiredRecipient** = `20009`

#### Defined in

[packages/types/src/shared.ts:822](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L822)

---

### FailedToCreateStageNeededForStageEvent

• **FailedToCreateStageNeededForStageEvent** = `180002`

#### Defined in

[packages/types/src/shared.ts:944](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L944)

---

### FailedToResizeAssetBelowTheMaximumSize

• **FailedToResizeAssetBelowTheMaximumSize** = `50138`

#### Defined in

[packages/types/src/shared.ts:923](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L923)

---

### FileUploadedExceedsTheMaximumSize

• **FileUploadedExceedsTheMaximumSize** = `50045`

#### Defined in

[packages/types/src/shared.ts:905](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L905)

---

### GeneralError

• **GeneralError** = `0`

General error (such as a malformed request body, amongst other things)

#### Defined in

[packages/types/src/shared.ts:777](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L777)

---

### GuildAlreadyHasTemplate

• **GuildAlreadyHasTemplate** = `30031`

#### Defined in

[packages/types/src/shared.ts:846](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L846)

---

### GuildPremiumSubscriptionLevelTooLow

• **GuildPremiumSubscriptionLevelTooLow** = `20035`

#### Defined in

[packages/types/src/shared.ts:831](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L831)

---

### GuildWidgetDisabled

• **GuildWidgetDisabled** = `50004`

#### Defined in

[packages/types/src/shared.ts:876](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L876)

---

### InteractionHasAlreadyBeenAcknowledged

• **InteractionHasAlreadyBeenAcknowledged** = `40060`

#### Defined in

[packages/types/src/shared.ts:872](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L872)

---

### InvalidAccountType

• **InvalidAccountType** = `50002`

#### Defined in

[packages/types/src/shared.ts:874](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L874)

---

### InvalidActivityAction

• **InvalidActivityAction** = `50039`

#### Defined in

[packages/types/src/shared.ts:903](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L903)

---

### InvalidApiVersionProvided

• **InvalidApiVersionProvided** = `50041`

#### Defined in

[packages/types/src/shared.ts:904](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L904)

---

### InvalidAuthenticationTokenProvided

• **InvalidAuthenticationTokenProvided** = `50014`

#### Defined in

[packages/types/src/shared.ts:886](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L886)

---

### InvalidFileUploaded

• **InvalidFileUploaded** = `50046`

#### Defined in

[packages/types/src/shared.ts:906](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L906)

---

### InvalidFormBodyOrContentTypeProvided

• **InvalidFormBodyOrContentTypeProvided** = `50035`

Invalid form body (returned for both `application/json` and `multipart/form-data` bodies), or invalid `Content-Type` provided

#### Defined in

[packages/types/src/shared.ts:901](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L901)

---

### InvalidGuild

• **InvalidGuild** = `50055`

#### Defined in

[packages/types/src/shared.ts:908](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L908)

---

### InvalidJsonForUploadedLottieFile

• **InvalidJsonForUploadedLottieFile** = `170001`

#### Defined in

[packages/types/src/shared.ts:936](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L936)

---

### InvalidMFALevel

• **InvalidMFALevel** = `50017`

#### Defined in

[packages/types/src/shared.ts:889](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L889)

---

### InvalidMessageType

• **InvalidMessageType** = `50068`

#### Defined in

[packages/types/src/shared.ts:909](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L909)

---

### InvalidOAuth2AccessTokenProvided

• **InvalidOAuth2AccessTokenProvided** = `50025`

#### Defined in

[packages/types/src/shared.ts:894](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L894)

---

### InvalidOAuth2State

• **InvalidOAuth2State** = `50012`

#### Defined in

[packages/types/src/shared.ts:884](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L884)

---

### InvalidRecipients

• **InvalidRecipients** = `50033`

#### Defined in

[packages/types/src/shared.ts:898](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L898)

---

### InvalidRole

• **InvalidRole** = `50028`

#### Defined in

[packages/types/src/shared.ts:897](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L897)

---

### InvalidStickerSent

• **InvalidStickerSent** = `50081`

#### Defined in

[packages/types/src/shared.ts:913](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L913)

---

### InvalidThreadNotificationSettings

• **InvalidThreadNotificationSettings** = `50084`

#### Defined in

[packages/types/src/shared.ts:915](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L915)

---

### InvalidWebhookTokenProvided

• **InvalidWebhookTokenProvided** = `50027`

#### Defined in

[packages/types/src/shared.ts:896](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L896)

---

### InviteCodeWasEitherInvalidOrTaken

• **InviteCodeWasEitherInvalidOrTaken** = `50020`

#### Defined in

[packages/types/src/shared.ts:891](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L891)

---

### LottieAnimationMaximumDimensionsExceeded

• **LottieAnimationMaximumDimensionsExceeded** = `170005`

#### Defined in

[packages/types/src/shared.ts:940](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L940)

---

### MaxNumberOfDailyApplicationCommandCreatesHasBeenReached

• **MaxNumberOfDailyApplicationCommandCreatesHasBeenReached** = `30034`

#### Defined in

[packages/types/src/shared.ts:849](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L849)

---

### MaxNumberOfThreadParticipantsHasBeenReached

• **MaxNumberOfThreadParticipantsHasBeenReached** = `30033`

#### Defined in

[packages/types/src/shared.ts:848](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L848)

---

### MaximumNumberOfActiveAnnouncementThreadsReached

• **MaximumNumberOfActiveAnnouncementThreadsReached** = `160007`

#### Defined in

[packages/types/src/shared.ts:935](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L935)

---

### MaximumNumberOfActiveThreadsReached

• **MaximumNumberOfActiveThreadsReached** = `160006`

#### Defined in

[packages/types/src/shared.ts:934](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L934)

---

### MaximumNumberOfAnimatedEmojisReached

• **MaximumNumberOfAnimatedEmojisReached** = `30018`

#### Defined in

[packages/types/src/shared.ts:843](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L843)

---

### MaximumNumberOfAttachmentsInAMessageReached

• **MaximumNumberOfAttachmentsInAMessageReached** = `30015`

#### Defined in

[packages/types/src/shared.ts:841](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L841)

---

### MaximumNumberOfBansFetchesHasBeenReached

• **MaximumNumberOfBansFetchesHasBeenReached** = `30037`

#### Defined in

[packages/types/src/shared.ts:851](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L851)

---

### MaximumNumberOfBansForNonGuildMembersHaveBeenExceeded

• **MaximumNumberOfBansForNonGuildMembersHaveBeenExceeded** = `30035`

#### Defined in

[packages/types/src/shared.ts:850](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L850)

---

### MaximumNumberOfEditsToMessagesOlderThan1HourReachedTryAgainLater

• **MaximumNumberOfEditsToMessagesOlderThan1HourReachedTryAgainLater** = `30046`

#### Defined in

[packages/types/src/shared.ts:856](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L856)

---

### MaximumNumberOfEmojisReached

• **MaximumNumberOfEmojisReached** = `30008`

#### Defined in

[packages/types/src/shared.ts:838](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L838)

---

### MaximumNumberOfFriendsReached

• **MaximumNumberOfFriendsReached** = `30002`

#### Defined in

[packages/types/src/shared.ts:833](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L833)

---

### MaximumNumberOfGuildChannelsReached

• **MaximumNumberOfGuildChannelsReached** = `30013`

#### Defined in

[packages/types/src/shared.ts:840](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L840)

---

### MaximumNumberOfGuildRolesReached

• **MaximumNumberOfGuildRolesReached** = `30005`

#### Defined in

[packages/types/src/shared.ts:836](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L836)

---

### MaximumNumberOfGuildWidgetSettingsUpdatesHasBeenReachedTryAgainLater

• **MaximumNumberOfGuildWidgetSettingsUpdatesHasBeenReachedTryAgainLater** = `30042`

#### Defined in

[packages/types/src/shared.ts:855](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L855)

---

### MaximumNumberOfGuildsReached

• **MaximumNumberOfGuildsReached** = `30001`

#### Defined in

[packages/types/src/shared.ts:832](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L832)

---

### MaximumNumberOfInvitesReached

• **MaximumNumberOfInvitesReached** = `30016`

#### Defined in

[packages/types/src/shared.ts:842](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L842)

---

### MaximumNumberOfPinnedThreadsInAForumChannelHasBeenReached

• **MaximumNumberOfPinnedThreadsInAForumChannelHasBeenReached** = `30047`

#### Defined in

[packages/types/src/shared.ts:857](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L857)

---

### MaximumNumberOfPinsReachedForTheChannel

• **MaximumNumberOfPinsReachedForTheChannel** = `30003`

#### Defined in

[packages/types/src/shared.ts:834](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L834)

---

### MaximumNumberOfPruneRequestsHasBeenReachedTryAgainLater

• **MaximumNumberOfPruneRequestsHasBeenReachedTryAgainLater** = `30040`

#### Defined in

[packages/types/src/shared.ts:854](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L854)

---

### MaximumNumberOfReactionsReached

• **MaximumNumberOfReactionsReached** = `30010`

#### Defined in

[packages/types/src/shared.ts:839](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L839)

---

### MaximumNumberOfRecipientsReached

• **MaximumNumberOfRecipientsReached** = `30004`

#### Defined in

[packages/types/src/shared.ts:835](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L835)

---

### MaximumNumberOfServerCategoriesHasBeenReached

• **MaximumNumberOfServerCategoriesHasBeenReached** = `30030`

#### Defined in

[packages/types/src/shared.ts:845](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L845)

---

### MaximumNumberOfServerMembersReached

• **MaximumNumberOfServerMembersReached** = `30019`

#### Defined in

[packages/types/src/shared.ts:844](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L844)

---

### MaximumNumberOfStickersReached

• **MaximumNumberOfStickersReached** = `30039`

#### Defined in

[packages/types/src/shared.ts:853](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L853)

---

### MaximumNumberOfUncompletedGuildScheduledEventsReached

• **MaximumNumberOfUncompletedGuildScheduledEventsReached** = `30038`

#### Defined in

[packages/types/src/shared.ts:852](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L852)

---

### MaximumNumberOfWebhooksReached

• **MaximumNumberOfWebhooksReached** = `30007`

#### Defined in

[packages/types/src/shared.ts:837](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L837)

---

### MaximumNumbersOfApplicationCommandsReached

• **MaximumNumbersOfApplicationCommandsReached** = `30032`

#### Defined in

[packages/types/src/shared.ts:847](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L847)

---

### MaxiumNumberOfTagsInAForumChannelHasBeenReached

• **MaxiumNumberOfTagsInAForumChannelHasBeenReached** = `30048`

#### Defined in

[packages/types/src/shared.ts:858](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L858)

---

### MessageWasBlockedByAutomaticModeration

• **MessageWasBlockedByAutomaticModeration** = `200000`

#### Defined in

[packages/types/src/shared.ts:945](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L945)

---

### MissingAccess

• **MissingAccess** = `50001`

#### Defined in

[packages/types/src/shared.ts:873](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L873)

---

### MissingRequiredOAuth2Scope

• **MissingRequiredOAuth2Scope** = `50026`

#### Defined in

[packages/types/src/shared.ts:895](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L895)

---

### NoUsersWithDiscordTagExist

• **NoUsersWithDiscordTagExist** = `80004`

#### Defined in

[packages/types/src/shared.ts:926](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L926)

---

### NoteWasTooLong

• **NoteWasTooLong** = `50015`

#### Defined in

[packages/types/src/shared.ts:887](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L887)

---

### OAuth2ApplicationDoesNotHaveABot

• **OAuth2ApplicationDoesNotHaveABot** = `50010`

#### Defined in

[packages/types/src/shared.ts:882](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L882)

---

### OAuth2ApplicationLimitReached

• **OAuth2ApplicationLimitReached** = `50011`

#### Defined in

[packages/types/src/shared.ts:883](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L883)

---

### OnlyBotsCanUseThisEndpoint

• **OnlyBotsCanUseThisEndpoint** = `20002`

#### Defined in

[packages/types/src/shared.ts:821](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L821)

---

### OnlyTheOwnerOfThisAccountCanPerformThisAction

• **OnlyTheOwnerOfThisAccountCanPerformThisAction** = `20018`

#### Defined in

[packages/types/src/shared.ts:825](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L825)

---

### OwnershipCannotBeTransferredToABotUser

• **OwnershipCannotBeTransferredToABotUser** = `50132`

#### Defined in

[packages/types/src/shared.ts:922](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L922)

---

### PaymentSourceRequiredToRedeemGift

• **PaymentSourceRequiredToRedeemGift** = `50070`

#### Defined in

[packages/types/src/shared.ts:910](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L910)

---

### ProvidedTooFewOrTooManyMessagesToDeleteMustProvideAtLeast2AndFewerThan100MessagesToDelete

• **ProvidedTooFewOrTooManyMessagesToDeleteMustProvideAtLeast2AndFewerThan100MessagesToDelete** = `50016`

#### Defined in

[packages/types/src/shared.ts:888](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L888)

---

### ReactionWasBlocked

• **ReactionWasBlocked** = `90001`

#### Defined in

[packages/types/src/shared.ts:927](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L927)

---

### RequestEntityTooLargeTrySendingSomethingSmallerInSize

• **RequestEntityTooLargeTrySendingSomethingSmallerInSize** = `40005`

#### Defined in

[packages/types/src/shared.ts:864](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L864)

---

### SendMessagesHasBeenTemporarilyDisabled

• **SendMessagesHasBeenTemporarilyDisabled** = `40004`

#### Defined in

[packages/types/src/shared.ts:863](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L863)

---

### StickerAnimationDurationExceedsMaximumOf5Seconds

• **StickerAnimationDurationExceedsMaximumOf5Seconds** = `170007`

#### Defined in

[packages/types/src/shared.ts:942](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L942)

---

### StickerFrameCountExceedsMaximumOf1000Frames

• **StickerFrameCountExceedsMaximumOf1000Frames** = `170004`

#### Defined in

[packages/types/src/shared.ts:939](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L939)

---

### StickerFrameRateIsEitherTooSmallOrTooLarge

• **StickerFrameRateIsEitherTooSmallOrTooLarge** = `170006`

#### Defined in

[packages/types/src/shared.ts:941](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L941)

---

### StickerMaximumFramerateExceeded

• **StickerMaximumFramerateExceeded** = `170003`

#### Defined in

[packages/types/src/shared.ts:938](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L938)

---

### TargetUserIsNotConnectedToVoice

• **TargetUserIsNotConnectedToVoice** = `40032`

#### Defined in

[packages/types/src/shared.ts:868](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L868)

---

### TheChannelYouAreWritingHasHitTheWriteRateLimit

• **TheChannelYouAreWritingHasHitTheWriteRateLimit** = `20028`

#### Defined in

[packages/types/src/shared.ts:828](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L828)

---

### TheRequestBodyContainsInvalidJSON

• **TheRequestBodyContainsInvalidJSON** = `50109`

#### Defined in

[packages/types/src/shared.ts:921](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L921)

---

### TheStageIsAlreadyOpen

• **TheStageIsAlreadyOpen** = `150006`

#### Defined in

[packages/types/src/shared.ts:930](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L930)

---

### TheWriteActionYouArePerformingOnTheServerHasHitTheWriteRateLimit

• **TheWriteActionYouArePerformingOnTheServerHasHitTheWriteRateLimit** = `20029`

#### Defined in

[packages/types/src/shared.ts:829](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L829)

---

### ThisActionCannotBePerformedDueToSlowmodeRateLimit

• **ThisActionCannotBePerformedDueToSlowmodeRateLimit** = `20016`

#### Defined in

[packages/types/src/shared.ts:824](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L824)

---

### ThisFeatureHasBeenTemporarilyDisabledServerSide

• **ThisFeatureHasBeenTemporarilyDisabledServerSide** = `40006`

#### Defined in

[packages/types/src/shared.ts:865](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L865)

---

### ThisMessageCannotBeEditedDueToAnnouncementRateLimits

• **ThisMessageCannotBeEditedDueToAnnouncementRateLimits** = `20022`

#### Defined in

[packages/types/src/shared.ts:826](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L826)

---

### ThisMessageHasAlreadyBeenCrossposted

• **ThisMessageHasAlreadyBeenCrossposted** = `40033`

#### Defined in

[packages/types/src/shared.ts:869](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L869)

---

### ThisServerIsNotAvailableInYourLocation

• **ThisServerIsNotAvailableInYourLocation** = `50095`

#### Defined in

[packages/types/src/shared.ts:918](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L918)

---

### ThisServerNeedsMonetizationEnabledInOrderToPerformThisAction

• **ThisServerNeedsMonetizationEnabledInOrderToPerformThisAction** = `50097`

#### Defined in

[packages/types/src/shared.ts:919](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L919)

---

### ThisServerNeedsMoreBoostsToPerformThisAction

• **ThisServerNeedsMoreBoostsToPerformThisAction** = `50101`

#### Defined in

[packages/types/src/shared.ts:920](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L920)

---

### ThisUserBannedFromThisGuild

• **ThisUserBannedFromThisGuild** = `40007`

#### Defined in

[packages/types/src/shared.ts:866](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L866)

---

### ThreadIsLocked

• **ThreadIsLocked** = `160005`

#### Defined in

[packages/types/src/shared.ts:933](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L933)

---

### TitleWasBlockedByAutomaticModeration

• **TitleWasBlockedByAutomaticModeration** = `200001`

#### Defined in

[packages/types/src/shared.ts:946](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L946)

---

### TriedToPerformAnOperationOnAnArchivedThreadSuchAsEditingAMessageOrAddingAUserToTheThread

• **TriedToPerformAnOperationOnAnArchivedThreadSuchAsEditingAMessageOrAddingAUserToTheThread** = `50083`

#### Defined in

[packages/types/src/shared.ts:914](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L914)

---

### TwoFactorIsRequiredForThisOperation

• **TwoFactorIsRequiredForThisOperation** = `60003`

#### Defined in

[packages/types/src/shared.ts:925](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L925)

---

### UnauthorizedProvideAValidTokenAndTryAgain

• **UnauthorizedProvideAValidTokenAndTryAgain** = `40001`

#### Defined in

[packages/types/src/shared.ts:860](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L860)

---

### UnderMinimumAge

• **UnderMinimumAge** = `20024`

#### Defined in

[packages/types/src/shared.ts:827](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L827)

---

### UnknownAccount

• **UnknownAccount** = `10001`

#### Defined in

[packages/types/src/shared.ts:778](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L778)

---

### UnknownApplication

• **UnknownApplication** = `10002`

#### Defined in

[packages/types/src/shared.ts:779](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L779)

---

### UnknownApplicationCommand

• **UnknownApplicationCommand** = `10063`

#### Defined in

[packages/types/src/shared.ts:811](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L811)

---

### UnknownApplicationCommandPermissions

• **UnknownApplicationCommandPermissions** = `10066`

#### Defined in

[packages/types/src/shared.ts:813](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L813)

---

### UnknownBan

• **UnknownBan** = `10026`

#### Defined in

[packages/types/src/shared.ts:795](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L795)

---

### UnknownBranch

• **UnknownBranch** = `10032`

#### Defined in

[packages/types/src/shared.ts:801](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L801)

---

### UnknownBuild

• **UnknownBuild** = `10030`

#### Defined in

[packages/types/src/shared.ts:799](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L799)

---

### UnknownChannel

• **UnknownChannel** = `10003`

#### Defined in

[packages/types/src/shared.ts:780](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L780)

---

### UnknownDiscoveryCategory

• **UnknownDiscoveryCategory** = `10059`

#### Defined in

[packages/types/src/shared.ts:808](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L808)

---

### UnknownEmoji

• **UnknownEmoji** = `10014`

#### Defined in

[packages/types/src/shared.ts:791](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L791)

---

### UnknownEntitlement

• **UnknownEntitlement** = `10029`

#### Defined in

[packages/types/src/shared.ts:798](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L798)

---

### UnknownGiftCode

• **UnknownGiftCode** = `10038`

#### Defined in

[packages/types/src/shared.ts:804](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L804)

---

### UnknownGuild

• **UnknownGuild** = `10004`

#### Defined in

[packages/types/src/shared.ts:781](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L781)

---

### UnknownGuildMemberVerificationForm

• **UnknownGuildMemberVerificationForm** = `10068`

#### Defined in

[packages/types/src/shared.ts:815](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L815)

---

### UnknownGuildScheduledEvent

• **UnknownGuildScheduledEvent** = `10070`

#### Defined in

[packages/types/src/shared.ts:817](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L817)

---

### UnknownGuildScheduledEventUser

• **UnknownGuildScheduledEventUser** = `10071`

#### Defined in

[packages/types/src/shared.ts:818](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L818)

---

### UnknownGuildTemplate

• **UnknownGuildTemplate** = `10057`

#### Defined in

[packages/types/src/shared.ts:807](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L807)

---

### UnknownGuildWelcomeScreen

• **UnknownGuildWelcomeScreen** = `10069`

#### Defined in

[packages/types/src/shared.ts:816](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L816)

---

### UnknownIntegration

• **UnknownIntegration** = `10005`

#### Defined in

[packages/types/src/shared.ts:782](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L782)

---

### UnknownInteraction

• **UnknownInteraction** = `10062`

#### Defined in

[packages/types/src/shared.ts:810](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L810)

---

### UnknownInvite

• **UnknownInvite** = `10006`

#### Defined in

[packages/types/src/shared.ts:783](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L783)

---

### UnknownLobby

• **UnknownLobby** = `10031`

#### Defined in

[packages/types/src/shared.ts:800](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L800)

---

### UnknownMember

• **UnknownMember** = `10007`

#### Defined in

[packages/types/src/shared.ts:784](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L784)

---

### UnknownMessage

• **UnknownMessage** = `10008`

#### Defined in

[packages/types/src/shared.ts:785](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L785)

---

### UnknownPermissionOverwrite

• **UnknownPermissionOverwrite** = `10009`

#### Defined in

[packages/types/src/shared.ts:786](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L786)

---

### UnknownPremiumServerSubscribeCooldown

• **UnknownPremiumServerSubscribeCooldown** = `10050`

#### Defined in

[packages/types/src/shared.ts:806](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L806)

---

### UnknownProvider

• **UnknownProvider** = `10010`

#### Defined in

[packages/types/src/shared.ts:787](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L787)

---

### UnknownRedistributable

• **UnknownRedistributable** = `10036`

#### Defined in

[packages/types/src/shared.ts:803](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L803)

---

### UnknownRole

• **UnknownRole** = `10011`

#### Defined in

[packages/types/src/shared.ts:788](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L788)

---

### UnknownSKU

• **UnknownSKU** = `10027`

#### Defined in

[packages/types/src/shared.ts:796](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L796)

---

### UnknownSession

• **UnknownSession** = `10020`

#### Defined in

[packages/types/src/shared.ts:794](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L794)

---

### UnknownStageInstance

• **UnknownStageInstance** = `10067`

#### Defined in

[packages/types/src/shared.ts:814](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L814)

---

### UnknownSticker

• **UnknownSticker** = `10060`

#### Defined in

[packages/types/src/shared.ts:809](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L809)

---

### UnknownStoreDirectoryLayout

• **UnknownStoreDirectoryLayout** = `10033`

#### Defined in

[packages/types/src/shared.ts:802](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L802)

---

### UnknownStoreListing

• **UnknownStoreListing** = `10028`

#### Defined in

[packages/types/src/shared.ts:797](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L797)

---

### UnknownStream

• **UnknownStream** = `10049`

#### Defined in

[packages/types/src/shared.ts:805](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L805)

---

### UnknownTag

• **UnknownTag** = `10087`

#### Defined in

[packages/types/src/shared.ts:819](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L819)

---

### UnknownToken

• **UnknownToken** = `10012`

#### Defined in

[packages/types/src/shared.ts:789](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L789)

---

### UnknownUser

• **UnknownUser** = `10013`

#### Defined in

[packages/types/src/shared.ts:790](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L790)

---

### UnknownVoiceState

• **UnknownVoiceState** = `10065`

#### Defined in

[packages/types/src/shared.ts:812](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L812)

---

### UnknownWebhook

• **UnknownWebhook** = `10015`

#### Defined in

[packages/types/src/shared.ts:792](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L792)

---

### UnknownWebhookService

• **UnknownWebhookService** = `10016`

#### Defined in

[packages/types/src/shared.ts:793](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L793)

---

### UploadedFileNotFound

• **UploadedFileNotFound** = `50146`

#### Defined in

[packages/types/src/shared.ts:924](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L924)

---

### UploadedLottiesCannotContainRasterizedImagesSuchAsPngOrJpeg

• **UploadedLottiesCannotContainRasterizedImagesSuchAsPngOrJpeg** = `170002`

#### Defined in

[packages/types/src/shared.ts:937](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L937)

---

### WebhooksCanOnlyCreateThreadsInForumChannels

• **WebhooksCanOnlyCreateThreadsInForumChannels** = `220003`

#### Defined in

[packages/types/src/shared.ts:947](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L947)

---

### YouAreNotAuthorizedToPerformThisActionOnThisApplication

• **YouAreNotAuthorizedToPerformThisActionOnThisApplication** = `20012`

#### Defined in

[packages/types/src/shared.ts:823](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L823)

---

### YouAreOpeningDirectMessagesTooFast

• **YouAreOpeningDirectMessagesTooFast** = `40003`

#### Defined in

[packages/types/src/shared.ts:862](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L862)

---

### YouLackPermissionsToPerformThatAction

• **YouLackPermissionsToPerformThatAction** = `50013`

#### Defined in

[packages/types/src/shared.ts:885](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L885)

---

### YouNeedToVerifyYourAccountInOrderToPerformThisAction

• **YouNeedToVerifyYourAccountInOrderToPerformThisAction** = `40002`

#### Defined in

[packages/types/src/shared.ts:861](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L861)

---

### YourStageTopicOrServerNameOrServerDescriptionOrChannelNamesContainsWordsThatAreNotAllowedForPublicStages

• **YourStageTopicOrServerNameOrServerDescriptionOrChannelNamesContainsWordsThatAreNotAllowedForPublicStages** = `20031`

#### Defined in

[packages/types/src/shared.ts:830](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L830)
