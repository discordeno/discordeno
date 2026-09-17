import type { RestEndpoints } from '@discordeno/rest';
import type {
  AddDmRecipientOptions,
  AddGuildMemberOptions,
  AddLobbyMember,
  AtLeastOne,
  BeginGuildPrune,
  BigString,
  BulkUpdateLobbyMember,
  Camelize,
  CreateApplicationCommand,
  CreateApplicationEmoji,
  CreateAutoModerationRuleOptions,
  CreateChannelInvite,
  CreateForumPostWithMessage,
  CreateGlobalApplicationCommandOptions,
  CreateGroupDmOptions,
  CreateGuildApplicationCommandOptions,
  CreateGuildBan,
  CreateGuildBulkBan,
  CreateGuildChannel,
  CreateGuildEmoji,
  CreateGuildRole,
  CreateGuildSoundboardSound,
  CreateGuildStickerOptions,
  CreateLobby,
  CreateMessageOptions,
  CreateOrJoinLobby,
  CreateScheduledEvent,
  CreateStageInstance,
  CreateTemplate,
  CreateTestEntitlement,
  CreateWebhook,
  DeleteWebhookMessageOptions,
  DiscordAccessTokenResponse,
  DiscordActivityInstance,
  DiscordApplicationCommandPermissions,
  DiscordApplicationRoleConnection,
  DiscordApplicationRoleConnectionMetadata,
  DiscordAuditLog,
  DiscordBan,
  DiscordConnection,
  DiscordCurrentAuthorization,
  DiscordFollowedChannel,
  DiscordGetAnswerVotesResponse,
  DiscordGuildPreview,
  DiscordGuildWidgetSettings,
  DiscordInvite,
  DiscordListArchivedThreads,
  DiscordPrunedCount,
  DiscordSearchGuildMessages,
  DiscordSearchGuildMessagesIndexing,
  DiscordTargetUsersJobStatus,
  DiscordTokenExchange,
  DiscordTokenRevocation,
  DiscordVanityUrl,
  EditApplication,
  EditAutoModerationRuleOptions,
  EditChannelPermissionOverridesOptions,
  EditGuildOnboarding,
  EditGuildRole,
  EditGuildStickerOptions,
  EditMessage,
  EditOwnVoiceState,
  EditScheduledEvent,
  EditUserVoiceState,
  EditWebhookMessageOptions,
  ExecuteWebhook,
  GetApplicationCommandPermissionOptions,
  GetBans,
  GetChannelPinsOptions,
  GetEntitlements,
  GetGlobalApplicationCommandsOptions,
  GetGuildApplicationCommandsOptions,
  GetGuildAuditLog,
  GetGuildPruneCountQuery,
  GetInvite,
  GetLobbyMessages,
  GetMessagesOptions,
  GetPollAnswerVotes,
  GetReactions,
  GetScheduledEvents,
  GetScheduledEventUsers,
  GetThreadMember,
  GetUserGuilds,
  GetWebhookMessageOptions,
  InteractionCallbackData,
  InteractionCallbackOptions,
  InteractionResponse,
  LinkChannelToLobby,
  ListArchivedThreads,
  ListGuildMembers,
  ListSkuSubscriptionsOptions,
  ListThreadMembers,
  ModifyApplicationEmoji,
  ModifyChannel,
  ModifyCurrentMember,
  ModifyGuild,
  ModifyGuildChannelPositions,
  ModifyGuildEmoji,
  ModifyGuildIncidentActions,
  ModifyGuildMember,
  ModifyGuildSoundboardSound,
  ModifyGuildTemplate,
  ModifyGuildWelcomeScreen,
  ModifyLobby,
  ModifyRolePositions,
  ModifyWebhook,
  SearchGuildMessagesOptions,
  SearchMembers,
  SendLobbyMessage,
  SendSoundboardSound,
  StartThreadWithMessage,
  StartThreadWithoutMessage,
  UpsertGlobalApplicationCommandOptions,
  UpsertGuildApplicationCommandOptions,
} from '@discordeno/types';
import { camelize } from '@discordeno/utils';
import type { Bot } from './bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from './desiredProperties.js';
import type { ThreadMemberTransformerExtra } from './transformers/threadMember.js';
import type {
  Application,
  ApplicationCommand,
  AutoModerationRule,
  Channel,
  Emoji,
  Entitlement,
  GetGatewayBot,
  Guild,
  GuildApplicationCommandPermissions,
  GuildOnboarding,
  GuildWidget,
  GuildWidgetSettings,
  IncidentsData,
  Integration,
  InteractionCallbackResponse,
  Invite,
  Lobby,
  LobbyInvite,
  LobbyMember,
  LobbyMessage,
  Member,
  Message,
  MessagePin,
  Role,
  ScheduledEvent,
  Sku,
  SoundboardSound,
  StageInstance,
  Sticker,
  StickerPack,
  Subscription,
  Template,
  ThreadMember,
  User,
  VoiceRegion,
  VoiceState,
  Webhook,
  WelcomeScreen,
} from './transformers/types.js';

export function createBotHelpers<TProps extends TransformersDesiredProperties, TBehavior extends DesiredPropertiesBehavior>(
  bot: Bot<TProps, TBehavior>,
): BotHelpers<TProps, TBehavior> {
  return {
    createAutomodRule: async (guildId, options, reason) => {
      return bot.transformers.automodRule(bot, await bot.rest.snake.createAutomodRule(guildId, options, reason));
    },
    createChannel: async (guildId, options, reason) => {
      return bot.transformers.channel(bot, await bot.rest.snake.createChannel(guildId, options, reason), { guildId });
    },
    createEmoji: async (guildId, options, reason) => {
      return bot.transformers.emoji(bot, await bot.rest.snake.createEmoji(guildId, options, reason));
    },
    createApplicationEmoji: async (options) => {
      return bot.transformers.emoji(bot, await bot.rest.snake.createApplicationEmoji(options));
    },
    createForumThread: async (channelId, options, reason) => {
      return bot.transformers.channel(bot, await bot.rest.snake.createForumThread(channelId, options, reason));
    },
    createGlobalApplicationCommand: async (command, options) => {
      return bot.transformers.applicationCommand(bot, await bot.rest.snake.createGlobalApplicationCommand(command, options));
    },
    createGuildApplicationCommand: async (command, guildId, options) => {
      return bot.transformers.applicationCommand(bot, await bot.rest.snake.createGuildApplicationCommand(command, guildId, options));
    },
    createGuildSticker: async (guildId, options, reason) => {
      return bot.transformers.sticker(bot, await bot.rest.snake.createGuildSticker(guildId, options, reason));
    },
    createGuildTemplate: async (guildId, options) => {
      return bot.transformers.template(bot, await bot.rest.snake.createGuildTemplate(guildId, options));
    },
    createInvite: async (channelId, options, reason) => {
      return await bot.rest.createInvite(channelId, options, reason);
    },
    getGuildRoleMemberCounts: async (guildId) => {
      return await bot.rest.snake.getGuildRoleMemberCounts(guildId);
    },
    createRole: async (guildId, options, reason) => {
      return bot.transformers.role(bot, await bot.rest.snake.createRole(guildId, options, reason), { guildId });
    },
    createScheduledEvent: async (guildId, options, reason) => {
      return bot.transformers.scheduledEvent(bot, await bot.rest.snake.createScheduledEvent(guildId, options, reason));
    },
    createStageInstance: async (options, reason) => {
      return bot.transformers.stageInstance(bot, await bot.rest.snake.createStageInstance(options, reason));
    },
    createWebhook: async (channelId, options, reason) => {
      return bot.transformers.webhook(bot, await bot.rest.snake.createWebhook(channelId, options, reason));
    },
    editApplicationCommandPermissions: async (guildId, commandId, bearerToken, options) => {
      return bot.transformers.applicationCommandPermission(
        bot,
        await bot.rest.snake.editApplicationCommandPermissions(guildId, commandId, bearerToken, options),
      );
    },
    editAutomodRule: async (guildId, ruleId, options, reason) => {
      return bot.transformers.automodRule(bot, await bot.rest.snake.editAutomodRule(guildId, ruleId, options, reason));
    },
    editBotProfile: async (options) => {
      return bot.transformers.user(bot, await bot.rest.snake.editBotProfile(options));
    },
    editChannel: async (channelId, options, reason) => {
      return bot.transformers.channel(bot, await bot.rest.snake.editChannel(channelId, options, reason));
    },
    editEmoji: async (guildId, id, options, reason) => {
      return bot.transformers.emoji(bot, await bot.rest.snake.editEmoji(guildId, id, options, reason));
    },
    editApplicationEmoji: async (id, options) => {
      return bot.transformers.emoji(bot, await bot.rest.snake.editApplicationEmoji(id, options));
    },
    editFollowupMessage: async (token, messageId, options) => {
      return bot.transformers.message(bot, await bot.rest.snake.editFollowupMessage(token, messageId, options));
    },
    editGlobalApplicationCommand: async (commandId, options) => {
      return bot.transformers.applicationCommand(bot, await bot.rest.snake.editGlobalApplicationCommand(commandId, options));
    },
    editGuild: async (guildId, options, reason) => {
      return bot.transformers.guild(bot, await bot.rest.snake.editGuild(guildId, options, reason));
    },
    editGuildApplicationCommand: async (commandId, guildId, options) => {
      return bot.transformers.applicationCommand(bot, await bot.rest.snake.editGuildApplicationCommand(commandId, guildId, options));
    },
    editGuildSticker: async (guildId, stickerId, options, reason) => {
      return bot.transformers.sticker(bot, await bot.rest.snake.editGuildSticker(guildId, stickerId, options, reason));
    },
    editGuildTemplate: async (guildId, templateCode, options) => {
      return bot.transformers.template(bot, await bot.rest.snake.editGuildTemplate(guildId, templateCode, options));
    },
    editMessage: async (channelId, messageId, options) => {
      return bot.transformers.message(bot, await bot.rest.snake.editMessage(channelId, messageId, options));
    },
    editOriginalInteractionResponse: async (token, options) => {
      return bot.transformers.message(bot, await bot.rest.snake.editOriginalInteractionResponse(token, options));
    },
    editRole: async (guildId, roleId, options, reason) => {
      return bot.transformers.role(bot, await bot.rest.snake.editRole(guildId, roleId, options, reason), { guildId });
    },
    editRolePositions: async (guildId, options, reason) => {
      return (await bot.rest.snake.editRolePositions(guildId, options, reason)).map((role) => bot.transformers.role(bot, role, { guildId }));
    },
    editScheduledEvent: async (guildId, eventId, options, reason) => {
      return bot.transformers.scheduledEvent(bot, await bot.rest.snake.editScheduledEvent(guildId, eventId, options, reason));
    },
    editStageInstance: async (channelId, topic, reason) => {
      return bot.transformers.stageInstance(bot, await bot.rest.snake.editStageInstance(channelId, topic, reason));
    },
    editWebhook: async (webhookId, options, reason) => {
      return bot.transformers.webhook(bot, await bot.rest.snake.editWebhook(webhookId, options, reason));
    },
    editWebhookMessage: async (webhookId, token, messageId, options) => {
      return bot.transformers.message(bot, await bot.rest.snake.editWebhookMessage(webhookId, token, messageId, options));
    },
    editWebhookWithToken: async (webhookId, token, options) => {
      return bot.transformers.webhook(bot, await bot.rest.snake.editWebhookWithToken(webhookId, token, options));
    },
    editWelcomeScreen: async (guildId, options, reason) => {
      return bot.transformers.welcomeScreen(bot, await bot.rest.snake.editWelcomeScreen(guildId, options, reason));
    },
    editWidgetSettings: async (guildId, options, reason) => {
      return bot.transformers.widgetSettings(bot, await bot.rest.snake.editWidgetSettings(guildId, options, reason));
    },
    executeWebhook: async (webhookId, token, options) => {
      const result = await bot.rest.snake.executeWebhook(webhookId, token, options);
      if (!result) return;

      return bot.transformers.message(bot, result);
    },
    followAnnouncement: async (sourceChannelId, targetChannelId) => {
      return await bot.rest.followAnnouncement(sourceChannelId, targetChannelId);
    },
    getActiveThreads: async (guildId) => {
      const result = await bot.rest.snake.getActiveThreads(guildId);
      return {
        threads: result.threads.map((thread) => bot.transformers.channel(bot, thread, { guildId })),
        members: result.members.map((member) => bot.transformers.threadMember(bot, member, { guildId })),
      };
    },
    getApplicationInfo: async () => {
      return bot.transformers.application(bot, await bot.rest.snake.getApplicationInfo());
    },
    editApplicationInfo: async (body) => {
      return bot.transformers.application(bot, await bot.rest.snake.editApplicationInfo(body));
    },
    getCurrentAuthenticationInfo: async (bearerToken) => {
      return await bot.rest.getCurrentAuthenticationInfo(bearerToken);
    },
    exchangeToken: async (clientId, clientSecret, options) => {
      return await bot.rest.exchangeToken(clientId, clientSecret, options);
    },
    revokeToken: async (clientId, clientSecret, options) => {
      return await bot.rest.snake.revokeToken(clientId, clientSecret, options);
    },
    getApplicationCommandPermission: async (guildId, commandId, options) => {
      const res = await bot.rest.snake.getApplicationCommandPermission(guildId, commandId, options);
      const snakedRes = res;

      return bot.transformers.applicationCommandPermission(bot, snakedRes);
    },
    getApplicationCommandPermissions: async (guildId, options) => {
      return (await bot.rest.snake.getApplicationCommandPermissions(guildId, options)).map((res) =>
        bot.transformers.applicationCommandPermission(bot, res),
      );
    },
    getAuditLog: async (guildId, options) => {
      return await bot.rest.getAuditLog(guildId, options);
    },
    getAutomodRule: async (guildId, ruleId) => {
      return bot.transformers.automodRule(bot, await bot.rest.snake.getAutomodRule(guildId, ruleId));
    },
    getAutomodRules: async (guildId) => {
      return (await bot.rest.snake.getAutomodRules(guildId)).map((res) => bot.transformers.automodRule(bot, res));
    },
    getAvailableVoiceRegions: async () => {
      return (await bot.rest.snake.getAvailableVoiceRegions()).map((res) => bot.transformers.voiceRegion(bot, res));
    },
    getBan: async (guildId, userId) => {
      return await bot.rest.getBan(guildId, userId);
    },
    getBans: async (guildId, options) => {
      return await bot.rest.getBans(guildId, options);
    },
    getChannel: async (channelId) => {
      return bot.transformers.channel(bot, await bot.rest.snake.getChannel(channelId));
    },
    getChannelInvites: async (channelId) => {
      return (await bot.rest.snake.getChannelInvites(channelId)).map((res) => bot.transformers.invite(bot, res));
    },
    getChannels: async (guildId) => {
      return (await bot.rest.snake.getChannels(guildId)).map((res) => bot.transformers.channel(bot, res, { guildId }));
    },
    getChannelWebhooks: async (channelId) => {
      return (await bot.rest.snake.getChannelWebhooks(channelId)).map((res) => bot.transformers.webhook(bot, res));
    },
    getDmChannel: async (userId) => {
      return bot.transformers.channel(bot, await bot.rest.snake.getDmChannel(userId));
    },
    getGroupDmChannel: async (options) => {
      return bot.transformers.channel(bot, await bot.rest.snake.getGroupDmChannel(options));
    },
    getEmoji: async (guildId, emojiId) => {
      return bot.transformers.emoji(bot, await bot.rest.snake.getEmoji(guildId, emojiId));
    },
    getApplicationEmoji: async (emojiId) => {
      return bot.transformers.emoji(bot, await bot.rest.snake.getApplicationEmoji(emojiId));
    },
    getEmojis: async (guildId) => {
      return (await bot.rest.snake.getEmojis(guildId)).map((res) => bot.transformers.emoji(bot, res));
    },
    getApplicationEmojis: async () => {
      const res = await bot.rest.snake.getApplicationEmojis();

      return {
        items: res.items.map((item) => bot.transformers.emoji(bot, item)),
      };
    },
    getFollowupMessage: async (token, messageId) => {
      return bot.transformers.message(bot, await bot.rest.snake.getFollowupMessage(token, messageId));
    },
    getGatewayBot: async () => {
      return bot.transformers.gatewayBot(bot, await bot.rest.snake.getGatewayBot());
    },
    getGlobalApplicationCommand: async (commandId) => {
      return bot.transformers.applicationCommand(bot, await bot.rest.snake.getGlobalApplicationCommand(commandId));
    },
    getGlobalApplicationCommands: async (options) => {
      return (await bot.rest.snake.getGlobalApplicationCommands(options)).map((res) => bot.transformers.applicationCommand(bot, res));
    },
    getGuild: async (guildId, options) => {
      return bot.transformers.guild(bot, await bot.rest.snake.getGuild(guildId, options));
    },
    getGuilds: async (bearerToken, options) => {
      return (await bot.rest.snake.getGuilds(bearerToken, options)).map((res) => bot.transformers.guild(bot, res, { partial: true }));
    },
    getGuildApplicationCommand: async (commandId, guildId) => {
      return bot.transformers.applicationCommand(bot, await bot.rest.snake.getGuildApplicationCommand(commandId, guildId));
    },
    getGuildApplicationCommands: async (guildId, options) => {
      return (await bot.rest.snake.getGuildApplicationCommands(guildId, options)).map((res) => bot.transformers.applicationCommand(bot, res));
    },
    getGuildPreview: async (guildId) => {
      return await bot.rest.getGuildPreview(guildId);
    },
    getGuildSticker: async (guildId, stickerId) => {
      return bot.transformers.sticker(bot, await bot.rest.snake.getGuildSticker(guildId, stickerId));
    },
    getGuildStickers: async (guildId) => {
      return (await bot.rest.snake.getGuildStickers(guildId)).map((res) => bot.transformers.sticker(bot, res));
    },
    getGuildTemplate: async (templateCode) => {
      return bot.transformers.template(bot, await bot.rest.snake.getGuildTemplate(templateCode));
    },
    getGuildTemplates: async (guildId) => {
      return (await bot.rest.snake.getGuildTemplates(guildId)).map((res) => bot.transformers.template(bot, res));
    },
    getGuildWebhooks: async (guildId) => {
      return (await bot.rest.snake.getGuildWebhooks(guildId)).map((res) => bot.transformers.webhook(bot, res));
    },
    getIntegrations: async (guildId) => {
      return (await bot.rest.snake.getIntegrations(guildId)).map((res) =>
        bot.transformers.integration(bot, { ...res, guild_id: guildId.toString() }),
      );
    },
    getInvite: async (inviteCode, options) => {
      return bot.transformers.invite(bot, await bot.rest.snake.getInvite(inviteCode, options));
    },
    getInvites: async (guildId) => {
      return (await bot.rest.snake.getInvites(guildId)).map((res) => bot.transformers.invite(bot, res));
    },
    getMessage: async (channelId, messageId) => {
      return bot.transformers.message(bot, await bot.rest.snake.getMessage(channelId, messageId));
    },
    getMessages: async (channelId, options) => {
      return (await bot.rest.snake.getMessages(channelId, options)).map((res) => bot.transformers.message(bot, res));
    },
    getStickerPack: async (stickerPackId) => {
      return bot.transformers.stickerPack(bot, await bot.rest.snake.getStickerPack(stickerPackId));
    },
    getStickerPacks: async () => {
      return (await bot.rest.snake.getStickerPacks()).map((res) => bot.transformers.stickerPack(bot, res));
    },
    getOriginalInteractionResponse: async (token) => {
      return bot.transformers.message(bot, await bot.rest.snake.getOriginalInteractionResponse(token));
    },
    getChannelPins: async (channelId, options) => {
      const res = await bot.rest.snake.getChannelPins(channelId, options);

      return {
        hasMore: res.has_more,
        items: res.items.map((item) => bot.transformers.messagePin(bot, item)),
      };
    },
    getPinnedMessages: async (channelId) => {
      return (await bot.rest.snake.getPinnedMessages(channelId)).map((res) => bot.transformers.message(bot, res));
    },
    getPrivateArchivedThreads: async (channelId, options) => {
      return await bot.rest.getPrivateArchivedThreads(channelId, options);
    },
    getPrivateJoinedArchivedThreads: async (channelId, options) => {
      return await bot.rest.getPrivateJoinedArchivedThreads(channelId, options);
    },
    getPruneCount: async (guildId, options) => {
      return await bot.rest.snake.getPruneCount(guildId, options);
    },
    getPublicArchivedThreads: async (channelId, options) => {
      return await bot.rest.getPublicArchivedThreads(channelId, options);
    },
    getRoles: async (guildId) => {
      return (await bot.rest.snake.getRoles(guildId)).map((role) => bot.transformers.role(bot, role, { guildId }));
    },
    getRole: async (guildId, roleId) => {
      return bot.transformers.role(bot, await bot.rest.snake.getRole(guildId, roleId), { guildId });
    },
    getScheduledEvent: async (guildId, eventId, options) => {
      return bot.transformers.scheduledEvent(bot, await bot.rest.snake.getScheduledEvent(guildId, eventId, options));
    },
    getScheduledEvents: async (guildId, options) => {
      return (await bot.rest.snake.getScheduledEvents(guildId, options)).map((res) => bot.transformers.scheduledEvent(bot, res));
    },
    getScheduledEventUsers: async (guildId, eventId, options) => {
      return (await bot.rest.snake.getScheduledEventUsers(guildId, eventId, options)).map((u) => {
        return {
          user: bot.transformers.user(bot, u.user),
          member: u.member && bot.transformers.member(bot, u.member, { guildId, userId: bot.transformers.snowflake(u.user.id) }),
        };
      });
    },
    getSessionInfo: async () => {
      return bot.transformers.gatewayBot(bot, await bot.rest.snake.getSessionInfo());
    },
    getStageInstance: async (channelId) => {
      return bot.transformers.stageInstance(bot, await bot.rest.snake.getStageInstance(channelId));
    },
    getOwnVoiceState: async (guildId) => {
      return bot.transformers.voiceState(bot, await bot.rest.snake.getOwnVoiceState(guildId), { guildId });
    },
    getUserVoiceState: async (guildId, userId) => {
      return bot.transformers.voiceState(bot, await bot.rest.snake.getUserVoiceState(guildId, userId), { guildId });
    },
    getSticker: async (stickerId) => {
      return bot.transformers.sticker(bot, await bot.rest.snake.getSticker(stickerId));
    },
    getThreadMember: async (channelId, userId, options, extra) => {
      return bot.transformers.threadMember(bot, await bot.rest.snake.getThreadMember(channelId, userId, options), extra);
    },
    getThreadMembers: async (channelId, options, extra) => {
      return (await bot.rest.snake.getThreadMembers(channelId, options)).map((res) => bot.transformers.threadMember(bot, res, extra));
    },
    getReactions: async (channelId, messageId, reaction, options) => {
      return (await bot.rest.snake.getReactions(channelId, messageId, reaction, options)).map((res) => bot.transformers.user(bot, res));
    },
    getUser: async (id) => {
      return bot.transformers.user(bot, await bot.rest.snake.getUser(id));
    },
    getCurrentUser: async (bearerToken) => {
      return bot.transformers.user(bot, await bot.rest.snake.getCurrentUser(bearerToken));
    },
    getUserConnections: async (bearerToken) => {
      return await bot.rest.getUserConnections(bearerToken);
    },
    getUserApplicationRoleConnection: async (bearerToken, applicationId) => {
      return await bot.rest.getUserApplicationRoleConnection(bearerToken, applicationId);
    },
    getVanityUrl: async (guildId) => {
      return await bot.rest.getVanityUrl(guildId);
    },
    getVoiceRegions: async (guildId) => {
      return (await bot.rest.snake.getVoiceRegions(guildId)).map((res) => bot.transformers.voiceRegion(bot, res));
    },
    getWebhook: async (webhookId) => {
      return bot.transformers.webhook(bot, await bot.rest.snake.getWebhook(webhookId));
    },
    getWebhookMessage: async (webhookId, token, messageId, options) => {
      return bot.transformers.message(bot, await bot.rest.snake.getWebhookMessage(webhookId, token, messageId, options));
    },
    getWebhookWithToken: async (webhookId, token) => {
      return bot.transformers.webhook(bot, await bot.rest.snake.getWebhookWithToken(webhookId, token));
    },
    getWelcomeScreen: async (guildId) => {
      return bot.transformers.welcomeScreen(bot, await bot.rest.snake.getWelcomeScreen(guildId));
    },
    getWidget: async (guildId) => {
      return bot.transformers.widget(bot, await bot.rest.snake.getWidget(guildId));
    },
    getWidgetSettings: async (guildId) => {
      return bot.transformers.widgetSettings(bot, await bot.rest.snake.getWidgetSettings(guildId));
    },
    publishMessage: async (channelId, messageId) => {
      return bot.transformers.message(bot, await bot.rest.snake.publishMessage(channelId, messageId));
    },
    searchGuildMessages: async (guildId, options) => {
      const result = await bot.rest.snake.searchGuildMessages(guildId, options);
      if ('code' in result) return camelize(result);
      return {
        // We would waste time and memory camelizing the entire result object, so we only camelize the parts we need to. The rest of the data is converted below
        ...camelize({ ...result, messages: undefined, threads: undefined, members: undefined }),
        messages: result.messages.map((messages) => messages.map((message) => bot.transformers.message(bot, message))),
        threads: result.threads?.map((thread) => bot.transformers.channel(bot, thread, { guildId })),
        members: result.members?.map((member) => bot.transformers.threadMember(bot, member, { guildId })),
      };
    },
    sendMessage: async (channelId, options) => {
      return bot.transformers.message(bot, await bot.rest.snake.sendMessage(channelId, options));
    },
    sendFollowupMessage: async (token, options) => {
      return bot.transformers.message(bot, await bot.rest.snake.sendFollowupMessage(token, options));
    },
    startThreadWithMessage: async (channelId, messageId, options, reason) => {
      return bot.transformers.channel(bot, await bot.rest.snake.startThreadWithMessage(channelId, messageId, options, reason));
    },
    startThreadWithoutMessage: async (channelId, options, reason) => {
      return bot.transformers.channel(bot, await bot.rest.snake.startThreadWithoutMessage(channelId, options, reason));
    },
    getPollAnswerVoters: async (channelId, messageId, answerId, options) => {
      return await bot.rest.getPollAnswerVoters(channelId, messageId, answerId, options);
    },
    endPoll: async (channelId, messageId) => {
      return bot.transformers.message(bot, await bot.rest.snake.endPoll(channelId, messageId));
    },
    syncGuildTemplate: async (guildId) => {
      return bot.transformers.template(bot, await bot.rest.snake.syncGuildTemplate(guildId));
    },
    upsertGlobalApplicationCommands: async (commands, options) => {
      return (await bot.rest.snake.upsertGlobalApplicationCommands(commands, options)).map((res) => bot.transformers.applicationCommand(bot, res));
    },
    upsertGuildApplicationCommands: async (guildId, commands, options) => {
      return (await bot.rest.snake.upsertGuildApplicationCommands(guildId, commands, options)).map((res) =>
        bot.transformers.applicationCommand(bot, res),
      );
    },
    editCurrentMember: async (guildId, options, reason) => {
      return bot.transformers.member(bot, await bot.rest.snake.editCurrentMember(guildId, options, reason), { guildId, userId: bot.id });
    },
    editMember: async (guildId, userId, options, reason) => {
      return bot.transformers.member(bot, await bot.rest.snake.editMember(guildId, userId, options, reason), { guildId, userId });
    },
    getCurrentMember: async (guildId, bearerToken) => {
      const res = await bot.rest.snake.getCurrentMember(guildId, bearerToken);
      return bot.transformers.member(bot, res, { guildId, userId: bot.transformers.snowflake(res.user.id) });
    },
    getMember: async (guildId, userId) => {
      return bot.transformers.member(bot, await bot.rest.snake.getMember(guildId, userId), { guildId, userId });
    },
    getMembers: async (guildId, options) => {
      return (await bot.rest.snake.getMembers(guildId, options)).map((res) =>
        bot.transformers.member(bot, res, { guildId, userId: bot.transformers.snowflake(res.user.id) }),
      );
    },
    pruneMembers: async (guildId, options, reason) => {
      return await bot.rest.snake.pruneMembers(guildId, options, reason);
    },
    searchMembers: async (guildId, query, options) => {
      return (await bot.rest.snake.searchMembers(guildId, query, options)).map((res) =>
        bot.transformers.member(bot, res, { guildId, userId: bot.transformers.snowflake(res.user.id) }),
      );
    },
    bulkBanMembers: async (guildId, options, reason) => {
      const res = await bot.rest.bulkBanMembers(guildId, options, reason);

      return {
        bannedUsers: res.bannedUsers.map((x) => bot.transformers.snowflake(x)),
        failedUsers: res.failedUsers.map((x) => bot.transformers.snowflake(x)),
      };
    },
    getApplicationActivityInstance: async (applicationId, instanceId) => {
      return await bot.rest.getApplicationActivityInstance(applicationId, instanceId);
    },
    listApplicationRoleConnectionsMetadataRecords: async (applicationId) => {
      return await bot.rest.listApplicationRoleConnectionsMetadataRecords(applicationId);
    },
    updateApplicationRoleConnectionsMetadataRecords: async (applicationId, options) => {
      return await bot.rest.updateApplicationRoleConnectionsMetadataRecords(applicationId, options);
    },
    createLobby: async (options) => {
      return bot.transformers.lobby(bot, await bot.rest.snake.createLobby(options));
    },
    createOrJoinLobby: async (options) => {
      return bot.transformers.lobby(bot, await bot.rest.snake.createOrJoinLobby(options));
    },
    getLobby: async (lobbyId) => {
      return bot.transformers.lobby(bot, await bot.rest.snake.getLobby(lobbyId));
    },
    modifyLobby: async (lobbyId, options) => {
      return bot.transformers.lobby(bot, await bot.rest.snake.modifyLobby(lobbyId, options));
    },
    addMemberToLobby: async (lobbyId, userId, options) => {
      return bot.transformers.lobbyMember(bot, await bot.rest.snake.addMemberToLobby(lobbyId, userId, options));
    },
    bulkUpdateLobbyMembers: async (lobbyId, options) => {
      return (await bot.rest.snake.bulkUpdateLobbyMembers(lobbyId, options)).map((res) => bot.transformers.lobbyMember(bot, res));
    },
    linkChannelToLobby: async (lobbyId, bearerToken, options) => {
      return bot.transformers.lobby(bot, await bot.rest.snake.linkChannelToLobby(lobbyId, bearerToken, options));
    },
    unlinkChannelToLobby: async (lobbyId, bearerToken) => {
      return bot.transformers.lobby(bot, await bot.rest.snake.unlinkChannelToLobby(lobbyId, bearerToken));
    },
    updateLobbyMessageModerationMetadata: async (lobbyId, messageId, options) => {
      return await bot.rest.snake.updateLobbyMessageModerationMetadata(lobbyId, messageId, options);
    },
    sendLobbyMessage: async (bearerToken, lobbyId, options) => {
      return bot.transformers.lobbyMessage(bot, await bot.rest.snake.sendLobbyMessage(bearerToken, lobbyId, options));
    },
    getLobbyMessages: async (bearerToken, lobbyId, options) => {
      return (await bot.rest.snake.getLobbyMessages(bearerToken, lobbyId, options)).map((res) => bot.transformers.lobbyMessage(bot, res));
    },
    createLobbyChannelInviteForSelf: async (bearerToken, lobbyId) => {
      return bot.transformers.lobbyInvite(bot, await bot.rest.snake.createLobbyChannelInviteForSelf(bearerToken, lobbyId));
    },
    createLobbyChannelInviteForUser: async (lobbyId, userId) => {
      return bot.transformers.lobbyInvite(bot, await bot.rest.snake.createLobbyChannelInviteForUser(lobbyId, userId));
    },
    getTargetUsers: async (inviteCode) => {
      return await bot.rest.snake.getTargetUsers(inviteCode);
    },
    updateTargetUsers: async (inviteCode, targetUsersFile) => {
      await bot.rest.snake.updateTargetUsers(inviteCode, targetUsersFile);
    },
    getTargetUsersJobStatus: async (inviteCode) => {
      return await bot.rest.getTargetUsersJobStatus(inviteCode);
    },
    addReaction: async (channelId, messageId, reaction) => {
      return await bot.rest.snake.addReaction(channelId, messageId, reaction);
    },
    addReactions: async (channelId, messageId, reactions, ordered) => {
      return await bot.rest.snake.addReactions(channelId, messageId, reactions, ordered);
    },
    addRole: async (guildId, userId, roleId, reason) => {
      return await bot.rest.snake.addRole(guildId, userId, roleId, reason);
    },
    addThreadMember: async (channelId, userId) => {
      return await bot.rest.snake.addThreadMember(channelId, userId);
    },
    addDmRecipient: async (channelId, userId, options) => {
      return await bot.rest.snake.addDmRecipient(channelId, userId, options);
    },
    addGuildMember: async (guildId, userId, options) => {
      return await bot.rest.snake.addGuildMember(guildId, userId, options);
    },
    deleteAutomodRule: async (guildId, ruleId, reason) => {
      return await bot.rest.snake.deleteAutomodRule(guildId, ruleId, reason);
    },
    deleteChannel: async (channelId, reason) => {
      return await bot.rest.snake.deleteChannel(channelId, reason);
    },
    deleteChannelPermissionOverride: async (channelId, overwriteId, reason) => {
      return await bot.rest.snake.deleteChannelPermissionOverride(channelId, overwriteId, reason);
    },
    deleteEmoji: async (guildId, id, reason) => {
      return await bot.rest.snake.deleteEmoji(guildId, id, reason);
    },
    deleteApplicationEmoji: async (id) => {
      return await bot.rest.snake.deleteApplicationEmoji(id);
    },
    deleteFollowupMessage: async (token, messageId) => {
      return await bot.rest.snake.deleteFollowupMessage(token, messageId);
    },
    deleteGlobalApplicationCommand: async (commandId) => {
      return await bot.rest.snake.deleteGlobalApplicationCommand(commandId);
    },
    deleteGuildApplicationCommand: async (commandId, guildId) => {
      return await bot.rest.snake.deleteGuildApplicationCommand(commandId, guildId);
    },
    deleteGuildSticker: async (guildId, stickerId, reason) => {
      return await bot.rest.snake.deleteGuildSticker(guildId, stickerId, reason);
    },
    deleteGuildTemplate: async (guildId, templateCode) => {
      return await bot.rest.snake.deleteGuildTemplate(guildId, templateCode);
    },
    deleteIntegration: async (guildId, integrationId, reason) => {
      return await bot.rest.snake.deleteIntegration(guildId, integrationId, reason);
    },
    deleteInvite: async (inviteCode, reason) => {
      return await bot.rest.snake.deleteInvite(inviteCode, reason);
    },
    deleteMessage: async (channelId, messageId, reason) => {
      return await bot.rest.snake.deleteMessage(channelId, messageId, reason);
    },
    deleteMessages: async (channelId, messageIds, reason) => {
      return await bot.rest.snake.deleteMessages(channelId, messageIds, reason);
    },
    deleteOriginalInteractionResponse: async (token) => {
      return await bot.rest.snake.deleteOriginalInteractionResponse(token);
    },
    deleteOwnReaction: async (channelId, messageId, reaction) => {
      return await bot.rest.snake.deleteOwnReaction(channelId, messageId, reaction);
    },
    deleteReactionsAll: async (channelId, messageId) => {
      return await bot.rest.snake.deleteReactionsAll(channelId, messageId);
    },
    deleteReactionsEmoji: async (channelId, messageId, reaction) => {
      return await bot.rest.snake.deleteReactionsEmoji(channelId, messageId, reaction);
    },
    deleteRole: async (guildId, roleId, reason) => {
      return await bot.rest.snake.deleteRole(guildId, roleId, reason);
    },
    deleteScheduledEvent: async (guildId, eventId) => {
      return await bot.rest.snake.deleteScheduledEvent(guildId, eventId);
    },
    deleteStageInstance: async (channelId, reason) => {
      return await bot.rest.snake.deleteStageInstance(channelId, reason);
    },
    deleteUserReaction: async (channelId, messageId, userId, reaction) => {
      return await bot.rest.snake.deleteUserReaction(channelId, messageId, userId, reaction);
    },
    deleteWebhook: async (webhookId, reason) => {
      return await bot.rest.snake.deleteWebhook(webhookId, reason);
    },
    deleteWebhookMessage: async (webhookId, token, messageId, options) => {
      return await bot.rest.snake.deleteWebhookMessage(webhookId, token, messageId, options);
    },
    deleteWebhookWithToken: async (webhookId, token) => {
      return await bot.rest.snake.deleteWebhookWithToken(webhookId, token);
    },
    editChannelPermissionOverrides: async (channelId, options, reason) => {
      return await bot.rest.snake.editChannelPermissionOverrides(channelId, options, reason);
    },
    editChannelPositions: async (guildId, channelPositions) => {
      return await bot.rest.snake.editChannelPositions(guildId, channelPositions);
    },
    editOwnVoiceState: async (guildId, options) => {
      return await bot.rest.snake.editOwnVoiceState(guildId, options);
    },
    editUserVoiceState: async (guildId, options) => {
      return await bot.rest.snake.editUserVoiceState(guildId, options);
    },
    editUserApplicationRoleConnection: async (bearerToken, applicationId, options) => {
      return await bot.rest.editUserApplicationRoleConnection(bearerToken, applicationId, options);
    },
    deleteCurrentUserApplicationRoleConnection: async (bearerToken, applicationId) => {
      return await bot.rest.snake.deleteCurrentUserApplicationRoleConnection(bearerToken, applicationId);
    },
    joinThread: async (channelId) => {
      return await bot.rest.snake.joinThread(channelId);
    },
    leaveGuild: async (guildId) => {
      return await bot.rest.snake.leaveGuild(guildId);
    },
    leaveThread: async (channelId) => {
      return await bot.rest.snake.leaveThread(channelId);
    },
    removeRole: async (guildId, userId, roleId, reason) => {
      return await bot.rest.snake.removeRole(guildId, userId, roleId, reason);
    },
    removeThreadMember: async (channelId, userId) => {
      return await bot.rest.snake.removeThreadMember(channelId, userId);
    },
    removeDmRecipient: async (channelId, userId) => {
      return await bot.rest.snake.removeDmRecipient(channelId, userId);
    },
    sendInteractionResponse: async (interactionId, token, options, params) => {
      const response = await bot.rest.snake.sendInteractionResponse(interactionId, token, options, params);

      if (!response) return;

      return bot.transformers.interactionCallbackResponse(bot, response);
    },
    triggerTypingIndicator: async (channelId) => {
      return await bot.rest.snake.triggerTypingIndicator(channelId);
    },
    banMember: async (guildId, userId, options, reason) => {
      return await bot.rest.snake.banMember(guildId, userId, options, reason);
    },

    kickMember: async (guildId, userId, reason) => {
      return await bot.rest.snake.kickMember(guildId, userId, reason);
    },
    pinMessage: async (channelId, messageId, reason) => {
      return await bot.rest.snake.pinMessage(channelId, messageId, reason);
    },
    unbanMember: async (guildId, userId, reason) => {
      return await bot.rest.snake.unbanMember(guildId, userId, reason);
    },
    unpinMessage: async (channelId, messageId, reason) => {
      return await bot.rest.snake.unpinMessage(channelId, messageId, reason);
    },
    getGuildOnboarding: async (guildId) => {
      return bot.transformers.guildOnboarding(bot, await bot.rest.snake.getGuildOnboarding(guildId));
    },
    editGuildOnboarding: async (guildId, options, reason) => {
      return bot.transformers.guildOnboarding(bot, await bot.rest.snake.editGuildOnboarding(guildId, options, reason));
    },
    modifyGuildIncidentActions: async (guildId, options) => {
      return bot.transformers.incidentsData(bot, await bot.rest.snake.modifyGuildIncidentActions(guildId, options));
    },
    listEntitlements: async (applicationId, options) => {
      return (await bot.rest.snake.listEntitlements(applicationId, options)).map((entitlement) => bot.transformers.entitlement(bot, entitlement));
    },
    getEntitlement: async (applicationId, entitlementId) => {
      return bot.transformers.entitlement(bot, await bot.rest.snake.getEntitlement(applicationId, entitlementId));
    },
    createTestEntitlement: async (applicationId, body) => {
      return bot.transformers.entitlement(bot, await bot.rest.snake.createTestEntitlement(applicationId, body), { partial: true });
    },
    deleteTestEntitlement: async (applicationId, entitlementId) => {
      await bot.rest.snake.deleteTestEntitlement(applicationId, entitlementId);
    },
    consumeEntitlement: async (applicationId, entitlementId) => {
      await bot.rest.snake.consumeEntitlement(applicationId, entitlementId);
    },
    listSkus: async (applicationId) => {
      return (await bot.rest.snake.listSkus(applicationId)).map((sku) => bot.transformers.sku(bot, sku));
    },
    getSubscription: async (skuId, subscriptionId) => {
      return bot.transformers.subscription(bot, await bot.rest.snake.getSubscription(skuId, subscriptionId));
    },
    listSubscriptions: async (skuId, options) => {
      return (await bot.rest.snake.listSubscriptions(skuId, options)).map((subscription) => bot.transformers.subscription(bot, subscription));
    },
    sendSoundboardSound: async (channelId, options) => {
      await bot.rest.snake.sendSoundboardSound(channelId, options);
    },
    listDefaultSoundboardSounds: async () => {
      return (await bot.rest.snake.listDefaultSoundboardSounds()).map((sound) => bot.transformers.soundboardSound(bot, sound));
    },
    listGuildSoundboardSounds: async (guildId) => {
      const res = await bot.rest.snake.listGuildSoundboardSounds(guildId);

      return {
        items: res.items.map((sound) => bot.transformers.soundboardSound(bot, sound)),
      };
    },
    getGuildSoundboardSound: async (guildId, soundId) => {
      return bot.transformers.soundboardSound(bot, await bot.rest.snake.getGuildSoundboardSound(guildId, soundId));
    },
    createGuildSoundboardSound: async (guildId, options, reason) => {
      return bot.transformers.soundboardSound(bot, await bot.rest.snake.createGuildSoundboardSound(guildId, options, reason));
    },
    modifyGuildSoundboardSound: async (guildId, soundId, options, reason) => {
      return bot.transformers.soundboardSound(bot, await bot.rest.snake.modifyGuildSoundboardSound(guildId, soundId, options, reason));
    },
    deleteGuildSoundboardSound: async (guildId, soundId, reason) => {
      await bot.rest.snake.deleteGuildSoundboardSound(guildId, soundId, reason);
    },
    deleteLobby: async (lobbyId) => {
      await bot.rest.snake.deleteLobby(lobbyId);
    },
    removeMemberFromLobby: async (lobbyId, userId) => {
      await bot.rest.snake.removeMemberFromLobby(lobbyId, userId);
    },
    leaveLobby: async (lobbyId, bearerToken) => {
      await bot.rest.snake.leaveLobby(lobbyId, bearerToken);
    },
    // The satisfies with the record is used to ensure that all Restendpoints have a matching helper. It can't be done in BotHelpers itself as types don't support that.
  } satisfies BotHelpers<TProps, TBehavior> satisfies Record<keyof RestEndpoints, unknown>;
}

export type BotHelpers<TProps extends TransformersDesiredProperties, TBehavior extends DesiredPropertiesBehavior> = {
  createAutomodRule: (
    guildId: BigString,
    options: CreateAutoModerationRuleOptions,
    reason?: string,
  ) => Promise<SetupDesiredProps<AutoModerationRule, TProps, TBehavior>>;
  createChannel: (guildId: BigString, options: CreateGuildChannel, reason?: string) => Promise<SetupDesiredProps<Channel, TProps, TBehavior>>;
  createEmoji: (guildId: BigString, options: CreateGuildEmoji, reason?: string) => Promise<SetupDesiredProps<Emoji, TProps, TBehavior>>;
  createApplicationEmoji: (options: CreateApplicationEmoji) => Promise<SetupDesiredProps<Emoji, TProps, TBehavior>>;
  createForumThread: (
    channelId: BigString,
    options: CreateForumPostWithMessage,
    reason?: string,
  ) => Promise<SetupDesiredProps<Channel, TProps, TBehavior>>;
  createGlobalApplicationCommand: (
    command: CreateApplicationCommand,
    options?: CreateGlobalApplicationCommandOptions,
  ) => Promise<SetupDesiredProps<ApplicationCommand, TProps, TBehavior>>;
  createGuildApplicationCommand: (
    command: CreateApplicationCommand,
    guildId: BigString,
    options?: CreateGuildApplicationCommandOptions,
  ) => Promise<SetupDesiredProps<ApplicationCommand, TProps, TBehavior>>;
  createGuildSticker: (
    guildId: BigString,
    options: CreateGuildStickerOptions,
    reason?: string,
  ) => Promise<SetupDesiredProps<Sticker, TProps, TBehavior>>;
  createGuildTemplate: (guildId: BigString, options: CreateTemplate) => Promise<SetupDesiredProps<Template, TProps, TBehavior>>;
  createInvite: (channelId: BigString, options?: CreateChannelInvite, reason?: string) => Promise<Camelize<DiscordInvite>>;
  getGuildRoleMemberCounts: (guildId: BigString) => Promise<Record<string, number>>;
  createRole: (guildId: BigString, options: CreateGuildRole, reason?: string) => Promise<SetupDesiredProps<Role, TProps, TBehavior>>;
  createScheduledEvent: (
    guildId: BigString,
    options: CreateScheduledEvent,
    reason?: string,
  ) => Promise<SetupDesiredProps<ScheduledEvent, TProps, TBehavior>>;
  createStageInstance: (options: CreateStageInstance, reason?: string) => Promise<SetupDesiredProps<StageInstance, TProps, TBehavior>>;
  createWebhook: (channelId: BigString, options: CreateWebhook, reason?: string) => Promise<SetupDesiredProps<Webhook, TProps, TBehavior>>;
  editApplicationCommandPermissions: (
    guildId: BigString,
    commandId: BigString,
    bearerToken: string,
    options: Camelize<DiscordApplicationCommandPermissions>[],
  ) => Promise<SetupDesiredProps<GuildApplicationCommandPermissions, TProps, TBehavior>>;
  editAutomodRule: (
    guildId: BigString,
    ruleId: BigString,
    options: Partial<EditAutoModerationRuleOptions>,
    reason?: string,
  ) => Promise<SetupDesiredProps<AutoModerationRule, TProps, TBehavior>>;
  editBotProfile: (options: {
    username?: string;
    botAvatarURL?: string | null;
    botBannerURL?: string | null;
  }) => Promise<SetupDesiredProps<User, TProps, TBehavior>>;
  editChannel: (channelId: BigString, options: ModifyChannel, reason?: string) => Promise<SetupDesiredProps<Channel, TProps, TBehavior>>;
  editEmoji: (guildId: BigString, id: BigString, options: ModifyGuildEmoji, reason?: string) => Promise<SetupDesiredProps<Emoji, TProps, TBehavior>>;
  editApplicationEmoji: (id: BigString, options: ModifyApplicationEmoji) => Promise<SetupDesiredProps<Emoji, TProps, TBehavior>>;
  editFollowupMessage: (
    token: string,
    messageId: BigString,
    options: InteractionCallbackData,
  ) => Promise<SetupDesiredProps<Message, TProps, TBehavior>>;
  editGlobalApplicationCommand: (
    commandId: BigString,
    options: CreateApplicationCommand,
  ) => Promise<SetupDesiredProps<ApplicationCommand, TProps, TBehavior>>;
  editGuild: (guildId: BigString, options: ModifyGuild, reason?: string) => Promise<SetupDesiredProps<Guild, TProps, TBehavior>>;
  editGuildApplicationCommand: (
    commandId: BigString,
    guildId: BigString,
    options: CreateApplicationCommand,
  ) => Promise<SetupDesiredProps<ApplicationCommand, TProps, TBehavior>>;
  editGuildSticker: (
    guildId: BigString,
    stickerId: BigString,
    options: AtLeastOne<EditGuildStickerOptions>,
    reason?: string,
  ) => Promise<SetupDesiredProps<Sticker, TProps, TBehavior>>;
  editGuildTemplate: (
    guildId: BigString,
    templateCode: string,
    options: ModifyGuildTemplate,
  ) => Promise<SetupDesiredProps<Template, TProps, TBehavior>>;
  editMessage: (channelId: BigString, messageId: BigString, options: EditMessage) => Promise<SetupDesiredProps<Message, TProps, TBehavior>>;
  editOriginalInteractionResponse: (token: string, options: InteractionCallbackData) => Promise<SetupDesiredProps<Message, TProps, TBehavior>>;
  editRole: (guildId: BigString, roleId: BigString, options: EditGuildRole, reason?: string) => Promise<SetupDesiredProps<Role, TProps, TBehavior>>;
  editRolePositions: (guildId: BigString, options: ModifyRolePositions[], reason?: string) => Promise<SetupDesiredProps<Role, TProps, TBehavior>[]>;
  editScheduledEvent: (
    guildId: BigString,
    eventId: BigString,
    options: Partial<EditScheduledEvent>,
    reason?: string,
  ) => Promise<SetupDesiredProps<ScheduledEvent, TProps, TBehavior>>;
  editStageInstance: (channelId: BigString, topic: string, reason?: string) => Promise<SetupDesiredProps<StageInstance, TProps, TBehavior>>;
  editWebhook: (webhookId: BigString, options: ModifyWebhook, reason?: string) => Promise<SetupDesiredProps<Webhook, TProps, TBehavior>>;
  editWebhookMessage: (
    webhookId: BigString,
    token: string,
    messageId: BigString,
    options: EditWebhookMessageOptions,
  ) => Promise<SetupDesiredProps<Message, TProps, TBehavior>>;
  editWebhookWithToken: (
    webhookId: BigString,
    token: string,
    options: Omit<ModifyWebhook, 'channelId'>,
  ) => Promise<SetupDesiredProps<Webhook, TProps, TBehavior>>;
  editWelcomeScreen: (
    guildId: BigString,
    options: ModifyGuildWelcomeScreen,
    reason?: string,
  ) => Promise<SetupDesiredProps<WelcomeScreen, TProps, TBehavior>>;
  editWidgetSettings: (
    guildId: BigString,
    options: Camelize<DiscordGuildWidgetSettings>,
    reason?: string,
  ) => Promise<SetupDesiredProps<GuildWidgetSettings, TProps, TBehavior>>;
  editUserApplicationRoleConnection: (
    bearerToken: string,
    applicationId: BigString,
    options: Camelize<DiscordApplicationRoleConnection>,
  ) => Promise<Camelize<DiscordApplicationRoleConnection>>;
  deleteCurrentUserApplicationRoleConnection: (bearerToken: string, applicationId: BigString) => Promise<void>;
  executeWebhook: (
    webhookId: BigString,
    token: string,
    options: ExecuteWebhook,
  ) => Promise<SetupDesiredProps<Message, TProps, TBehavior> | undefined>;
  followAnnouncement: (sourceChannelId: BigString, targetChannelId: BigString) => Promise<Camelize<DiscordFollowedChannel>>;
  getActiveThreads: (
    guildId: BigString,
  ) => Promise<{ threads: SetupDesiredProps<Channel, TProps, TBehavior>[]; members: SetupDesiredProps<ThreadMember, TProps, TBehavior>[] }>;
  getApplicationInfo: () => Promise<SetupDesiredProps<Application, TProps, TBehavior>>;
  editApplicationInfo: (body: EditApplication) => Promise<SetupDesiredProps<Application, TProps, TBehavior>>;
  getCurrentAuthenticationInfo: (bearerToken: string) => Promise<Camelize<DiscordCurrentAuthorization>>;
  exchangeToken: (
    clientId: BigString,
    clientSecret: string,
    options: Camelize<DiscordTokenExchange>,
  ) => Promise<Camelize<DiscordAccessTokenResponse>>;
  revokeToken: (clientId: BigString, clientSecret: string, options: Camelize<DiscordTokenRevocation>) => Promise<void>;
  getApplicationCommandPermission: (
    guildId: BigString,
    commandId: BigString,
    options?: GetApplicationCommandPermissionOptions,
  ) => Promise<SetupDesiredProps<GuildApplicationCommandPermissions, TProps, TBehavior>>;
  getApplicationCommandPermissions: (
    guildId: BigString,
    options?: GetApplicationCommandPermissionOptions,
  ) => Promise<SetupDesiredProps<GuildApplicationCommandPermissions, TProps, TBehavior>[]>;
  getAuditLog: (guildId: BigString, options?: GetGuildAuditLog) => Promise<Camelize<DiscordAuditLog>>;
  getAutomodRule: (guildId: BigString, ruleId: BigString) => Promise<SetupDesiredProps<AutoModerationRule, TProps, TBehavior>>;
  getAutomodRules: (guildId: BigString) => Promise<SetupDesiredProps<AutoModerationRule, TProps, TBehavior>[]>;
  getAvailableVoiceRegions: () => Promise<SetupDesiredProps<VoiceRegion, TProps, TBehavior>[]>;
  getBan: (guildId: BigString, userId: BigString) => Promise<Camelize<DiscordBan>>;
  getBans: (guildId: BigString, options?: GetBans) => Promise<Camelize<DiscordBan>[]>;
  getChannel: (channelId: BigString) => Promise<SetupDesiredProps<Channel, TProps, TBehavior>>;
  getChannelInvites: (channelId: BigString) => Promise<SetupDesiredProps<Invite, TProps, TBehavior>[]>;
  getChannels: (guildId: BigString) => Promise<SetupDesiredProps<Channel, TProps, TBehavior>[]>;
  getChannelWebhooks: (channelId: BigString) => Promise<SetupDesiredProps<Webhook, TProps, TBehavior>[]>;
  getDmChannel: (userId: BigString) => Promise<SetupDesiredProps<Channel, TProps, TBehavior>>;
  getGroupDmChannel: (options: CreateGroupDmOptions) => Promise<SetupDesiredProps<Channel, TProps, TBehavior>>;
  getEmoji: (guildId: BigString, emojiId: BigString) => Promise<SetupDesiredProps<Emoji, TProps, TBehavior>>;
  getApplicationEmoji: (emojiId: BigString) => Promise<SetupDesiredProps<Emoji, TProps, TBehavior>>;
  getEmojis: (guildId: BigString) => Promise<SetupDesiredProps<Emoji, TProps, TBehavior>[]>;
  getApplicationEmojis: () => Promise<{ items: SetupDesiredProps<Emoji, TProps, TBehavior>[] }>;
  getFollowupMessage: (token: string, messageId: BigString) => Promise<SetupDesiredProps<Message, TProps, TBehavior>>;
  getGatewayBot: () => Promise<SetupDesiredProps<GetGatewayBot, TProps, TBehavior>>;
  getGlobalApplicationCommand: (commandId: BigString) => Promise<SetupDesiredProps<ApplicationCommand, TProps, TBehavior>>;
  getGlobalApplicationCommands: (
    options?: GetGlobalApplicationCommandsOptions,
  ) => Promise<SetupDesiredProps<ApplicationCommand, TProps, TBehavior>[]>;
  getGuild: (guildId: BigString, options?: { counts?: boolean }) => Promise<SetupDesiredProps<Guild, TProps, TBehavior>>;
  getGuilds: (bearerToken: string, options?: GetUserGuilds) => Promise<Partial<SetupDesiredProps<Guild, TProps, TBehavior>>[]>;
  getGuildApplicationCommand: (commandId: BigString, guildId: BigString) => Promise<SetupDesiredProps<ApplicationCommand, TProps, TBehavior>>;
  getGuildApplicationCommands: (
    guildId: BigString,
    options?: GetGuildApplicationCommandsOptions,
  ) => Promise<SetupDesiredProps<ApplicationCommand, TProps, TBehavior>[]>;
  getGuildPreview: (guildId: BigString) => Promise<Camelize<DiscordGuildPreview>>;
  getGuildSticker: (guildId: BigString, stickerId: BigString) => Promise<SetupDesiredProps<Sticker, TProps, TBehavior>>;
  getGuildStickers: (guildId: BigString) => Promise<SetupDesiredProps<Sticker, TProps, TBehavior>[]>;
  getGuildTemplate: (templateCode: string) => Promise<SetupDesiredProps<Template, TProps, TBehavior>>;
  getGuildTemplates: (guildId: BigString) => Promise<SetupDesiredProps<Template, TProps, TBehavior>[]>;
  getGuildWebhooks: (guildId: BigString) => Promise<SetupDesiredProps<Webhook, TProps, TBehavior>[]>;
  getIntegrations: (guildId: BigString) => Promise<SetupDesiredProps<Integration, TProps, TBehavior>[]>;
  getInvite: (inviteCode: string, options?: GetInvite) => Promise<SetupDesiredProps<Invite, TProps, TBehavior>>;
  getInvites: (guildId: BigString) => Promise<SetupDesiredProps<Invite, TProps, TBehavior>[]>;
  getMessage: (channelId: BigString, messageId: BigString) => Promise<SetupDesiredProps<Message, TProps, TBehavior>>;
  getMessages: (channelId: BigString, options?: GetMessagesOptions) => Promise<SetupDesiredProps<Message, TProps, TBehavior>[]>;
  searchGuildMessages: (
    guildId: BigString,
    options?: SearchGuildMessagesOptions,
  ) => Promise<
    | Camelize<DiscordSearchGuildMessagesIndexing>
    | (Omit<Camelize<DiscordSearchGuildMessages>, 'messages' | 'threads' | 'members'> & {
        messages: SetupDesiredProps<Message, TProps, TBehavior>[][];
        threads?: SetupDesiredProps<Channel, TProps, TBehavior>[];
        members?: SetupDesiredProps<ThreadMember, TProps, TBehavior>[];
      })
  >;
  getStickerPack: (stickerPackId: BigString) => Promise<SetupDesiredProps<StickerPack, TProps, TBehavior>>;
  getStickerPacks: () => Promise<SetupDesiredProps<StickerPack, TProps, TBehavior>[]>;
  getOriginalInteractionResponse: (token: string) => Promise<SetupDesiredProps<Message, TProps, TBehavior>>;
  getChannelPins: (
    channelId: BigString,
    options?: GetChannelPinsOptions,
  ) => Promise<{ items: SetupDesiredProps<MessagePin, TProps, TBehavior>[]; hasMore: boolean }>;
  /** @deprecated Use {@link BotHelpers.getChannelPins} instead */
  getPinnedMessages: (channelId: BigString) => Promise<SetupDesiredProps<Message, TProps, TBehavior>[]>;
  getPrivateArchivedThreads: (channelId: BigString, options?: ListArchivedThreads) => Promise<Camelize<DiscordListArchivedThreads>>;
  getPrivateJoinedArchivedThreads: (channelId: BigString, options?: ListArchivedThreads) => Promise<Camelize<DiscordListArchivedThreads>>;
  getPruneCount: (guildId: BigString, options?: GetGuildPruneCountQuery) => Promise<Camelize<DiscordPrunedCount>>;
  getPublicArchivedThreads: (channelId: BigString, options?: ListArchivedThreads) => Promise<Camelize<DiscordListArchivedThreads>>;
  getRoles: (guildId: BigString) => Promise<SetupDesiredProps<Role, TProps, TBehavior>[]>;
  getRole: (guildId: BigString, roleId: BigString) => Promise<SetupDesiredProps<Role, TProps, TBehavior>>;
  getScheduledEvent: (
    guildId: BigString,
    eventId: BigString,
    options?: { withUserCount?: boolean },
  ) => Promise<SetupDesiredProps<ScheduledEvent, TProps, TBehavior>>;
  getScheduledEvents: (guildId: BigString, options?: GetScheduledEvents) => Promise<SetupDesiredProps<ScheduledEvent, TProps, TBehavior>[]>;
  getScheduledEventUsers: (
    guildId: BigString,
    eventId: BigString,
    options?: GetScheduledEventUsers,
  ) => Promise<Array<{ user: SetupDesiredProps<User, TProps, TBehavior>; member?: SetupDesiredProps<Member, TProps, TBehavior> }>>;
  getSessionInfo: () => Promise<SetupDesiredProps<GetGatewayBot, TProps, TBehavior>>;
  getStageInstance: (channelId: BigString) => Promise<SetupDesiredProps<StageInstance, TProps, TBehavior>>;
  getOwnVoiceState: (guildId: BigString) => Promise<SetupDesiredProps<VoiceState, TProps, TBehavior>>;
  getUserVoiceState: (guildId: BigString, userId: BigString) => Promise<SetupDesiredProps<VoiceState, TProps, TBehavior>>;
  getSticker: (stickerId: BigString) => Promise<SetupDesiredProps<Sticker, TProps, TBehavior>>;
  getThreadMember: (
    channelId: BigString,
    userId: BigString,
    options?: GetThreadMember,
    extra?: ThreadMemberTransformerExtra,
  ) => Promise<SetupDesiredProps<ThreadMember, TProps, TBehavior>>;
  getThreadMembers: (
    channelId: BigString,
    options?: ListThreadMembers,
    extra?: ThreadMemberTransformerExtra,
  ) => Promise<SetupDesiredProps<ThreadMember, TProps, TBehavior>[]>;
  getReactions: (
    channelId: BigString,
    messageId: BigString,
    reaction: string,
    options?: GetReactions,
  ) => Promise<SetupDesiredProps<User, TProps, TBehavior>[]>;
  getUser: (id: BigString) => Promise<SetupDesiredProps<User, TProps, TBehavior>>;
  getCurrentUser: (bearerToken: string) => Promise<SetupDesiredProps<User, TProps, TBehavior>>;
  getUserConnections: (bearerToken: string) => Promise<Camelize<DiscordConnection>[]>;
  getUserApplicationRoleConnection: (bearerToken: string, applicationId: BigString) => Promise<Camelize<DiscordApplicationRoleConnection>>;
  getVanityUrl: (guildId: BigString) => Promise<Camelize<DiscordVanityUrl>>;
  getVoiceRegions: (guildId: BigString) => Promise<SetupDesiredProps<VoiceRegion, TProps, TBehavior>[]>;
  getWebhook: (webhookId: BigString) => Promise<SetupDesiredProps<Webhook, TProps, TBehavior>>;
  getWebhookMessage: (
    webhookId: BigString,
    token: string,
    messageId: BigString,
    options?: GetWebhookMessageOptions,
  ) => Promise<SetupDesiredProps<Message, TProps, TBehavior>>;
  getWebhookWithToken: (webhookId: BigString, token: string) => Promise<SetupDesiredProps<Webhook, TProps, TBehavior>>;
  getWelcomeScreen: (guildId: BigString) => Promise<SetupDesiredProps<WelcomeScreen, TProps, TBehavior>>;
  getWidget: (guildId: BigString) => Promise<SetupDesiredProps<GuildWidget, TProps, TBehavior>>;
  getWidgetSettings: (guildId: BigString) => Promise<SetupDesiredProps<GuildWidgetSettings, TProps, TBehavior>>;
  publishMessage: (channelId: BigString, messageId: BigString) => Promise<SetupDesiredProps<Message, TProps, TBehavior>>;
  sendMessage: (channelId: BigString, options: CreateMessageOptions) => Promise<SetupDesiredProps<Message, TProps, TBehavior>>;
  sendFollowupMessage: (token: string, options: InteractionCallbackData) => Promise<SetupDesiredProps<Message, TProps, TBehavior>>;
  startThreadWithMessage: (
    channelId: BigString,
    messageId: BigString,
    options: StartThreadWithMessage,
    reason?: string,
  ) => Promise<SetupDesiredProps<Channel, TProps, TBehavior>>;
  startThreadWithoutMessage: (
    channelId: BigString,
    options: StartThreadWithoutMessage,
    reason?: string,
  ) => Promise<SetupDesiredProps<Channel, TProps, TBehavior>>;
  getPollAnswerVoters: (
    channelId: BigString,
    messageId: BigString,
    answerId: number,
    options?: GetPollAnswerVotes,
  ) => Promise<Camelize<DiscordGetAnswerVotesResponse>>;
  endPoll: (channelId: BigString, messageId: BigString) => Promise<SetupDesiredProps<Message, TProps, TBehavior>>;
  syncGuildTemplate: (guildId: BigString) => Promise<SetupDesiredProps<Template, TProps, TBehavior>>;
  upsertGlobalApplicationCommands: (
    commands: CreateApplicationCommand[],
    options?: UpsertGlobalApplicationCommandOptions,
  ) => Promise<SetupDesiredProps<ApplicationCommand, TProps, TBehavior>[]>;
  upsertGuildApplicationCommands: (
    guildId: BigString,
    commands: CreateApplicationCommand[],
    options?: UpsertGuildApplicationCommandOptions,
  ) => Promise<SetupDesiredProps<ApplicationCommand, TProps, TBehavior>[]>;
  editCurrentMember: (guildId: BigString, options: ModifyCurrentMember, reason?: string) => Promise<SetupDesiredProps<Member, TProps, TBehavior>>;
  editMember: (
    guildId: BigString,
    userId: BigString,
    options: ModifyGuildMember,
    reason?: string,
  ) => Promise<SetupDesiredProps<Member, TProps, TBehavior>>;
  getCurrentMember: (guildId: BigString, bearerToken: string) => Promise<SetupDesiredProps<Member, TProps, TBehavior>>;
  getMember: (guildId: BigString, userId: BigString) => Promise<SetupDesiredProps<Member, TProps, TBehavior>>;
  getMembers: (guildId: BigString, options: ListGuildMembers) => Promise<SetupDesiredProps<Member, TProps, TBehavior>[]>;
  pruneMembers: (guildId: BigString, options: BeginGuildPrune, reason?: string) => Promise<{ pruned: number | null }>;
  searchMembers: (
    guildId: BigString,
    query: string,
    options?: Omit<SearchMembers, 'query'>,
  ) => Promise<SetupDesiredProps<Member, TProps, TBehavior>[]>;
  bulkBanMembers: (guildId: BigString, options: CreateGuildBulkBan, reason?: string) => Promise<{ bannedUsers: bigint[]; failedUsers: bigint[] }>;
  getApplicationActivityInstance: (applicationId: BigString, instanceId: string) => Promise<Camelize<DiscordActivityInstance>>;
  listApplicationRoleConnectionsMetadataRecords: (applicationId: BigString) => Promise<Camelize<DiscordApplicationRoleConnectionMetadata>[]>;
  updateApplicationRoleConnectionsMetadataRecords: (
    applicationId: BigString,
    options: Camelize<DiscordApplicationRoleConnectionMetadata>[],
  ) => Promise<Camelize<DiscordApplicationRoleConnectionMetadata>[]>;
  createLobby: (options: CreateLobby) => Promise<SetupDesiredProps<Lobby, TProps, TBehavior>>;
  createOrJoinLobby: (options: CreateOrJoinLobby) => Promise<SetupDesiredProps<Lobby, TProps, TBehavior>>;
  getLobby: (lobbyId: BigString) => Promise<SetupDesiredProps<Lobby, TProps, TBehavior>>;
  modifyLobby: (lobbyId: BigString, options: ModifyLobby) => Promise<SetupDesiredProps<Lobby, TProps, TBehavior>>;
  addMemberToLobby: (lobbyId: BigString, userId: BigString, options: AddLobbyMember) => Promise<SetupDesiredProps<LobbyMember, TProps, TBehavior>>;
  bulkUpdateLobbyMembers: (lobbyId: BigString, options: BulkUpdateLobbyMember[]) => Promise<SetupDesiredProps<LobbyMember, TProps, TBehavior>[]>;
  linkChannelToLobby: (lobbyId: BigString, bearerToken: string, options: LinkChannelToLobby) => Promise<SetupDesiredProps<Lobby, TProps, TBehavior>>;
  unlinkChannelToLobby: (lobbyId: BigString, bearerToken: string) => Promise<SetupDesiredProps<Lobby, TProps, TBehavior>>;
  updateLobbyMessageModerationMetadata: (lobbyId: BigString, messageId: BigString, options: Record<string, string>) => Promise<void>;
  getTargetUsers: (inviteCode: string) => Promise<string>;
  updateTargetUsers: (inviteCode: string, targetUsersFile: Blob) => Promise<void>;
  getTargetUsersJobStatus: (inviteCode: string) => Promise<Camelize<DiscordTargetUsersJobStatus>>;
  sendLobbyMessage: (
    bearerToken: string,
    lobbyId: BigString,
    options: SendLobbyMessage,
  ) => Promise<SetupDesiredProps<LobbyMessage, TProps, TBehavior>>;
  getLobbyMessages: (
    bearerToken: string,
    lobbyId: BigString,
    options?: GetLobbyMessages,
  ) => Promise<SetupDesiredProps<LobbyMessage, TProps, TBehavior>[]>;
  createLobbyChannelInviteForSelf: (bearerToken: string, lobbyId: BigString) => Promise<SetupDesiredProps<LobbyInvite, TProps, TBehavior>>;
  createLobbyChannelInviteForUser: (lobbyId: BigString, userId: BigString) => Promise<SetupDesiredProps<LobbyInvite, TProps, TBehavior>>;
  addReaction: (channelId: BigString, messageId: BigString, reaction: string) => Promise<void>;
  addReactions: (channelId: BigString, messageId: BigString, reactions: string[], ordered?: boolean) => Promise<void>;
  addRole: (guildId: BigString, userId: BigString, roleId: BigString, reason?: string) => Promise<void>;
  addThreadMember: (channelId: BigString, userId: BigString) => Promise<void>;
  addDmRecipient: (channelId: BigString, userId: BigString, options: AddDmRecipientOptions) => Promise<void>;
  addGuildMember: (guildId: BigString, userId: BigString, options: AddGuildMemberOptions) => Promise<void>;
  deleteAutomodRule: (guildId: BigString, ruleId: BigString, reason?: string) => Promise<void>;
  deleteChannel: (channelId: BigString, reason?: string) => Promise<void>;
  deleteChannelPermissionOverride: (channelId: BigString, overwriteId: BigString, reason?: string) => Promise<void>;
  deleteEmoji: (guildId: BigString, id: BigString, reason?: string) => Promise<void>;
  deleteApplicationEmoji: (id: BigString) => Promise<void>;
  deleteFollowupMessage: (token: string, messageId: BigString) => Promise<void>;
  deleteGlobalApplicationCommand: (commandId: BigString) => Promise<void>;
  deleteGuildApplicationCommand: (commandId: BigString, guildId: BigString) => Promise<void>;
  deleteGuildSticker: (guildId: BigString, stickerId: BigString, reason?: string) => Promise<void>;
  deleteGuildTemplate: (guildId: BigString, templateCode: string) => Promise<void>;
  deleteIntegration: (guildId: BigString, integrationId: BigString, reason?: string) => Promise<void>;
  deleteInvite: (inviteCode: string, reason?: string) => Promise<void>;
  deleteMessage: (channelId: BigString, messageId: BigString, reason?: string) => Promise<void>;
  deleteMessages: (channelId: BigString, messageIds: BigString[], reason?: string) => Promise<void>;
  deleteOriginalInteractionResponse: (token: string) => Promise<void>;
  deleteOwnReaction: (channelId: BigString, messageId: BigString, reaction: string) => Promise<void>;
  deleteReactionsAll: (channelId: BigString, messageId: BigString) => Promise<void>;
  deleteReactionsEmoji: (channelId: BigString, messageId: BigString, reaction: string) => Promise<void>;
  deleteRole: (guildId: BigString, roleId: BigString, reason?: string) => Promise<void>;
  deleteScheduledEvent: (guildId: BigString, eventId: BigString) => Promise<void>;
  deleteStageInstance: (channelId: BigString, reason?: string) => Promise<void>;
  deleteUserReaction: (channelId: BigString, messageId: BigString, userId: BigString, reaction: string) => Promise<void>;
  deleteWebhook: (webhookId: BigString, reason?: string) => Promise<void>;
  deleteWebhookMessage: (webhookId: BigString, token: string, messageId: BigString, options?: DeleteWebhookMessageOptions) => Promise<void>;
  deleteWebhookWithToken: (webhookId: BigString, token: string) => Promise<void>;
  editChannelPermissionOverrides: (channelId: BigString, options: EditChannelPermissionOverridesOptions, reason?: string) => Promise<void>;
  editChannelPositions: (guildId: BigString, channelPositions: ModifyGuildChannelPositions[]) => Promise<void>;
  editOwnVoiceState: (guildId: BigString, options: EditOwnVoiceState) => Promise<void>;
  editUserVoiceState: (guildId: BigString, options: EditUserVoiceState) => Promise<void>;
  joinThread: (channelId: BigString) => Promise<void>;
  leaveGuild: (guildId: BigString) => Promise<void>;
  leaveThread: (channelId: BigString) => Promise<void>;
  removeRole: (guildId: BigString, userId: BigString, roleId: BigString, reason?: string) => Promise<void>;
  removeThreadMember: (channelId: BigString, userId: BigString) => Promise<void>;
  removeDmRecipient: (channelId: BigString, userId: BigString) => Promise<void>;
  sendInteractionResponse: (
    interactionId: BigString,
    token: string,
    options: InteractionResponse,
    params?: InteractionCallbackOptions,
  ) => Promise<void | SetupDesiredProps<InteractionCallbackResponse, TProps, TBehavior>>;
  triggerTypingIndicator: (channelId: BigString) => Promise<void>;
  banMember: (guildId: BigString, userId: BigString, options?: CreateGuildBan, reason?: string) => Promise<void>;
  kickMember: (guildId: BigString, userId: BigString, reason?: string) => Promise<void>;
  pinMessage: (channelId: BigString, messageId: BigString, reason?: string) => Promise<void>;
  unbanMember: (guildId: BigString, userId: BigString, reason?: string) => Promise<void>;
  unpinMessage: (channelId: BigString, messageId: BigString, reason?: string) => Promise<void>;
  getGuildOnboarding: (guildId: BigString) => Promise<SetupDesiredProps<GuildOnboarding, TProps, TBehavior>>;
  editGuildOnboarding: (
    guildId: BigString,
    options: EditGuildOnboarding,
    reason?: string,
  ) => Promise<SetupDesiredProps<GuildOnboarding, TProps, TBehavior>>;
  modifyGuildIncidentActions: (
    guildId: BigString,
    options: ModifyGuildIncidentActions,
  ) => Promise<SetupDesiredProps<IncidentsData, TProps, TBehavior>>;
  listEntitlements: (applicationId: BigString, options?: GetEntitlements) => Promise<SetupDesiredProps<Entitlement, TProps, TBehavior>[]>;
  getEntitlement: (applicationId: BigString, entitlementId: BigString) => Promise<SetupDesiredProps<Entitlement, TProps, TBehavior>>;
  createTestEntitlement: (
    applicationId: BigString,
    body: CreateTestEntitlement,
  ) => Promise<Partial<SetupDesiredProps<Entitlement, TProps, TBehavior>>>;
  deleteTestEntitlement: (applicationId: BigString, entitlementId: BigString) => Promise<void>;
  consumeEntitlement: (applicationId: BigString, entitlementId: BigString) => Promise<void>;
  listSkus: (applicationId: BigString) => Promise<SetupDesiredProps<Sku, TProps, TBehavior>[]>;
  listSubscriptions: (skuId: BigString, options?: ListSkuSubscriptionsOptions) => Promise<SetupDesiredProps<Subscription, TProps, TBehavior>[]>;
  getSubscription: (skuId: BigString, subscriptionId: BigString) => Promise<SetupDesiredProps<Subscription, TProps, TBehavior>>;
  sendSoundboardSound: (channelId: BigString, options: SendSoundboardSound) => Promise<void>;
  listDefaultSoundboardSounds: () => Promise<SetupDesiredProps<SoundboardSound, TProps, TBehavior>[]>;
  listGuildSoundboardSounds: (guildId: BigString) => Promise<{ items: SetupDesiredProps<SoundboardSound, TProps, TBehavior>[] }>;
  getGuildSoundboardSound: (guildId: BigString, soundId: BigString) => Promise<SetupDesiredProps<SoundboardSound, TProps, TBehavior>>;
  createGuildSoundboardSound: (
    guildId: BigString,
    options: CreateGuildSoundboardSound,
    reason?: string,
  ) => Promise<SetupDesiredProps<SoundboardSound, TProps, TBehavior>>;
  modifyGuildSoundboardSound: (
    guildId: BigString,
    soundId: BigString,
    options: ModifyGuildSoundboardSound,
    reason?: string,
  ) => Promise<SetupDesiredProps<SoundboardSound, TProps, TBehavior>>;
  deleteGuildSoundboardSound: (guildId: BigString, soundId: BigString, reason?: string) => Promise<void>;
  deleteLobby: (lobbyId: BigString) => Promise<void>;
  removeMemberFromLobby: (lobbyId: BigString, userId: BigString) => Promise<void>;
  leaveLobby: (lobbyId: BigString, bearerToken: string) => Promise<void>;
};
