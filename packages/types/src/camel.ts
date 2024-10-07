import type {
  DiscordAccessTokenResponse,
  DiscordActionRow,
  DiscordActiveThreads,
  DiscordActivity,
  DiscordActivityAssets,
  DiscordActivityButton,
  DiscordActivityEmoji,
  DiscordActivityInstanceResource,
  DiscordActivityParty,
  DiscordActivitySecrets,
  DiscordActivityTimestamps,
  DiscordAllowedMentions,
  DiscordApplication,
  DiscordApplicationCommand,
  DiscordApplicationCommandOption,
  DiscordApplicationCommandOptionChoice,
  DiscordApplicationCommandPermissions,
  DiscordApplicationIntegrationTypeConfiguration,
  DiscordApplicationRoleConnection,
  DiscordApplicationWebhook,
  DiscordArchivedThreads,
  DiscordAttachment,
  DiscordAuditLog,
  DiscordAuditLogChange,
  DiscordAuditLogEntry,
  DiscordAutoModerationAction,
  DiscordAutoModerationActionExecution,
  DiscordAutoModerationActionMetadata,
  DiscordAutoModerationRule,
  DiscordAutoModerationRuleTriggerMetadata,
  DiscordBan,
  DiscordBulkBan,
  DiscordButtonComponent,
  DiscordChannel,
  DiscordChannelMention,
  DiscordChannelPinsUpdate,
  DiscordClientStatus,
  DiscordConnection,
  DiscordCreateApplicationCommand,
  DiscordCreateForumPostWithMessage,
  DiscordCreateGuildChannel,
  DiscordCreateGuildEmoji,
  DiscordCreateMessage,
  DiscordCreateWebhook,
  DiscordCurrentAuthorization,
  DiscordDefaultReactionEmoji,
  DiscordEditChannelPermissionOverridesOptions,
  DiscordEmbed,
  DiscordEmbedAuthor,
  DiscordEmbedField,
  DiscordEmbedFooter,
  DiscordEmbedImage,
  DiscordEmbedProvider,
  DiscordEmbedThumbnail,
  DiscordEmbedVideo,
  DiscordEmoji,
  DiscordEntitlement,
  DiscordFollowAnnouncementChannel,
  DiscordFollowedChannel,
  DiscordForumTag,
  DiscordGatewayPayload,
  DiscordGetAnswerVotesResponse,
  DiscordGetGatewayBot,
  DiscordGuild,
  DiscordGuildApplicationCommandPermissions,
  DiscordGuildBanAddRemove,
  DiscordGuildEmojisUpdate,
  DiscordGuildIntegrationsUpdate,
  DiscordGuildMemberAdd,
  DiscordGuildMemberRemove,
  DiscordGuildMemberUpdate,
  DiscordGuildMembersChunk,
  DiscordGuildOnboarding,
  DiscordGuildOnboardingPrompt,
  DiscordGuildOnboardingPromptOption,
  DiscordGuildPreview,
  DiscordGuildRoleCreate,
  DiscordGuildRoleDelete,
  DiscordGuildRoleUpdate,
  DiscordGuildStickersUpdate,
  DiscordGuildWidget,
  DiscordGuildWidgetSettings,
  DiscordHello,
  DiscordIncomingWebhook,
  DiscordInputTextComponent,
  DiscordInstallParams,
  DiscordIntegration,
  DiscordIntegrationAccount,
  DiscordIntegrationApplication,
  DiscordIntegrationCreateUpdate,
  DiscordIntegrationDelete,
  DiscordInteraction,
  DiscordInteractionCallback,
  DiscordInteractionCallbackResponse,
  DiscordInteractionData,
  DiscordInteractionDataOption,
  DiscordInteractionMember,
  DiscordInteractionResource,
  DiscordInvite,
  DiscordInviteCreate,
  DiscordInviteDelete,
  DiscordInviteMetadata,
  DiscordInviteStageInstance,
  DiscordListActiveThreads,
  DiscordListArchivedThreads,
  DiscordMember,
  DiscordMemberWithUser,
  DiscordMessage,
  DiscordMessageActivity,
  DiscordMessageComponents,
  DiscordMessageDelete,
  DiscordMessageDeleteBulk,
  DiscordMessageInteraction,
  DiscordMessageReactionAdd,
  DiscordMessageReactionRemove,
  DiscordMessageReactionRemoveAll,
  DiscordMessageReactionRemoveEmoji,
  DiscordMessageReference,
  DiscordModifyChannel,
  DiscordModifyGuildChannelPositions,
  DiscordModifyGuildEmoji,
  DiscordModifyGuildWelcomeScreen,
  DiscordOptionalAuditEntryInfo,
  DiscordOverwrite,
  DiscordPoll,
  DiscordPollAnswer,
  DiscordPollAnswerCount,
  DiscordPollMedia,
  DiscordPollResult,
  DiscordPresenceUpdate,
  DiscordPrunedCount,
  DiscordReaction,
  DiscordReady,
  DiscordRole,
  DiscordRoleTags,
  DiscordScheduledEvent,
  DiscordScheduledEventEntityMetadata,
  DiscordScheduledEventUserAdd,
  DiscordScheduledEventUserRemove,
  DiscordSelectMenuComponent,
  DiscordSelectMenuDefaultValue,
  DiscordSelectOption,
  DiscordSessionStartLimit,
  DiscordSku,
  DiscordSoundboardSound,
  DiscordStageInstance,
  DiscordSticker,
  DiscordStickerItem,
  DiscordStickerPack,
  DiscordTeam,
  DiscordTeamMember,
  DiscordTemplate,
  DiscordThreadListSync,
  DiscordThreadMember,
  DiscordThreadMemberUpdate,
  DiscordThreadMembersUpdate,
  DiscordThreadMetadata,
  DiscordTokenExchange,
  DiscordTokenExchangeAuthorizationCode,
  DiscordTokenExchangeClientCredentials,
  DiscordTokenExchangeRefreshToken,
  DiscordTokenRevocation,
  DiscordTypingStart,
  DiscordUnavailableGuild,
  DiscordUser,
  DiscordVanityUrl,
  DiscordVoiceRegion,
  DiscordVoiceServerUpdate,
  DiscordVoiceState,
  DiscordWebhook,
  DiscordWebhookUpdate,
  DiscordWelcomeScreen,
  DiscordWelcomeScreenChannel,
} from './discord.js'
import type { Camelize } from './shared.js'

export interface CamelizedDiscordUser extends Camelize<DiscordUser> {}
export interface CamelizedDiscordIntegration extends Camelize<DiscordIntegration> {}
export interface CamelizedDiscordIntegrationAccount extends Camelize<DiscordIntegrationAccount> {}
export interface CamelizedDiscordIntegrationApplication extends Camelize<DiscordIntegrationApplication> {}
export interface CamelizedDiscordIntegrationCreateUpdate extends Camelize<DiscordIntegrationCreateUpdate> {}
export interface CamelizedDiscordIntegrationDelete extends Camelize<DiscordIntegrationDelete> {}
export interface CamelizedDiscordGuildIntegrationsUpdate extends Camelize<DiscordGuildIntegrationsUpdate> {}
export interface CamelizedDiscordTypingStart extends Camelize<DiscordTypingStart> {}
export interface CamelizedDiscordMember extends Camelize<DiscordMember> {}
export interface CamelizedDiscordApplication extends Camelize<DiscordApplication> {}
export interface CamelizedDiscordApplicationIntegrationTypeConfiguration extends Camelize<DiscordApplicationIntegrationTypeConfiguration> {}
export interface CamelizedDiscordApplicationRoleConnection extends Camelize<DiscordApplicationRoleConnection> {}
export type CamelizedDiscordTokenExchange = Camelize<DiscordTokenExchange>
export interface CamelizedDiscordTokenExchangeAuthorizationCode extends Camelize<DiscordTokenExchangeAuthorizationCode> {}
export interface CamelizedDiscordTokenExchangeRefreshToken extends Camelize<DiscordTokenExchangeRefreshToken> {}
export interface CamelizedDiscordTokenExchangeClientCredentials extends Camelize<DiscordTokenExchangeClientCredentials> {}
export interface CamelizedDiscordAccessTokenResponse extends Camelize<DiscordAccessTokenResponse> {}
export interface CamelizedDiscordTokenRevocation extends Camelize<DiscordTokenRevocation> {}
export interface CamelizedDiscordCurrentAuthorization extends Camelize<DiscordCurrentAuthorization> {}
export interface CamelizedDiscordConnection extends Camelize<DiscordConnection> {}
export interface CamelizedDiscordTeam extends Camelize<DiscordTeam> {}
export interface CamelizedDiscordTeamMember extends Camelize<DiscordTeamMember> {}
export interface CamelizedDiscordWebhookUpdate extends Camelize<DiscordWebhookUpdate> {}
export interface CamelizedDiscordAllowedMentions extends Camelize<DiscordAllowedMentions> {}
export interface CamelizedDiscordEmbed extends Camelize<DiscordEmbed> {}
export interface CamelizedDiscordEmbedAuthor extends Camelize<DiscordEmbedAuthor> {}
export interface CamelizedDiscordEmbedField extends Camelize<DiscordEmbedField> {}
export interface CamelizedDiscordEmbedFooter extends Camelize<DiscordEmbedFooter> {}
export interface CamelizedDiscordEmbedImage extends Camelize<DiscordEmbedImage> {}
export interface CamelizedDiscordEmbedProvider extends Camelize<DiscordEmbedProvider> {}
export interface CamelizedDiscordEmbedThumbnail extends Camelize<DiscordEmbedThumbnail> {}
export interface CamelizedDiscordEmbedVideo extends Camelize<DiscordEmbedVideo> {}
export interface CamelizedDiscordAttachment extends Camelize<DiscordAttachment> {}
export type CamelizedDiscordWebhook = Camelize<DiscordWebhook>
export interface CamelizedDiscordIncomingWebhook extends Camelize<DiscordIncomingWebhook> {}
export interface CamelizedDiscordApplicationWebhook extends Camelize<DiscordApplicationWebhook> {}
export interface CamelizedDiscordGuild extends Camelize<DiscordGuild> {}
export interface CamelizedDiscordRole extends Camelize<DiscordRole> {}
export interface CamelizedDiscordRoleTags extends Camelize<DiscordRoleTags> {}
export interface CamelizedDiscordEmoji extends Camelize<DiscordEmoji> {}
export interface CamelizedDiscordVoiceState extends Camelize<DiscordVoiceState> {}
export interface CamelizedDiscordChannel extends Camelize<DiscordChannel> {}
export interface CamelizedDiscordPresenceUpdate extends Camelize<DiscordPresenceUpdate> {}
export interface CamelizedDiscordWelcomeScreen extends Camelize<DiscordWelcomeScreen> {}
export interface CamelizedDiscordWelcomeScreenChannel extends Camelize<DiscordWelcomeScreenChannel> {}
export interface CamelizedDiscordStageInstance extends Camelize<DiscordStageInstance> {}
export interface CamelizedDiscordThreadMetadata extends Camelize<DiscordThreadMetadata> {}
export interface CamelizedDiscordThreadMember extends Camelize<DiscordThreadMember> {}
export interface CamelizedDiscordActivity extends Camelize<DiscordActivity> {}
export interface CamelizedDiscordClientStatus extends Camelize<DiscordClientStatus> {}
export interface CamelizedDiscordActivityTimestamps extends Camelize<DiscordActivityTimestamps> {}
export interface CamelizedDiscordActivityEmoji extends Camelize<DiscordActivityEmoji> {}
export interface CamelizedDiscordActivityParty extends Camelize<DiscordActivityParty> {}
export interface CamelizedDiscordActivityAssets extends Camelize<DiscordActivityAssets> {}
export interface CamelizedDiscordActivitySecrets extends Camelize<DiscordActivitySecrets> {}
export interface CamelizedDiscordActivityButton extends Camelize<DiscordActivityButton> {}
export interface CamelizedDiscordOverwrite extends Camelize<DiscordOverwrite> {}
export interface CamelizedDiscordMemberWithUser extends Camelize<DiscordMemberWithUser> {}
export interface CamelizedDiscordMessage extends Camelize<DiscordMessage> {}
export interface CamelizedDiscordChannelMention extends Camelize<DiscordChannelMention> {}
export interface CamelizedDiscordReaction extends Camelize<DiscordReaction> {}
export interface CamelizedDiscordMessageActivity extends Camelize<DiscordMessageActivity> {}
export interface CamelizedDiscordMessageReference extends Camelize<DiscordMessageReference> {}
export interface CamelizedDiscordPoll extends Camelize<DiscordPoll> {}
export interface CamelizedDiscordPollMedia extends Camelize<DiscordPollMedia> {}
export interface CamelizedDiscordPollAnswer extends Camelize<DiscordPollAnswer> {}
export interface CamelizedDiscordPollAnswerCount extends Camelize<DiscordPollAnswerCount> {}
export interface CamelizedDiscordPollResult extends Camelize<DiscordPollResult> {}
export interface CamelizedDiscordGetAnswerVotesResponse extends Camelize<DiscordGetAnswerVotesResponse> {}
export interface CamelizedDiscordSticker extends Camelize<DiscordSticker> {}
export interface CamelizedDiscordMessageInteraction extends Camelize<DiscordMessageInteraction> {}
export type CamelizedDiscordMessageComponents = Camelize<DiscordMessageComponents>
export interface CamelizedDiscordActionRow extends Camelize<DiscordActionRow> {}
export interface CamelizedDiscordSelectMenuComponent extends Camelize<DiscordSelectMenuComponent> {}
export interface CamelizedDiscordSelectOption extends Camelize<DiscordSelectOption> {}
export interface CamelizedDiscordSelectMenuDefaultValue extends Camelize<DiscordSelectMenuDefaultValue> {}
export interface CamelizedDiscordButtonComponent extends Camelize<DiscordButtonComponent> {}
export interface CamelizedDiscordInputTextComponent extends Camelize<DiscordInputTextComponent> {}
export interface CamelizedDiscordStickerItem extends Camelize<DiscordStickerItem> {}
export interface CamelizedDiscordStickerPack extends Camelize<DiscordStickerPack> {}
export interface CamelizedDiscordInteraction extends Camelize<DiscordInteraction> {}
export interface CamelizedDiscordInteractionCallbackResponse extends Camelize<DiscordInteractionCallbackResponse> {}
export interface CamelizedDiscordInteractionCallback extends Camelize<DiscordInteractionCallback> {}
export interface CamelizedDiscordInteractionResource extends Camelize<DiscordInteractionResource> {}
export interface CamelizedDiscordActivityInstanceResource extends Camelize<DiscordActivityInstanceResource> {}
export interface CamelizedDiscordInteractionMember extends Camelize<DiscordInteractionMember> {}
export interface CamelizedDiscordInteractionData extends Camelize<DiscordInteractionData> {}
export interface CamelizedDiscordInteractionDataOption extends Camelize<DiscordInteractionDataOption> {}
export interface CamelizedDiscordListActiveThreads extends Camelize<DiscordListActiveThreads> {}
export interface CamelizedDiscordListArchivedThreads extends Camelize<DiscordListArchivedThreads> {}
export interface CamelizedDiscordThreadListSync extends Camelize<DiscordThreadListSync> {}
export interface CamelizedDiscordAuditLog extends Camelize<DiscordAuditLog> {}
export interface CamelizedDiscordAutoModerationRule extends Camelize<DiscordAutoModerationRule> {}
export interface CamelizedDiscordAutoModerationRuleTriggerMetadata extends Camelize<DiscordAutoModerationRuleTriggerMetadata> {}
export interface CamelizedDiscordAutoModerationAction extends Camelize<DiscordAutoModerationAction> {}
export interface CamelizedDiscordAutoModerationActionMetadata extends Camelize<DiscordAutoModerationActionMetadata> {}
export interface CamelizedDiscordAutoModerationActionExecution extends Camelize<DiscordAutoModerationActionExecution> {}
export interface CamelizedDiscordAuditLogEntry extends Camelize<DiscordAuditLogEntry> {}
export type CamelizedDiscordAuditLogChange = Camelize<DiscordAuditLogChange>
export interface CamelizedDiscordOptionalAuditEntryInfo extends Camelize<DiscordOptionalAuditEntryInfo> {}
export interface CamelizedDiscordScheduledEvent extends Camelize<DiscordScheduledEvent> {}
export interface CamelizedDiscordScheduledEventEntityMetadata extends Camelize<DiscordScheduledEventEntityMetadata> {}
export interface CamelizedDiscordGetGatewayBot extends Camelize<DiscordGetGatewayBot> {}
export interface CamelizedDiscordSessionStartLimit extends Camelize<DiscordSessionStartLimit> {}
export interface CamelizedDiscordInviteMetadata extends Camelize<DiscordInviteMetadata> {}
export interface CamelizedDiscordInvite extends Camelize<DiscordInvite> {}
export interface CamelizedDiscordInviteStageInstance extends Camelize<DiscordInviteStageInstance> {}
export interface CamelizedDiscordApplicationCommand extends Camelize<DiscordApplicationCommand> {}
export interface CamelizedDiscordCreateApplicationCommand extends Camelize<DiscordCreateApplicationCommand> {}
export interface CamelizedDiscordApplicationCommandOption extends Camelize<DiscordApplicationCommandOption> {}
export interface CamelizedDiscordApplicationCommandOptionChoice extends Camelize<DiscordApplicationCommandOptionChoice> {}
export interface CamelizedDiscordGuildApplicationCommandPermissions extends Camelize<DiscordGuildApplicationCommandPermissions> {}
export interface CamelizedDiscordApplicationCommandPermissions extends Camelize<DiscordApplicationCommandPermissions> {}
export interface CamelizedDiscordGuildWidget extends Camelize<DiscordGuildWidget> {}
export interface CamelizedDiscordGuildPreview extends Camelize<DiscordGuildPreview> {}
export interface CamelizedDiscordFollowedChannel extends Camelize<DiscordFollowedChannel> {}
export interface CamelizedDiscordGatewayPayload extends Camelize<DiscordGatewayPayload> {}
export interface CamelizedDiscordGuildMembersChunk extends Camelize<DiscordGuildMembersChunk> {}
export interface CamelizedDiscordChannelPinsUpdate extends Camelize<DiscordChannelPinsUpdate> {}
export interface CamelizedDiscordGuildRoleDelete extends Camelize<DiscordGuildRoleDelete> {}
export interface CamelizedDiscordGuildBanAddRemove extends Camelize<DiscordGuildBanAddRemove> {}
export interface CamelizedDiscordMessageReactionRemove extends Camelize<DiscordMessageReactionRemove> {}
export interface CamelizedDiscordMessageReactionAdd extends Camelize<DiscordMessageReactionAdd> {}
export interface CamelizedDiscordVoiceServerUpdate extends Camelize<DiscordVoiceServerUpdate> {}
export interface CamelizedDiscordInviteCreate extends Camelize<DiscordInviteCreate> {}
export interface CamelizedDiscordHello extends Camelize<DiscordHello> {}
export interface CamelizedDiscordReady extends Camelize<DiscordReady> {}
export interface CamelizedDiscordUnavailableGuild extends Camelize<DiscordUnavailableGuild> {}
export interface CamelizedDiscordMessageDeleteBulk extends Camelize<DiscordMessageDeleteBulk> {}
export interface CamelizedDiscordTemplate extends Camelize<DiscordTemplate> {}
export interface CamelizedDiscordGuildMemberAdd extends Camelize<DiscordGuildMemberAdd> {}
export interface CamelizedDiscordMessageDelete extends Camelize<DiscordMessageDelete> {}
export interface CamelizedDiscordThreadMembersUpdate extends Camelize<DiscordThreadMembersUpdate> {}
export interface CamelizedDiscordThreadMemberUpdate extends Camelize<DiscordThreadMemberUpdate> {}
export interface CamelizedDiscordGuildRoleCreate extends Camelize<DiscordGuildRoleCreate> {}
export interface CamelizedDiscordGuildEmojisUpdate extends Camelize<DiscordGuildEmojisUpdate> {}
export interface CamelizedDiscordGuildStickersUpdate extends Camelize<DiscordGuildStickersUpdate> {}
export interface CamelizedDiscordGuildMemberUpdate extends Camelize<DiscordGuildMemberUpdate> {}
export interface CamelizedDiscordMessageReactionRemoveAll extends Camelize<DiscordMessageReactionRemoveAll> {}
export interface CamelizedDiscordGuildRoleUpdate extends Camelize<DiscordGuildRoleUpdate> {}
export interface CamelizedDiscordScheduledEventUserAdd extends Camelize<DiscordScheduledEventUserAdd> {}
export type CamelizedDiscordMessageReactionRemoveEmoji = Camelize<DiscordMessageReactionRemoveEmoji>
export interface CamelizedDiscordGuildMemberRemove extends Camelize<DiscordGuildMemberRemove> {}
export interface CamelizedDiscordBan extends Camelize<DiscordBan> {}
export interface CamelizedDiscordScheduledEventUserRemove extends Camelize<DiscordScheduledEventUserRemove> {}
export interface CamelizedDiscordInviteDelete extends Camelize<DiscordInviteDelete> {}
export interface CamelizedDiscordVoiceRegion extends Camelize<DiscordVoiceRegion> {}
export interface CamelizedDiscordGuildWidgetSettings extends Camelize<DiscordGuildWidgetSettings> {}
export interface CamelizedDiscordInstallParams extends Camelize<DiscordInstallParams> {}
export interface CamelizedDiscordForumTag extends Camelize<DiscordForumTag> {}
export interface CamelizedDiscordDefaultReactionEmoji extends Camelize<DiscordDefaultReactionEmoji> {}
export interface CamelizedDiscordModifyChannel extends Camelize<DiscordModifyChannel> {}
export interface CamelizedDiscordCreateGuildEmoji extends Camelize<DiscordCreateGuildEmoji> {}
export interface CamelizedDiscordModifyGuildEmoji extends Camelize<DiscordModifyGuildEmoji> {}
export interface CamelizedDiscordCreateGuildChannel extends Camelize<DiscordCreateGuildChannel> {}
export interface CamelizedDiscordCreateMessage extends Camelize<DiscordCreateMessage> {}
export interface CamelizedDiscordModifyGuildWelcomeScreen extends Camelize<DiscordModifyGuildWelcomeScreen> {}
export interface CamelizedDiscordFollowAnnouncementChannel extends Camelize<DiscordFollowAnnouncementChannel> {}
export interface CamelizedDiscordEditChannelPermissionOverridesOptions extends Camelize<DiscordEditChannelPermissionOverridesOptions> {}
export interface CamelizedDiscordModifyGuildChannelPositions extends Camelize<DiscordModifyGuildChannelPositions> {}
export interface CamelizedDiscordCreateWebhook extends Camelize<DiscordCreateWebhook> {}
export interface CamelizedDiscordCreateForumPostWithMessage extends Camelize<DiscordCreateForumPostWithMessage> {}
export type CamelizedDiscordArchivedThreads = Camelize<DiscordArchivedThreads>
export interface CamelizedDiscordActiveThreads extends Camelize<DiscordActiveThreads> {}
export interface CamelizedDiscordVanityUrl extends Camelize<DiscordVanityUrl> {}
export interface CamelizedDiscordPrunedCount extends Camelize<DiscordPrunedCount> {}
export interface CamelizedDiscordGuildOnboarding extends Camelize<DiscordGuildOnboarding> {}
export interface CamelizedDiscordGuildOnboardingPrompt extends Camelize<DiscordGuildOnboardingPrompt> {}
export interface CamelizedDiscordGuildOnboardingOption extends Camelize<DiscordGuildOnboardingPromptOption> {}
export interface CamelizedDiscordEntitlement extends Camelize<DiscordEntitlement> {}
export interface CamelizedDiscordSku extends Camelize<DiscordSku> {}
export interface CamelizedDiscordBulkBan extends Camelize<DiscordBulkBan> {}
export interface CamelizedDiscordSoundboardSound extends Camelize<DiscordSoundboardSound> {}
