[discordeno-monorepo](../README.md) / [Modules](../modules.md) / @discordeno/bot

# Module: @discordeno/bot

## Table of contents

### Enumerations

- [ActivityTypes](../enums/ActivityTypes.md)
- [AllowedMentionsTypes](../enums/AllowedMentionsTypes.md)
- [ApplicationCommandOptionTypes](../enums/ApplicationCommandOptionTypes.md)
- [ApplicationCommandPermissionTypes](../enums/ApplicationCommandPermissionTypes.md)
- [ApplicationCommandTypes](../enums/ApplicationCommandTypes.md)
- [ApplicationFlags](../enums/ApplicationFlags.md)
- [AuditLogEvents](../enums/AuditLogEvents.md)
- [AutoModerationActionType](../enums/AutoModerationActionType.md)
- [AutoModerationEventTypes](../enums/AutoModerationEventTypes.md)
- [AutoModerationTriggerTypes](../enums/AutoModerationTriggerTypes.md)
- [BitwisePermissionFlags](../enums/BitwisePermissionFlags.md)
- [ButtonStyles](../enums/ButtonStyles.md)
- [ChannelFlags](../enums/ChannelFlags.md)
- [ChannelTypes](../enums/ChannelTypes.md)
- [DefaultMessageNotificationLevels](../enums/DefaultMessageNotificationLevels.md)
- [DiscordAutoModerationRuleTriggerMetadataPresets](../enums/DiscordAutoModerationRuleTriggerMetadataPresets.md)
- [ExplicitContentFilterLevels](../enums/ExplicitContentFilterLevels.md)
- [GatewayCloseEventCodes](../enums/GatewayCloseEventCodes.md)
- [GatewayIntents](../enums/GatewayIntents.md)
- [GatewayOpcodes](../enums/GatewayOpcodes.md)
- [GuildFeatures](../enums/GuildFeatures.md)
- [GuildNsfwLevel](../enums/GuildNsfwLevel.md)
- [IntegrationExpireBehaviors](../enums/IntegrationExpireBehaviors.md)
- [InteractionResponseTypes](../enums/InteractionResponseTypes.md)
- [InteractionTypes](../enums/InteractionTypes.md)
- [Locales](../enums/Locales.md)
- [LogDepth](../enums/LogDepth.md)
- [LogLevels](../enums/LogLevels.md)
- [MessageActivityTypes](../enums/MessageActivityTypes.md)
- [MessageComponentTypes](../enums/MessageComponentTypes.md)
- [MessageTypes](../enums/MessageTypes.md)
- [MfaLevels](../enums/MfaLevels.md)
- [OverwriteTypes](../enums/OverwriteTypes.md)
- [PremiumTiers](../enums/PremiumTiers.md)
- [PremiumTypes](../enums/PremiumTypes.md)
- [PresenceStatus](../enums/PresenceStatus.md)
- [ScheduledEventEntityType](../enums/ScheduledEventEntityType.md)
- [ScheduledEventPrivacyLevel](../enums/ScheduledEventPrivacyLevel.md)
- [ScheduledEventStatus](../enums/ScheduledEventStatus.md)
- [ShardSocketCloseCodes](../enums/ShardSocketCloseCodes.md)
- [ShardState](../enums/ShardState.md)
- [SortOrderTypes](../enums/SortOrderTypes.md)
- [StickerFormatTypes](../enums/StickerFormatTypes.md)
- [StickerTypes](../enums/StickerTypes.md)
- [SystemChannelFlags](../enums/SystemChannelFlags.md)
- [TargetTypes](../enums/TargetTypes.md)
- [TeamMembershipStates](../enums/TeamMembershipStates.md)
- [TextStyles](../enums/TextStyles.md)
- [UserFlags](../enums/UserFlags.md)
- [VerificationLevels](../enums/VerificationLevels.md)
- [VideoQualityModes](../enums/VideoQualityModes.md)
- [WebhookTypes](../enums/WebhookTypes.md)

### Classes

- [Collection](../classes/Collection.md)
- [DiscordenoShard](../classes/DiscordenoShard.md)
- [Queue](../classes/Queue.md)

### Interfaces

- [ActionRow](../interfaces/ActionRow.md)
- [AllowedMentions](../interfaces/AllowedMentions.md)
- [ApplicationCommandOption](../interfaces/ApplicationCommandOption.md)
- [ApplicationCommandOptionChoice](../interfaces/ApplicationCommandOptionChoice.md)
- [ApplicationCommandPermissions](../interfaces/ApplicationCommandPermissions.md)
- [BeginGuildPrune](../interfaces/BeginGuildPrune.md)
- [Bot](../interfaces/Bot.md)
- [BotActivity](../interfaces/BotActivity.md)
- [BotStatusUpdate](../interfaces/BotStatusUpdate.md)
- [ButtonComponent](../interfaces/ButtonComponent.md)
- [Code](../interfaces/Code.md)
- [CollectionOptions](../interfaces/CollectionOptions.md)
- [CollectionSweeper](../interfaces/CollectionSweeper.md)
- [CreateAutoModerationRuleOptions](../interfaces/CreateAutoModerationRuleOptions.md)
- [CreateBotOptions](../interfaces/CreateBotOptions.md)
- [CreateChannelInvite](../interfaces/CreateChannelInvite.md)
- [CreateContextApplicationCommand](../interfaces/CreateContextApplicationCommand.md)
- [CreateForumPostWithMessage](../interfaces/CreateForumPostWithMessage.md)
- [CreateGatewayManagerOptions](../interfaces/CreateGatewayManagerOptions.md)
- [CreateGuild](../interfaces/CreateGuild.md)
- [CreateGuildBan](../interfaces/CreateGuildBan.md)
- [CreateGuildChannel](../interfaces/CreateGuildChannel.md)
- [CreateGuildEmoji](../interfaces/CreateGuildEmoji.md)
- [CreateGuildFromTemplate](../interfaces/CreateGuildFromTemplate.md)
- [CreateGuildRole](../interfaces/CreateGuildRole.md)
- [CreateGuildStickerOptions](../interfaces/CreateGuildStickerOptions.md)
- [CreateMessageOptions](../interfaces/CreateMessageOptions.md)
- [CreateRequestBodyOptions](../interfaces/CreateRequestBodyOptions.md)
- [CreateRestManagerOptions](../interfaces/CreateRestManagerOptions.md)
- [CreateScheduledEvent](../interfaces/CreateScheduledEvent.md)
- [CreateSlashApplicationCommand](../interfaces/CreateSlashApplicationCommand.md)
- [CreateStageInstance](../interfaces/CreateStageInstance.md)
- [CreateTemplate](../interfaces/CreateTemplate.md)
- [CreateWebhook](../interfaces/CreateWebhook.md)
- [DeleteWebhookMessageOptions](../interfaces/DeleteWebhookMessageOptions.md)
- [DiscordActionRow](../interfaces/DiscordActionRow.md)
- [DiscordActiveThreads](../interfaces/DiscordActiveThreads.md)
- [DiscordActivity](../interfaces/DiscordActivity.md)
- [DiscordActivityAssets](../interfaces/DiscordActivityAssets.md)
- [DiscordActivityButton](../interfaces/DiscordActivityButton.md)
- [DiscordActivityEmoji](../interfaces/DiscordActivityEmoji.md)
- [DiscordActivityParty](../interfaces/DiscordActivityParty.md)
- [DiscordActivitySecrets](../interfaces/DiscordActivitySecrets.md)
- [DiscordActivityTimestamps](../interfaces/DiscordActivityTimestamps.md)
- [DiscordAllowedMentions](../interfaces/DiscordAllowedMentions.md)
- [DiscordApplication](../interfaces/DiscordApplication.md)
- [DiscordApplicationCommand](../interfaces/DiscordApplicationCommand.md)
- [DiscordApplicationCommandOption](../interfaces/DiscordApplicationCommandOption.md)
- [DiscordApplicationCommandOptionChoice](../interfaces/DiscordApplicationCommandOptionChoice.md)
- [DiscordApplicationCommandPermissions](../interfaces/DiscordApplicationCommandPermissions.md)
- [DiscordApplicationWebhook](../interfaces/DiscordApplicationWebhook.md)
- [DiscordAttachment](../interfaces/DiscordAttachment.md)
- [DiscordAuditLog](../interfaces/DiscordAuditLog.md)
- [DiscordAuditLogEntry](../interfaces/DiscordAuditLogEntry.md)
- [DiscordAutoModerationAction](../interfaces/DiscordAutoModerationAction.md)
- [DiscordAutoModerationActionExecution](../interfaces/DiscordAutoModerationActionExecution.md)
- [DiscordAutoModerationActionMetadata](../interfaces/DiscordAutoModerationActionMetadata.md)
- [DiscordAutoModerationRule](../interfaces/DiscordAutoModerationRule.md)
- [DiscordAutoModerationRuleTriggerMetadata](../interfaces/DiscordAutoModerationRuleTriggerMetadata.md)
- [DiscordBan](../interfaces/DiscordBan.md)
- [DiscordButtonComponent](../interfaces/DiscordButtonComponent.md)
- [DiscordChannel](../interfaces/DiscordChannel.md)
- [DiscordChannelMention](../interfaces/DiscordChannelMention.md)
- [DiscordChannelPinsUpdate](../interfaces/DiscordChannelPinsUpdate.md)
- [DiscordClientStatus](../interfaces/DiscordClientStatus.md)
- [DiscordCreateApplicationCommand](../interfaces/DiscordCreateApplicationCommand.md)
- [DiscordCreateForumPostWithMessage](../interfaces/DiscordCreateForumPostWithMessage.md)
- [DiscordCreateGuildChannel](../interfaces/DiscordCreateGuildChannel.md)
- [DiscordCreateGuildEmoji](../interfaces/DiscordCreateGuildEmoji.md)
- [DiscordCreateMessage](../interfaces/DiscordCreateMessage.md)
- [DiscordCreateWebhook](../interfaces/DiscordCreateWebhook.md)
- [DiscordDefaultReactionEmoji](../interfaces/DiscordDefaultReactionEmoji.md)
- [DiscordEditChannelPermissionOverridesOptions](../interfaces/DiscordEditChannelPermissionOverridesOptions.md)
- [DiscordEmbed](../interfaces/DiscordEmbed.md)
- [DiscordEmbedAuthor](../interfaces/DiscordEmbedAuthor.md)
- [DiscordEmbedField](../interfaces/DiscordEmbedField.md)
- [DiscordEmbedFooter](../interfaces/DiscordEmbedFooter.md)
- [DiscordEmbedImage](../interfaces/DiscordEmbedImage.md)
- [DiscordEmbedProvider](../interfaces/DiscordEmbedProvider.md)
- [DiscordEmbedThumbnail](../interfaces/DiscordEmbedThumbnail.md)
- [DiscordEmbedVideo](../interfaces/DiscordEmbedVideo.md)
- [DiscordEmoji](../interfaces/DiscordEmoji.md)
- [DiscordFollowAnnouncementChannel](../interfaces/DiscordFollowAnnouncementChannel.md)
- [DiscordFollowedChannel](../interfaces/DiscordFollowedChannel.md)
- [DiscordForumTag](../interfaces/DiscordForumTag.md)
- [DiscordGatewayPayload](../interfaces/DiscordGatewayPayload.md)
- [DiscordGetGatewayBot](../interfaces/DiscordGetGatewayBot.md)
- [DiscordGuild](../interfaces/DiscordGuild.md)
- [DiscordGuildApplicationCommandPermissions](../interfaces/DiscordGuildApplicationCommandPermissions.md)
- [DiscordGuildBanAddRemove](../interfaces/DiscordGuildBanAddRemove.md)
- [DiscordGuildEmojisUpdate](../interfaces/DiscordGuildEmojisUpdate.md)
- [DiscordGuildIntegrationsUpdate](../interfaces/DiscordGuildIntegrationsUpdate.md)
- [DiscordGuildMemberAdd](../interfaces/DiscordGuildMemberAdd.md)
- [DiscordGuildMemberRemove](../interfaces/DiscordGuildMemberRemove.md)
- [DiscordGuildMemberUpdate](../interfaces/DiscordGuildMemberUpdate.md)
- [DiscordGuildMembersChunk](../interfaces/DiscordGuildMembersChunk.md)
- [DiscordGuildPreview](../interfaces/DiscordGuildPreview.md)
- [DiscordGuildRoleCreate](../interfaces/DiscordGuildRoleCreate.md)
- [DiscordGuildRoleDelete](../interfaces/DiscordGuildRoleDelete.md)
- [DiscordGuildRoleUpdate](../interfaces/DiscordGuildRoleUpdate.md)
- [DiscordGuildStickersUpdate](../interfaces/DiscordGuildStickersUpdate.md)
- [DiscordGuildWidget](../interfaces/DiscordGuildWidget.md)
- [DiscordGuildWidgetSettings](../interfaces/DiscordGuildWidgetSettings.md)
- [DiscordHello](../interfaces/DiscordHello.md)
- [DiscordIncomingWebhook](../interfaces/DiscordIncomingWebhook.md)
- [DiscordInputTextComponent](../interfaces/DiscordInputTextComponent.md)
- [DiscordInstallParams](../interfaces/DiscordInstallParams.md)
- [DiscordIntegration](../interfaces/DiscordIntegration.md)
- [DiscordIntegrationAccount](../interfaces/DiscordIntegrationAccount.md)
- [DiscordIntegrationApplication](../interfaces/DiscordIntegrationApplication.md)
- [DiscordIntegrationCreateUpdate](../interfaces/DiscordIntegrationCreateUpdate.md)
- [DiscordIntegrationDelete](../interfaces/DiscordIntegrationDelete.md)
- [DiscordInteraction](../interfaces/DiscordInteraction.md)
- [DiscordInteractionData](../interfaces/DiscordInteractionData.md)
- [DiscordInteractionDataOption](../interfaces/DiscordInteractionDataOption.md)
- [DiscordInteractionMember](../interfaces/DiscordInteractionMember.md)
- [DiscordInvite](../interfaces/DiscordInvite.md)
- [DiscordInviteCreate](../interfaces/DiscordInviteCreate.md)
- [DiscordInviteDelete](../interfaces/DiscordInviteDelete.md)
- [DiscordInviteMetadata](../interfaces/DiscordInviteMetadata.md)
- [DiscordInviteStageInstance](../interfaces/DiscordInviteStageInstance.md)
- [DiscordListActiveThreads](../interfaces/DiscordListActiveThreads.md)
- [DiscordListArchivedThreads](../interfaces/DiscordListArchivedThreads.md)
- [DiscordMember](../interfaces/DiscordMember.md)
- [DiscordMemberWithUser](../interfaces/DiscordMemberWithUser.md)
- [DiscordMessage](../interfaces/DiscordMessage.md)
- [DiscordMessageActivity](../interfaces/DiscordMessageActivity.md)
- [DiscordMessageDelete](../interfaces/DiscordMessageDelete.md)
- [DiscordMessageDeleteBulk](../interfaces/DiscordMessageDeleteBulk.md)
- [DiscordMessageInteraction](../interfaces/DiscordMessageInteraction.md)
- [DiscordMessageReactionAdd](../interfaces/DiscordMessageReactionAdd.md)
- [DiscordMessageReactionRemove](../interfaces/DiscordMessageReactionRemove.md)
- [DiscordMessageReactionRemoveAll](../interfaces/DiscordMessageReactionRemoveAll.md)
- [DiscordMessageReference](../interfaces/DiscordMessageReference.md)
- [DiscordModifyChannel](../interfaces/DiscordModifyChannel.md)
- [DiscordModifyGuildChannelPositions](../interfaces/DiscordModifyGuildChannelPositions.md)
- [DiscordModifyGuildEmoji](../interfaces/DiscordModifyGuildEmoji.md)
- [DiscordModifyGuildWelcomeScreen](../interfaces/DiscordModifyGuildWelcomeScreen.md)
- [DiscordOptionalAuditEntryInfo](../interfaces/DiscordOptionalAuditEntryInfo.md)
- [DiscordOverwrite](../interfaces/DiscordOverwrite.md)
- [DiscordPresenceUpdate](../interfaces/DiscordPresenceUpdate.md)
- [DiscordPrunedCount](../interfaces/DiscordPrunedCount.md)
- [DiscordReaction](../interfaces/DiscordReaction.md)
- [DiscordReady](../interfaces/DiscordReady.md)
- [DiscordRole](../interfaces/DiscordRole.md)
- [DiscordRoleTags](../interfaces/DiscordRoleTags.md)
- [DiscordScheduledEvent](../interfaces/DiscordScheduledEvent.md)
- [DiscordScheduledEventEntityMetadata](../interfaces/DiscordScheduledEventEntityMetadata.md)
- [DiscordScheduledEventUserAdd](../interfaces/DiscordScheduledEventUserAdd.md)
- [DiscordScheduledEventUserRemove](../interfaces/DiscordScheduledEventUserRemove.md)
- [DiscordSelectMenuComponent](../interfaces/DiscordSelectMenuComponent.md)
- [DiscordSelectOption](../interfaces/DiscordSelectOption.md)
- [DiscordSessionStartLimit](../interfaces/DiscordSessionStartLimit.md)
- [DiscordStageInstance](../interfaces/DiscordStageInstance.md)
- [DiscordSticker](../interfaces/DiscordSticker.md)
- [DiscordStickerItem](../interfaces/DiscordStickerItem.md)
- [DiscordStickerPack](../interfaces/DiscordStickerPack.md)
- [DiscordTeam](../interfaces/DiscordTeam.md)
- [DiscordTeamMember](../interfaces/DiscordTeamMember.md)
- [DiscordTemplate](../interfaces/DiscordTemplate.md)
- [DiscordThreadListSync](../interfaces/DiscordThreadListSync.md)
- [DiscordThreadMember](../interfaces/DiscordThreadMember.md)
- [DiscordThreadMemberUpdate](../interfaces/DiscordThreadMemberUpdate.md)
- [DiscordThreadMembersUpdate](../interfaces/DiscordThreadMembersUpdate.md)
- [DiscordThreadMetadata](../interfaces/DiscordThreadMetadata.md)
- [DiscordTypingStart](../interfaces/DiscordTypingStart.md)
- [DiscordUnavailableGuild](../interfaces/DiscordUnavailableGuild.md)
- [DiscordUser](../interfaces/DiscordUser.md)
- [DiscordVanityUrl](../interfaces/DiscordVanityUrl.md)
- [DiscordVoiceRegion](../interfaces/DiscordVoiceRegion.md)
- [DiscordVoiceServerUpdate](../interfaces/DiscordVoiceServerUpdate.md)
- [DiscordVoiceState](../interfaces/DiscordVoiceState.md)
- [DiscordWebhookUpdate](../interfaces/DiscordWebhookUpdate.md)
- [DiscordWelcomeScreen](../interfaces/DiscordWelcomeScreen.md)
- [DiscordWelcomeScreenChannel](../interfaces/DiscordWelcomeScreenChannel.md)
- [EditAutoModerationRuleOptions](../interfaces/EditAutoModerationRuleOptions.md)
- [EditBotMemberOptions](../interfaces/EditBotMemberOptions.md)
- [EditChannelPermissionOverridesOptions](../interfaces/EditChannelPermissionOverridesOptions.md)
- [EditGuildRole](../interfaces/EditGuildRole.md)
- [EditGuildStickerOptions](../interfaces/EditGuildStickerOptions.md)
- [EditMessage](../interfaces/EditMessage.md)
- [EditOwnVoiceState](../interfaces/EditOwnVoiceState.md)
- [EditScheduledEvent](../interfaces/EditScheduledEvent.md)
- [EditStageInstanceOptions](../interfaces/EditStageInstanceOptions.md)
- [EditUserVoiceState](../interfaces/EditUserVoiceState.md)
- [EventHandlers](../interfaces/EventHandlers.md)
- [ExecuteWebhook](../interfaces/ExecuteWebhook.md)
- [FileContent](../interfaces/FileContent.md)
- [GatewayManager](../interfaces/GatewayManager.md)
- [GetBans](../interfaces/GetBans.md)
- [GetGuildAuditLog](../interfaces/GetGuildAuditLog.md)
- [GetGuildPruneCountQuery](../interfaces/GetGuildPruneCountQuery.md)
- [GetGuildWidgetImageQuery](../interfaces/GetGuildWidgetImageQuery.md)
- [GetInvite](../interfaces/GetInvite.md)
- [GetMessagesAfter](../interfaces/GetMessagesAfter.md)
- [GetMessagesAround](../interfaces/GetMessagesAround.md)
- [GetMessagesBefore](../interfaces/GetMessagesBefore.md)
- [GetMessagesLimit](../interfaces/GetMessagesLimit.md)
- [GetReactions](../interfaces/GetReactions.md)
- [GetScheduledEventUsers](../interfaces/GetScheduledEventUsers.md)
- [GetScheduledEvents](../interfaces/GetScheduledEvents.md)
- [GetWebhookMessageOptions](../interfaces/GetWebhookMessageOptions.md)
- [InputTextComponent](../interfaces/InputTextComponent.md)
- [InteractionCallbackData](../interfaces/InteractionCallbackData.md)
- [InteractionResponse](../interfaces/InteractionResponse.md)
- [InvalidRequestBucket](../interfaces/InvalidRequestBucket.md)
- [InvalidRequestBucketOptions](../interfaces/InvalidRequestBucketOptions.md)
- [LeakyBucket](../interfaces/LeakyBucket.md)
- [ListArchivedThreads](../interfaces/ListArchivedThreads.md)
- [ListGuildMembers](../interfaces/ListGuildMembers.md)
- [ModifyChannel](../interfaces/ModifyChannel.md)
- [ModifyGuild](../interfaces/ModifyGuild.md)
- [ModifyGuildChannelPositions](../interfaces/ModifyGuildChannelPositions.md)
- [ModifyGuildEmoji](../interfaces/ModifyGuildEmoji.md)
- [ModifyGuildMember](../interfaces/ModifyGuildMember.md)
- [ModifyGuildTemplate](../interfaces/ModifyGuildTemplate.md)
- [ModifyRolePositions](../interfaces/ModifyRolePositions.md)
- [ModifyWebhook](../interfaces/ModifyWebhook.md)
- [OverwriteReadable](../interfaces/OverwriteReadable.md)
- [PlaceHolderBot](../interfaces/PlaceHolderBot.md)
- [QueueOptions](../interfaces/QueueOptions.md)
- [RequestBody](../interfaces/RequestBody.md)
- [RequestGuildMembers](../interfaces/RequestGuildMembers.md)
- [RequestMemberRequest](../interfaces/RequestMemberRequest.md)
- [RestManager](../interfaces/RestManager.md)
- [RestRateLimitedPath](../interfaces/RestRateLimitedPath.md)
- [RestRequestRejection](../interfaces/RestRequestRejection.md)
- [RestRequestResponse](../interfaces/RestRequestResponse.md)
- [RestRoutes](../interfaces/RestRoutes.md)
- [Rgb](../interfaces/Rgb.md)
- [SearchMembers](../interfaces/SearchMembers.md)
- [SelectMenuChannelsComponent](../interfaces/SelectMenuChannelsComponent.md)
- [SelectMenuComponent](../interfaces/SelectMenuComponent.md)
- [SelectMenuRolesComponent](../interfaces/SelectMenuRolesComponent.md)
- [SelectMenuUsersAndRolesComponent](../interfaces/SelectMenuUsersAndRolesComponent.md)
- [SelectMenuUsersComponent](../interfaces/SelectMenuUsersComponent.md)
- [SelectOption](../interfaces/SelectOption.md)
- [SendRequestOptions](../interfaces/SendRequestOptions.md)
- [ShardCreateOptions](../interfaces/ShardCreateOptions.md)
- [ShardEvents](../interfaces/ShardEvents.md)
- [ShardGatewayConfig](../interfaces/ShardGatewayConfig.md)
- [ShardHeart](../interfaces/ShardHeart.md)
- [ShardSocketRequest](../interfaces/ShardSocketRequest.md)
- [StartThreadWithMessage](../interfaces/StartThreadWithMessage.md)
- [StartThreadWithoutMessage](../interfaces/StartThreadWithoutMessage.md)
- [StatusUpdate](../interfaces/StatusUpdate.md)
- [UpdateVoiceState](../interfaces/UpdateVoiceState.md)
- [WebhookMessageEditor](../interfaces/WebhookMessageEditor.md)
- [WithReason](../interfaces/WithReason.md)

### Type Aliases

- [ApiVersions](md#apiversions)
- [AtLeastOne](md#atleastone)
- [BigString](md#bigstring)
- [CamelCase](md#camelcase)
- [Camelize](md#camelize)
- [CreateApplicationCommand](md#createapplicationcommand)
- [DiscordArchivedThreads](md#discordarchivedthreads)
- [DiscordAuditLogChange](md#discordauditlogchange)
- [DiscordMessageComponents](md#discordmessagecomponents)
- [DiscordMessageReactionRemoveEmoji](md#discordmessagereactionremoveemoji)
- [DiscordWebhook](md#discordwebhook)
- [EmbedTypes](md#embedtypes)
- [GatewayDispatchEventNames](md#gatewaydispatcheventnames)
- [GatewayEventNames](md#gatewayeventnames)
- [GetMessagesOptions](md#getmessagesoptions)
- [ImageFormat](md#imageformat)
- [ImageSize](md#imagesize)
- [Localization](md#localization)
- [MessageComponents](md#messagecomponents)
- [PermissionStrings](md#permissionstrings)
- [PickPartial](md#pickpartial)
- [RequestMethods](md#requestmethods)
- [SnakeCase](md#snakecase)
- [Snakelize](md#snakelize)

### Variables

- [Intents](md#intents)
- [logger](md#logger)

### Functions

- [acquire](md#acquire)
- [avatarUrl](md#avatarurl)
- [bgBlack](md#bgblack)
- [bgBlue](md#bgblue)
- [bgBrightBlack](md#bgbrightblack)
- [bgBrightBlue](md#bgbrightblue)
- [bgBrightCyan](md#bgbrightcyan)
- [bgBrightGreen](md#bgbrightgreen)
- [bgBrightMagenta](md#bgbrightmagenta)
- [bgBrightRed](md#bgbrightred)
- [bgBrightWhite](md#bgbrightwhite)
- [bgBrightYellow](md#bgbrightyellow)
- [bgCyan](md#bgcyan)
- [bgGreen](md#bggreen)
- [bgMagenta](md#bgmagenta)
- [bgRed](md#bgred)
- [bgRgb24](md#bgrgb24)
- [bgRgb8](md#bgrgb8)
- [bgWhite](md#bgwhite)
- [bgYellow](md#bgyellow)
- [black](md#black)
- [blue](md#blue)
- [bold](md#bold)
- [brightBlack](md#brightblack)
- [brightBlue](md#brightblue)
- [brightCyan](md#brightcyan)
- [brightGreen](md#brightgreen)
- [brightMagenta](md#brightmagenta)
- [brightRed](md#brightred)
- [brightWhite](md#brightwhite)
- [brightYellow](md#brightyellow)
- [calculateBits](md#calculatebits)
- [calculatePermissions](md#calculatepermissions)
- [camelToSnakeCase](md#cameltosnakecase)
- [camelize](md#camelize-1)
- [coerceToFileContent](md#coercetofilecontent)
- [createBot](md#createbot)
- [createGatewayManager](md#creategatewaymanager)
- [createInvalidRequestBucket](md#createinvalidrequestbucket)
- [createLeakyBucket](md#createleakybucket)
- [createLogger](md#createlogger)
- [createRestManager](md#createrestmanager)
- [cyan](md#cyan)
- [decode](md#decode)
- [delay](md#delay)
- [dim](md#dim)
- [emojiUrl](md#emojiurl)
- [encode](md#encode)
- [findFiles](md#findfiles)
- [formatImageUrl](md#formatimageurl)
- [getBotIdFromToken](md#getbotidfromtoken)
- [getColorEnabled](md#getcolorenabled)
- [getWidgetImageUrl](md#getwidgetimageurl)
- [gray](md#gray)
- [green](md#green)
- [guildBannerUrl](md#guildbannerurl)
- [guildIconUrl](md#guildiconurl)
- [guildSplashUrl](md#guildsplashurl)
- [hasProperty](md#hasproperty)
- [hidden](md#hidden)
- [iconBigintToHash](md#iconbiginttohash)
- [iconHashToBigInt](md#iconhashtobigint)
- [inverse](md#inverse)
- [isGetMessagesAfter](md#isgetmessagesafter)
- [isGetMessagesAround](md#isgetmessagesaround)
- [isGetMessagesBefore](md#isgetmessagesbefore)
- [isGetMessagesLimit](md#isgetmessageslimit)
- [italic](md#italic)
- [magenta](md#magenta)
- [nextRefill](md#nextrefill)
- [processReactionString](md#processreactionstring)
- [red](md#red)
- [removeTokenPrefix](md#removetokenprefix)
- [reset](md#reset)
- [rgb24](md#rgb24)
- [rgb8](md#rgb8)
- [setColorEnabled](md#setcolorenabled)
- [snakeToCamelCase](md#snaketocamelcase)
- [snakelize](md#snakelize-1)
- [strikethrough](md#strikethrough)
- [stripColor](md#stripcolor)
- [underline](md#underline)
- [updateTokens](md#updatetokens)
- [urlToBase64](md#urltobase64)
- [white](md#white)
- [yellow](md#yellow)

## Type Aliases

### ApiVersions

Ƭ **ApiVersions**: ``9`` \| ``10``

#### Defined in

packages/rest/dist/types.d.ts:2325

___

### AtLeastOne

Ƭ **AtLeastOne**<`T`, `U`\>: `Partial`<`T`\> & `U`[keyof `U`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `U` | { [K in keyof T]: Pick<T, K\> } |

#### Defined in

packages/types/dist/shared.d.ts:831

___

### BigString

Ƭ **BigString**: `bigint` \| `string`

#### Defined in

packages/types/dist/shared.d.ts:1

___

### CamelCase

Ƭ **CamelCase**<`S`\>: `S` extends \`${infer T}\_${infer U}\` ? \`${T}${Capitalize<CamelCase<U\>\>}\` : `S`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `string` |

#### Defined in

packages/types/dist/shared.d.ts:834

___

### Camelize

Ƭ **Camelize**<`T`\>: `T` extends `any`[] ? `T` extends `Record`<`any`, `any`\>[] ? [`Camelize`](md#camelize)<`T`[`number`]\>[] : `T` : `T` extends `Record`<`any`, `any`\> ? { [K in keyof T as CamelCase<K & string\>]: Camelize<T[K]\> } : `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

packages/types/dist/shared.d.ts:836

___

### CreateApplicationCommand

Ƭ **CreateApplicationCommand**: [`CreateSlashApplicationCommand`](../interfaces/CreateSlashApplicationCommand.md) \| [`CreateContextApplicationCommand`](../interfaces/CreateContextApplicationCommand.md)

#### Defined in

packages/types/dist/discordeno.d.ts:309

___

### DiscordArchivedThreads

Ƭ **DiscordArchivedThreads**: [`DiscordActiveThreads`](../interfaces/DiscordActiveThreads.md) & { `hasMore`: `boolean`  }

#### Defined in

packages/types/dist/discord.d.ts:2297

___

### DiscordAuditLogChange

Ƭ **DiscordAuditLogChange**: { `key`: ``"name"`` \| ``"description"`` \| ``"discovery_splash_hash"`` \| ``"banner_hash"`` \| ``"preferred_locale"`` \| ``"rules_channel_id"`` \| ``"public_updates_channel_id"`` \| ``"icon_hash"`` \| ``"image_hash"`` \| ``"splash_hash"`` \| ``"owner_id"`` \| ``"region"`` \| ``"afk_channel_id"`` \| ``"vanity_url_code"`` \| ``"widget_channel_id"`` \| ``"system_channel_id"`` \| ``"topic"`` \| ``"application_id"`` \| ``"permissions"`` \| ``"allow"`` \| ``"deny"`` \| ``"code"`` \| ``"channel_id"`` \| ``"inviter_id"`` \| ``"nick"`` \| ``"avatar_hash"`` \| ``"id"`` \| ``"location"`` \| ``"command_id"`` ; `new_value`: `string` ; `old_value`: `string`  } \| { `key`: ``"afk_timeout"`` \| ``"mfa_level"`` \| ``"verification_level"`` \| ``"explicit_content_filter"`` \| ``"default_message_notifications"`` \| ``"prune_delete_days"`` \| ``"position"`` \| ``"bitrate"`` \| ``"rate_limit_per_user"`` \| ``"color"`` \| ``"max_uses"`` \| ``"uses"`` \| ``"max_age"`` \| ``"expire_behavior"`` \| ``"expire_grace_period"`` \| ``"user_limit"`` \| ``"privacy_level"`` \| ``"auto_archive_duration"`` \| ``"default_auto_archive_duration"`` \| ``"entity_type"`` \| ``"status"`` \| ``"communication_disabled_until"`` ; `new_value`: `number` ; `old_value`: `number`  } \| { `key`: ``"$add"`` \| ``"$remove"`` ; `new_value`: `Partial`<[`DiscordRole`](../interfaces/DiscordRole.md)\>[] ; `old_value?`: `Partial`<[`DiscordRole`](../interfaces/DiscordRole.md)\>[]  } \| { `key`: ``"widget_enabled"`` \| ``"nsfw"`` \| ``"hoist"`` \| ``"mentionable"`` \| ``"temporary"`` \| ``"deaf"`` \| ``"mute"`` \| ``"enable_emoticons"`` \| ``"archived"`` \| ``"locked"`` \| ``"invitable"`` ; `new_value`: `boolean` ; `old_value`: `boolean`  } \| { `key`: ``"permission_overwrites"`` ; `new_value`: [`DiscordOverwrite`](../interfaces/DiscordOverwrite.md)[] ; `old_value`: [`DiscordOverwrite`](../interfaces/DiscordOverwrite.md)[]  } \| { `key`: ``"type"`` ; `new_value`: `string` \| `number` ; `old_value`: `string` \| `number`  }

https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-structure

#### Defined in

packages/types/dist/discord.d.ts:1368

___

### DiscordMessageComponents

Ƭ **DiscordMessageComponents**: [`DiscordActionRow`](../interfaces/DiscordActionRow.md)[]

#### Defined in

packages/types/dist/discord.d.ts:1014

___

### DiscordMessageReactionRemoveEmoji

Ƭ **DiscordMessageReactionRemoveEmoji**: `Pick`<[`DiscordMessageReactionAdd`](../interfaces/DiscordMessageReactionAdd.md), ``"channel_id"`` \| ``"guild_id"`` \| ``"message_id"`` \| ``"emoji"``\>

https://discord.com/developers/docs/topics/gateway#message-reaction-remove-emoji

#### Defined in

packages/types/dist/discord.d.ts:2000

___

### DiscordWebhook

Ƭ **DiscordWebhook**: [`DiscordIncomingWebhook`](../interfaces/DiscordIncomingWebhook.md) \| [`DiscordApplicationWebhook`](../interfaces/DiscordApplicationWebhook.md)

https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-structure

#### Defined in

packages/types/dist/discord.d.ts:356

___

### EmbedTypes

Ƭ **EmbedTypes**: ``"rich"`` \| ``"image"`` \| ``"video"`` \| ``"gifv"`` \| ``"article"`` \| ``"link"``

https://discord.com/developers/docs/resources/channel#embed-object-embed-types

#### Defined in

packages/types/dist/shared.d.ts:129

___

### GatewayDispatchEventNames

Ƭ **GatewayDispatchEventNames**: ``"READY"`` \| ``"APPLICATION_COMMAND_PERMISSIONS_UPDATE"`` \| ``"AUTO_MODERATION_RULE_CREATE"`` \| ``"AUTO_MODERATION_RULE_UPDATE"`` \| ``"AUTO_MODERATION_RULE_DELETE"`` \| ``"AUTO_MODERATION_ACTION_EXECUTION"`` \| ``"CHANNEL_CREATE"`` \| ``"CHANNEL_UPDATE"`` \| ``"CHANNEL_DELETE"`` \| ``"CHANNEL_PINS_UPDATE"`` \| ``"THREAD_CREATE"`` \| ``"THREAD_UPDATE"`` \| ``"THREAD_DELETE"`` \| ``"THREAD_LIST_SYNC"`` \| ``"THREAD_MEMBER_UPDATE"`` \| ``"THREAD_MEMBERS_UPDATE"`` \| ``"GUILD_CREATE"`` \| ``"GUILD_UPDATE"`` \| ``"GUILD_DELETE"`` \| ``"GUILD_BAN_ADD"`` \| ``"GUILD_BAN_REMOVE"`` \| ``"GUILD_EMOJIS_UPDATE"`` \| ``"GUILD_STICKERS_UPDATE"`` \| ``"GUILD_INTEGRATIONS_UPDATE"`` \| ``"GUILD_MEMBER_ADD"`` \| ``"GUILD_MEMBER_REMOVE"`` \| ``"GUILD_MEMBER_UPDATE"`` \| ``"GUILD_MEMBERS_CHUNK"`` \| ``"GUILD_ROLE_CREATE"`` \| ``"GUILD_ROLE_UPDATE"`` \| ``"GUILD_ROLE_DELETE"`` \| ``"GUILD_SCHEDULED_EVENT_CREATE"`` \| ``"GUILD_SCHEDULED_EVENT_UPDATE"`` \| ``"GUILD_SCHEDULED_EVENT_DELETE"`` \| ``"GUILD_SCHEDULED_EVENT_USER_ADD"`` \| ``"GUILD_SCHEDULED_EVENT_USER_REMOVE"`` \| ``"INTEGRATION_CREATE"`` \| ``"INTEGRATION_UPDATE"`` \| ``"INTEGRATION_DELETE"`` \| ``"INTERACTION_CREATE"`` \| ``"INVITE_CREATE"`` \| ``"INVITE_DELETE"`` \| ``"MESSAGE_CREATE"`` \| ``"MESSAGE_UPDATE"`` \| ``"MESSAGE_DELETE"`` \| ``"MESSAGE_DELETE_BULK"`` \| ``"MESSAGE_REACTION_ADD"`` \| ``"MESSAGE_REACTION_REMOVE"`` \| ``"MESSAGE_REACTION_REMOVE_ALL"`` \| ``"MESSAGE_REACTION_REMOVE_EMOJI"`` \| ``"PRESENCE_UPDATE"`` \| ``"STAGE_INSTANCE_CREATE"`` \| ``"STAGE_INSTANCE_UPDATE"`` \| ``"STAGE_INSTANCE_DELETE"`` \| ``"TYPING_START"`` \| ``"USER_UPDATE"`` \| ``"VOICE_STATE_UPDATE"`` \| ``"VOICE_SERVER_UPDATE"`` \| ``"WEBHOOKS_UPDATE"``

#### Defined in

packages/types/dist/shared.d.ts:643

___

### GatewayEventNames

Ƭ **GatewayEventNames**: [`GatewayDispatchEventNames`](md#gatewaydispatcheventnames) \| ``"READY"`` \| ``"RESUMED"``

#### Defined in

packages/types/dist/shared.d.ts:644

___

### GetMessagesOptions

Ƭ **GetMessagesOptions**: [`GetMessagesAfter`](../interfaces/GetMessagesAfter.md) \| [`GetMessagesBefore`](../interfaces/GetMessagesBefore.md) \| [`GetMessagesAround`](../interfaces/GetMessagesAround.md) \| [`GetMessagesLimit`](../interfaces/GetMessagesLimit.md)

#### Defined in

packages/types/dist/discordeno.d.ts:242

___

### ImageFormat

Ƭ **ImageFormat**: ``"jpg"`` \| ``"jpeg"`` \| ``"png"`` \| ``"webp"`` \| ``"gif"`` \| ``"json"``

https://discord.com/developers/docs/reference#image-formatting
json is only for stickers

#### Defined in

packages/types/dist/shared.d.ts:795

___

### ImageSize

Ƭ **ImageSize**: ``16`` \| ``32`` \| ``64`` \| ``128`` \| ``256`` \| ``512`` \| ``1024`` \| ``2048`` \| ``4096``

https://discord.com/developers/docs/reference#image-formatting

#### Defined in

packages/types/dist/shared.d.ts:797

___

### Localization

Ƭ **Localization**: `Partial`<`Record`<[`Locales`](../enums/Locales.md), `string`\>\>

#### Defined in

packages/types/dist/shared.d.ts:830

___

### MessageComponents

Ƭ **MessageComponents**: [`ActionRow`](../interfaces/ActionRow.md)[]

#### Defined in

packages/types/dist/discordeno.d.ts:35

___

### PermissionStrings

Ƭ **PermissionStrings**: keyof typeof [`BitwisePermissionFlags`](../enums/BitwisePermissionFlags.md)

#### Defined in

packages/types/dist/shared.d.ts:584

___

### PickPartial

Ƭ **PickPartial**<`T`, `K`\>: { [P in keyof T]?: T[P] } & { [P in K]: T[P] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends keyof `T` |

#### Defined in

packages/types/dist/shared.d.ts:842

___

### RequestMethods

Ƭ **RequestMethods**: ``"GET"`` \| ``"POST"`` \| ``"DELETE"`` \| ``"PATCH"`` \| ``"PUT"``

#### Defined in

packages/rest/dist/types.d.ts:2324

___

### SnakeCase

Ƭ **SnakeCase**<`S`\>: `S` extends \`${infer T}${infer U}\` ? \`${T extends Capitalize<T\> ? "\_" : ""}${Lowercase<T\>}${SnakeCase<U\>}\` : `S`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `string` |

#### Defined in

packages/types/dist/shared.d.ts:835

___

### Snakelize

Ƭ **Snakelize**<`T`\>: `T` extends `any`[] ? `T` extends `Record`<`any`, `any`\>[] ? [`Snakelize`](md#snakelize)<`T`[`number`]\>[] : `T` : `T` extends `Record`<`any`, `any`\> ? { [K in keyof T as SnakeCase<K & string\>]: Snakelize<T[K]\> } : `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

packages/types/dist/shared.d.ts:839

## Variables

### Intents

• `Const` **Intents**: typeof [`GatewayIntents`](../enums/GatewayIntents.md)

https://discord.com/developers/docs/topics/gateway#list-of-intents

#### Defined in

packages/types/dist/shared.d.ts:767

___

### logger

• `Const` **logger**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `debug` | (...`args`: `any`[]) => `void` |
| `error` | (...`args`: `any`[]) => `void` |
| `fatal` | (...`args`: `any`[]) => `void` |
| `info` | (...`args`: `any`[]) => `void` |
| `log` | (`level`: [`LogLevels`](../enums/LogLevels.md), ...`args`: `any`[]) => `void` |
| `setDepth` | (`level`: [`LogDepth`](../enums/LogDepth.md)) => `void` |
| `setLevel` | (`level`: [`LogLevels`](../enums/LogLevels.md)) => `void` |
| `warn` | (...`args`: `any`[]) => `void` |

#### Defined in

packages/utils/dist/logger.d.ts:25

## Functions

### acquire

▸ **acquire**(`bucket`, `amount`, `highPriority?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bucket` | [`LeakyBucket`](../interfaces/LeakyBucket.md) |
| `amount` | `number` |
| `highPriority?` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Defined in

packages/utils/dist/bucket.d.ts:54

___

### avatarUrl

▸ **avatarUrl**(`userId`, `discriminator`, `options?`): `string`

Builds a URL to a user's avatar stored in the Discord CDN.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | [`BigString`](md#bigstring) | The ID of the user to get the avatar of. |
| `discriminator` | `string` | The user's discriminator. (4-digit tag after the hashtag.) |
| `options?` | `Object` | The parameters for the building of the URL. |
| `options.avatar` | `undefined` \| [`BigString`](md#bigstring) | - |
| `options.format?` | [`ImageFormat`](md#imageformat) | - |
| `options.size?` | [`ImageSize`](md#imagesize) | - |

#### Returns

`string`

The link to the resource.

#### Defined in

packages/utils/dist/images.d.ts:20

___

### bgBlack

▸ **bgBlack**(`str`): `string`

Set background color to black.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background black |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:148

___

### bgBlue

▸ **bgBlue**(`str`): `string`

Set background color to blue.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background blue |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:168

___

### bgBrightBlack

▸ **bgBrightBlack**(`str`): `string`

Set background color to bright black.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background bright-black |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:188

___

### bgBrightBlue

▸ **bgBrightBlue**(`str`): `string`

Set background color to bright blue.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background bright-blue |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:208

___

### bgBrightCyan

▸ **bgBrightCyan**(`str`): `string`

Set background color to bright cyan.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background bright-cyan |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:218

___

### bgBrightGreen

▸ **bgBrightGreen**(`str`): `string`

Set background color to bright green.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background bright-green |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:198

___

### bgBrightMagenta

▸ **bgBrightMagenta**(`str`): `string`

Set background color to bright magenta.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background bright-magenta |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:213

___

### bgBrightRed

▸ **bgBrightRed**(`str`): `string`

Set background color to bright red.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background bright-red |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:193

___

### bgBrightWhite

▸ **bgBrightWhite**(`str`): `string`

Set background color to bright white.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background bright-white |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:223

___

### bgBrightYellow

▸ **bgBrightYellow**(`str`): `string`

Set background color to bright yellow.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background bright-yellow |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:203

___

### bgCyan

▸ **bgCyan**(`str`): `string`

Set background color to cyan.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background cyan |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:178

___

### bgGreen

▸ **bgGreen**(`str`): `string`

Set background color to green.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background green |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:158

___

### bgMagenta

▸ **bgMagenta**(`str`): `string`

Set background color to magenta.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background magenta |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:173

___

### bgRed

▸ **bgRed**(`str`): `string`

Set background color to red.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background red |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:153

___

### bgRgb24

▸ **bgRgb24**(`str`, `color`): `string`

Set background color using 24bit rgb.
`color` can be a number in range `0x000000` to `0xffffff` or
an `Rgb`.

To produce the color magenta:

```ts
     import { bgRgb24 } from "./colors.ts";
     bgRgb24("foo", 0xff00ff);
     bgRgb24("foo", {r: 255, g: 0, b: 255});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text color to apply 24bit rgb to |
| `color` | `number` \| [`Rgb`](../interfaces/Rgb.md) | code |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:269

___

### bgRgb8

▸ **bgRgb8**(`str`, `color`): `string`

Set background color using paletted 8bit colors.
https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text color to apply paletted 8bit background colors to |
| `color` | `number` | code |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:237

___

### bgWhite

▸ **bgWhite**(`str`): `string`

Set background color to white.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background white |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:183

___

### bgYellow

▸ **bgYellow**(`str`): `string`

Set background color to yellow.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background yellow |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:163

___

### black

▸ **black**(`str`): `string`

Set text color to black.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make black |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:63

___

### blue

▸ **blue**(`str`): `string`

Set text color to blue.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make blue |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:83

___

### bold

▸ **bold**(`str`): `string`

Make the text bold.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make bold |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:28

___

### brightBlack

▸ **brightBlack**(`str`): `string`

Set text color to bright black.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make bright-black |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:108

___

### brightBlue

▸ **brightBlue**(`str`): `string`

Set text color to bright blue.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make bright-blue |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:128

___

### brightCyan

▸ **brightCyan**(`str`): `string`

Set text color to bright cyan.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make bright-cyan |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:138

___

### brightGreen

▸ **brightGreen**(`str`): `string`

Set text color to bright green.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make bright-green |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:118

___

### brightMagenta

▸ **brightMagenta**(`str`): `string`

Set text color to bright magenta.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make bright-magenta |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:133

___

### brightRed

▸ **brightRed**(`str`): `string`

Set text color to bright red.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make bright-red |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:113

___

### brightWhite

▸ **brightWhite**(`str`): `string`

Set text color to bright white.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make bright-white |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:143

___

### brightYellow

▸ **brightYellow**(`str`): `string`

Set text color to bright yellow.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make bright-yellow |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:123

___

### calculateBits

▸ **calculateBits**(`permissions`): `string`

This function converts an array of permissions into the bitwise string.

#### Parameters

| Name | Type |
| :------ | :------ |
| `permissions` | (``"CREATE_INSTANT_INVITE"`` \| ``"KICK_MEMBERS"`` \| ``"BAN_MEMBERS"`` \| ``"ADMINISTRATOR"`` \| ``"MANAGE_CHANNELS"`` \| ``"MANAGE_GUILD"`` \| ``"ADD_REACTIONS"`` \| ``"VIEW_AUDIT_LOG"`` \| ``"PRIORITY_SPEAKER"`` \| ``"STREAM"`` \| ``"VIEW_CHANNEL"`` \| ``"SEND_MESSAGES"`` \| ``"SEND_TTS_MESSAGES"`` \| ``"MANAGE_MESSAGES"`` \| ``"EMBED_LINKS"`` \| ``"ATTACH_FILES"`` \| ``"READ_MESSAGE_HISTORY"`` \| ``"MENTION_EVERYONE"`` \| ``"USE_EXTERNAL_EMOJIS"`` \| ``"VIEW_GUILD_INSIGHTS"`` \| ``"CONNECT"`` \| ``"SPEAK"`` \| ``"MUTE_MEMBERS"`` \| ``"DEAFEN_MEMBERS"`` \| ``"MOVE_MEMBERS"`` \| ``"USE_VAD"`` \| ``"CHANGE_NICKNAME"`` \| ``"MANAGE_NICKNAMES"`` \| ``"MANAGE_ROLES"`` \| ``"MANAGE_WEBHOOKS"`` \| ``"MANAGE_EMOJIS_AND_STICKERS"`` \| ``"USE_SLASH_COMMANDS"`` \| ``"REQUEST_TO_SPEAK"`` \| ``"MANAGE_EVENTS"`` \| ``"MANAGE_THREADS"`` \| ``"CREATE_PUBLIC_THREADS"`` \| ``"CREATE_PRIVATE_THREADS"`` \| ``"USE_EXTERNAL_STICKERS"`` \| ``"SEND_MESSAGES_IN_THREADS"`` \| ``"USE_EMBEDDED_ACTIVITIES"`` \| ``"MODERATE_MEMBERS"``)[] |

#### Returns

`string`

#### Defined in

packages/utils/dist/permissions.d.ts:5

___

### calculatePermissions

▸ **calculatePermissions**(`permissionBits`): [`PermissionStrings`](md#permissionstrings)[]

This function converts a bitwise string to permission strings

#### Parameters

| Name | Type |
| :------ | :------ |
| `permissionBits` | `bigint` |

#### Returns

[`PermissionStrings`](md#permissionstrings)[]

#### Defined in

packages/utils/dist/permissions.d.ts:3

___

### camelToSnakeCase

▸ **camelToSnakeCase**(`str`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

packages/utils/dist/casing.d.ts:5

___

### camelize

▸ **camelize**<`T`\>(`object`): [`Camelize`](md#camelize)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `T` |

#### Returns

[`Camelize`](md#camelize)<`T`\>

#### Defined in

packages/utils/dist/casing.d.ts:2

___

### coerceToFileContent

▸ **coerceToFileContent**(`value`): value is FileContent

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is FileContent

#### Defined in

packages/utils/dist/files.d.ts:3

___

### createBot

▸ **createBot**(`options`): [`Bot`](../interfaces/Bot.md)

Create a bot object that will maintain the rest and gateway connection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`CreateBotOptions`](../interfaces/CreateBotOptions.md) | Configurations options used to manage this bot. |

#### Returns

[`Bot`](../interfaces/Bot.md)

Bot

#### Defined in

[packages/bot/src/bot.ts:62](https://github.com/discordeno/discordeno/blob/b8c25357/packages/bot/src/bot.ts#L62)

___

### createGatewayManager

▸ **createGatewayManager**(`options`): [`GatewayManager`](../interfaces/GatewayManager.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`CreateGatewayManagerOptions`](../interfaces/CreateGatewayManagerOptions.md) |

#### Returns

[`GatewayManager`](../interfaces/GatewayManager.md)

#### Defined in

packages/gateway/dist/manager.d.ts:6

___

### createInvalidRequestBucket

▸ **createInvalidRequestBucket**(`options`): [`InvalidRequestBucket`](../interfaces/InvalidRequestBucket.md)

A invalid request bucket is used in a similar manner as a leaky bucket but a invalid request bucket can be refilled as needed.
It's purpose is to make sure the bot does not hit the limit to getting a 1 hr ban.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`InvalidRequestBucketOptions`](../interfaces/InvalidRequestBucketOptions.md) | The options used to configure this bucket. |

#### Returns

[`InvalidRequestBucket`](../interfaces/InvalidRequestBucket.md)

RefillingBucket

#### Defined in

packages/rest/dist/invalidBucket.d.ts:9

___

### createLeakyBucket

▸ **createLeakyBucket**(`«destructured»`): [`LeakyBucket`](../interfaces/LeakyBucket.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Omit`<[`PickPartial`](md#pickpartial)<[`LeakyBucket`](../interfaces/LeakyBucket.md), ``"max"`` \| ``"refillInterval"`` \| ``"refillAmount"``\>, ``"tokens"``\> & { `tokens?`: `number`  } |

#### Returns

[`LeakyBucket`](../interfaces/LeakyBucket.md)

#### Defined in

packages/utils/dist/bucket.d.ts:43

___

### createLogger

▸ **createLogger**(`«destructured»?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `logLevel?` | [`LogLevels`](../enums/LogLevels.md) |
| › `name?` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `debug` | (...`args`: `any`[]) => `void` |
| `error` | (...`args`: `any`[]) => `void` |
| `fatal` | (...`args`: `any`[]) => `void` |
| `info` | (...`args`: `any`[]) => `void` |
| `log` | (`level`: [`LogLevels`](../enums/LogLevels.md), ...`args`: `any`[]) => `void` |
| `setDepth` | (`level`: [`LogDepth`](../enums/LogDepth.md)) => `void` |
| `setLevel` | (`level`: [`LogLevels`](../enums/LogLevels.md)) => `void` |
| `warn` | (...`args`: `any`[]) => `void` |

#### Defined in

packages/utils/dist/logger.d.ts:12

___

### createRestManager

▸ **createRestManager**(`options`): [`RestManager`](../interfaces/RestManager.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`CreateRestManagerOptions`](../interfaces/CreateRestManagerOptions.md) |

#### Returns

[`RestManager`](../interfaces/RestManager.md)

#### Defined in

packages/rest/dist/manager.d.ts:2

___

### cyan

▸ **cyan**(`str`): `string`

Set text color to cyan.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make cyan |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:93

___

### decode

▸ **decode**(`data`): `Uint8Array`

CREDIT: https://gist.github.com/enepomnyaschih/72c423f727d395eeaa09697058238727
Decodes RFC4648 base64 string into an Uint8Array

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

`Uint8Array`

#### Defined in

packages/utils/dist/base64.d.ts:12

___

### delay

▸ **delay**(`ms`): `Promise`<`void`\>

Pause the execution for a given amount of milliseconds.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ms` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

packages/utils/dist/utils.d.ts:2

___

### dim

▸ **dim**(`str`): `string`

The text emits only a small amount of light.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to dim |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:33

___

### emojiUrl

▸ **emojiUrl**(`emojiId`, `animated?`): `string`

Get the url for an emoji.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emojiId` | [`BigString`](md#bigstring) | The id of the emoji |
| `animated?` | `boolean` | Whether or not the emoji is animated |

#### Returns

`string`

string

#### Defined in

packages/utils/dist/images.d.ts:11

___

### encode

▸ **encode**(`data`): `string`

CREDIT: https://gist.github.com/enepomnyaschih/72c423f727d395eeaa09697058238727
Encodes a given Uint8Array, ArrayBuffer or string into RFC4648 base64 representation

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` \| `ArrayBuffer` |

#### Returns

`string`

#### Defined in

packages/utils/dist/base64.d.ts:6

___

### findFiles

▸ **findFiles**(`file`): [`FileContent`](../interfaces/FileContent.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `unknown` |

#### Returns

[`FileContent`](../interfaces/FileContent.md)[]

#### Defined in

packages/utils/dist/files.d.ts:2

___

### formatImageUrl

▸ **formatImageUrl**(`url`, `size?`, `format?`): `string`

Help format an image url.

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `size?` | [`ImageSize`](md#imagesize) |
| `format?` | [`ImageFormat`](md#imageformat) |

#### Returns

`string`

#### Defined in

packages/utils/dist/images.d.ts:3

___

### getBotIdFromToken

▸ **getBotIdFromToken**(`token`): `bigint`

Get the bot id from the bot token. WARNING: Discord staff has mentioned this may not be stable forever. Use at your own risk. However, note for over 5 years this has never broken.

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Returns

`bigint`

#### Defined in

packages/utils/dist/token.d.ts:4

___

### getColorEnabled

▸ **getColorEnabled**(): `boolean`

Get whether text color change is enabled or disabled.

#### Returns

`boolean`

#### Defined in

packages/utils/dist/colors.d.ts:18

___

### getWidgetImageUrl

▸ **getWidgetImageUrl**(`guildId`, `options?`): `string`

Builds a URL to the guild widget image stored in the Discord CDN.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `guildId` | [`BigString`](md#bigstring) | The ID of the guild to get the link to the widget image for. |
| `options?` | [`GetGuildWidgetImageQuery`](../interfaces/GetGuildWidgetImageQuery.md) | The parameters for the building of the URL. |

#### Returns

`string`

The link to the resource.

#### Defined in

packages/utils/dist/images.d.ts:67

___

### gray

▸ **gray**(`str`): `string`

Set text color to gray.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make gray |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:103

___

### green

▸ **green**(`str`): `string`

Set text color to green.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make green |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:73

___

### guildBannerUrl

▸ **guildBannerUrl**(`guildId`, `options`): `string` \| `undefined`

Builds a URL to the guild banner stored in the Discord CDN.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `guildId` | [`BigString`](md#bigstring) | The ID of the guild to get the link to the banner for. |
| `options` | `Object` | The parameters for the building of the URL. |
| `options.banner?` | `string` \| `bigint` | - |
| `options.format?` | [`ImageFormat`](md#imageformat) | - |
| `options.size?` | [`ImageSize`](md#imagesize) | - |

#### Returns

`string` \| `undefined`

The link to the resource or `undefined` if no banner has been set.

#### Defined in

packages/utils/dist/images.d.ts:32

___

### guildIconUrl

▸ **guildIconUrl**(`guildId`, `imageHash`, `options?`): `string` \| `undefined`

Builds a URL to the guild icon stored in the Discord CDN.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `guildId` | [`BigString`](md#bigstring) | The ID of the guild to get the link to the banner for. |
| `imageHash` | `undefined` \| [`BigString`](md#bigstring) | - |
| `options?` | `Object` | The parameters for the building of the URL. |
| `options.format?` | [`ImageFormat`](md#imageformat) | - |
| `options.size?` | [`ImageSize`](md#imagesize) | - |

#### Returns

`string` \| `undefined`

The link to the resource or `undefined` if no banner has been set.

#### Defined in

packages/utils/dist/images.d.ts:44

___

### guildSplashUrl

▸ **guildSplashUrl**(`guildId`, `imageHash`, `options?`): `string` \| `undefined`

Builds the URL to a guild splash stored in the Discord CDN.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `guildId` | [`BigString`](md#bigstring) | The ID of the guild to get the splash of. |
| `imageHash` | `undefined` \| [`BigString`](md#bigstring) | The hash identifying the splash image. |
| `options?` | `Object` | The parameters for the building of the URL. |
| `options.format?` | [`ImageFormat`](md#imageformat) | - |
| `options.size?` | [`ImageSize`](md#imagesize) | - |

#### Returns

`string` \| `undefined`

The link to the resource or `undefined` if the guild does not have a splash image set.

#### Defined in

packages/utils/dist/images.d.ts:56

___

### hasProperty

▸ **hasProperty**<`T`, `Y`\>(`obj`, `prop`): obj is T & Record<Y, unknown\>

TS save way to check if a property exists in an object

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |
| `Y` | extends `PropertyKey` = `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `T` |
| `prop` | `Y` |

#### Returns

obj is T & Record<Y, unknown\>

#### Defined in

packages/utils/dist/utils.d.ts:4

___

### hidden

▸ **hidden**(`str`): `string`

Make the text hidden.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to hide |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:53

___

### iconBigintToHash

▸ **iconBigintToHash**(`icon`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `icon` | `bigint` |

#### Returns

`string`

#### Defined in

packages/utils/dist/hash.d.ts:2

___

### iconHashToBigInt

▸ **iconHashToBigInt**(`hash`): `bigint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hash` | `string` |

#### Returns

`bigint`

#### Defined in

packages/utils/dist/hash.d.ts:1

___

### inverse

▸ **inverse**(`str`): `string`

Invert background color and text color.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to invert its color |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:48

___

### isGetMessagesAfter

▸ **isGetMessagesAfter**(`options`): options is GetMessagesAfter

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`GetMessagesOptions`](md#getmessagesoptions) |

#### Returns

options is GetMessagesAfter

#### Defined in

packages/utils/dist/typeguards.d.ts:2

___

### isGetMessagesAround

▸ **isGetMessagesAround**(`options`): options is GetMessagesAround

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`GetMessagesOptions`](md#getmessagesoptions) |

#### Returns

options is GetMessagesAround

#### Defined in

packages/utils/dist/typeguards.d.ts:4

___

### isGetMessagesBefore

▸ **isGetMessagesBefore**(`options`): options is GetMessagesBefore

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`GetMessagesOptions`](md#getmessagesoptions) |

#### Returns

options is GetMessagesBefore

#### Defined in

packages/utils/dist/typeguards.d.ts:3

___

### isGetMessagesLimit

▸ **isGetMessagesLimit**(`options`): options is GetMessagesLimit

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`GetMessagesOptions`](md#getmessagesoptions) |

#### Returns

options is GetMessagesLimit

#### Defined in

packages/utils/dist/typeguards.d.ts:5

___

### italic

▸ **italic**(`str`): `string`

Make the text italic.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make italic |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:38

___

### magenta

▸ **magenta**(`str`): `string`

Set text color to magenta.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make magenta |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:88

___

### nextRefill

▸ **nextRefill**(`bucket`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `bucket` | [`LeakyBucket`](../interfaces/LeakyBucket.md) |

#### Returns

`number`

#### Defined in

packages/utils/dist/bucket.d.ts:53

___

### processReactionString

▸ **processReactionString**(`reaction`): `string`

Converts an reaction emoji unicode string to the discord required form of name:id

#### Parameters

| Name | Type |
| :------ | :------ |
| `reaction` | `string` |

#### Returns

`string`

#### Defined in

packages/utils/dist/reactions.d.ts:2

___

### red

▸ **red**(`str`): `string`

Set text color to red.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make red |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:68

___

### removeTokenPrefix

▸ **removeTokenPrefix**(`token?`, `type?`): `string`

Removes the Bot before the token.

#### Parameters

| Name | Type |
| :------ | :------ |
| `token?` | `string` |
| `type?` | ``"GATEWAY"`` \| ``"REST"`` |

#### Returns

`string`

#### Defined in

packages/utils/dist/token.d.ts:2

___

### reset

▸ **reset**(`str`): `string`

Reset the text modified

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to reset |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:23

___

### rgb24

▸ **rgb24**(`str`, `color`): `string`

Set text color using 24bit rgb.
`color` can be a number in range `0x000000` to `0xffffff` or
an `Rgb`.

To produce the color magenta:

```ts
     import { rgb24 } from "./colors.ts";
     rgb24("foo", 0xff00ff);
     rgb24("foo", {r: 255, g: 0, b: 255});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text color to apply 24bit rgb to |
| `color` | `number` \| [`Rgb`](../interfaces/Rgb.md) | code |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:253

___

### rgb8

▸ **rgb8**(`str`, `color`): `string`

Set text color using paletted 8bit colors.
https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text color to apply paletted 8bit colors to |
| `color` | `number` | code |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:230

___

### setColorEnabled

▸ **setColorEnabled**(`value`): `void`

Set changing text color to enabled or disabled

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Defined in

packages/utils/dist/colors.d.ts:16

___

### snakeToCamelCase

▸ **snakeToCamelCase**(`str`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

packages/utils/dist/casing.d.ts:4

___

### snakelize

▸ **snakelize**<`T`\>(`object`): [`Snakelize`](md#snakelize)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `T` |

#### Returns

[`Snakelize`](md#snakelize)<`T`\>

#### Defined in

packages/utils/dist/casing.d.ts:3

___

### strikethrough

▸ **strikethrough**(`str`): `string`

Put horizontal line through the center of the text.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to strike through |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:58

___

### stripColor

▸ **stripColor**(`string`): `string`

Remove ANSI escape codes from the string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | to remove ANSI escape codes from |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:274

___

### underline

▸ **underline**(`str`): `string`

Make the text underline.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to underline |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:43

___

### updateTokens

▸ **updateTokens**(`bucket`): `number`

Update the tokens of that bucket.

#### Parameters

| Name | Type |
| :------ | :------ |
| `bucket` | [`LeakyBucket`](../interfaces/LeakyBucket.md) |

#### Returns

`number`

The amount of current available tokens.

#### Defined in

packages/utils/dist/bucket.d.ts:52

___

### urlToBase64

▸ **urlToBase64**(`url`): `Promise`<`string`\>

Converts a url to base 64. Useful for example, uploading/creating server emojis.

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

packages/utils/dist/urlToBase64.d.ts:2

___

### white

▸ **white**(`str`): `string`

Set text color to white.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make white |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:98

___

### yellow

▸ **yellow**(`str`): `string`

Set text color to yellow.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make yellow |

#### Returns

`string`

#### Defined in

packages/utils/dist/colors.d.ts:78
