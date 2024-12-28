import type {
  AddDmRecipientOptions,
  AddGuildMemberOptions,
  AtLeastOne,
  BeginGuildPrune,
  BigString,
  Camelize,
  CreateApplicationCommand,
  CreateApplicationEmoji,
  CreateAutoModerationRuleOptions,
  CreateChannelInvite,
  CreateEntitlement,
  CreateForumPostWithMessage,
  CreateGlobalApplicationCommandOptions,
  CreateGuild,
  CreateGuildApplicationCommandOptions,
  CreateGuildBan,
  CreateGuildBulkBan,
  CreateGuildChannel,
  CreateGuildEmoji,
  CreateGuildFromTemplate,
  CreateGuildRole,
  CreateGuildSoundboardSound,
  CreateGuildStickerOptions,
  CreateMessageOptions,
  CreateScheduledEvent,
  CreateStageInstance,
  CreateTemplate,
  CreateWebhook,
  DeleteWebhookMessageOptions,
  DiscordAccessTokenResponse,
  DiscordActivityInstance,
  DiscordApplicationCommandPermissions,
  DiscordApplicationRoleConnection,
  DiscordArchivedThreads,
  DiscordAuditLog,
  DiscordBan,
  DiscordConnection,
  DiscordCurrentAuthorization,
  DiscordFollowedChannel,
  DiscordGetGatewayBot,
  DiscordGuildPreview,
  DiscordGuildWidgetSettings,
  DiscordInvite,
  DiscordInviteMetadata,
  DiscordMessage,
  DiscordModifyGuildWelcomeScreen,
  DiscordPrunedCount,
  DiscordTokenExchange,
  DiscordTokenRevocation,
  DiscordVanityUrl,
  DiscordVoiceRegion,
  EditApplication,
  EditAutoModerationRuleOptions,
  EditBotMemberOptions,
  EditChannelPermissionOverridesOptions,
  EditGuildOnboarding,
  EditGuildRole,
  EditGuildStickerOptions,
  EditMessage,
  EditOwnVoiceState,
  EditScheduledEvent,
  EditUserVoiceState,
  ExecuteWebhook,
  GetApplicationCommandPermissionOptions,
  GetBans,
  GetEntitlements,
  GetGroupDmOptions,
  GetGuildAuditLog,
  GetGuildPruneCountQuery,
  GetInvite,
  GetMessagesOptions,
  GetReactions,
  GetScheduledEventUsers,
  GetScheduledEvents,
  GetUserGuilds,
  GetWebhookMessageOptions,
  InteractionCallbackData,
  InteractionCallbackOptions,
  InteractionResponse,
  ListArchivedThreads,
  ListGuildMembers,
  ListSkuSubscriptionsOptions,
  MfaLevels,
  ModifyApplicationEmoji,
  ModifyChannel,
  ModifyGuild,
  ModifyGuildChannelPositions,
  ModifyGuildEmoji,
  ModifyGuildMember,
  ModifyGuildSoundboardSound,
  ModifyGuildTemplate,
  ModifyRolePositions,
  ModifyWebhook,
  SearchMembers,
  SendSoundboardSound,
  StartThreadWithMessage,
  StartThreadWithoutMessage,
  UpsertGlobalApplicationCommandOptions,
  UpsertGuildApplicationCommandOptions,
} from '@discordeno/types'
import { snakelize } from '@discordeno/utils'
import type { Bot } from './bot.js'
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from './desiredProperties.js'
import type {
  Application,
  ApplicationCommand,
  AutoModerationRule,
  Channel,
  Emoji,
  Entitlement,
  Guild,
  GuildApplicationCommandPermissions,
  GuildOnboarding,
  GuildWidget,
  GuildWidgetSettings,
  Integration,
  InteractionCallbackResponse,
  Invite,
  Member,
  Message,
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
  VoiceState,
  Webhook,
  WelcomeScreen,
} from './transformers/index.js'

export function createBotHelpers<TProps extends TransformersDesiredProperties, TBehavior extends DesiredPropertiesBehavior>(
  bot: Bot<TProps, TBehavior>,
): BotHelpers<TProps, TBehavior> {
  return {
    createAutomodRule: async (guildId, options, reason) => {
      return bot.transformers.automodRule(bot, snakelize(await bot.rest.createAutomodRule(guildId, options, reason)))
    },
    createChannel: async (guildId, options, reason) => {
      return bot.transformers.channel(bot, { channel: snakelize(await bot.rest.createChannel(guildId, options, reason)), guildId })
    },
    createEmoji: async (guildId, options, reason) => {
      return bot.transformers.emoji(bot, snakelize(await bot.rest.createEmoji(guildId, options, reason)))
    },
    createApplicationEmoji: async (options) => {
      return bot.transformers.emoji(bot, snakelize(await bot.rest.createApplicationEmoji(options)))
    },
    createForumThread: async (channelId, options, reason) => {
      return bot.transformers.channel(bot, { channel: snakelize(await bot.rest.createForumThread(channelId, options, reason)) })
    },
    createGlobalApplicationCommand: async (command, options) => {
      return bot.transformers.applicationCommand(bot, snakelize(await bot.rest.createGlobalApplicationCommand(command, options)))
    },
    createGuild: async (options) => {
      return bot.transformers.guild(bot, { guild: snakelize(await bot.rest.createGuild(options)), shardId: 0 })
    },
    createGuildApplicationCommand: async (command, guildId, options) => {
      return bot.transformers.applicationCommand(bot, snakelize(await bot.rest.createGuildApplicationCommand(command, guildId, options)))
    },
    createGuildFromTemplate: async (templateCode, options) => {
      return bot.transformers.guild(bot, { guild: snakelize(await bot.rest.createGuildFromTemplate(templateCode, options)), shardId: 0 })
    },
    createGuildSticker: async (guildId, options, reason) => {
      return bot.transformers.sticker(bot, snakelize(await bot.rest.createGuildSticker(guildId, options, reason)))
    },
    createGuildTemplate: async (guildId, options) => {
      return bot.transformers.template(bot, snakelize(await bot.rest.createGuildTemplate(guildId, options)))
    },
    createInvite: async (channelId, options, reason) => {
      return await bot.rest.createInvite(channelId, options, reason)
    },
    createRole: async (guildId, options, reason) => {
      return bot.transformers.role(bot, { role: snakelize(await bot.rest.createRole(guildId, options, reason)), guildId })
    },
    createScheduledEvent: async (guildId, options, reason) => {
      return bot.transformers.scheduledEvent(bot, snakelize(await bot.rest.createScheduledEvent(guildId, options, reason)))
    },
    createStageInstance: async (options, reason) => {
      return bot.transformers.stageInstance(bot, snakelize(await bot.rest.createStageInstance(options, reason)))
    },
    createWebhook: async (channelId, options, reason) => {
      return bot.transformers.webhook(bot, snakelize(await bot.rest.createWebhook(channelId, options, reason)))
    },
    editApplicationCommandPermissions: async (guildId, commandId, bearerToken, options) => {
      return bot.transformers.applicationCommandPermission(
        bot,
        snakelize(await bot.rest.editApplicationCommandPermissions(guildId, commandId, bearerToken, options)),
      )
    },
    editAutomodRule: async (guildId, ruleId, options, reason) => {
      return bot.transformers.automodRule(bot, snakelize(await bot.rest.editAutomodRule(guildId, ruleId, options, reason)))
    },
    editBotProfile: async (options) => {
      return bot.transformers.user(bot, snakelize(await bot.rest.editBotProfile(options)))
    },
    editChannel: async (channelId, options, reason) => {
      return bot.transformers.channel(bot, { channel: snakelize(await bot.rest.editChannel(channelId, options, reason)) })
    },
    editEmoji: async (guildId, id, options, reason) => {
      return bot.transformers.emoji(bot, snakelize(await bot.rest.editEmoji(guildId, id, options, reason)))
    },
    editApplicationEmoji: async (id, options) => {
      return bot.transformers.emoji(bot, snakelize(await bot.rest.editApplicationEmoji(id, options)))
    },
    editFollowupMessage: async (token, messageId, options) => {
      return bot.transformers.message(bot, { message: snakelize(await bot.rest.editFollowupMessage(token, messageId, options)), shardId: 0 })
    },
    editGlobalApplicationCommand: async (commandId, options) => {
      return bot.transformers.applicationCommand(bot, snakelize(await bot.rest.editGlobalApplicationCommand(commandId, options)))
    },
    editGuild: async (guildId, options, reason) => {
      return bot.transformers.guild(bot, { guild: snakelize(await bot.rest.editGuild(guildId, options, reason)), shardId: 0 })
    },
    editGuildApplicationCommand: async (commandId, guildId, options) => {
      return bot.transformers.applicationCommand(bot, snakelize(await bot.rest.editGuildApplicationCommand(commandId, guildId, options)))
    },
    editGuildSticker: async (guildId, stickerId, options, reason) => {
      return bot.transformers.sticker(bot, snakelize(await bot.rest.editGuildSticker(guildId, stickerId, options, reason)))
    },
    editGuildTemplate: async (guildId, templateCode, options) => {
      return bot.transformers.template(bot, snakelize(await bot.rest.editGuildTemplate(guildId, templateCode, options)))
    },
    editMessage: async (channelId, messageId, options) => {
      return bot.transformers.message(bot, {
        message: snakelize(await bot.rest.editMessage(channelId, messageId, options)) as DiscordMessage,
        shardId: 0,
      })
    },
    editOriginalInteractionResponse: async (token, options) => {
      return bot.transformers.message(bot, { message: snakelize(await bot.rest.editOriginalInteractionResponse(token, options)), shardId: 0 })
    },
    editOriginalWebhookMessage: async (webhookId, token, options) => {
      return bot.transformers.message(bot, {
        message: snakelize(await bot.rest.editOriginalWebhookMessage(webhookId, token, options)) as DiscordMessage,
        shardId: 0,
      })
    },
    editRole: async (guildId, roleId, options, reason) => {
      return bot.transformers.role(bot, { role: snakelize(await bot.rest.editRole(guildId, roleId, options, reason)), guildId })
    },
    editRolePositions: async (guildId, options, reason) => {
      return snakelize(await bot.rest.editRolePositions(guildId, options, reason)).map((role) => bot.transformers.role(bot, { role, guildId }))
    },
    editScheduledEvent: async (guildId, eventId, options, reason) => {
      return bot.transformers.scheduledEvent(bot, snakelize(await bot.rest.editScheduledEvent(guildId, eventId, options, reason)))
    },
    editStageInstance: async (channelId, topic, reason) => {
      return bot.transformers.stageInstance(bot, snakelize(await bot.rest.editStageInstance(channelId, topic, reason)))
    },
    editWebhook: async (webhookId, options, reason) => {
      return bot.transformers.webhook(bot, snakelize(await bot.rest.editWebhook(webhookId, options, reason)))
    },
    editWebhookMessage: async (webhookId, token, messageId, options) => {
      return bot.transformers.message(bot, {
        message: snakelize(await bot.rest.editWebhookMessage(webhookId, token, messageId, options)) as DiscordMessage,
        shardId: 0,
      })
    },
    editWebhookWithToken: async (webhookId, token, options) => {
      return bot.transformers.webhook(bot, snakelize(await bot.rest.editWebhookWithToken(webhookId, token, options)))
    },
    editWelcomeScreen: async (guildId, options, reason) => {
      return bot.transformers.welcomeScreen(bot, snakelize(await bot.rest.editWelcomeScreen(guildId, options, reason)))
    },
    editWidgetSettings: async (guildId, options, reason) => {
      return bot.transformers.widgetSettings(bot, snakelize(await bot.rest.editWidgetSettings(guildId, options, reason)))
    },
    executeWebhook: async (webhookId, token, options) => {
      const result = await bot.rest.executeWebhook(webhookId, token, options)
      if (!result) return

      return bot.transformers.message(bot, { message: snakelize(result) as DiscordMessage, shardId: 0 })
    },
    followAnnouncement: async (sourceChannelId, targetChannelId) => {
      return await bot.rest.followAnnouncement(sourceChannelId, targetChannelId)
    },
    getActiveThreads: async (guildId) => {
      const result = await bot.rest.getActiveThreads(guildId)
      return {
        threads: result.threads.map((thread) => bot.transformers.channel(bot, { guildId, channel: snakelize(thread) })),
        members: result.members.map((member) => bot.transformers.threadMember(bot, snakelize(member))),
      }
    },
    getApplicationInfo: async () => {
      return bot.transformers.application(bot, { application: snakelize(await bot.rest.getApplicationInfo()), shardId: 0 })
    },
    editApplicationInfo: async (body) => {
      return bot.transformers.application(bot, { application: snakelize(await bot.rest.editApplicationInfo(body)), shardId: 0 })
    },
    getCurrentAuthenticationInfo: async (bearerToken) => {
      return await bot.rest.getCurrentAuthenticationInfo(bearerToken)
    },
    exchangeToken: async (clientId, clientSecret, options) => {
      return await bot.rest.exchangeToken(clientId, clientSecret, options)
    },
    revokeToken: async (clientId, clientSecret, options) => {
      return await bot.rest.revokeToken(clientId, clientSecret, options)
    },
    getApplicationCommandPermission: async (guildId, commandId, options) => {
      const res = await bot.rest.getApplicationCommandPermission(guildId, commandId, options)
      const snakedRes = snakelize(res)

      return bot.transformers.applicationCommandPermission(bot, snakedRes)
    },
    getApplicationCommandPermissions: async (guildId, options) => {
      return (await bot.rest.getApplicationCommandPermissions(guildId, options)).map((res) =>
        bot.transformers.applicationCommandPermission(bot, snakelize(res)),
      )
    },
    getAuditLog: async (guildId, options) => {
      return await bot.rest.getAuditLog(guildId, options)
    },
    getAutomodRule: async (guildId, ruleId) => {
      return bot.transformers.automodRule(bot, snakelize(await bot.rest.getAutomodRule(guildId, ruleId)))
    },
    getAutomodRules: async (guildId) => {
      return (await bot.rest.getAutomodRules(guildId)).map((res) => bot.transformers.automodRule(bot, snakelize(res)))
    },
    getAvailableVoiceRegions: async () => {
      return (await bot.rest.getAvailableVoiceRegions()).map((res) => bot.transformers.voiceRegion(bot, snakelize(res)))
    },
    getBan: async (guildId, userId) => {
      return await bot.rest.getBan(guildId, userId)
    },
    getBans: async (guildId, options) => {
      return await bot.rest.getBans(guildId, options)
    },
    getChannel: async (channelId) => {
      return bot.transformers.channel(bot, { channel: snakelize(await bot.rest.getChannel(channelId)) })
    },
    getChannelInvites: async (channelId) => {
      return await bot.rest.getChannelInvites(channelId)
      // return (await bot.rest.getChannelInvites(channelId)).map((res) => bot.transformers.invite(bot, snakelize(res)))
    },
    getChannels: async (guildId) => {
      return (await bot.rest.getChannels(guildId)).map((res) => bot.transformers.channel(bot, { channel: snakelize(res), guildId }))
    },
    getChannelWebhooks: async (channelId) => {
      return (await bot.rest.getChannelWebhooks(channelId)).map((res) => bot.transformers.webhook(bot, snakelize(res)))
    },
    getDmChannel: async (userId) => {
      return bot.transformers.channel(bot, { channel: snakelize(await bot.rest.getDmChannel(userId)) })
    },
    getGroupDmChannel: async (options) => {
      return bot.transformers.channel(bot, { channel: snakelize(await bot.rest.getGroupDmChannel(options)) })
    },
    getEmoji: async (guildId, emojiId) => {
      return bot.transformers.emoji(bot, snakelize(await bot.rest.getEmoji(guildId, emojiId)))
    },
    getApplicationEmoji: async (emojiId) => {
      return bot.transformers.emoji(bot, snakelize(await bot.rest.getApplicationEmoji(emojiId)))
    },
    getEmojis: async (guildId) => {
      return (await bot.rest.getEmojis(guildId)).map((res) => bot.transformers.emoji(bot, snakelize(res)))
    },
    getApplicationEmojis: async () => {
      const res = await bot.rest.getApplicationEmojis()

      return {
        items: res.items.map((item) => bot.transformers.emoji(bot, snakelize(item))),
      }
    },
    getFollowupMessage: async (token, messageId) => {
      return bot.transformers.message(bot, { message: snakelize(await bot.rest.getFollowupMessage(token, messageId)), shardId: 0 })
    },
    getGatewayBot: async () => {
      return bot.transformers.gatewayBot(bot, snakelize(await bot.rest.getGatewayBot()))
    },
    getGlobalApplicationCommand: async (commandId) => {
      return bot.transformers.applicationCommand(bot, snakelize(await bot.rest.getGlobalApplicationCommand(commandId)))
    },
    getGlobalApplicationCommands: async () => {
      return (await bot.rest.getGlobalApplicationCommands()).map((res) => bot.transformers.applicationCommand(bot, snakelize(res)))
    },
    getGuild: async (guildId, options) => {
      return bot.transformers.guild(bot, { guild: snakelize(await bot.rest.getGuild(guildId, options)), shardId: 0 })
    },
    getGuilds: async (bearerToken, options) => {
      return (await bot.rest.getGuilds(bearerToken, options)).map<Partial<typeof bot.transformers.$inferredTypes.guild>>((res) =>
        // @ts-expect-error getGuilds returns partial guilds
        bot.transformers.guild(bot, { guild: snakelize(res), shardId: 0 }),
      )
    },
    getGuildApplicationCommand: async (commandId, guildId) => {
      return bot.transformers.applicationCommand(bot, snakelize(await bot.rest.getGuildApplicationCommand(commandId, guildId)))
    },
    getGuildApplicationCommands: async (guildId) => {
      return (await bot.rest.getGuildApplicationCommands(guildId)).map((res) => bot.transformers.applicationCommand(bot, snakelize(res)))
    },
    getGuildPreview: async (guildId) => {
      return await bot.rest.getGuildPreview(guildId)
      // return bot.transformers.xxx(bot, snakelize(await bot.rest.getGuildPreview(guildId)))
    },
    getGuildSticker: async (guildId, stickerId) => {
      return bot.transformers.sticker(bot, snakelize(await bot.rest.getGuildSticker(guildId, stickerId)))
    },
    getGuildStickers: async (guildId) => {
      return (await bot.rest.getGuildStickers(guildId)).map((res) => bot.transformers.sticker(bot, snakelize(res)))
    },
    getGuildTemplate: async (templateCode) => {
      return bot.transformers.template(bot, snakelize(await bot.rest.getGuildTemplate(templateCode)))
    },
    getGuildTemplates: async (guildId) => {
      return (await bot.rest.getGuildTemplates(guildId)).map((res) => bot.transformers.template(bot, snakelize(res)))
    },
    getGuildWebhooks: async (guildId) => {
      return (await bot.rest.getGuildWebhooks(guildId)).map((res) => bot.transformers.webhook(bot, snakelize(res)))
    },
    getIntegrations: async (guildId) => {
      return (await bot.rest.getIntegrations(guildId)).map((res) =>
        bot.transformers.integration(bot, snakelize({ ...res, guildId: guildId.toString() })),
      )
    },
    getInvite: async (inviteCode, options) => {
      return bot.transformers.invite(bot, { invite: snakelize(await bot.rest.getInvite(inviteCode, options)), shardId: 0 })
    },
    getInvites: async (guildId) => {
      return (await bot.rest.getInvites(guildId)).map((res) => bot.transformers.invite(bot, { invite: snakelize(res), shardId: 0 }))
    },
    getMessage: async (channelId, messageId) => {
      return bot.transformers.message(bot, { message: snakelize(await bot.rest.getMessage(channelId, messageId)), shardId: 0 })
    },
    getMessages: async (channelId, options) => {
      return (await bot.rest.getMessages(channelId, options)).map((res) => bot.transformers.message(bot, { message: snakelize(res), shardId: 0 }))
    },
    getStickerPack: async (stickerPackId) => {
      return bot.transformers.stickerPack(bot, snakelize(await bot.rest.getStickerPack(stickerPackId)))
    },
    getStickerPacks: async () => {
      return (await bot.rest.getStickerPacks()).map((res) => bot.transformers.stickerPack(bot, snakelize(res)))
    },
    getOriginalInteractionResponse: async (token) => {
      return bot.transformers.message(bot, { message: snakelize(await bot.rest.getOriginalInteractionResponse(token)), shardId: 0 })
    },
    getPinnedMessages: async (channelId) => {
      return (await bot.rest.getPinnedMessages(channelId)).map((res) => bot.transformers.message(bot, { message: snakelize(res), shardId: 0 }))
    },
    getPrivateArchivedThreads: async (channelId, options) => {
      return await bot.rest.getPrivateArchivedThreads(channelId, options)
    },
    getPrivateJoinedArchivedThreads: async (channelId, options) => {
      return await bot.rest.getPrivateJoinedArchivedThreads(channelId, options)
    },
    getPruneCount: async (guildId, options) => {
      return await bot.rest.getPruneCount(guildId, options)
    },
    getPublicArchivedThreads: async (channelId, options) => {
      return await bot.rest.getPublicArchivedThreads(channelId, options)
    },
    getRoles: async (guildId) => {
      return snakelize(await bot.rest.getRoles(guildId)).map((role) => bot.transformers.role(bot, { role, guildId }))
    },
    getRole: async (guildId, roleId) => {
      return bot.transformers.role(bot, { role: snakelize(await bot.rest.getRole(guildId, roleId)), guildId })
    },
    getScheduledEvent: async (guildId, eventId, options) => {
      return bot.transformers.scheduledEvent(bot, snakelize(await bot.rest.getScheduledEvent(guildId, eventId, options)))
    },
    getScheduledEvents: async (guildId, options) => {
      return (await bot.rest.getScheduledEvents(guildId, options)).map((res) => bot.transformers.scheduledEvent(bot, snakelize(res)))
    },
    getScheduledEventUsers: async (guildId, eventId, options) => {
      return (await bot.rest.getScheduledEventUsers(guildId, eventId, options)).map((u) => {
        return {
          user: bot.transformers.user(bot, snakelize(u.user)),
          member: u.member && bot.transformers.member(bot, snakelize(u.member), guildId, bot.transformers.snowflake(u.user.id)),
        }
      })
    },
    getSessionInfo: async () => {
      return bot.transformers.gatewayBot(bot, snakelize(await bot.rest.getSessionInfo()))
    },
    getStageInstance: async (channelId) => {
      return bot.transformers.stageInstance(bot, snakelize(await bot.rest.getStageInstance(channelId)))
    },
    getOwnVoiceState: async (guildId) => {
      return bot.transformers.voiceState(bot, { guildId, voiceState: snakelize(await bot.rest.getOwnVoiceState(guildId)) })
    },
    getUserVoiceState: async (guildId, userId) => {
      return bot.transformers.voiceState(bot, { guildId, voiceState: snakelize(await bot.rest.getUserVoiceState(guildId, userId)) })
    },
    getSticker: async (stickerId) => {
      return bot.transformers.sticker(bot, snakelize(await bot.rest.getSticker(stickerId)))
    },
    getThreadMember: async (channelId, userId) => {
      return bot.transformers.threadMember(bot, snakelize(await bot.rest.getThreadMember(channelId, userId)))
    },
    getThreadMembers: async (channelId) => {
      return (await bot.rest.getThreadMembers(channelId)).map((res) => bot.transformers.threadMember(bot, snakelize(res)))
    },
    getReactions: async (channelId, messageId, reaction, options) => {
      return (await bot.rest.getReactions(channelId, messageId, reaction, options)).map((res) => bot.transformers.user(bot, snakelize(res)))
    },
    getUser: async (id) => {
      return bot.transformers.user(bot, snakelize(await bot.rest.getUser(id)))
    },
    getCurrentUser: async (bearerToken) => {
      return bot.transformers.user(bot, snakelize(await bot.rest.getCurrentUser(bearerToken)))
    },
    getUserConnections: async (bearerToken) => {
      return await bot.rest.getUserConnections(bearerToken)
    },
    getUserApplicationRoleConnection: async (bearerToken, applicationId) => {
      return await bot.rest.getUserApplicationRoleConnection(bearerToken, applicationId)
    },
    getVanityUrl: async (guildId) => {
      return await bot.rest.getVanityUrl(guildId)
    },
    getVoiceRegions: async (guildId) => {
      return (await bot.rest.getVoiceRegions(guildId)).map((res) => bot.transformers.voiceRegion(bot, snakelize(res)))
    },
    getWebhook: async (webhookId) => {
      return bot.transformers.webhook(bot, snakelize(await bot.rest.getWebhook(webhookId)))
    },
    getWebhookMessage: async (webhookId, token, messageId, options) => {
      return bot.transformers.message(bot, { message: snakelize(await bot.rest.getWebhookMessage(webhookId, token, messageId, options)), shardId: 0 })
    },
    getWebhookWithToken: async (webhookId, token) => {
      return bot.transformers.webhook(bot, snakelize(await bot.rest.getWebhookWithToken(webhookId, token)))
    },
    getWelcomeScreen: async (guildId) => {
      return bot.transformers.welcomeScreen(bot, snakelize(await bot.rest.getWelcomeScreen(guildId)))
    },
    getWidget: async (guildId) => {
      return bot.transformers.widget(bot, snakelize(await bot.rest.getWidget(guildId)))
    },
    getWidgetSettings: async (guildId) => {
      return bot.transformers.widgetSettings(bot, snakelize(await bot.rest.getWidgetSettings(guildId)))
    },
    publishMessage: async (channelId, messageId) => {
      return bot.transformers.message(bot, { message: snakelize(await bot.rest.publishMessage(channelId, messageId)), shardId: 0 })
    },
    sendMessage: async (channelId, options) => {
      return bot.transformers.message(bot, { message: snakelize(await bot.rest.sendMessage(channelId, options)), shardId: 0 })
    },
    sendFollowupMessage: async (token, options) => {
      return bot.transformers.message(bot, { message: snakelize(await bot.rest.sendFollowupMessage(token, options)), shardId: 0 })
    },
    startThreadWithMessage: async (channelId, messageId, options, reason) => {
      return bot.transformers.channel(bot, {
        channel: snakelize(await bot.rest.startThreadWithMessage(channelId, messageId, options, reason)),
      })
    },
    startThreadWithoutMessage: async (channelId, options, reason) => {
      return bot.transformers.channel(bot, { channel: snakelize(await bot.rest.startThreadWithoutMessage(channelId, options, reason)) })
    },
    syncGuildTemplate: async (guildId) => {
      return bot.transformers.template(bot, snakelize(await bot.rest.syncGuildTemplate(guildId)))
    },
    upsertGlobalApplicationCommands: async (commands, options) => {
      return (await bot.rest.upsertGlobalApplicationCommands(commands, options)).map((res) =>
        bot.transformers.applicationCommand(bot, snakelize(res)),
      )
    },
    upsertGuildApplicationCommands: async (guildId, commands, options) => {
      return (await bot.rest.upsertGuildApplicationCommands(guildId, commands, options)).map((res) =>
        bot.transformers.applicationCommand(bot, snakelize(res)),
      )
    },
    editBotMember: async (guildId, options, reason) => {
      return bot.transformers.member(bot, snakelize(await bot.rest.editBotMember(guildId, options, reason)), guildId, bot.id)
    },
    editMember: async (guildId, userId, options, reason) => {
      return bot.transformers.member(bot, snakelize(await bot.rest.editMember(guildId, userId, options, reason)), guildId, userId)
    },
    getMember: async (guildId, userId) => {
      return bot.transformers.member(bot, snakelize(await bot.rest.getMember(guildId, userId)), guildId, userId)
    },
    getCurrentMember: async (guildId, bearerToken) => {
      const res = await bot.rest.getCurrentMember(guildId, bearerToken)
      return bot.transformers.member(bot, snakelize(res), guildId, bot.transformers.snowflake(res.user.id))
    },
    getMembers: async (guildId, options) => {
      return (await bot.rest.getMembers(guildId, options)).map((res) =>
        bot.transformers.member(bot, snakelize(res), guildId, bot.transformers.snowflake(res.user.id)),
      )
    },
    pruneMembers: async (guildId, options, reason) => {
      return await bot.rest.pruneMembers(guildId, options, reason)
    },
    searchMembers: async (guildId, query, options) => {
      return (await bot.rest.searchMembers(guildId, query, options)).map((res) =>
        bot.transformers.member(bot, snakelize(res), guildId, bot.transformers.snowflake(res.user.id)),
      )
    },
    bulkBanMembers: async (guildId, options, reason) => {
      const res = await bot.rest.bulkBanMembers(guildId, options, reason)

      return {
        bannedUsers: res.bannedUsers.map((x) => bot.transformers.snowflake(x)),
        failedUsers: res.failedUsers.map((x) => bot.transformers.snowflake(x)),
      }
    },
    getApplicationActivityInstance: async (applicationId, instanceId) => {
      return await bot.rest.getApplicationActivityInstance(applicationId, instanceId)
    },
    // All useless void return functions here
    addReaction: async (channelId, messageId, reaction) => {
      return await bot.rest.addReaction(channelId, messageId, reaction)
    },
    addReactions: async (channelId, messageId, reactions, ordered) => {
      return await bot.rest.addReactions(channelId, messageId, reactions, ordered)
    },
    addRole: async (guildId, userId, roleId, reason) => {
      return await bot.rest.addRole(guildId, userId, roleId, reason)
    },
    addThreadMember: async (channelId, userId) => {
      return await bot.rest.addThreadMember(channelId, userId)
    },
    addDmRecipient: async (channelId, userId, options) => {
      return await bot.rest.addDmRecipient(channelId, userId, options)
    },
    addGuildMember: async (guildId, userId, options) => {
      return await bot.rest.addGuildMember(guildId, userId, options)
    },
    deleteAutomodRule: async (guildId, ruleId, reason) => {
      return await bot.rest.deleteAutomodRule(guildId, ruleId, reason)
    },
    deleteChannel: async (channelId, reason) => {
      return await bot.rest.deleteChannel(channelId, reason)
    },
    deleteChannelPermissionOverride: async (channelId, overwriteId, reason) => {
      return await bot.rest.deleteChannelPermissionOverride(channelId, overwriteId, reason)
    },
    deleteEmoji: async (guildId, id, reason) => {
      return await bot.rest.deleteEmoji(guildId, id, reason)
    },
    deleteApplicationEmoji: async (id) => {
      return await bot.rest.deleteApplicationEmoji(id)
    },
    deleteFollowupMessage: async (token, messageId) => {
      return await bot.rest.deleteFollowupMessage(token, messageId)
    },
    deleteGlobalApplicationCommand: async (commandId) => {
      return await bot.rest.deleteGlobalApplicationCommand(commandId)
    },
    deleteGuild: async (guildId) => {
      return await bot.rest.deleteGuild(guildId)
    },
    deleteGuildApplicationCommand: async (commandId, guildId) => {
      return await bot.rest.deleteGuildApplicationCommand(commandId, guildId)
    },
    deleteGuildSticker: async (guildId, stickerId, reason) => {
      return await bot.rest.deleteGuildSticker(guildId, stickerId, reason)
    },
    deleteGuildTemplate: async (guildId, templateCode) => {
      return await bot.rest.deleteGuildTemplate(guildId, templateCode)
    },
    deleteIntegration: async (guildId, integrationId, reason) => {
      return await bot.rest.deleteIntegration(guildId, integrationId, reason)
    },
    deleteInvite: async (inviteCode, reason) => {
      return await bot.rest.deleteInvite(inviteCode, reason)
    },
    deleteMessage: async (channelId, messageId, reason) => {
      return await bot.rest.deleteMessage(channelId, messageId, reason)
    },
    deleteMessages: async (channelId, messageIds, reason) => {
      return await bot.rest.deleteMessages(channelId, messageIds, reason)
    },
    deleteOriginalInteractionResponse: async (token) => {
      return await bot.rest.deleteOriginalInteractionResponse(token)
    },
    deleteOwnReaction: async (channelId, messageId, reaction) => {
      return await bot.rest.deleteOwnReaction(channelId, messageId, reaction)
    },
    deleteReactionsAll: async (channelId, messageId) => {
      return await bot.rest.deleteReactionsAll(channelId, messageId)
    },
    deleteReactionsEmoji: async (channelId, messageId, reaction) => {
      return await bot.rest.deleteReactionsEmoji(channelId, messageId, reaction)
    },
    deleteRole: async (guildId, roleId, reason) => {
      return await bot.rest.deleteRole(guildId, roleId, reason)
    },
    deleteScheduledEvent: async (guildId, eventId) => {
      return await bot.rest.deleteScheduledEvent(guildId, eventId)
    },
    deleteStageInstance: async (channelId, reason) => {
      return await bot.rest.deleteStageInstance(channelId, reason)
    },
    deleteUserReaction: async (channelId, messageId, userId, reaction) => {
      return await bot.rest.deleteUserReaction(channelId, messageId, userId, reaction)
    },
    deleteWebhook: async (webhookId, reason) => {
      return await bot.rest.deleteWebhook(webhookId, reason)
    },
    deleteWebhookMessage: async (webhookId, token, messageId, options) => {
      return await bot.rest.deleteWebhookMessage(webhookId, token, messageId, options)
    },
    deleteWebhookWithToken: async (webhookId, token) => {
      return await bot.rest.deleteWebhookWithToken(webhookId, token)
    },
    editChannelPermissionOverrides: async (channelId, options, reason) => {
      return await bot.rest.editChannelPermissionOverrides(channelId, options, reason)
    },
    editChannelPositions: async (guildId, channelPositions) => {
      return await bot.rest.editChannelPositions(guildId, channelPositions)
    },
    editGuildMfaLevel: async (guildId, mfaLevel, reason) => {
      return await bot.rest.editGuildMfaLevel(guildId, mfaLevel, reason)
    },
    editOwnVoiceState: async (guildId, options) => {
      return await bot.rest.editOwnVoiceState(guildId, options)
    },
    editUserVoiceState: async (guildId, options) => {
      return await bot.rest.editUserVoiceState(guildId, options)
    },
    editUserApplicationRoleConnection: async (bearerToken, applicationId, options) => {
      return await bot.rest.editUserApplicationRoleConnection(bearerToken, applicationId, options)
    },
    joinThread: async (channelId) => {
      return await bot.rest.joinThread(channelId)
    },
    leaveGuild: async (guildId) => {
      return await bot.rest.leaveGuild(guildId)
    },
    leaveThread: async (channelId) => {
      return await bot.rest.leaveThread(channelId)
    },
    removeRole: async (guildId, userId, roleId, reason) => {
      return await bot.rest.removeRole(guildId, userId, roleId, reason)
    },
    removeThreadMember: async (channelId, userId) => {
      return await bot.rest.removeThreadMember(channelId, userId)
    },
    removeDmRecipient: async (channelId, userId) => {
      return await bot.rest.removeDmRecipient(channelId, userId)
    },
    sendInteractionResponse: async (interactionId, token, options, params) => {
      const response = await bot.rest.sendInteractionResponse(interactionId, token, options, params)

      if (!response) return

      return bot.transformers.interactionCallbackResponse(bot, { interactionCallbackResponse: snakelize(response), shardId: 0 })
    },
    triggerTypingIndicator: async (channelId) => {
      return await bot.rest.triggerTypingIndicator(channelId)
    },
    banMember: async (guildId, userId, options, reason) => {
      return await bot.rest.banMember(guildId, userId, options, reason)
    },

    kickMember: async (guildId, userId, reason) => {
      return await bot.rest.kickMember(guildId, userId, reason)
    },
    pinMessage: async (channelId, messageId, reason) => {
      return await bot.rest.pinMessage(channelId, messageId, reason)
    },
    unbanMember: async (guildId, userId, reason) => {
      return await bot.rest.unbanMember(guildId, userId, reason)
    },
    unpinMessage: async (channelId, messageId, reason) => {
      return await bot.rest.unpinMessage(channelId, messageId, reason)
    },
    getGuildOnboarding: async (guildId) => {
      return bot.transformers.guildOnboarding(bot, snakelize(await bot.rest.getGuildOnboarding(guildId)))
    },
    editGuildOnboarding: async (guildId, options, reason) => {
      return bot.transformers.guildOnboarding(bot, snakelize(await bot.rest.editGuildOnboarding(guildId, options, reason)))
    },
    listEntitlements: async (applicationId, options) => {
      return (await bot.rest.listEntitlements(applicationId, options)).map((entitlement) => bot.transformers.entitlement(bot, snakelize(entitlement)))
    },
    getEntitlement: async (applicationId, entitlementId) => {
      return bot.transformers.entitlement(bot, snakelize(await bot.rest.getEntitlement(applicationId, entitlementId)))
    },
    createTestEntitlement: async (applicationId, body) => {
      // @ts-expect-error createTestEntitlement gives a partial, and this method returns a partial
      return bot.transformers.entitlement(bot, snakelize(await bot.rest.createTestEntitlement(applicationId, body))) as Partial<
        typeof bot.transformers.$inferredTypes.entitlement
      >
    },
    deleteTestEntitlement: async (applicationId, entitlementId) => {
      await bot.rest.deleteTestEntitlement(applicationId, entitlementId)
    },
    listSkus: async (applicationId) => {
      return (await bot.rest.listSkus(applicationId)).map((sku) => bot.transformers.sku(bot, snakelize(sku)))
    },
    getSubscription: async (skuId, subscriptionId) => {
      return bot.transformers.subscription(bot, snakelize(await bot.rest.getSubscription(skuId, subscriptionId)))
    },
    listSubscriptions: async (skuId, options) => {
      return (await bot.rest.listSubscriptions(skuId, options)).map((subscription) => bot.transformers.subscription(bot, snakelize(subscription)))
    },
    sendSoundboardSound: async (channelId, options) => {
      await bot.rest.sendSoundboardSound(channelId, options)
    },
    listDefaultSoundboardSounds: async () => {
      return (await bot.rest.listDefaultSoundboardSounds()).map((sound) => bot.transformers.soundboardSound(bot, snakelize(sound)))
    },
    listGuildSoundboardSounds: async (guildId) => {
      const res = await bot.rest.listGuildSoundboardSounds(guildId)

      return {
        items: res.items.map((sound) => bot.transformers.soundboardSound(bot, snakelize(sound))),
      }
    },
    getGuildSoundboardSound: async (guildId, soundId) => {
      return bot.transformers.soundboardSound(bot, snakelize(await bot.rest.getGuildSoundboardSound(guildId, soundId)))
    },
    createGuildSoundboardSound: async (guildId, options, reason) => {
      return bot.transformers.soundboardSound(bot, snakelize(await bot.rest.createGuildSoundboardSound(guildId, options, reason)))
    },
    modifyGuildSoundboardSound: async (guildId, soundId, options, reason) => {
      return bot.transformers.soundboardSound(bot, snakelize(await bot.rest.modifyGuildSoundboardSound(guildId, soundId, options, reason)))
    },
    deleteGuildSoundboardSound: async (guildId, soundId, reason) => {
      await bot.rest.deleteGuildSoundboardSound(guildId, soundId, reason)
    },
  }
}

export type BotHelpers<TProps extends TransformersDesiredProperties, TBehavior extends DesiredPropertiesBehavior> = {
  createAutomodRule: (guildId: BigString, options: CreateAutoModerationRuleOptions, reason?: string) => Promise<AutoModerationRule>
  createChannel: (guildId: BigString, options: CreateGuildChannel, reason?: string) => Promise<SetupDesiredProps<Channel, TProps, TBehavior>>
  createEmoji: (guildId: BigString, options: CreateGuildEmoji, reason?: string) => Promise<SetupDesiredProps<Emoji, TProps, TBehavior>>
  createApplicationEmoji: (options: CreateApplicationEmoji) => Promise<SetupDesiredProps<Emoji, TProps, TBehavior>>
  createForumThread: (
    channelId: BigString,
    options: CreateForumPostWithMessage,
    reason?: string,
  ) => Promise<SetupDesiredProps<Channel, TProps, TBehavior>>
  createGlobalApplicationCommand: (command: CreateApplicationCommand, options?: CreateGlobalApplicationCommandOptions) => Promise<ApplicationCommand>
  createGuild: (options: CreateGuild) => Promise<SetupDesiredProps<Guild, TProps, TBehavior>>
  createGuildApplicationCommand: (
    command: CreateApplicationCommand,
    guildId: BigString,
    options?: CreateGuildApplicationCommandOptions,
  ) => Promise<ApplicationCommand>
  createGuildFromTemplate: (templateCode: string, options: CreateGuildFromTemplate) => Promise<SetupDesiredProps<Guild, TProps, TBehavior>>
  createGuildSticker: (
    guildId: BigString,
    options: CreateGuildStickerOptions,
    reason?: string,
  ) => Promise<SetupDesiredProps<Sticker, TProps, TBehavior>>
  createGuildTemplate: (guildId: BigString, options: CreateTemplate) => Promise<Template>
  createInvite: (channelId: BigString, options?: CreateChannelInvite, reason?: string) => Promise<Camelize<DiscordInvite>>
  createRole: (guildId: BigString, options: CreateGuildRole, reason?: string) => Promise<SetupDesiredProps<Role, TProps, TBehavior>>
  createScheduledEvent: (
    guildId: BigString,
    options: CreateScheduledEvent,
    reason?: string,
  ) => Promise<SetupDesiredProps<ScheduledEvent, TProps, TBehavior>>
  createStageInstance: (options: CreateStageInstance, reason?: string) => Promise<SetupDesiredProps<StageInstance, TProps, TBehavior>>
  createWebhook: (channelId: BigString, options: CreateWebhook, reason?: string) => Promise<SetupDesiredProps<Webhook, TProps, TBehavior>>
  editApplicationCommandPermissions: (
    guildId: BigString,
    commandId: BigString,
    bearerToken: string,
    options: Camelize<DiscordApplicationCommandPermissions>[],
  ) => Promise<GuildApplicationCommandPermissions>
  editAutomodRule: (
    guildId: BigString,
    ruleId: BigString,
    options: Partial<EditAutoModerationRuleOptions>,
    reason?: string,
  ) => Promise<AutoModerationRule>
  editBotProfile: (options: { username?: string; botAvatarURL?: string | null }) => Promise<SetupDesiredProps<User, TProps, TBehavior>>
  editChannel: (channelId: BigString, options: ModifyChannel, reason?: string) => Promise<SetupDesiredProps<Channel, TProps, TBehavior>>
  editEmoji: (guildId: BigString, id: BigString, options: ModifyGuildEmoji, reason?: string) => Promise<SetupDesiredProps<Emoji, TProps, TBehavior>>
  editApplicationEmoji: (id: BigString, options: ModifyApplicationEmoji) => Promise<SetupDesiredProps<Emoji, TProps, TBehavior>>
  editFollowupMessage: (
    token: string,
    messageId: BigString,
    options: InteractionCallbackData,
  ) => Promise<SetupDesiredProps<Message, TProps, TBehavior>>
  editGlobalApplicationCommand: (commandId: BigString, options: CreateApplicationCommand) => Promise<ApplicationCommand>
  editGuild: (guildId: BigString, options: ModifyGuild, reason?: string) => Promise<SetupDesiredProps<Guild, TProps, TBehavior>>
  editGuildApplicationCommand: (commandId: BigString, guildId: BigString, options: CreateApplicationCommand) => Promise<ApplicationCommand>
  editGuildSticker: (
    guildId: BigString,
    stickerId: BigString,
    options: AtLeastOne<EditGuildStickerOptions>,
    reason?: string,
  ) => Promise<SetupDesiredProps<Sticker, TProps, TBehavior>>
  editGuildTemplate: (guildId: BigString, templateCode: string, options: ModifyGuildTemplate) => Promise<Template>
  editMessage: (channelId: BigString, messageId: BigString, options: EditMessage) => Promise<SetupDesiredProps<Message, TProps, TBehavior>>
  editOriginalInteractionResponse: (token: string, options: InteractionCallbackData) => Promise<SetupDesiredProps<Message, TProps, TBehavior>>
  editOriginalWebhookMessage: (
    webhookId: BigString,
    token: string,
    options: InteractionCallbackData & { threadId?: BigString },
  ) => Promise<SetupDesiredProps<Message, TProps, TBehavior>>
  editRole: (guildId: BigString, roleId: BigString, options: EditGuildRole, reason?: string) => Promise<SetupDesiredProps<Role, TProps, TBehavior>>
  editRolePositions: (guildId: BigString, options: ModifyRolePositions[], reason?: string) => Promise<SetupDesiredProps<Role, TProps, TBehavior>[]>
  editScheduledEvent: (
    guildId: BigString,
    eventId: BigString,
    options: Partial<EditScheduledEvent>,
    reason?: string,
  ) => Promise<SetupDesiredProps<ScheduledEvent, TProps, TBehavior>>
  editStageInstance: (channelId: BigString, topic: string, reason?: string) => Promise<SetupDesiredProps<StageInstance, TProps, TBehavior>>
  editWebhook: (webhookId: BigString, options: ModifyWebhook, reason?: string) => Promise<SetupDesiredProps<Webhook, TProps, TBehavior>>
  editWebhookMessage: (
    webhookId: BigString,
    token: string,
    messageId: BigString,
    options: InteractionCallbackData & { threadId?: BigString },
  ) => Promise<SetupDesiredProps<Message, TProps, TBehavior>>
  editWebhookWithToken: (
    webhookId: BigString,
    token: string,
    options: Omit<ModifyWebhook, 'channelId'>,
  ) => Promise<SetupDesiredProps<Webhook, TProps, TBehavior>>
  editWelcomeScreen: (guildId: BigString, options: Camelize<DiscordModifyGuildWelcomeScreen>, reason?: string) => Promise<WelcomeScreen>
  editWidgetSettings: (guildId: BigString, options: Camelize<DiscordGuildWidgetSettings>, reason?: string) => Promise<GuildWidgetSettings>
  editUserApplicationRoleConnection: (
    bearerToken: string,
    applicationId: BigString,
    options: Camelize<DiscordApplicationRoleConnection>,
  ) => Promise<Camelize<DiscordApplicationRoleConnection>>
  executeWebhook: (webhookId: BigString, token: string, options: ExecuteWebhook) => Promise<SetupDesiredProps<Message, TProps, TBehavior> | undefined>
  followAnnouncement: (sourceChannelId: BigString, targetChannelId: BigString) => Promise<Camelize<DiscordFollowedChannel>>
  getActiveThreads: (guildId: BigString) => Promise<{ threads: SetupDesiredProps<Channel, TProps, TBehavior>[]; members: ThreadMember[] }>
  getApplicationInfo: () => Promise<Application>
  editApplicationInfo: (body: EditApplication) => Promise<Application>
  getCurrentAuthenticationInfo: (bearerToken: string) => Promise<Camelize<DiscordCurrentAuthorization>>
  exchangeToken: (clientId: BigString, clientSecret: string, options: Camelize<DiscordTokenExchange>) => Promise<Camelize<DiscordAccessTokenResponse>>
  revokeToken: (clientId: BigString, clientSecret: string, options: Camelize<DiscordTokenRevocation>) => Promise<void>
  getApplicationCommandPermission: (
    guildId: BigString,
    commandId: BigString,
    options?: GetApplicationCommandPermissionOptions,
  ) => Promise<GuildApplicationCommandPermissions>
  getApplicationCommandPermissions: (
    guildId: BigString,
    options?: GetApplicationCommandPermissionOptions,
  ) => Promise<GuildApplicationCommandPermissions[]>
  getAuditLog: (guildId: BigString, options?: GetGuildAuditLog) => Promise<Camelize<DiscordAuditLog>>
  getAutomodRule: (guildId: BigString, ruleId: BigString) => Promise<AutoModerationRule>
  getAutomodRules: (guildId: BigString) => Promise<AutoModerationRule[]>
  getAvailableVoiceRegions: () => Promise<Camelize<DiscordVoiceRegion>[]>
  getBan: (guildId: BigString, userId: BigString) => Promise<Camelize<DiscordBan>>
  getBans: (guildId: BigString, options?: GetBans) => Promise<Camelize<DiscordBan>[]>
  getChannel: (channelId: BigString) => Promise<SetupDesiredProps<Channel, TProps, TBehavior>>
  getChannelInvites: (channelId: BigString) => Promise<Camelize<DiscordInviteMetadata>[]>
  getChannels: (guildId: BigString) => Promise<SetupDesiredProps<Channel, TProps, TBehavior>[]>
  getChannelWebhooks: (channelId: BigString) => Promise<SetupDesiredProps<Webhook, TProps, TBehavior>[]>
  getDmChannel: (userId: BigString) => Promise<SetupDesiredProps<Channel, TProps, TBehavior>>
  getGroupDmChannel: (options: GetGroupDmOptions) => Promise<SetupDesiredProps<Channel, TProps, TBehavior>>
  getEmoji: (guildId: BigString, emojiId: BigString) => Promise<SetupDesiredProps<Emoji, TProps, TBehavior>>
  getApplicationEmoji: (emojiId: BigString) => Promise<SetupDesiredProps<Emoji, TProps, TBehavior>>
  getEmojis: (guildId: BigString) => Promise<SetupDesiredProps<Emoji, TProps, TBehavior>[]>
  getApplicationEmojis: () => Promise<{ items: SetupDesiredProps<Emoji, TProps, TBehavior>[] }>
  getFollowupMessage: (token: string, messageId: BigString) => Promise<SetupDesiredProps<Message, TProps, TBehavior>>
  getGatewayBot: () => Promise<Camelize<DiscordGetGatewayBot>>
  getGlobalApplicationCommand: (commandId: BigString) => Promise<ApplicationCommand>
  getGlobalApplicationCommands: () => Promise<ApplicationCommand[]>
  getGuild: (guildId: BigString, options?: { counts?: boolean }) => Promise<SetupDesiredProps<Guild, TProps, TBehavior>>
  getGuilds: (bearerToken: string, options?: GetUserGuilds) => Promise<Partial<SetupDesiredProps<Guild, TProps, TBehavior>>[]>
  getGuildApplicationCommand: (commandId: BigString, guildId: BigString) => Promise<ApplicationCommand>
  getGuildApplicationCommands: (guildId: BigString) => Promise<ApplicationCommand[]>
  getGuildPreview: (guildId: BigString) => Promise<Camelize<DiscordGuildPreview>>
  getGuildSticker: (guildId: BigString, stickerId: BigString) => Promise<SetupDesiredProps<Sticker, TProps, TBehavior>>
  getGuildStickers: (guildId: BigString) => Promise<SetupDesiredProps<Sticker, TProps, TBehavior>[]>
  getGuildTemplate: (templateCode: string) => Promise<Template>
  getGuildTemplates: (guildId: BigString) => Promise<Template[]>
  getGuildWebhooks: (guildId: BigString) => Promise<SetupDesiredProps<Webhook, TProps, TBehavior>[]>
  getIntegrations: (guildId: BigString) => Promise<Integration[]>
  getInvite: (inviteCode: string, options?: GetInvite) => Promise<SetupDesiredProps<Invite, TProps, TBehavior>>
  getInvites: (guildId: BigString) => Promise<SetupDesiredProps<Invite, TProps, TBehavior>[]>
  getMessage: (channelId: BigString, messageId: BigString) => Promise<SetupDesiredProps<Message, TProps, TBehavior>>
  getMessages: (channelId: BigString, options?: GetMessagesOptions) => Promise<SetupDesiredProps<Message, TProps, TBehavior>[]>
  getStickerPack: (stickerPackId: BigString) => Promise<StickerPack>
  getStickerPacks: () => Promise<StickerPack[]>
  getOriginalInteractionResponse: (token: string) => Promise<SetupDesiredProps<Message, TProps, TBehavior>>
  getPinnedMessages: (channelId: BigString) => Promise<SetupDesiredProps<Message, TProps, TBehavior>[]>
  getPrivateArchivedThreads: (channelId: BigString, options?: ListArchivedThreads) => Promise<Camelize<DiscordArchivedThreads>>
  getPrivateJoinedArchivedThreads: (channelId: BigString, options?: ListArchivedThreads) => Promise<Camelize<DiscordArchivedThreads>>
  getPruneCount: (guildId: BigString, options?: GetGuildPruneCountQuery) => Promise<Camelize<DiscordPrunedCount>>
  getPublicArchivedThreads: (channelId: BigString, options?: ListArchivedThreads) => Promise<Camelize<DiscordArchivedThreads>>
  getRoles: (guildId: BigString) => Promise<SetupDesiredProps<Role, TProps, TBehavior>[]>
  getRole: (guildId: BigString, roleId: BigString) => Promise<SetupDesiredProps<Role, TProps, TBehavior>>
  getScheduledEvent: (
    guildId: BigString,
    eventId: BigString,
    options?: { withUserCount?: boolean },
  ) => Promise<SetupDesiredProps<ScheduledEvent, TProps, TBehavior>>
  getScheduledEvents: (guildId: BigString, options?: GetScheduledEvents) => Promise<SetupDesiredProps<ScheduledEvent, TProps, TBehavior>[]>
  getScheduledEventUsers: (
    guildId: BigString,
    eventId: BigString,
    options?: GetScheduledEventUsers,
  ) => Promise<Array<{ user: SetupDesiredProps<User, TProps, TBehavior>; member?: SetupDesiredProps<Member, TProps, TBehavior> }>>
  getSessionInfo: () => Promise<Camelize<DiscordGetGatewayBot>>
  getStageInstance: (channelId: BigString) => Promise<SetupDesiredProps<StageInstance, TProps, TBehavior>>
  getOwnVoiceState: (guildId: BigString) => Promise<SetupDesiredProps<VoiceState, TProps, TBehavior>>
  getUserVoiceState: (guildId: BigString, userId: BigString) => Promise<SetupDesiredProps<VoiceState, TProps, TBehavior>>
  getSticker: (stickerId: BigString) => Promise<SetupDesiredProps<Sticker, TProps, TBehavior>>
  getThreadMember: (channelId: BigString, userId: BigString) => Promise<ThreadMember>
  getThreadMembers: (channelId: BigString) => Promise<ThreadMember[]>
  getReactions: (
    channelId: BigString,
    messageId: BigString,
    reaction: string,
    options?: GetReactions,
  ) => Promise<SetupDesiredProps<User, TProps, TBehavior>[]>
  getUser: (id: BigString) => Promise<SetupDesiredProps<User, TProps, TBehavior>>
  getCurrentUser: (bearerToken: string) => Promise<SetupDesiredProps<User, TProps, TBehavior>>
  getUserConnections: (bearerToken: string) => Promise<Camelize<DiscordConnection>[]>
  getUserApplicationRoleConnection: (bearerToken: string, applicationId: BigString) => Promise<Camelize<DiscordApplicationRoleConnection>>
  getVanityUrl: (guildId: BigString) => Promise<Camelize<DiscordVanityUrl>>
  getVoiceRegions: (guildId: BigString) => Promise<Camelize<DiscordVoiceRegion>[]>
  getWebhook: (webhookId: BigString) => Promise<SetupDesiredProps<Webhook, TProps, TBehavior>>
  getWebhookMessage: (
    webhookId: BigString,
    token: string,
    messageId: BigString,
    options?: GetWebhookMessageOptions,
  ) => Promise<SetupDesiredProps<Message, TProps, TBehavior>>
  getWebhookWithToken: (webhookId: BigString, token: string) => Promise<SetupDesiredProps<Webhook, TProps, TBehavior>>
  getWelcomeScreen: (guildId: BigString) => Promise<WelcomeScreen>
  getWidget: (guildId: BigString) => Promise<GuildWidget>
  getWidgetSettings: (guildId: BigString) => Promise<GuildWidgetSettings>
  publishMessage: (channelId: BigString, messageId: BigString) => Promise<SetupDesiredProps<Message, TProps, TBehavior>>
  sendMessage: (channelId: BigString, options: CreateMessageOptions) => Promise<SetupDesiredProps<Message, TProps, TBehavior>>
  sendFollowupMessage: (token: string, options: InteractionCallbackData) => Promise<SetupDesiredProps<Message, TProps, TBehavior>>
  startThreadWithMessage: (
    channelId: BigString,
    messageId: BigString,
    options: StartThreadWithMessage,
    reason?: string,
  ) => Promise<SetupDesiredProps<Channel, TProps, TBehavior>>
  startThreadWithoutMessage: (
    channelId: BigString,
    options: StartThreadWithoutMessage,
    reason?: string,
  ) => Promise<SetupDesiredProps<Channel, TProps, TBehavior>>
  syncGuildTemplate: (guildId: BigString) => Promise<Template>
  upsertGlobalApplicationCommands: (
    commands: CreateApplicationCommand[],
    options?: UpsertGlobalApplicationCommandOptions,
  ) => Promise<ApplicationCommand[]>
  upsertGuildApplicationCommands: (
    guildId: BigString,
    commands: CreateApplicationCommand[],
    options?: UpsertGuildApplicationCommandOptions,
  ) => Promise<ApplicationCommand[]>
  editBotMember: (guildId: BigString, options: EditBotMemberOptions, reason?: string) => Promise<SetupDesiredProps<Member, TProps, TBehavior>>
  editMember: (
    guildId: BigString,
    userId: BigString,
    options: ModifyGuildMember,
    reason?: string,
  ) => Promise<SetupDesiredProps<Member, TProps, TBehavior>>
  getMember: (guildId: BigString, userId: BigString) => Promise<SetupDesiredProps<Member, TProps, TBehavior>>
  getCurrentMember: (guildId: BigString, bearerToken: string) => Promise<SetupDesiredProps<Member, TProps, TBehavior>>
  getMembers: (guildId: BigString, options: ListGuildMembers) => Promise<SetupDesiredProps<Member, TProps, TBehavior>[]>
  pruneMembers: (guildId: BigString, options: BeginGuildPrune, reason?: string) => Promise<{ pruned: number | null }>
  searchMembers: (
    guildId: BigString,
    query: string,
    options?: Omit<SearchMembers, 'query'>,
  ) => Promise<SetupDesiredProps<Member, TProps, TBehavior>[]>
  bulkBanMembers: (guildId: BigString, options: CreateGuildBulkBan, reason?: string) => Promise<{ bannedUsers: bigint[]; failedUsers: bigint[] }>
  getApplicationActivityInstance: (applicationId: BigString, instanceId: string) => Promise<Camelize<DiscordActivityInstance>>
  // functions return Void so dont need any special handling
  addReaction: (channelId: BigString, messageId: BigString, reaction: string) => Promise<void>
  addReactions: (channelId: BigString, messageId: BigString, reactions: string[], ordered?: boolean) => Promise<void>
  addRole: (guildId: BigString, userId: BigString, roleId: BigString, reason?: string) => Promise<void>
  addThreadMember: (channelId: BigString, userId: BigString) => Promise<void>
  addDmRecipient: (channelId: BigString, userId: BigString, options: AddDmRecipientOptions) => Promise<void>
  addGuildMember: (guildId: BigString, userId: BigString, options: AddGuildMemberOptions) => Promise<void>
  deleteAutomodRule: (guildId: BigString, ruleId: BigString, reason?: string) => Promise<void>
  deleteChannel: (channelId: BigString, reason?: string) => Promise<void>
  deleteChannelPermissionOverride: (channelId: BigString, overwriteId: BigString, reason?: string) => Promise<void>
  deleteEmoji: (guildId: BigString, id: BigString, reason?: string) => Promise<void>
  deleteApplicationEmoji: (id: BigString) => Promise<void>
  deleteFollowupMessage: (token: string, messageId: BigString) => Promise<void>
  deleteGlobalApplicationCommand: (commandId: BigString) => Promise<void>
  deleteGuild: (guildId: BigString) => Promise<void>
  deleteGuildApplicationCommand: (commandId: BigString, guildId: BigString) => Promise<void>
  deleteGuildSticker: (guildId: BigString, stickerId: BigString, reason?: string) => Promise<void>
  deleteGuildTemplate: (guildId: BigString, templateCode: string) => Promise<void>
  deleteIntegration: (guildId: BigString, integrationId: BigString, reason?: string) => Promise<void>
  deleteInvite: (inviteCode: string, reason?: string) => Promise<void>
  deleteMessage: (channelId: BigString, messageId: BigString, reason?: string) => Promise<void>
  deleteMessages: (channelId: BigString, messageIds: BigString[], reason?: string) => Promise<void>
  deleteOriginalInteractionResponse: (token: string) => Promise<void>
  deleteOwnReaction: (channelId: BigString, messageId: BigString, reaction: string) => Promise<void>
  deleteReactionsAll: (channelId: BigString, messageId: BigString) => Promise<void>
  deleteReactionsEmoji: (channelId: BigString, messageId: BigString, reaction: string) => Promise<void>
  deleteRole: (guildId: BigString, roleId: BigString, reason?: string) => Promise<void>
  deleteScheduledEvent: (guildId: BigString, eventId: BigString) => Promise<void>
  deleteStageInstance: (channelId: BigString, reason?: string) => Promise<void>
  deleteUserReaction: (channelId: BigString, messageId: BigString, userId: BigString, reaction: string) => Promise<void>
  deleteWebhook: (webhookId: BigString, reason?: string) => Promise<void>
  deleteWebhookMessage: (webhookId: BigString, token: string, messageId: BigString, options?: DeleteWebhookMessageOptions) => Promise<void>
  deleteWebhookWithToken: (webhookId: BigString, token: string) => Promise<void>
  editChannelPermissionOverrides: (channelId: BigString, options: EditChannelPermissionOverridesOptions, reason?: string) => Promise<void>
  editChannelPositions: (guildId: BigString, channelPositions: ModifyGuildChannelPositions[]) => Promise<void>
  editGuildMfaLevel: (guildId: BigString, mfaLevel: MfaLevels, reason?: string) => Promise<void>
  editOwnVoiceState: (guildId: BigString, options: EditOwnVoiceState) => Promise<void>
  editUserVoiceState: (guildId: BigString, options: EditUserVoiceState) => Promise<void>
  joinThread: (channelId: BigString) => Promise<void>
  leaveGuild: (guildId: BigString) => Promise<void>
  leaveThread: (channelId: BigString) => Promise<void>
  removeRole: (guildId: BigString, userId: BigString, roleId: BigString, reason?: string) => Promise<void>
  removeThreadMember: (channelId: BigString, userId: BigString) => Promise<void>
  removeDmRecipient: (channelId: BigString, userId: BigString) => Promise<void>
  sendInteractionResponse: (
    interactionId: BigString,
    token: string,
    options: InteractionResponse,
    params?: InteractionCallbackOptions,
  ) => Promise<void | SetupDesiredProps<InteractionCallbackResponse, TProps, TBehavior>>
  triggerTypingIndicator: (channelId: BigString) => Promise<void>
  banMember: (guildId: BigString, userId: BigString, options?: CreateGuildBan, reason?: string) => Promise<void>
  kickMember: (guildId: BigString, userId: BigString, reason?: string) => Promise<void>
  pinMessage: (channelId: BigString, messageId: BigString, reason?: string) => Promise<void>
  unbanMember: (guildId: BigString, userId: BigString, reason?: string) => Promise<void>
  unpinMessage: (channelId: BigString, messageId: BigString, reason?: string) => Promise<void>
  getGuildOnboarding: (guildId: BigString) => Promise<SetupDesiredProps<GuildOnboarding, TProps, TBehavior>>
  editGuildOnboarding: (
    guildId: BigString,
    options: EditGuildOnboarding,
    reason?: string,
  ) => Promise<SetupDesiredProps<GuildOnboarding, TProps, TBehavior>>
  listEntitlements: (applicationId: BigString, options?: GetEntitlements) => Promise<SetupDesiredProps<Entitlement, TProps, TBehavior>[]>
  getEntitlement: (applicationId: BigString, entitlementId: BigString) => Promise<SetupDesiredProps<Entitlement, TProps, TBehavior>>
  createTestEntitlement: (applicationId: BigString, body: CreateEntitlement) => Promise<Partial<SetupDesiredProps<Entitlement, TProps, TBehavior>>>
  deleteTestEntitlement: (applicationId: BigString, entitlementId: BigString) => Promise<void>
  listSkus: (applicationId: BigString) => Promise<SetupDesiredProps<Sku, TProps, TBehavior>[]>
  listSubscriptions: (skuId: BigString, options?: ListSkuSubscriptionsOptions) => Promise<SetupDesiredProps<Subscription, TProps, TBehavior>[]>
  getSubscription: (skuId: BigString, subscriptionId: BigString) => Promise<SetupDesiredProps<Subscription, TProps, TBehavior>>
  sendSoundboardSound: (channelId: BigString, options: SendSoundboardSound) => Promise<void>
  listDefaultSoundboardSounds: () => Promise<SetupDesiredProps<SoundboardSound, TProps, TBehavior>[]>
  listGuildSoundboardSounds: (guildId: BigString) => Promise<{ items: SetupDesiredProps<SoundboardSound, TProps, TBehavior>[] }>
  getGuildSoundboardSound: (guildId: BigString, soundId: BigString) => Promise<SetupDesiredProps<SoundboardSound, TProps, TBehavior>>
  createGuildSoundboardSound: (
    guildId: BigString,
    options: CreateGuildSoundboardSound,
    reason?: string,
  ) => Promise<SetupDesiredProps<SoundboardSound, TProps, TBehavior>>
  modifyGuildSoundboardSound: (
    guildId: BigString,
    soundId: BigString,
    options: ModifyGuildSoundboardSound,
    reason?: string,
  ) => Promise<SetupDesiredProps<SoundboardSound, TProps, TBehavior>>
  deleteGuildSoundboardSound: (guildId: BigString, soundId: BigString, reason?: string) => Promise<void>
}
