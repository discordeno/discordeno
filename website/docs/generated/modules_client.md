[discordeno-monorepo](../README.md) / [Modules](../modules.md) / @discordeno/client

# Module: @discordeno/client

## Table of contents

### References

- [default](md#default)

### Enumerations

- [InviteTargetTypes](../enums/InviteTargetTypes.md)

### Classes

- [AutocompleteInteraction](../classes/AutocompleteInteraction.md)
- [Base](../classes/Base.md)
- [CategoryChannel](../classes/CategoryChannel.md)
- [Channel](../classes/Channel.md)
- [Client](../classes/Client.md)
- [Collection](../classes/Collection.md)
- [CommandInteraction](../classes/CommandInteraction.md)
- [ComponentInteraction](../classes/ComponentInteraction.md)
- [ExtendedUser](../classes/ExtendedUser.md)
- [Guild](../classes/Guild.md)
- [GuildAuditLogEntry](../classes/GuildAuditLogEntry.md)
- [GuildChannel](../classes/GuildChannel.md)
- [GuildIntegration](../classes/GuildIntegration.md)
- [GuildPreview](../classes/GuildPreview.md)
- [GuildTemplate](../classes/GuildTemplate.md)
- [Interaction](../classes/Interaction.md)
- [Invite](../classes/Invite.md)
- [Member](../classes/Member.md)
- [Message](../classes/Message.md)
- [NewsChannel](../classes/NewsChannel.md)
- [NewsThreadChannel](../classes/NewsThreadChannel.md)
- [Permission](../classes/Permission.md)
- [PermissionOverwrite](../classes/PermissionOverwrite.md)
- [PingInteraction](../classes/PingInteraction.md)
- [PrivateChannel](../classes/PrivateChannel.md)
- [PrivateThreadChannel](../classes/PrivateThreadChannel.md)
- [PublicThreadChannel](../classes/PublicThreadChannel.md)
- [Role](../classes/Role.md)
- [Shard](../classes/Shard.md)
- [ShardManager](../classes/ShardManager.md)
- [StageChannel](../classes/StageChannel.md)
- [StageInstance](../classes/StageInstance.md)
- [TextChannel](../classes/TextChannel.md)
- [TextVoiceChannel](../classes/TextVoiceChannel.md)
- [ThreadChannel](../classes/ThreadChannel.md)
- [ThreadMember](../classes/ThreadMember.md)
- [UnavailableGuild](../classes/UnavailableGuild.md)
- [UnknownInteraction](../classes/UnknownInteraction.md)
- [User](../classes/User.md)
- [VoiceChannel](../classes/VoiceChannel.md)
- [VoiceState](../classes/VoiceState.md)

### Interfaces

- [ActionRow](../interfaces/ActionRow.md)
- [Activity](../interfaces/Activity.md)
- [ActivityPartial](../interfaces/ActivityPartial.md)
- [AdvancedMessageContent](../interfaces/AdvancedMessageContent.md)
- [AdvancedMessageContentEdit](../interfaces/AdvancedMessageContentEdit.md)
- [AllowedMentions](../interfaces/AllowedMentions.md)
- [ApplicationCommand](../interfaces/ApplicationCommand.md)
- [ApplicationCommandOption](../interfaces/ApplicationCommandOption.md)
- [ApplicationCommandOptionChoice](../interfaces/ApplicationCommandOptionChoice.md)
- [ApplicationCommandOptionWithChoices](../interfaces/ApplicationCommandOptionWithChoices.md)
- [ApplicationCommandOptionsSubCommand](../interfaces/ApplicationCommandOptionsSubCommand.md)
- [ApplicationCommandOptionsSubCommandGroup](../interfaces/ApplicationCommandOptionsSubCommandGroup.md)
- [ApplicationCommandPermissions](../interfaces/ApplicationCommandPermissions.md)
- [AutocompleteDisabled](../interfaces/AutocompleteDisabled.md)
- [AutocompleteDisabledInteger](../interfaces/AutocompleteDisabledInteger.md)
- [AutocompleteDisabledIntegerMinMax](../interfaces/AutocompleteDisabledIntegerMinMax.md)
- [AutocompleteEnabled](../interfaces/AutocompleteEnabled.md)
- [ButtonBase](../interfaces/ButtonBase.md)
- [ChannelFollow](../interfaces/ChannelFollow.md)
- [ChannelPosition](../interfaces/ChannelPosition.md)
- [ClientOptions](../interfaces/ClientOptions.md)
- [ClientPresence](../interfaces/ClientPresence.md)
- [CreateChannelInviteOptions](../interfaces/CreateChannelInviteOptions.md)
- [CreateChannelOptions](../interfaces/CreateChannelOptions.md)
- [CreateGuildOptions](../interfaces/CreateGuildOptions.md)
- [CreateInviteOptions](../interfaces/CreateInviteOptions.md)
- [CreateStickerOptions](../interfaces/CreateStickerOptions.md)
- [CreateThreadOptions](../interfaces/CreateThreadOptions.md)
- [CreateThreadWithoutMessageOptions](../interfaces/CreateThreadWithoutMessageOptions.md)
- [DiscoveryCategory](../interfaces/DiscoveryCategory.md)
- [DiscoveryMetadata](../interfaces/DiscoveryMetadata.md)
- [DiscoveryOptions](../interfaces/DiscoveryOptions.md)
- [DiscoverySubcategoryResponse](../interfaces/DiscoverySubcategoryResponse.md)
- [EditChannelOptions](../interfaces/EditChannelOptions.md)
- [EditChannelPositionOptions](../interfaces/EditChannelPositionOptions.md)
- [EditStickerOptions](../interfaces/EditStickerOptions.md)
- [EmbedAuthorOptions](../interfaces/EmbedAuthorOptions.md)
- [EmbedField](../interfaces/EmbedField.md)
- [EmbedFooterOptions](../interfaces/EmbedFooterOptions.md)
- [EmbedImageOptions](../interfaces/EmbedImageOptions.md)
- [EmbedOptions](../interfaces/EmbedOptions.md)
- [Emoji](../interfaces/Emoji.md)
- [EmojiBase](../interfaces/EmojiBase.md)
- [EmojiOptions](../interfaces/EmojiOptions.md)
- [FetchMembersOptions](../interfaces/FetchMembersOptions.md)
- [FileContent](../interfaces/FileContent.md)
- [GetArchivedThreadsOptions](../interfaces/GetArchivedThreadsOptions.md)
- [GetGuildAuditLogOptions](../interfaces/GetGuildAuditLogOptions.md)
- [GetGuildBansOptions](../interfaces/GetGuildBansOptions.md)
- [GetMessageReactionOptions](../interfaces/GetMessageReactionOptions.md)
- [GetMessagesOptions](../interfaces/GetMessagesOptions.md)
- [GetPruneOptions](../interfaces/GetPruneOptions.md)
- [GetRESTGuildMembersOptions](../interfaces/GetRESTGuildMembersOptions.md)
- [GetRESTGuildsOptions](../interfaces/GetRESTGuildsOptions.md)
- [GuildApplicationCommandPermissions](../interfaces/GuildApplicationCommandPermissions.md)
- [GuildAuditLog](../interfaces/GuildAuditLog.md)
- [GuildBan](../interfaces/GuildBan.md)
- [GuildOptions](../interfaces/GuildOptions.md)
- [GuildTemplateOptions](../interfaces/GuildTemplateOptions.md)
- [GuildTextable](../interfaces/GuildTextable.md)
- [GuildVanity](../interfaces/GuildVanity.md)
- [IntegrationOptions](../interfaces/IntegrationOptions.md)
- [InteractionApplicationCommandCallbackData](../interfaces/InteractionApplicationCommandCallbackData.md)
- [InteractionButton](../interfaces/InteractionButton.md)
- [InteractionResponse](../interfaces/InteractionResponse.md)
- [JSONCache](../interfaces/JSONCache.md)
- [JoinVoiceChannelOptions](../interfaces/JoinVoiceChannelOptions.md)
- [ListedChannelThreads](../interfaces/ListedChannelThreads.md)
- [ListedGuildThreads](../interfaces/ListedGuildThreads.md)
- [MemberOptions](../interfaces/MemberOptions.md)
- [MessageReferenceBase](../interfaces/MessageReferenceBase.md)
- [MessageReferenceReply](../interfaces/MessageReferenceReply.md)
- [OAuthApplicationInfo](../interfaces/OAuthApplicationInfo.md)
- [OAuthTeamInfo](../interfaces/OAuthTeamInfo.md)
- [OAuthTeamMember](../interfaces/OAuthTeamMember.md)
- [Overwrite](../interfaces/Overwrite.md)
- [ParsedClientOptions](../interfaces/ParsedClientOptions.md)
- [PartialChannel](../interfaces/PartialChannel.md)
- [PartialEmoji](../interfaces/PartialEmoji.md)
- [PartialRole](../interfaces/PartialRole.md)
- [PartialUser](../interfaces/PartialUser.md)
- [Pinnable](../interfaces/Pinnable.md)
- [PruneMemberOptions](../interfaces/PruneMemberOptions.md)
- [PurgeChannelOptions](../interfaces/PurgeChannelOptions.md)
- [RequestData](../interfaces/RequestData.md)
- [RequestGuildMembersOptions](../interfaces/RequestGuildMembersOptions.md)
- [RequestHandlerOptions](../interfaces/RequestHandlerOptions.md)
- [RequestMembersPromise](../interfaces/RequestMembersPromise.md)
- [RoleOptions](../interfaces/RoleOptions.md)
- [SelectMenu](../interfaces/SelectMenu.md)
- [SelectMenuOptions](../interfaces/SelectMenuOptions.md)
- [ShardManagerOptions](../interfaces/ShardManagerOptions.md)
- [SimpleJSON](../interfaces/SimpleJSON.md)
- [StageInstanceOptions](../interfaces/StageInstanceOptions.md)
- [Sticker](../interfaces/Sticker.md)
- [StickerItems](../interfaces/StickerItems.md)
- [StickerPack](../interfaces/StickerPack.md)
- [Textable](../interfaces/Textable.md)
- [ThreadTextable](../interfaces/ThreadTextable.md)
- [URLButton](../interfaces/URLButton.md)
- [Uncached](../interfaces/Uncached.md)
- [VoiceRegion](../interfaces/VoiceRegion.md)
- [VoiceStateOptions](../interfaces/VoiceStateOptions.md)
- [Webhook](../interfaces/Webhook.md)
- [WebhookOptions](../interfaces/WebhookOptions.md)
- [WebhookPayload](../interfaces/WebhookPayload.md)
- [WelcomeChannel](../interfaces/WelcomeChannel.md)
- [WelcomeScreen](../interfaces/WelcomeScreen.md)
- [WelcomeScreenOptions](../interfaces/WelcomeScreenOptions.md)
- [Widget](../interfaces/Widget.md)
- [WidgetChannel](../interfaces/WidgetChannel.md)
- [WidgetData](../interfaces/WidgetData.md)
- [WidgetMember](../interfaces/WidgetMember.md)

### Type Aliases

- [ActionRowComponents](md#actionrowcomponents)
- [ActivityType](md#activitytype)
- [AnyChannel](md#anychannel)
- [AnyGuildChannel](md#anyguildchannel)
- [AnyThreadChannel](md#anythreadchannel)
- [AnyVoiceChannel](md#anyvoicechannel)
- [ApiVersions](md#apiversions)
- [ApplicationCommandOptions](md#applicationcommandoptions)
- [ApplicationCommandOptionsBoolean](md#applicationcommandoptionsboolean)
- [ApplicationCommandOptionsChannel](md#applicationcommandoptionschannel)
- [ApplicationCommandOptionsInteger](md#applicationcommandoptionsinteger)
- [ApplicationCommandOptionsIntegerWithAutocomplete](md#applicationcommandoptionsintegerwithautocomplete)
- [ApplicationCommandOptionsIntegerWithMinMax](md#applicationcommandoptionsintegerwithminmax)
- [ApplicationCommandOptionsIntegerWithoutAutocomplete](md#applicationcommandoptionsintegerwithoutautocomplete)
- [ApplicationCommandOptionsMentionable](md#applicationcommandoptionsmentionable)
- [ApplicationCommandOptionsNumber](md#applicationcommandoptionsnumber)
- [ApplicationCommandOptionsNumberWithAutocomplete](md#applicationcommandoptionsnumberwithautocomplete)
- [ApplicationCommandOptionsNumberWithMinMax](md#applicationcommandoptionsnumberwithminmax)
- [ApplicationCommandOptionsNumberWithoutAutocomplete](md#applicationcommandoptionsnumberwithoutautocomplete)
- [ApplicationCommandOptionsRole](md#applicationcommandoptionsrole)
- [ApplicationCommandOptionsString](md#applicationcommandoptionsstring)
- [ApplicationCommandOptionsStringWithAutocomplete](md#applicationcommandoptionsstringwithautocomplete)
- [ApplicationCommandOptionsStringWithoutAutocomplete](md#applicationcommandoptionsstringwithoutautocomplete)
- [ApplicationCommandOptionsUser](md#applicationcommandoptionsuser)
- [ApplicationCommandOptionsWithValue](md#applicationcommandoptionswithvalue)
- [ApplicationCommandStructure](md#applicationcommandstructure)
- [AutoArchiveDuration](md#autoarchiveduration)
- [BigString](md#bigstring)
- [BotActivityType](md#botactivitytype)
- [Button](md#button)
- [ChatInputApplicationCommand](md#chatinputapplicationcommand)
- [ChatInputApplicationCommandStructure](md#chatinputapplicationcommandstructure)
- [GuildTextableChannel](md#guildtextablechannel)
- [ImageFormat](md#imageformat)
- [ImageSize](md#imagesize)
- [InteractionContent](md#interactioncontent)
- [InteractionContentEdit](md#interactioncontentedit)
- [MessageApplicationCommand](md#messageapplicationcommand)
- [MessageApplicationCommandStructure](md#messageapplicationcommandstructure)
- [MessageContent](md#messagecontent)
- [MessageContentEdit](md#messagecontentedit)
- [MessageWebhookContent](md#messagewebhookcontent)
- [PossiblyUncachedTextable](md#possiblyuncachedtextable)
- [RequestMethod](md#requestmethod)
- [SelfStatus](md#selfstatus)
- [Status](md#status)
- [TextVoiceChannelTypes](md#textvoicechanneltypes)
- [TextableChannel](md#textablechannel)
- [UserApplicationCommand](md#userapplicationcommand)
- [UserApplicationCommandStructure](md#userapplicationcommandstructure)
- [VideoQualityMode](md#videoqualitymode)

### Variables

- [CHANNELS](md#channels)
- [DISCOVERY\_CATEGORIES](md#discovery_categories)
- [DISCOVERY\_VALIDATION](md#discovery_validation)
- [GATEWAY](md#gateway)
- [GATEWAY\_BOT](md#gateway_bot)
- [GUILDS](md#guilds)
- [MessageFlags](md#messageflags)
- [STAGE\_INSTANCES](md#stage_instances)
- [STICKER\_PACKS](md#sticker_packs)
- [USERS](md#users)
- [VOICE\_REGIONS](md#voice_regions)

### Functions

- [ACHIEVEMENT\_ICON](md#achievement_icon)
- [APPLICATION\_ASSET](md#application_asset)
- [APPLICATION\_ICON](md#application_icon)
- [BANNER](md#banner)
- [CHANNEL](md#channel)
- [CHANNEL\_BULK\_DELETE](md#channel_bulk_delete)
- [CHANNEL\_CALL\_RING](md#channel_call_ring)
- [CHANNEL\_CROSSPOST](md#channel_crosspost)
- [CHANNEL\_FOLLOW](md#channel_follow)
- [CHANNEL\_ICON](md#channel_icon)
- [CHANNEL\_INVITES](md#channel_invites)
- [CHANNEL\_MESSAGE](md#channel_message)
- [CHANNEL\_MESSAGES](md#channel_messages)
- [CHANNEL\_MESSAGES\_SEARCH](md#channel_messages_search)
- [CHANNEL\_MESSAGE\_REACTION](md#channel_message_reaction)
- [CHANNEL\_MESSAGE\_REACTIONS](md#channel_message_reactions)
- [CHANNEL\_MESSAGE\_REACTION\_USER](md#channel_message_reaction_user)
- [CHANNEL\_PERMISSION](md#channel_permission)
- [CHANNEL\_PERMISSIONS](md#channel_permissions)
- [CHANNEL\_PIN](md#channel_pin)
- [CHANNEL\_PINS](md#channel_pins)
- [CHANNEL\_RECIPIENT](md#channel_recipient)
- [CHANNEL\_TYPING](md#channel_typing)
- [CHANNEL\_WEBHOOKS](md#channel_webhooks)
- [COMMAND](md#command)
- [COMMANDS](md#commands)
- [COMMAND\_PERMISSIONS](md#command_permissions)
- [CUSTOM\_EMOJI](md#custom_emoji)
- [CUSTOM\_EMOJI\_GUILD](md#custom_emoji_guild)
- [DEFAULT\_USER\_AVATAR](md#default_user_avatar)
- [GUILD](md#guild)
- [GUILD\_AUDIT\_LOGS](md#guild_audit_logs)
- [GUILD\_AVATAR](md#guild_avatar)
- [GUILD\_BAN](md#guild_ban)
- [GUILD\_BANS](md#guild_bans)
- [GUILD\_CHANNELS](md#guild_channels)
- [GUILD\_COMMAND](md#guild_command)
- [GUILD\_COMMANDS](md#guild_commands)
- [GUILD\_COMMAND\_PERMISSIONS](md#guild_command_permissions)
- [GUILD\_DISCOVERY](md#guild_discovery)
- [GUILD\_DISCOVERY\_CATEGORY](md#guild_discovery_category)
- [GUILD\_DISCOVERY\_SPLASH](md#guild_discovery_splash)
- [GUILD\_EMOJI](md#guild_emoji)
- [GUILD\_EMOJIS](md#guild_emojis)
- [GUILD\_ICON](md#guild_icon)
- [GUILD\_INTEGRATION](md#guild_integration)
- [GUILD\_INTEGRATIONS](md#guild_integrations)
- [GUILD\_INTEGRATION\_SYNC](md#guild_integration_sync)
- [GUILD\_INVITES](md#guild_invites)
- [GUILD\_MEMBER](md#guild_member)
- [GUILD\_MEMBERS](md#guild_members)
- [GUILD\_MEMBERS\_SEARCH](md#guild_members_search)
- [GUILD\_MEMBER\_NICK](md#guild_member_nick)
- [GUILD\_MEMBER\_ROLE](md#guild_member_role)
- [GUILD\_MESSAGES\_SEARCH](md#guild_messages_search)
- [GUILD\_PREVIEW](md#guild_preview)
- [GUILD\_PRUNE](md#guild_prune)
- [GUILD\_ROLE](md#guild_role)
- [GUILD\_ROLES](md#guild_roles)
- [GUILD\_SPLASH](md#guild_splash)
- [GUILD\_STICKER](md#guild_sticker)
- [GUILD\_STICKERS](md#guild_stickers)
- [GUILD\_TEMPLATE](md#guild_template)
- [GUILD\_TEMPLATES](md#guild_templates)
- [GUILD\_TEMPLATE\_GUILD](md#guild_template_guild)
- [GUILD\_VANITY\_URL](md#guild_vanity_url)
- [GUILD\_VOICE\_REGIONS](md#guild_voice_regions)
- [GUILD\_VOICE\_STATE](md#guild_voice_state)
- [GUILD\_WEBHOOKS](md#guild_webhooks)
- [GUILD\_WELCOME\_SCREEN](md#guild_welcome_screen)
- [GUILD\_WIDGET](md#guild_widget)
- [GUILD\_WIDGET\_SETTINGS](md#guild_widget_settings)
- [INTERACTION\_RESPOND](md#interaction_respond)
- [INVITE](md#invite)
- [MESSAGE\_LINK](md#message_link)
- [OAUTH2\_APPLICATION](md#oauth2_application)
- [ORIGINAL\_INTERACTION\_RESPONSE](md#original_interaction_response)
- [ROLE\_ICON](md#role_icon)
- [STAGE\_INSTANCE](md#stage_instance)
- [STICKER](md#sticker)
- [TEAM\_ICON](md#team_icon)
- [THREADS\_ACTIVE](md#threads_active)
- [THREADS\_ARCHIVED](md#threads_archived)
- [THREADS\_ARCHIVED\_JOINED](md#threads_archived_joined)
- [THREADS\_GUILD\_ACTIVE](md#threads_guild_active)
- [THREAD\_MEMBER](md#thread_member)
- [THREAD\_MEMBERS](md#thread_members)
- [THREAD\_WITHOUT\_MESSAGE](md#thread_without_message)
- [THREAD\_WITH\_MESSAGE](md#thread_with_message)
- [USER](md#user)
- [USER\_AVATAR](md#user_avatar)
- [USER\_BILLING](md#user_billing)
- [USER\_BILLING\_PAYMENTS](md#user_billing_payments)
- [USER\_BILLING\_PREMIUM\_SUBSCRIPTION](md#user_billing_premium_subscription)
- [USER\_CHANNELS](md#user_channels)
- [USER\_CONNECTIONS](md#user_connections)
- [USER\_CONNECTION\_PLATFORM](md#user_connection_platform)
- [USER\_GUILD](md#user_guild)
- [USER\_GUILDS](md#user_guilds)
- [USER\_MFA\_CODES](md#user_mfa_codes)
- [USER\_MFA\_TOTP\_DISABLE](md#user_mfa_totp_disable)
- [USER\_MFA\_TOTP\_ENABLE](md#user_mfa_totp_enable)
- [USER\_NOTE](md#user_note)
- [USER\_PROFILE](md#user_profile)
- [USER\_RELATIONSHIP](md#user_relationship)
- [USER\_SETTINGS](md#user_settings)
- [WEBHOOK](md#webhook)
- [WEBHOOK\_MESSAGE](md#webhook_message)
- [WEBHOOK\_SLACK](md#webhook_slack)
- [WEBHOOK\_TOKEN](md#webhook_token)
- [WEBHOOK\_TOKEN\_SLACK](md#webhook_token_slack)

## References

### default

Renames and re-exports [Client](../classes/Client.md)

## Type Aliases

### ActionRowComponents

Ƭ **ActionRowComponents**: [`Button`](md#button) \| [`SelectMenu`](../interfaces/SelectMenu.md)

#### Defined in

[packages/client/src/typings.ts:131](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L131)

___

### ActivityType

Ƭ **ActivityType**: `ActivityTypes`

#### Defined in

[packages/client/src/typings.ts:135](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L135)

___

### AnyChannel

Ƭ **AnyChannel**: [`AnyGuildChannel`](md#anyguildchannel) \| [`PrivateChannel`](../classes/PrivateChannel.md) \| [`PossiblyUncachedTextable`](md#possiblyuncachedtextable)

#### Defined in

[packages/client/src/typings.ts:120](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L120)

___

### AnyGuildChannel

Ƭ **AnyGuildChannel**: [`GuildTextableChannel`](md#guildtextablechannel) \| [`AnyVoiceChannel`](md#anyvoicechannel) \| [`CategoryChannel`](../classes/CategoryChannel.md) \| [`AnyThreadChannel`](md#anythreadchannel)

#### Defined in

[packages/client/src/typings.ts:121](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L121)

___

### AnyThreadChannel

Ƭ **AnyThreadChannel**: [`NewsThreadChannel`](../classes/NewsThreadChannel.md) \| [`PrivateThreadChannel`](../classes/PrivateThreadChannel.md) \| [`PublicThreadChannel`](../classes/PublicThreadChannel.md)

#### Defined in

[packages/client/src/typings.ts:122](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L122)

___

### AnyVoiceChannel

Ƭ **AnyVoiceChannel**: [`TextVoiceChannel`](../classes/TextVoiceChannel.md) \| [`StageChannel`](../classes/StageChannel.md)

#### Defined in

[packages/client/src/typings.ts:123](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L123)

___

### ApiVersions

Ƭ **ApiVersions**: ``10``

The API versions that are supported.

#### Defined in

[packages/client/src/Client.ts:2439](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Client.ts#L2439)

___

### ApplicationCommandOptions

Ƭ **ApplicationCommandOptions**: [`ApplicationCommandOptionsSubCommand`](../interfaces/ApplicationCommandOptionsSubCommand.md) \| [`ApplicationCommandOptionsSubCommandGroup`](../interfaces/ApplicationCommandOptionsSubCommandGroup.md) \| [`ApplicationCommandOptionsWithValue`](md#applicationcommandoptionswithvalue)

#### Defined in

[packages/client/src/typings.ts:48](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L48)

___

### ApplicationCommandOptionsBoolean

Ƭ **ApplicationCommandOptionsBoolean**: [`ApplicationCommandOption`](../interfaces/ApplicationCommandOption.md)<`ApplicationCommandOptionTypes.Boolean`\>

#### Defined in

[packages/client/src/typings.ts:52](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L52)

___

### ApplicationCommandOptionsChannel

Ƭ **ApplicationCommandOptionsChannel**: [`ApplicationCommandOption`](../interfaces/ApplicationCommandOption.md)<`ApplicationCommandOptionTypes.Channel`\>

#### Defined in

[packages/client/src/typings.ts:53](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L53)

___

### ApplicationCommandOptionsInteger

Ƭ **ApplicationCommandOptionsInteger**: [`ApplicationCommandOptionsIntegerWithAutocomplete`](md#applicationcommandoptionsintegerwithautocomplete) \| [`ApplicationCommandOptionsIntegerWithoutAutocomplete`](md#applicationcommandoptionsintegerwithoutautocomplete) \| [`ApplicationCommandOptionsIntegerWithMinMax`](md#applicationcommandoptionsintegerwithminmax)

#### Defined in

[packages/client/src/typings.ts:54](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L54)

___

### ApplicationCommandOptionsIntegerWithAutocomplete

Ƭ **ApplicationCommandOptionsIntegerWithAutocomplete**: `Omit`<[`ApplicationCommandOptionWithChoices`](../interfaces/ApplicationCommandOptionWithChoices.md)<`ApplicationCommandOptionTypes.Integer`\>, ``"choices"`` \| ``"min_value"`` \| ``"max_value"``\> & [`AutocompleteEnabled`](../interfaces/AutocompleteEnabled.md)

#### Defined in

[packages/client/src/typings.ts:58](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L58)

___

### ApplicationCommandOptionsIntegerWithMinMax

Ƭ **ApplicationCommandOptionsIntegerWithMinMax**: `Omit`<[`ApplicationCommandOptionWithChoices`](../interfaces/ApplicationCommandOptionWithChoices.md)<`ApplicationCommandOptionTypes.Integer`\>, ``"choices"`` \| ``"autocomplete"``\> & [`AutocompleteDisabledIntegerMinMax`](../interfaces/AutocompleteDisabledIntegerMinMax.md)

#### Defined in

[packages/client/src/typings.ts:68](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L68)

___

### ApplicationCommandOptionsIntegerWithoutAutocomplete

Ƭ **ApplicationCommandOptionsIntegerWithoutAutocomplete**: `Omit`<[`ApplicationCommandOptionWithChoices`](../interfaces/ApplicationCommandOptionWithChoices.md)<`ApplicationCommandOptionTypes.Integer`\>, ``"autocomplete"`` \| ``"min_value"`` \| ``"max_value"``\> & [`AutocompleteDisabledInteger`](../interfaces/AutocompleteDisabledInteger.md)

#### Defined in

[packages/client/src/typings.ts:63](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L63)

___

### ApplicationCommandOptionsMentionable

Ƭ **ApplicationCommandOptionsMentionable**: [`ApplicationCommandOption`](../interfaces/ApplicationCommandOption.md)<`ApplicationCommandOptionTypes.Mentionable`\>

#### Defined in

[packages/client/src/typings.ts:73](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L73)

___

### ApplicationCommandOptionsNumber

Ƭ **ApplicationCommandOptionsNumber**: [`ApplicationCommandOptionsNumberWithAutocomplete`](md#applicationcommandoptionsnumberwithautocomplete) \| [`ApplicationCommandOptionsNumberWithoutAutocomplete`](md#applicationcommandoptionsnumberwithoutautocomplete) \| [`ApplicationCommandOptionsNumberWithMinMax`](md#applicationcommandoptionsnumberwithminmax)

#### Defined in

[packages/client/src/typings.ts:74](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L74)

___

### ApplicationCommandOptionsNumberWithAutocomplete

Ƭ **ApplicationCommandOptionsNumberWithAutocomplete**: `Omit`<[`ApplicationCommandOptionWithChoices`](../interfaces/ApplicationCommandOptionWithChoices.md)<`ApplicationCommandOptionTypes.Number`\>, ``"choices"`` \| ``"min_value"`` \| ``"max_value"``\> & [`AutocompleteEnabled`](../interfaces/AutocompleteEnabled.md)

#### Defined in

[packages/client/src/typings.ts:78](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L78)

___

### ApplicationCommandOptionsNumberWithMinMax

Ƭ **ApplicationCommandOptionsNumberWithMinMax**: `Omit`<[`ApplicationCommandOptionWithChoices`](../interfaces/ApplicationCommandOptionWithChoices.md)<`ApplicationCommandOptionTypes.Number`\>, ``"choices"`` \| ``"autocomplete"``\> & [`AutocompleteDisabledIntegerMinMax`](../interfaces/AutocompleteDisabledIntegerMinMax.md)

#### Defined in

[packages/client/src/typings.ts:88](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L88)

___

### ApplicationCommandOptionsNumberWithoutAutocomplete

Ƭ **ApplicationCommandOptionsNumberWithoutAutocomplete**: `Omit`<[`ApplicationCommandOptionWithChoices`](../interfaces/ApplicationCommandOptionWithChoices.md)<`ApplicationCommandOptionTypes.Number`\>, ``"autocomplete"`` \| ``"min_value"`` \| ``"max_value"``\> & [`AutocompleteDisabledInteger`](../interfaces/AutocompleteDisabledInteger.md)

#### Defined in

[packages/client/src/typings.ts:83](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L83)

___

### ApplicationCommandOptionsRole

Ƭ **ApplicationCommandOptionsRole**: [`ApplicationCommandOption`](../interfaces/ApplicationCommandOption.md)<`ApplicationCommandOptionTypes.Role`\>

#### Defined in

[packages/client/src/typings.ts:93](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L93)

___

### ApplicationCommandOptionsString

Ƭ **ApplicationCommandOptionsString**: [`ApplicationCommandOptionsStringWithAutocomplete`](md#applicationcommandoptionsstringwithautocomplete) \| [`ApplicationCommandOptionsStringWithoutAutocomplete`](md#applicationcommandoptionsstringwithoutautocomplete)

#### Defined in

[packages/client/src/typings.ts:94](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L94)

___

### ApplicationCommandOptionsStringWithAutocomplete

Ƭ **ApplicationCommandOptionsStringWithAutocomplete**: `Omit`<[`ApplicationCommandOptionWithChoices`](../interfaces/ApplicationCommandOptionWithChoices.md)<`ApplicationCommandOptionTypes.String`\>, ``"choices"``\> & [`AutocompleteEnabled`](../interfaces/AutocompleteEnabled.md)

#### Defined in

[packages/client/src/typings.ts:95](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L95)

___

### ApplicationCommandOptionsStringWithoutAutocomplete

Ƭ **ApplicationCommandOptionsStringWithoutAutocomplete**: `Omit`<[`ApplicationCommandOptionWithChoices`](../interfaces/ApplicationCommandOptionWithChoices.md)<`ApplicationCommandOptionTypes.String`\>, ``"autocomplete"``\> & [`AutocompleteDisabled`](../interfaces/AutocompleteDisabled.md)

#### Defined in

[packages/client/src/typings.ts:100](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L100)

___

### ApplicationCommandOptionsUser

Ƭ **ApplicationCommandOptionsUser**: [`ApplicationCommandOption`](../interfaces/ApplicationCommandOption.md)<`ApplicationCommandOptionTypes.User`\>

#### Defined in

[packages/client/src/typings.ts:105](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L105)

___

### ApplicationCommandOptionsWithValue

Ƭ **ApplicationCommandOptionsWithValue**: [`ApplicationCommandOptionsString`](md#applicationcommandoptionsstring) \| [`ApplicationCommandOptionsInteger`](md#applicationcommandoptionsinteger) \| [`ApplicationCommandOptionsBoolean`](md#applicationcommandoptionsboolean) \| [`ApplicationCommandOptionsUser`](md#applicationcommandoptionsuser) \| [`ApplicationCommandOptionsChannel`](md#applicationcommandoptionschannel) \| [`ApplicationCommandOptionsRole`](md#applicationcommandoptionsrole) \| [`ApplicationCommandOptionsMentionable`](md#applicationcommandoptionsmentionable) \| [`ApplicationCommandOptionsNumber`](md#applicationcommandoptionsnumber)

#### Defined in

[packages/client/src/typings.ts:106](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L106)

___

### ApplicationCommandStructure

Ƭ **ApplicationCommandStructure**: [`ChatInputApplicationCommandStructure`](md#chatinputapplicationcommandstructure) \| [`MessageApplicationCommandStructure`](md#messageapplicationcommandstructure) \| [`UserApplicationCommandStructure`](md#userapplicationcommandstructure)

#### Defined in

[packages/client/src/typings.ts:41](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L41)

___

### AutoArchiveDuration

Ƭ **AutoArchiveDuration**: ``60`` \| ``1440`` \| ``4320`` \| ``10080``

#### Defined in

[packages/client/src/typings.ts:139](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L139)

___

### BigString

Ƭ **BigString**: `bigint` \| `string`

A union type of string or bigint to help make it easier for users to switch between one another.

#### Defined in

[packages/client/src/Client.ts:2437](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Client.ts#L2437)

___

### BotActivityType

Ƭ **BotActivityType**: `Exclude`<`ActivityTypes`, `ActivityTypes.Custom`\>

#### Defined in

[packages/client/src/typings.ts:136](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L136)

___

### Button

Ƭ **Button**: [`InteractionButton`](../interfaces/InteractionButton.md) \| [`URLButton`](../interfaces/URLButton.md)

#### Defined in

[packages/client/src/typings.ts:132](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L132)

___

### ChatInputApplicationCommand

Ƭ **ChatInputApplicationCommand**: [`ApplicationCommand`](../interfaces/ApplicationCommand.md)<`ApplicationCommandTypes.ChatInput`\>

#### Defined in

[packages/client/src/typings.ts:42](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L42)

___

### ChatInputApplicationCommandStructure

Ƭ **ChatInputApplicationCommandStructure**: `Omit`<[`ChatInputApplicationCommand`](md#chatinputapplicationcommand), ``"id"`` \| ``"application_id"`` \| ``"guild_id"``\>

#### Defined in

[packages/client/src/typings.ts:43](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L43)

___

### GuildTextableChannel

Ƭ **GuildTextableChannel**: [`TextChannel`](../classes/TextChannel.md) \| [`TextVoiceChannel`](../classes/TextVoiceChannel.md) \| [`NewsChannel`](../classes/NewsChannel.md)

#### Defined in

[packages/client/src/typings.ts:124](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L124)

___

### ImageFormat

Ƭ **ImageFormat**: ``"jpg"`` \| ``"jpeg"`` \| ``"png"`` \| ``"webp"`` \| ``"gif"``

The formats for images that are supported.

#### Defined in

[packages/client/src/Client.ts:2443](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Client.ts#L2443)

___

### ImageSize

Ƭ **ImageSize**: ``16`` \| ``32`` \| ``64`` \| ``128`` \| ``256`` \| ``512`` \| ``1024`` \| ``2048`` \| ``4096``

The sizes for images that are supported.

#### Defined in

[packages/client/src/Client.ts:2441](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Client.ts#L2441)

___

### InteractionContent

Ƭ **InteractionContent**: `Pick`<[`WebhookPayload`](../interfaces/WebhookPayload.md), ``"content"`` \| ``"embeds"`` \| ``"allowedMentions"`` \| ``"tts"`` \| ``"flags"`` \| ``"components"`` \| ``"file"``\>

#### Defined in

[packages/client/src/typings.ts:129](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L129)

___

### InteractionContentEdit

Ƭ **InteractionContentEdit**: `Pick`<[`WebhookPayload`](../interfaces/WebhookPayload.md), ``"content"`` \| ``"embeds"`` \| ``"allowedMentions"`` \| ``"components"`` \| ``"file"``\>

#### Defined in

[packages/client/src/typings.ts:130](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L130)

___

### MessageApplicationCommand

Ƭ **MessageApplicationCommand**: `Omit`<[`ApplicationCommand`](../interfaces/ApplicationCommand.md)<`ApplicationCommandTypes.Message`\>, ``"description"`` \| ``"options"``\>

#### Defined in

[packages/client/src/typings.ts:44](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L44)

___

### MessageApplicationCommandStructure

Ƭ **MessageApplicationCommandStructure**: `Omit`<[`MessageApplicationCommand`](md#messageapplicationcommand), ``"id"`` \| ``"application_id"`` \| ``"guild_id"``\>

#### Defined in

[packages/client/src/typings.ts:45](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L45)

___

### MessageContent

Ƭ **MessageContent**: `string` \| [`AdvancedMessageContent`](../interfaces/AdvancedMessageContent.md)

#### Defined in

[packages/client/src/typings.ts:133](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L133)

___

### MessageContentEdit

Ƭ **MessageContentEdit**: `string` \| [`AdvancedMessageContentEdit`](../interfaces/AdvancedMessageContentEdit.md)

#### Defined in

[packages/client/src/typings.ts:134](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L134)

___

### MessageWebhookContent

Ƭ **MessageWebhookContent**: `Pick`<[`WebhookPayload`](../interfaces/WebhookPayload.md), ``"content"`` \| ``"embeds"`` \| ``"file"`` \| ``"allowedMentions"`` \| ``"components"``\>

#### Defined in

[packages/client/src/typings.ts:140](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L140)

___

### PossiblyUncachedTextable

Ƭ **PossiblyUncachedTextable**: [`Textable`](../interfaces/Textable.md) \| [`Uncached`](../interfaces/Uncached.md)

#### Defined in

[packages/client/src/typings.ts:125](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L125)

___

### RequestMethod

Ƭ **RequestMethod**: ``"GET"`` \| ``"POST"`` \| ``"PUT"`` \| ``"DELETE"`` \| ``"PATCH"``

The methods that are acceptable for REST.

#### Defined in

[packages/client/src/Client.ts:2445](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Client.ts#L2445)

___

### SelfStatus

Ƭ **SelfStatus**: [`Status`](md#status) \| ``"invisible"``

#### Defined in

[packages/client/src/typings.ts:138](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L138)

___

### Status

Ƭ **Status**: ``"online"`` \| ``"idle"`` \| ``"dnd"``

#### Defined in

[packages/client/src/typings.ts:137](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L137)

___

### TextVoiceChannelTypes

Ƭ **TextVoiceChannelTypes**: `ChannelTypes.GuildVoice` \| `ChannelTypes.GuildStageVoice`

#### Defined in

[packages/client/src/typings.ts:128](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L128)

___

### TextableChannel

Ƭ **TextableChannel**: [`GuildTextable`](../interfaces/GuildTextable.md) & [`GuildTextableChannel`](md#guildtextablechannel) \| [`ThreadTextable`](../interfaces/ThreadTextable.md) & [`AnyThreadChannel`](md#anythreadchannel) \| [`Textable`](../interfaces/Textable.md) & [`PrivateChannel`](../classes/PrivateChannel.md)

#### Defined in

[packages/client/src/typings.ts:126](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L126)

___

### UserApplicationCommand

Ƭ **UserApplicationCommand**: `Omit`<[`ApplicationCommand`](../interfaces/ApplicationCommand.md)<`ApplicationCommandTypes.User`\>, ``"description"`` \| ``"options"``\>

#### Defined in

[packages/client/src/typings.ts:46](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L46)

___

### UserApplicationCommandStructure

Ƭ **UserApplicationCommandStructure**: `Omit`<[`UserApplicationCommand`](md#userapplicationcommand), ``"id"`` \| ``"application_id"`` \| ``"guild_id"``\>

#### Defined in

[packages/client/src/typings.ts:47](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L47)

___

### VideoQualityMode

Ƭ **VideoQualityMode**: `VideoQualityModes.Auto` \| `VideoQualityModes.Full`

#### Defined in

[packages/client/src/typings.ts:127](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L127)

## Variables

### CHANNELS

• `Const` **CHANNELS**: ``"/channels"``

#### Defined in

[packages/client/src/Endpoints.ts:30](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L30)

___

### DISCOVERY\_CATEGORIES

• `Const` **DISCOVERY\_CATEGORIES**: ``"/discovery/categories"``

#### Defined in

[packages/client/src/Endpoints.ts:32](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L32)

___

### DISCOVERY\_VALIDATION

• `Const` **DISCOVERY\_VALIDATION**: ``"/discovery/valid-term"``

#### Defined in

[packages/client/src/Endpoints.ts:33](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L33)

___

### GATEWAY

• `Const` **GATEWAY**: ``"/gateway"``

#### Defined in

[packages/client/src/Endpoints.ts:34](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L34)

___

### GATEWAY\_BOT

• `Const` **GATEWAY\_BOT**: ``"/gateway/bot"``

#### Defined in

[packages/client/src/Endpoints.ts:35](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L35)

___

### GUILDS

• `Const` **GUILDS**: ``"/guilds"``

#### Defined in

[packages/client/src/Endpoints.ts:77](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L77)

___

### MessageFlags

• `Const` **MessageFlags**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `CROSSPOSTED` | `number` |
| `EPHEMERAL` | `number` |
| `HAS_THREAD` | `number` |
| `IS_CROSSPOST` | `number` |
| `LOADING` | `number` |
| `SOURCE_MESSAGE_DELETED` | `number` |
| `SUPPRESS_EMBEDS` | `number` |
| `URGENT` | `number` |

#### Defined in

[packages/client/src/typings.ts:878](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/typings.ts#L878)

___

### STAGE\_INSTANCES

• `Const` **STAGE\_INSTANCES**: ``"/stage-instances"``

#### Defined in

[packages/client/src/Endpoints.ts:82](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L82)

___

### STICKER\_PACKS

• `Const` **STICKER\_PACKS**: ``"/sticker-packs"``

#### Defined in

[packages/client/src/Endpoints.ts:84](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L84)

___

### USERS

• `Const` **USERS**: ``"/users"``

#### Defined in

[packages/client/src/Endpoints.ts:109](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L109)

___

### VOICE\_REGIONS

• `Const` **VOICE\_REGIONS**: ``"/voice/regions"``

#### Defined in

[packages/client/src/Endpoints.ts:110](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L110)

## Functions

### ACHIEVEMENT\_ICON

▸ **ACHIEVEMENT_ICON**(`applicationID`, `achievementID`, `icon`): `string`

CDN Endpoints

#### Parameters

| Name | Type |
| :------ | :------ |
| `applicationID` | [`BigString`](md#bigstring) |
| `achievementID` | [`BigString`](md#bigstring) |
| `icon` | `string` |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:118](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L118)

___

### APPLICATION\_ASSET

▸ **APPLICATION_ASSET**(`applicationID`, `asset`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `applicationID` | [`BigString`](md#bigstring) |
| `asset` | `string` |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:120](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L120)

___

### APPLICATION\_ICON

▸ **APPLICATION_ICON**(`applicationID`, `icon`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `applicationID` | [`BigString`](md#bigstring) |
| `icon` | `string` |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:121](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L121)

___

### BANNER

▸ **BANNER**(`guildOrUserID`, `hash`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildOrUserID` | [`BigString`](md#bigstring) |
| `hash` | `string` |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:122](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L122)

___

### CHANNEL

▸ **CHANNEL**(`chanID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chanID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:9](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L9)

___

### CHANNEL\_BULK\_DELETE

▸ **CHANNEL_BULK_DELETE**(`chanID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chanID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:10](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L10)

___

### CHANNEL\_CALL\_RING

▸ **CHANNEL_CALL_RING**(`chanID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chanID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:11](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L11)

___

### CHANNEL\_CROSSPOST

▸ **CHANNEL_CROSSPOST**(`chanID`, `msgID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chanID` | [`BigString`](md#bigstring) |
| `msgID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:12](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L12)

___

### CHANNEL\_FOLLOW

▸ **CHANNEL_FOLLOW**(`chanID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chanID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:13](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L13)

___

### CHANNEL\_ICON

▸ **CHANNEL_ICON**(`chanID`, `chanIcon`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chanID` | [`BigString`](md#bigstring) |
| `chanIcon` | `string` |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:123](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L123)

___

### CHANNEL\_INVITES

▸ **CHANNEL_INVITES**(`chanID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chanID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:14](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L14)

___

### CHANNEL\_MESSAGE

▸ **CHANNEL_MESSAGE**(`chanID`, `msgID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chanID` | [`BigString`](md#bigstring) |
| `msgID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:20](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L20)

___

### CHANNEL\_MESSAGES

▸ **CHANNEL_MESSAGES**(`chanID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chanID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:21](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L21)

___

### CHANNEL\_MESSAGES\_SEARCH

▸ **CHANNEL_MESSAGES_SEARCH**(`chanID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chanID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:22](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L22)

___

### CHANNEL\_MESSAGE\_REACTION

▸ **CHANNEL_MESSAGE_REACTION**(`chanID`, `msgID`, `reaction`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chanID` | [`BigString`](md#bigstring) |
| `msgID` | [`BigString`](md#bigstring) |
| `reaction` | `string` |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:15](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L15)

___

### CHANNEL\_MESSAGE\_REACTIONS

▸ **CHANNEL_MESSAGE_REACTIONS**(`chanID`, `msgID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chanID` | [`BigString`](md#bigstring) |
| `msgID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:19](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L19)

___

### CHANNEL\_MESSAGE\_REACTION\_USER

▸ **CHANNEL_MESSAGE_REACTION_USER**(`chanID`, `msgID`, `reaction`, `userID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chanID` | [`BigString`](md#bigstring) |
| `msgID` | [`BigString`](md#bigstring) |
| `reaction` | `string` |
| `userID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:17](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L17)

___

### CHANNEL\_PERMISSION

▸ **CHANNEL_PERMISSION**(`chanID`, `overID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chanID` | [`BigString`](md#bigstring) |
| `overID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:23](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L23)

___

### CHANNEL\_PERMISSIONS

▸ **CHANNEL_PERMISSIONS**(`chanID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chanID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:24](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L24)

___

### CHANNEL\_PIN

▸ **CHANNEL_PIN**(`chanID`, `msgID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chanID` | [`BigString`](md#bigstring) |
| `msgID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:25](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L25)

___

### CHANNEL\_PINS

▸ **CHANNEL_PINS**(`chanID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chanID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:26](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L26)

___

### CHANNEL\_RECIPIENT

▸ **CHANNEL_RECIPIENT**(`groupID`, `userID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `groupID` | [`BigString`](md#bigstring) |
| `userID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:27](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L27)

___

### CHANNEL\_TYPING

▸ **CHANNEL_TYPING**(`chanID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chanID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:28](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L28)

___

### CHANNEL\_WEBHOOKS

▸ **CHANNEL_WEBHOOKS**(`chanID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chanID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:29](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L29)

___

### COMMAND

▸ **COMMAND**(`applicationID`, `commandID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `applicationID` | [`BigString`](md#bigstring) |
| `commandID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:5](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L5)

___

### COMMANDS

▸ **COMMANDS**(`applicationID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `applicationID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:6](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L6)

___

### COMMAND\_PERMISSIONS

▸ **COMMAND_PERMISSIONS**(`applicationID`, `guildID`, `commandID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `applicationID` | [`BigString`](md#bigstring) |
| `guildID` | [`BigString`](md#bigstring) |
| `commandID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:7](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L7)

___

### CUSTOM\_EMOJI

▸ **CUSTOM_EMOJI**(`emojiID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `emojiID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:124](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L124)

___

### CUSTOM\_EMOJI\_GUILD

▸ **CUSTOM_EMOJI_GUILD**(`emojiID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `emojiID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:31](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L31)

___

### DEFAULT\_USER\_AVATAR

▸ **DEFAULT_USER_AVATAR**(`userDiscriminator`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `userDiscriminator` | `string` |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:125](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L125)

___

### GUILD

▸ **GUILD**(`guildID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:36](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L36)

___

### GUILD\_AUDIT\_LOGS

▸ **GUILD_AUDIT_LOGS**(`guildID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:37](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L37)

___

### GUILD\_AVATAR

▸ **GUILD_AVATAR**(`guildID`, `userID`, `guildAvatar`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |
| `userID` | [`BigString`](md#bigstring) |
| `guildAvatar` | `string` |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:126](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L126)

___

### GUILD\_BAN

▸ **GUILD_BAN**(`guildID`, `memberID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |
| `memberID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:38](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L38)

___

### GUILD\_BANS

▸ **GUILD_BANS**(`guildID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:39](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L39)

___

### GUILD\_CHANNELS

▸ **GUILD_CHANNELS**(`guildID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:40](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L40)

___

### GUILD\_COMMAND

▸ **GUILD_COMMAND**(`applicationID`, `guildID`, `commandID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `applicationID` | [`BigString`](md#bigstring) |
| `guildID` | [`BigString`](md#bigstring) |
| `commandID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:41](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L41)

___

### GUILD\_COMMANDS

▸ **GUILD_COMMANDS**(`applicationID`, `guildID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `applicationID` | [`BigString`](md#bigstring) |
| `guildID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:45](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L45)

___

### GUILD\_COMMAND\_PERMISSIONS

▸ **GUILD_COMMAND_PERMISSIONS**(`applicationID`, `guildID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `applicationID` | [`BigString`](md#bigstring) |
| `guildID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:43](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L43)

___

### GUILD\_DISCOVERY

▸ **GUILD_DISCOVERY**(`guildID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:46](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L46)

___

### GUILD\_DISCOVERY\_CATEGORY

▸ **GUILD_DISCOVERY_CATEGORY**(`guildID`, `categoryID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |
| `categoryID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:47](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L47)

___

### GUILD\_DISCOVERY\_SPLASH

▸ **GUILD_DISCOVERY_SPLASH**(`guildID`, `guildDiscoverySplash`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |
| `guildDiscoverySplash` | `string` |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:128](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L128)

___

### GUILD\_EMOJI

▸ **GUILD_EMOJI**(`guildID`, `emojiID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |
| `emojiID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:48](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L48)

___

### GUILD\_EMOJIS

▸ **GUILD_EMOJIS**(`guildID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:49](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L49)

___

### GUILD\_ICON

▸ **GUILD_ICON**(`guildID`, `guildIcon`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |
| `guildIcon` | `string` |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:129](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L129)

___

### GUILD\_INTEGRATION

▸ **GUILD_INTEGRATION**(`guildID`, `inteID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |
| `inteID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:50](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L50)

___

### GUILD\_INTEGRATIONS

▸ **GUILD_INTEGRATIONS**(`guildID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:52](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L52)

___

### GUILD\_INTEGRATION\_SYNC

▸ **GUILD_INTEGRATION_SYNC**(`guildID`, `inteID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |
| `inteID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:51](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L51)

___

### GUILD\_INVITES

▸ **GUILD_INVITES**(`guildID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:53](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L53)

___

### GUILD\_MEMBER

▸ **GUILD_MEMBER**(`guildID`, `memberID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |
| `memberID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:55](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L55)

___

### GUILD\_MEMBERS

▸ **GUILD_MEMBERS**(`guildID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:59](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L59)

___

### GUILD\_MEMBERS\_SEARCH

▸ **GUILD_MEMBERS_SEARCH**(`guildID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:60](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L60)

___

### GUILD\_MEMBER\_NICK

▸ **GUILD_MEMBER_NICK**(`guildID`, `memberID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |
| `memberID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:56](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L56)

___

### GUILD\_MEMBER\_ROLE

▸ **GUILD_MEMBER_ROLE**(`guildID`, `memberID`, `roleID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |
| `memberID` | [`BigString`](md#bigstring) |
| `roleID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:57](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L57)

___

### GUILD\_MESSAGES\_SEARCH

▸ **GUILD_MESSAGES_SEARCH**(`guildID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:61](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L61)

___

### GUILD\_PREVIEW

▸ **GUILD_PREVIEW**(`guildID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:62](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L62)

___

### GUILD\_PRUNE

▸ **GUILD_PRUNE**(`guildID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:63](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L63)

___

### GUILD\_ROLE

▸ **GUILD_ROLE**(`guildID`, `roleID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |
| `roleID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:64](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L64)

___

### GUILD\_ROLES

▸ **GUILD_ROLES**(`guildID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:65](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L65)

___

### GUILD\_SPLASH

▸ **GUILD_SPLASH**(`guildID`, `guildSplash`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |
| `guildSplash` | `string` |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:130](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L130)

___

### GUILD\_STICKER

▸ **GUILD_STICKER**(`guildID`, `stickerID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |
| `stickerID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:66](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L66)

___

### GUILD\_STICKERS

▸ **GUILD_STICKERS**(`guildID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:67](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L67)

___

### GUILD\_TEMPLATE

▸ **GUILD_TEMPLATE**(`code`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:68](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L68)

___

### GUILD\_TEMPLATES

▸ **GUILD_TEMPLATES**(`guildID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:69](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L69)

___

### GUILD\_TEMPLATE\_GUILD

▸ **GUILD_TEMPLATE_GUILD**(`guildID`, `code`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |
| `code` | `string` |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:70](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L70)

___

### GUILD\_VANITY\_URL

▸ **GUILD_VANITY_URL**(`guildID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:54](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L54)

___

### GUILD\_VOICE\_REGIONS

▸ **GUILD_VOICE_REGIONS**(`guildID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:71](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L71)

___

### GUILD\_VOICE\_STATE

▸ **GUILD_VOICE_STATE**(`guildID`, `user`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |
| `user` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:76](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L76)

___

### GUILD\_WEBHOOKS

▸ **GUILD_WEBHOOKS**(`guildID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:72](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L72)

___

### GUILD\_WELCOME\_SCREEN

▸ **GUILD_WELCOME_SCREEN**(`guildID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:73](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L73)

___

### GUILD\_WIDGET

▸ **GUILD_WIDGET**(`guildID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:74](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L74)

___

### GUILD\_WIDGET\_SETTINGS

▸ **GUILD_WIDGET_SETTINGS**(`guildID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:75](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L75)

___

### INTERACTION\_RESPOND

▸ **INTERACTION_RESPOND**(`interactID`, `interactToken`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `interactID` | [`BigString`](md#bigstring) |
| `interactToken` | `string` |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:78](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L78)

___

### INVITE

▸ **INVITE**(`inviteID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `inviteID` | `string` |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:79](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L79)

___

### MESSAGE\_LINK

▸ **MESSAGE_LINK**(`guildID`, `channelID`, `messageID`): `string`

Client Endpoints

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |
| `channelID` | [`BigString`](md#bigstring) |
| `messageID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:136](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L136)

___

### OAUTH2\_APPLICATION

▸ **OAUTH2_APPLICATION**(`appID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `appID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:80](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L80)

___

### ORIGINAL\_INTERACTION\_RESPONSE

▸ **ORIGINAL_INTERACTION_RESPONSE**(`appID`, `interactToken`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `appID` | [`BigString`](md#bigstring) |
| `interactToken` | `string` |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:4](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L4)

___

### ROLE\_ICON

▸ **ROLE_ICON**(`roleID`, `roleIcon`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleID` | [`BigString`](md#bigstring) |
| `roleIcon` | `string` |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:131](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L131)

___

### STAGE\_INSTANCE

▸ **STAGE_INSTANCE**(`channelID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:81](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L81)

___

### STICKER

▸ **STICKER**(`stickerID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `stickerID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:83](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L83)

___

### TEAM\_ICON

▸ **TEAM_ICON**(`teamID`, `teamIcon`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `teamID` | [`BigString`](md#bigstring) |
| `teamIcon` | `string` |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:132](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L132)

___

### THREADS\_ACTIVE

▸ **THREADS_ACTIVE**(`channelID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:89](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L89)

___

### THREADS\_ARCHIVED

▸ **THREADS_ARCHIVED**(`channelID`, `type`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelID` | [`BigString`](md#bigstring) |
| `type` | `string` |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:90](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L90)

___

### THREADS\_ARCHIVED\_JOINED

▸ **THREADS_ARCHIVED_JOINED**(`channelID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:91](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L91)

___

### THREADS\_GUILD\_ACTIVE

▸ **THREADS_GUILD_ACTIVE**(`guildID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guildID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:92](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L92)

___

### THREAD\_MEMBER

▸ **THREAD_MEMBER**(`channelID`, `userID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelID` | [`BigString`](md#bigstring) |
| `userID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:85](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L85)

___

### THREAD\_MEMBERS

▸ **THREAD_MEMBERS**(`channelID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:86](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L86)

___

### THREAD\_WITHOUT\_MESSAGE

▸ **THREAD_WITHOUT_MESSAGE**(`channelID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:88](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L88)

___

### THREAD\_WITH\_MESSAGE

▸ **THREAD_WITH_MESSAGE**(`channelID`, `msgID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelID` | [`BigString`](md#bigstring) |
| `msgID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:87](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L87)

___

### USER

▸ **USER**(`userID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `userID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:93](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L93)

___

### USER\_AVATAR

▸ **USER_AVATAR**(`userID`, `userAvatar`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `userID` | [`BigString`](md#bigstring) |
| `userAvatar` | `string` |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:133](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L133)

___

### USER\_BILLING

▸ **USER_BILLING**(`userID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `userID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:94](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L94)

___

### USER\_BILLING\_PAYMENTS

▸ **USER_BILLING_PAYMENTS**(`userID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `userID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:95](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L95)

___

### USER\_BILLING\_PREMIUM\_SUBSCRIPTION

▸ **USER_BILLING_PREMIUM_SUBSCRIPTION**(`userID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `userID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:96](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L96)

___

### USER\_CHANNELS

▸ **USER_CHANNELS**(`userID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `userID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:97](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L97)

___

### USER\_CONNECTIONS

▸ **USER_CONNECTIONS**(`userID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `userID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:98](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L98)

___

### USER\_CONNECTION\_PLATFORM

▸ **USER_CONNECTION_PLATFORM**(`userID`, `platform`, `id`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `userID` | [`BigString`](md#bigstring) |
| `platform` | `string` |
| `id` | `string` |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:99](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L99)

___

### USER\_GUILD

▸ **USER_GUILD**(`userID`, `guildID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `userID` | [`BigString`](md#bigstring) |
| `guildID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:100](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L100)

___

### USER\_GUILDS

▸ **USER_GUILDS**(`userID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `userID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:101](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L101)

___

### USER\_MFA\_CODES

▸ **USER_MFA_CODES**(`userID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `userID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:102](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L102)

___

### USER\_MFA\_TOTP\_DISABLE

▸ **USER_MFA_TOTP_DISABLE**(`userID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `userID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:103](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L103)

___

### USER\_MFA\_TOTP\_ENABLE

▸ **USER_MFA_TOTP_ENABLE**(`userID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `userID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:104](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L104)

___

### USER\_NOTE

▸ **USER_NOTE**(`userID`, `targetID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `userID` | [`BigString`](md#bigstring) |
| `targetID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:105](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L105)

___

### USER\_PROFILE

▸ **USER_PROFILE**(`userID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `userID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:106](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L106)

___

### USER\_RELATIONSHIP

▸ **USER_RELATIONSHIP**(`userID`, `relID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `userID` | [`BigString`](md#bigstring) |
| `relID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:107](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L107)

___

### USER\_SETTINGS

▸ **USER_SETTINGS**(`userID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `userID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:108](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L108)

___

### WEBHOOK

▸ **WEBHOOK**(`hookID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hookID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:111](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L111)

___

### WEBHOOK\_MESSAGE

▸ **WEBHOOK_MESSAGE**(`hookID`, `token`, `msgID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hookID` | [`BigString`](md#bigstring) |
| `token` | `string` |
| `msgID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:112](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L112)

___

### WEBHOOK\_SLACK

▸ **WEBHOOK_SLACK**(`hookID`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hookID` | [`BigString`](md#bigstring) |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:113](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L113)

___

### WEBHOOK\_TOKEN

▸ **WEBHOOK_TOKEN**(`hookID`, `token`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hookID` | [`BigString`](md#bigstring) |
| `token` | `string` |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:114](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L114)

___

### WEBHOOK\_TOKEN\_SLACK

▸ **WEBHOOK_TOKEN_SLACK**(`hookID`, `token`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hookID` | [`BigString`](md#bigstring) |
| `token` | `string` |

#### Returns

`string`

#### Defined in

[packages/client/src/Endpoints.ts:115](https://github.com/discordeno/discordeno/blob/b8c25357/packages/client/src/Endpoints.ts#L115)
