import type { CreateWebhook } from '@discordeno/rest'
import type {
  AddDmRecipientOptions,
  AddGuildMemberOptions,
  ApplicationCommandPermissions,
  AtLeastOne,
  BeginGuildPrune,
  BigString,
  CamelizedDiscordAccessTokenResponse,
  CamelizedDiscordApplicationRoleConnection,
  CamelizedDiscordArchivedThreads,
  CamelizedDiscordAuditLog,
  CamelizedDiscordBan,
  CamelizedDiscordConnection,
  CamelizedDiscordCurrentAuthorization,
  CamelizedDiscordFollowedChannel,
  CamelizedDiscordGetGatewayBot,
  CamelizedDiscordGuildPreview,
  CamelizedDiscordGuildWidgetSettings,
  CamelizedDiscordInvite,
  CamelizedDiscordInviteMetadata,
  CamelizedDiscordModifyGuildWelcomeScreen,
  CamelizedDiscordPartialGuild,
  CamelizedDiscordPrunedCount,
  CamelizedDiscordTokenExchange,
  CamelizedDiscordTokenRevocation,
  CamelizedDiscordVanityUrl,
  CamelizedDiscordVoiceRegion,
  CreateApplicationCommand,
  CreateAutoModerationRuleOptions,
  CreateChannelInvite,
  CreateForumPostWithMessage,
  CreateGlobalApplicationCommandOptions,
  CreateGuild,
  CreateGuildApplicationCommandOptions,
  CreateGuildBan,
  CreateGuildChannel,
  CreateGuildEmoji,
  CreateGuildFromTemplate,
  CreateGuildRole,
  CreateGuildStickerOptions,
  CreateMessageOptions,
  CreateScheduledEvent,
  CreateStageInstance,
  CreateTemplate,
  DeleteWebhookMessageOptions,
  DiscordMessage,
  EditAutoModerationRuleOptions,
  EditBotMemberOptions,
  EditChannelPermissionOverridesOptions,
  EditGuildRole,
  EditGuildStickerOptions,
  EditMessage,
  EditOwnVoiceState,
  EditScheduledEvent,
  EditUserVoiceState,
  ExecuteWebhook,
  GetApplicationCommandPermissionOptions,
  GetBans,
  GetGroupDmOptions,
  GetGuildAuditLog,
  GetGuildPruneCountQuery,
  GetInvite,
  GetMessagesOptions,
  GetReactions,
  GetScheduledEvents,
  GetScheduledEventUsers,
  GetUserGuilds,
  GetWebhookMessageOptions,
  InteractionCallbackData,
  InteractionResponse,
  ListArchivedThreads,
  ListGuildMembers,
  MfaLevels,
  ModifyChannel,
  ModifyGuild,
  ModifyGuildChannelPositions,
  ModifyGuildEmoji,
  ModifyGuildMember,
  ModifyGuildTemplate,
  ModifyRolePositions,
  ModifyWebhook,
  SearchMembers,
  StartThreadWithMessage,
  StartThreadWithoutMessage,
  UpsertGlobalApplicationCommandOptions,
  UpsertGuildApplicationCommandOptions,
} from '@discordeno/types'
import { snakelize } from '@discordeno/utils'
import type { Bot } from './bot.js'
import type { Application } from './transformers/application.js'
import type { ApplicationCommand } from './transformers/applicationCommand.js'
import type { ApplicationCommandPermission } from './transformers/applicationCommandPermission.js'
import type { AutoModerationRule } from './transformers/automodRule.js'
import type { Channel } from './transformers/channel.js'
import type { Emoji } from './transformers/emoji.js'
import type { Guild } from './transformers/guild.js'
import type { Integration } from './transformers/integration.js'
import type { Member } from './transformers/member.js'
import type { Message } from './transformers/message.js'
import type { Role } from './transformers/role.js'
import type { ScheduledEvent } from './transformers/scheduledEvent.js'
import type { StageInstance } from './transformers/stageInstance.js'
import type { Sticker, StickerPack } from './transformers/sticker.js'
import type { Template } from './transformers/template.js'
import type { ThreadMember } from './transformers/threadMember.js'
import type { User } from './transformers/user.js'
import type { Webhook } from './transformers/webhook.js'
import type { WelcomeScreen } from './transformers/welcomeScreen.js'
import type { GuildWidget } from './transformers/widget.js'
import type { GuildWidgetSettings } from './transformers/widgetSettings.js'

export function createBotHelpers(bot: Bot): BotHelpers {
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
    editFollowupMessage: async (token, messageId, options) => {
      return bot.transformers.message(bot, snakelize(await bot.rest.editFollowupMessage(token, messageId, options)))
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
      return bot.transformers.message(bot, snakelize(await bot.rest.editMessage(channelId, messageId, options)) as DiscordMessage)
    },
    editOriginalInteractionResponse: async (token, options) => {
      const result = await bot.rest.editOriginalInteractionResponse(token, options)
      if (!result) return

      return bot.transformers.message(bot, snakelize(result) as DiscordMessage)
    },
    editOriginalWebhookMessage: async (webhookId, token, options) => {
      return bot.transformers.message(bot, snakelize(await bot.rest.editOriginalWebhookMessage(webhookId, token, options)) as DiscordMessage)
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
      return bot.transformers.message(bot, snakelize(await bot.rest.editWebhookMessage(webhookId, token, messageId, options)) as DiscordMessage)
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

      return bot.transformers.message(bot, snakelize(result) as DiscordMessage)
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
      return bot.transformers.application(bot, snakelize(await bot.rest.getApplicationInfo()))
    },
    getCurrentAuthenticationInfo: async (bearerToken) => {
      return await bot.rest.getCurrentAuthenticationInfo(bearerToken)
    },
    exchangeToken: async (options) => {
      return await bot.rest.exchangeToken(options)
    },
    revokeToken: async (options) => {
      return await bot.rest.revokeToken(options)
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
    getEmojis: async (guildId) => {
      return (await bot.rest.getEmojis(guildId)).map((res) => bot.transformers.emoji(bot, snakelize(res)))
    },
    getFollowupMessage: async (token, messageId) => {
      return bot.transformers.message(bot, snakelize(await bot.rest.getFollowupMessage(token, messageId)))
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
      return await bot.rest.getGuilds(bearerToken, options)
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
      return await bot.rest.getInvite(inviteCode, options)
      // return bot.transformers.invite(bot, snakelize(await bot.rest.getInvite(inviteCode, options)))
    },
    getInvites: async (guildId) => {
      return await bot.rest.getInvites(guildId)
      // .map((res) => bot.transformers.invite(bot, snakelize(res)))
    },
    getMessage: async (channelId, messageId) => {
      return bot.transformers.message(bot, snakelize(await bot.rest.getMessage(channelId, messageId)))
    },
    getMessages: async (channelId, options) => {
      return (await bot.rest.getMessages(channelId, options)).map((res) => bot.transformers.message(bot, snakelize(res)))
    },
    getNitroStickerPacks: async () => {
      return (await bot.rest.getNitroStickerPacks()).map((res) => bot.transformers.stickerPack(bot, snakelize(res)))
    },
    getOriginalInteractionResponse: async (token) => {
      return bot.transformers.message(bot, snakelize(await bot.rest.getOriginalInteractionResponse(token)))
    },
    getPinnedMessages: async (channelId) => {
      return (await bot.rest.getPinnedMessages(channelId)).map((res) => bot.transformers.message(bot, snakelize(res)))
    },
    getPrivateArchivedThreads: async (channelId, options) => {
      return await bot.rest.getPrivateArchivedThreads(channelId, options)
      // return bot.transformers.xxx(bot, snakelize(await bot.rest.getPrivateArchivedThreads(channelId, options)))
    },
    getPrivateJoinedArchivedThreads: async (channelId, options) => {
      return await bot.rest.getPrivateJoinedArchivedThreads(channelId, options)
      // return bot.transformers.xxx(bot, snakelize(await bot.rest.getPrivateJoinedArchivedThreads(channelId, options)))
    },
    getPruneCount: async (guildId, options) => {
      return await bot.rest.getPruneCount(guildId, options)
      // return bot.transformers.xxx(bot, snakelize(await bot.rest.getPruneCount(guildId, options)))
    },
    getPublicArchivedThreads: async (channelId, options) => {
      return await bot.rest.getPublicArchivedThreads(channelId, options)
      // return bot.transformers.xxx(bot, snakelize(await bot.rest.getPublicArchivedThreads(channelId, options)))
    },
    getRoles: async (guildId) => {
      return snakelize(await bot.rest.getRoles(guildId)).map((role) => bot.transformers.role(bot, { role, guildId }))
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
      return bot.transformers.message(bot, snakelize(await bot.rest.getWebhookMessage(webhookId, token, messageId, options)))
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
      return bot.transformers.message(bot, snakelize(await bot.rest.publishMessage(channelId, messageId)))
    },
    sendMessage: async (channelId, options) => {
      return bot.transformers.message(bot, snakelize(await bot.rest.sendMessage(channelId, options)))
    },
    sendFollowupMessage: async (token, options) => {
      return bot.transformers.message(bot, snakelize(await bot.rest.sendFollowupMessage(token, options)))
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
    sendInteractionResponse: async (interactionId, token, options) => {
      return await bot.rest.sendInteractionResponse(interactionId, token, options)
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
  }
}

export interface BotHelpers {
  createAutomodRule: (guildId: BigString, options: CreateAutoModerationRuleOptions, reason?: string) => Promise<AutoModerationRule>
  createChannel: (guildId: BigString, options: CreateGuildChannel, reason?: string) => Promise<Channel>
  createEmoji: (guildId: BigString, options: CreateGuildEmoji, reason?: string) => Promise<Emoji>
  createForumThread: (channelId: BigString, options: CreateForumPostWithMessage, reason?: string) => Promise<Channel>
  createGlobalApplicationCommand: (command: CreateApplicationCommand, options?: CreateGlobalApplicationCommandOptions) => Promise<ApplicationCommand>
  createGuild: (options: CreateGuild) => Promise<Guild>
  createGuildApplicationCommand: (
    command: CreateApplicationCommand,
    guildId: BigString,
    options?: CreateGuildApplicationCommandOptions,
  ) => Promise<ApplicationCommand>
  createGuildFromTemplate: (templateCode: string, options: CreateGuildFromTemplate) => Promise<Guild>
  createGuildSticker: (guildId: BigString, options: CreateGuildStickerOptions, reason?: string) => Promise<Sticker>
  createGuildTemplate: (guildId: BigString, options: CreateTemplate) => Promise<Template>
  createInvite: (channelId: BigString, options?: CreateChannelInvite, reason?: string) => Promise<CamelizedDiscordInvite>
  createRole: (guildId: BigString, options: CreateGuildRole, reason?: string) => Promise<Role>
  createScheduledEvent: (guildId: BigString, options: CreateScheduledEvent, reason?: string) => Promise<ScheduledEvent>
  createStageInstance: (options: CreateStageInstance, reason?: string) => Promise<StageInstance>
  createWebhook: (channelId: BigString, options: CreateWebhook, reason?: string) => Promise<Webhook>
  editApplicationCommandPermissions: (
    guildId: BigString,
    commandId: BigString,
    bearerToken: string,
    options: ApplicationCommandPermissions[],
  ) => Promise<ApplicationCommandPermission>
  editAutomodRule: (
    guildId: BigString,
    ruleId: BigString,
    options: Partial<EditAutoModerationRuleOptions>,
    reason?: string,
  ) => Promise<AutoModerationRule>
  editBotProfile: (options: { username?: string; botAvatarURL?: string | null }) => Promise<User>
  editChannel: (channelId: BigString, options: ModifyChannel, reason?: string) => Promise<Channel>
  editEmoji: (guildId: BigString, id: BigString, options: ModifyGuildEmoji, reason?: string) => Promise<Emoji>
  editFollowupMessage: (token: string, messageId: BigString, options: InteractionCallbackData) => Promise<Message>
  editGlobalApplicationCommand: (commandId: BigString, options: CreateApplicationCommand) => Promise<ApplicationCommand>
  editGuild: (guildId: BigString, options: ModifyGuild, reason?: string) => Promise<Guild>
  editGuildApplicationCommand: (commandId: BigString, guildId: BigString, options: CreateApplicationCommand) => Promise<ApplicationCommand>
  editGuildSticker: (guildId: BigString, stickerId: BigString, options: AtLeastOne<EditGuildStickerOptions>, reason?: string) => Promise<Sticker>
  editGuildTemplate: (guildId: BigString, templateCode: string, options: ModifyGuildTemplate) => Promise<Template>
  editMessage: (channelId: BigString, messageId: BigString, options: EditMessage) => Promise<Message>
  editOriginalInteractionResponse: (token: string, options: InteractionCallbackData) => Promise<Message | undefined>
  editOriginalWebhookMessage: (webhookId: BigString, token: string, options: InteractionCallbackData & { threadId?: BigString }) => Promise<Message>
  editRole: (guildId: BigString, roleId: BigString, options: EditGuildRole, reason?: string) => Promise<Role>
  editRolePositions: (guildId: BigString, options: ModifyRolePositions[], reason?: string) => Promise<Role[]>
  editScheduledEvent: (guildId: BigString, eventId: BigString, options: Partial<EditScheduledEvent>, reason?: string) => Promise<ScheduledEvent>
  editStageInstance: (channelId: BigString, topic: string, reason?: string) => Promise<StageInstance>
  editWebhook: (webhookId: BigString, options: ModifyWebhook, reason?: string) => Promise<Webhook>
  editWebhookMessage: (
    webhookId: BigString,
    token: string,
    messageId: BigString,
    options: InteractionCallbackData & { threadId?: BigString },
  ) => Promise<Message>
  editWebhookWithToken: (webhookId: BigString, token: string, options: Omit<ModifyWebhook, 'channelId'>) => Promise<Webhook>
  editWelcomeScreen: (guildId: BigString, options: CamelizedDiscordModifyGuildWelcomeScreen, reason?: string) => Promise<WelcomeScreen>
  editWidgetSettings: (guildId: BigString, options: CamelizedDiscordGuildWidgetSettings, reason?: string) => Promise<GuildWidgetSettings>
  editUserApplicationRoleConnection: (
    bearerToken: string,
    applicationId: BigString,
    options: CamelizedDiscordApplicationRoleConnection,
  ) => Promise<CamelizedDiscordApplicationRoleConnection>
  executeWebhook: (webhookId: BigString, token: string, options: ExecuteWebhook) => Promise<Message | undefined>
  followAnnouncement: (sourceChannelId: BigString, targetChannelId: BigString) => Promise<CamelizedDiscordFollowedChannel>
  getActiveThreads: (guildId: BigString) => Promise<{ threads: Channel[]; members: ThreadMember[] }>
  getApplicationInfo: () => Promise<Application>
  getCurrentAuthenticationInfo: (bearerToken: string) => Promise<CamelizedDiscordCurrentAuthorization>
  exchangeToken: (options: CamelizedDiscordTokenExchange) => Promise<CamelizedDiscordAccessTokenResponse>
  revokeToken: (options: CamelizedDiscordTokenRevocation) => Promise<void>
  getApplicationCommandPermission: (
    guildId: BigString,
    commandId: BigString,
    options?: GetApplicationCommandPermissionOptions,
  ) => Promise<ApplicationCommandPermission>
  getApplicationCommandPermissions: (guildId: BigString, options?: GetApplicationCommandPermissionOptions) => Promise<ApplicationCommandPermission[]>
  getAuditLog: (guildId: BigString, options?: GetGuildAuditLog) => Promise<CamelizedDiscordAuditLog>
  getAutomodRule: (guildId: BigString, ruleId: BigString) => Promise<AutoModerationRule>
  getAutomodRules: (guildId: BigString) => Promise<AutoModerationRule[]>
  getAvailableVoiceRegions: () => Promise<CamelizedDiscordVoiceRegion[]>
  getBan: (guildId: BigString, userId: BigString) => Promise<CamelizedDiscordBan>
  getBans: (guildId: BigString, options?: GetBans) => Promise<CamelizedDiscordBan[]>
  getChannel: (channelId: BigString) => Promise<Channel>
  getChannelInvites: (channelId: BigString) => Promise<CamelizedDiscordInviteMetadata[]>
  getChannels: (guildId: BigString) => Promise<Channel[]>
  getChannelWebhooks: (channelId: BigString) => Promise<Webhook[]>
  getDmChannel: (userId: BigString) => Promise<Channel>
  getGroupDmChannel: (options: GetGroupDmOptions) => Promise<Channel>
  getEmoji: (guildId: BigString, emojiId: BigString) => Promise<Emoji>
  getEmojis: (guildId: BigString) => Promise<Emoji[]>
  getFollowupMessage: (token: string, messageId: BigString) => Promise<Message>
  getGatewayBot: () => Promise<CamelizedDiscordGetGatewayBot>
  getGlobalApplicationCommand: (commandId: BigString) => Promise<ApplicationCommand>
  getGlobalApplicationCommands: () => Promise<ApplicationCommand[]>
  getGuild: (guildId: BigString, options?: { counts?: boolean }) => Promise<Guild>
  getGuilds: (bearerToken: string, options?: GetUserGuilds) => Promise<CamelizedDiscordPartialGuild[]>
  getGuildApplicationCommand: (commandId: BigString, guildId: BigString) => Promise<ApplicationCommand>
  getGuildApplicationCommands: (guildId: BigString) => Promise<ApplicationCommand[]>
  getGuildPreview: (guildId: BigString) => Promise<CamelizedDiscordGuildPreview>
  getGuildSticker: (guildId: BigString, stickerId: BigString) => Promise<Sticker>
  getGuildStickers: (guildId: BigString) => Promise<Sticker[]>
  getGuildTemplate: (templateCode: string) => Promise<Template>
  getGuildTemplates: (guildId: BigString) => Promise<Template[]>
  getGuildWebhooks: (guildId: BigString) => Promise<Webhook[]>
  getIntegrations: (guildId: BigString) => Promise<Integration[]>
  getInvite: (inviteCode: string, options?: GetInvite) => Promise<CamelizedDiscordInviteMetadata>
  getInvites: (guildId: BigString) => Promise<CamelizedDiscordInviteMetadata[]>
  getMessage: (channelId: BigString, messageId: BigString) => Promise<Message>
  getMessages: (channelId: BigString, options?: GetMessagesOptions) => Promise<Message[]>
  getNitroStickerPacks: () => Promise<StickerPack[]>
  getOriginalInteractionResponse: (token: string) => Promise<Message>
  getPinnedMessages: (channelId: BigString) => Promise<Message[]>
  getPrivateArchivedThreads: (channelId: BigString, options?: ListArchivedThreads) => Promise<CamelizedDiscordArchivedThreads>
  getPrivateJoinedArchivedThreads: (channelId: BigString, options?: ListArchivedThreads) => Promise<CamelizedDiscordArchivedThreads>
  getPruneCount: (guildId: BigString, options?: GetGuildPruneCountQuery) => Promise<CamelizedDiscordPrunedCount>
  getPublicArchivedThreads: (channelId: BigString, options?: ListArchivedThreads) => Promise<CamelizedDiscordArchivedThreads>
  getRoles: (guildId: BigString) => Promise<Role[]>
  getScheduledEvent: (guildId: BigString, eventId: BigString, options?: { withUserCount?: boolean }) => Promise<ScheduledEvent>
  getScheduledEvents: (guildId: BigString, options?: GetScheduledEvents) => Promise<ScheduledEvent[]>
  getScheduledEventUsers: (
    guildId: BigString,
    eventId: BigString,
    options?: GetScheduledEventUsers,
  ) => Promise<Array<{ user: User; member?: Member }>>
  getSessionInfo: () => Promise<CamelizedDiscordGetGatewayBot>
  getStageInstance: (channelId: BigString) => Promise<StageInstance>
  getSticker: (stickerId: BigString) => Promise<Sticker>
  getThreadMember: (channelId: BigString, userId: BigString) => Promise<ThreadMember>
  getThreadMembers: (channelId: BigString) => Promise<ThreadMember[]>
  getReactions: (channelId: BigString, messageId: BigString, reaction: string, options?: GetReactions) => Promise<User[]>
  getUser: (id: BigString) => Promise<User>
  getCurrentUser: (bearerToken: string) => Promise<User>
  getUserConnections: (bearerToken: string) => Promise<CamelizedDiscordConnection[]>
  getUserApplicationRoleConnection: (bearerToken: string, applicationId: BigString) => Promise<CamelizedDiscordApplicationRoleConnection>
  getVanityUrl: (guildId: BigString) => Promise<CamelizedDiscordVanityUrl>
  getVoiceRegions: (guildId: BigString) => Promise<CamelizedDiscordVoiceRegion[]>
  getWebhook: (webhookId: BigString) => Promise<Webhook>
  getWebhookMessage: (webhookId: BigString, token: string, messageId: BigString, options?: GetWebhookMessageOptions) => Promise<Message>
  getWebhookWithToken: (webhookId: BigString, token: string) => Promise<Webhook>
  getWelcomeScreen: (guildId: BigString) => Promise<WelcomeScreen>
  getWidget: (guildId: BigString) => Promise<GuildWidget>
  getWidgetSettings: (guildId: BigString) => Promise<GuildWidgetSettings>
  publishMessage: (channelId: BigString, messageId: BigString) => Promise<Message>
  sendMessage: (channelId: BigString, options: CreateMessageOptions) => Promise<Message>
  sendFollowupMessage: (token: string, options: InteractionCallbackData) => Promise<Message>
  startThreadWithMessage: (channelId: BigString, messageId: BigString, options: StartThreadWithMessage, reason?: string) => Promise<Channel>
  startThreadWithoutMessage: (channelId: BigString, options: StartThreadWithoutMessage, reason?: string) => Promise<Channel>
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
  editBotMember: (guildId: BigString, options: EditBotMemberOptions, reason?: string) => Promise<Member>
  editMember: (guildId: BigString, userId: BigString, options: ModifyGuildMember, reason?: string) => Promise<Member>
  getMember: (guildId: BigString, userId: BigString) => Promise<Member>
  getCurrentMember: (guildId: BigString, bearerToken: string) => Promise<Member>
  getMembers: (guildId: BigString, options: ListGuildMembers) => Promise<Member[]>
  pruneMembers: (guildId: BigString, options: BeginGuildPrune, reason?: string) => Promise<{ pruned: number | null }>
  searchMembers: (guildId: BigString, query: string, options?: Omit<SearchMembers, 'query'>) => Promise<Member[]>
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
  sendInteractionResponse: (interactionId: BigString, token: string, options: InteractionResponse) => Promise<void>
  triggerTypingIndicator: (channelId: BigString) => Promise<void>
  banMember: (guildId: BigString, userId: BigString, options?: CreateGuildBan, reason?: string) => Promise<void>
  kickMember: (guildId: BigString, userId: BigString, reason?: string) => Promise<void>
  pinMessage: (channelId: BigString, messageId: BigString, reason?: string) => Promise<void>
  unbanMember: (guildId: BigString, userId: BigString, reason?: string) => Promise<void>
  unpinMessage: (channelId: BigString, messageId: BigString, reason?: string) => Promise<void>
}
