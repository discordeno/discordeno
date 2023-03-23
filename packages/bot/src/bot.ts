import type { CreateGatewayManagerOptions, GatewayManager } from '@discordeno/gateway'
import { ShardSocketCloseCodes, createGatewayManager } from '@discordeno/gateway'
import type { CreateRestManagerOptions, RestManager } from '@discordeno/rest'
import { createRestManager } from '@discordeno/rest'
import type {
  Camelize,
  DiscordAuditLogEntry,
  DiscordAutoModerationActionExecution,
  DiscordAutoModerationRule,
  DiscordChannel,
  DiscordChannelPinsUpdate,
  DiscordGatewayPayload,
  DiscordGuild,
  DiscordGuildApplicationCommandPermissions,
  DiscordGuildBanAddRemove,
  DiscordGuildEmojisUpdate,
  DiscordGuildMemberAdd,
  DiscordGuildMemberRemove,
  DiscordGuildMemberUpdate,
  DiscordGuildMembersChunk,
  DiscordGuildRoleCreate,
  DiscordGuildRoleDelete,
  DiscordGuildRoleUpdate,
  DiscordGuildStickersUpdate,
  DiscordIntegrationCreateUpdate,
  DiscordIntegrationDelete,
  DiscordInteraction,
  DiscordInviteCreate,
  DiscordInviteDelete,
  DiscordMessage,
  DiscordMessageDelete,
  DiscordMessageDeleteBulk,
  DiscordMessageReactionAdd,
  DiscordMessageReactionRemove,
  DiscordMessageReactionRemoveAll,
  DiscordMessageReactionRemoveEmoji,
  DiscordPresenceUpdate,
  DiscordReady,
  DiscordScheduledEvent,
  DiscordScheduledEventUserAdd,
  DiscordScheduledEventUserRemove,
  DiscordStageInstance,
  DiscordThreadListSync,
  DiscordThreadMemberUpdate,
  DiscordThreadMembersUpdate,
  DiscordTypingStart,
  DiscordUnavailableGuild,
  DiscordUser,
  DiscordVoiceServerUpdate,
  DiscordVoiceState,
  DiscordWebhookUpdate,
  GatewayIntents,
} from '@discordeno/types'
import { createLogger } from '@discordeno/utils'

/**
 * Create a bot object that will maintain the rest and gateway connection.
 *
 * @param options Configurations options used to manage this bot.
 * @returns Bot
 */
export function createBot(options: CreateBotOptions): Bot {
  if (!options.rest) options.rest = { token: options.token }
  if (!options.gateway) options.gateway = { token: options.token, events: {} }
  if (!options.gateway.events.message) {
    options.gateway.events.message = async (shard, data) => {
      // TRIGGER RAW EVENT
      bot.events.raw?.(data, shard.id)

      if (!data.t) return

      // RUN DISPATCH CHECK
      await bot.events.dispatchRequirements?.(data, shard.id)
      bot.events[
        data.t.toLowerCase().replace(/_([a-z])/g, function (g) {
          return g[1].toUpperCase()
        }) as keyof EventHandlers
        // @ts-expect-error as any gets removed by linter
      ]?.(data.d, shard.id)
    }
  }

  options.rest.token = options.token
  options.gateway.intents = options.intents

  const bot: Bot = {
    rest: createRestManager(options.rest),
    gateway: createGatewayManager(options.gateway),
    events: options.events ?? {},
    logger: createLogger({ name: 'BOT' }),

    async start() {
      if (!options.gateway?.connection) {
        bot.gateway.connection = await bot.rest.getSessionInfo()
      }
      return await bot.gateway.spawnShards()
    },

    async shutdown() {
      return await bot.gateway.shutdown(ShardSocketCloseCodes.Shutdown, 'User requested bot stop')
    },
  }

  return bot
}

export interface CreateBotOptions {
  /** The bot's token. */
  token: string
  /** The bot's intents that will be used to make a connection with discords gateway. */
  intents?: GatewayIntents
  /** Any options you wish to provide to the rest manager. */
  rest?: CreateRestManagerOptions
  /** Any options you wish to provide to the gateway manager. */
  gateway?: CreateGatewayManagerOptions
  /** The event handlers. */
  events: Partial<EventHandlers>
}

export interface Bot {
  /** The rest manager. */
  rest: RestManager
  /** The gateway manager. */
  gateway: GatewayManager
  /** The event handlers. */
  events: Partial<EventHandlers>
  /** A logger utility to make it easy to log nice and useful things in the bot code. */
  logger: ReturnType<typeof createLogger>
  /** Start the bot connection to the gateway. */
  start: () => Promise<void>
  /** Shuts down all the bot connections to the gateway. */
  shutdown: () => Promise<void>
}

export interface EventHandlers {
  // Custom events here
  dispatchRequirements: (payload: Camelize<DiscordGatewayPayload>, shardId: number) => unknown
  raw: (payload: Camelize<DiscordGatewayPayload>, shardId: number) => unknown

  // Gateway events below this
  applicationCommandPermissionsUpdate: (payload: Camelize<DiscordGuildApplicationCommandPermissions>, shardId: number) => unknown
  auditLogEntryCreate: (payload: Camelize<DiscordAuditLogEntry>, shardId: number) => unknown
  autoModerationRuleCreate: (payload: Camelize<DiscordAutoModerationRule>, shardId: number) => unknown
  autoModerationRuleUpdate: (payload: Camelize<DiscordAutoModerationRule>, shardId: number) => unknown
  autoModerationRuleDelete: (payload: Camelize<DiscordAutoModerationRule>, shardId: number) => unknown
  autoModerationActionExecution: (payload: Camelize<DiscordAutoModerationActionExecution>, shardId: number) => unknown
  channelCreate: (payload: Camelize<DiscordChannel>, shardId: number) => unknown
  channelUpdate: (payload: Camelize<DiscordChannel>, shardId: number) => unknown
  channelDelete: (payload: Camelize<DiscordChannel>, shardId: number) => unknown
  channelPinsUpdate: (payload: Camelize<DiscordChannelPinsUpdate>, shardId: number) => unknown
  threadCreate: (payload: Camelize<DiscordChannel>, shardId: number) => unknown
  threadUpdate: (payload: Camelize<DiscordChannel>, shardId: number) => unknown
  threadDelete: (payload: Camelize<DiscordChannel>, shardId: number) => unknown
  threadListSync: (payload: Camelize<DiscordThreadListSync>, shardId: number) => unknown
  threadMemberUpdate: (payload: Camelize<DiscordThreadMemberUpdate>, shardId: number) => unknown
  threadMembersUpdate: (payload: Camelize<DiscordThreadMembersUpdate>, shardId: number) => unknown
  guildCreate: (payload: Camelize<DiscordGuild>, shardId: number) => unknown
  guildUpdate: (payload: Camelize<DiscordGuild>, shardId: number) => unknown
  guildDelete: (payload: Camelize<DiscordUnavailableGuild>, shardId: number) => unknown
  guildBanAdd: (payload: Camelize<DiscordGuildBanAddRemove>, shardId: number) => unknown
  guildBanRemove: (payload: Camelize<DiscordGuildBanAddRemove>, shardId: number) => unknown
  guildEmojisUpdate: (payload: Camelize<DiscordGuildEmojisUpdate>, shardId: number) => unknown
  guildStickersUpdate: (payload: Camelize<DiscordGuildStickersUpdate>, shardId: number) => unknown
  guildIntegrationsUpdate: (payload: Camelize<DiscordIntegrationCreateUpdate>, shardId: number) => unknown
  guildMemberAdd: (payload: Camelize<DiscordGuildMemberAdd>, shardId: number) => unknown
  guildMemberRemove: (payload: Camelize<DiscordGuildMemberRemove>, shardId: number) => unknown
  guildMemberUpdate: (payload: Camelize<DiscordGuildMemberUpdate>, shardId: number) => unknown
  guildMembersChunk: (payload: Camelize<DiscordGuildMembersChunk>, shardId: number) => unknown
  guildRoleCreate: (payload: Camelize<DiscordGuildRoleCreate>, shardId: number) => unknown
  guildRoleUpdate: (payload: Camelize<DiscordGuildRoleUpdate>, shardId: number) => unknown
  guildRoleDelete: (payload: Camelize<DiscordGuildRoleDelete>, shardId: number) => unknown
  guildScheduledEventCreate: (payload: Camelize<DiscordScheduledEvent>, shardId: number) => unknown
  guildScheduledEventUpdate: (payload: Camelize<DiscordScheduledEvent>, shardId: number) => unknown
  guildScheduledEventDelete: (payload: Camelize<DiscordScheduledEvent>, shardId: number) => unknown
  guildScheduledEventUserAdd: (payload: Camelize<DiscordScheduledEventUserAdd>, shardId: number) => unknown
  guildScheduledEventUserRemove: (payload: Camelize<DiscordScheduledEventUserRemove>, shardId: number) => unknown
  integrationCreate: (payload: Camelize<DiscordIntegrationCreateUpdate>, shardId: number) => unknown
  integrationUpdate: (payload: Camelize<DiscordIntegrationCreateUpdate>, shardId: number) => unknown
  integrationDelete: (payload: Camelize<DiscordIntegrationDelete>, shardId: number) => unknown
  interactionCreate: (payload: Camelize<DiscordInteraction>, shardId: number) => unknown
  inviteCreate: (payload: Camelize<DiscordInviteCreate>, shardId: number) => unknown
  inviteDelete: (payload: Camelize<DiscordInviteDelete>, shardId: number) => unknown
  messageCreate: (payload: Camelize<DiscordMessage>, shardId: number) => unknown
  messageUpdate: (payload: Camelize<DiscordMessage>, shardId: number) => unknown
  messageDelete: (payload: Camelize<DiscordMessageDelete>, shardId: number) => unknown
  messageDeleteBulk: (payload: Camelize<DiscordMessageDeleteBulk>, shardId: number) => unknown
  messageReactionAdd: (payload: Camelize<DiscordMessageReactionAdd>, shardId: number) => unknown
  messageReactionRemove: (payload: Camelize<DiscordMessageReactionRemove>, shardId: number) => unknown
  messageReactionRemoveAll: (payload: Camelize<DiscordMessageReactionRemoveAll>, shardId: number) => unknown
  messageReactionRemoveEmoji: (payload: Camelize<DiscordMessageReactionRemoveEmoji>, shardId: number) => unknown
  presenceUpdate: (payload: Camelize<DiscordPresenceUpdate>, shardId: number) => unknown
  ready: (payload: Camelize<DiscordReady>, shardId: number) => unknown
  stageInstanceCreate: (payload: Camelize<DiscordStageInstance>, shardId: number) => unknown
  stageInstanceUpdate: (payload: Camelize<DiscordStageInstance>, shardId: number) => unknown
  stageInstanceDelete: (payload: Camelize<DiscordStageInstance>, shardId: number) => unknown
  typingStart: (payload: Camelize<DiscordTypingStart>, shardId: number) => unknown
  userUpdate: (payload: Camelize<DiscordUser>, shardId: number) => unknown
  voiceStateUpdate: (payload: Camelize<DiscordVoiceState>, shardId: number) => unknown
  voiceServerUpdate: (payload: Camelize<DiscordVoiceServerUpdate>, shardId: number) => unknown
  webhooksUpdate: (payload: Camelize<DiscordWebhookUpdate>, shardId: number) => unknown
}
