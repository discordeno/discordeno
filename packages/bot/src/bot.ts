import type { CreateGatewayManagerOptions, GatewayManager, DiscordenoShard } from '@discordeno/gateway'
import { createGatewayManager, ShardSocketCloseCodes } from '@discordeno/gateway'
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
  DiscordGuildMembersChunk,
  DiscordGuildMemberUpdate,
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
  DiscordThreadMembersUpdate,
  DiscordThreadMemberUpdate,
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
      bot.events.raw?.(data, shard)

      if (!data.t) return

      // RUN DISPATCH CHECK
      await bot.events.dispatchRequirements?.(data, shard)
      bot.events[
        data.t.toLowerCase().replace(/_([a-z])/g, function (g) {
          return g[1].toUpperCase()
        }) as keyof EventHandlers
        // @ts-expect-error as any gets removed by linter
      ]?.(data.d, shard)
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
  dispatchRequirements: (payload: Camelize<DiscordGatewayPayload>, shard: DiscordenoShard) => unknown
  raw: (payload: Camelize<DiscordGatewayPayload>, shard: DiscordenoShard) => unknown

  // Gateway events below this
  applicationCommandPermissionsUpdate: (payload: Camelize<DiscordGuildApplicationCommandPermissions>, shard: DiscordenoShard) => unknown
  auditLogEntryCreate: (payload: Camelize<DiscordAuditLogEntry>, shard: DiscordenoShard) => unknown
  autoModerationRuleCreate: (payload: Camelize<DiscordAutoModerationRule>, shard: DiscordenoShard) => unknown
  autoModerationRuleUpdate: (payload: Camelize<DiscordAutoModerationRule>, shard: DiscordenoShard) => unknown
  autoModerationRuleDelete: (payload: Camelize<DiscordAutoModerationRule>, shard: DiscordenoShard) => unknown
  autoModerationActionExecution: (payload: Camelize<DiscordAutoModerationActionExecution>, shard: DiscordenoShard) => unknown
  channelCreate: (payload: Camelize<DiscordChannel>, shard: DiscordenoShard) => unknown
  channelUpdate: (payload: Camelize<DiscordChannel>, shard: DiscordenoShard) => unknown
  channelDelete: (payload: Camelize<DiscordChannel>, shard: DiscordenoShard) => unknown
  channelPinsUpdate: (payload: Camelize<DiscordChannelPinsUpdate>, shard: DiscordenoShard) => unknown
  threadCreate: (payload: Camelize<DiscordChannel>, shard: DiscordenoShard) => unknown
  threadUpdate: (payload: Camelize<DiscordChannel>, shard: DiscordenoShard) => unknown
  threadDelete: (payload: Camelize<DiscordChannel>, shard: DiscordenoShard) => unknown
  threadListSync: (payload: Camelize<DiscordThreadListSync>, shard: DiscordenoShard) => unknown
  threadMemberUpdate: (payload: Camelize<DiscordThreadMemberUpdate>, shard: DiscordenoShard) => unknown
  threadMembersUpdate: (payload: Camelize<DiscordThreadMembersUpdate>, shard: DiscordenoShard) => unknown
  guildCreate: (payload: Camelize<DiscordGuild>, shard: DiscordenoShard) => unknown
  guildUpdate: (payload: Camelize<DiscordGuild>, shard: DiscordenoShard) => unknown
  guildDelete: (payload: Camelize<DiscordUnavailableGuild>, shard: DiscordenoShard) => unknown
  guildBanAdd: (payload: Camelize<DiscordGuildBanAddRemove>, shard: DiscordenoShard) => unknown
  guildBanRemove: (payload: Camelize<DiscordGuildBanAddRemove>, shard: DiscordenoShard) => unknown
  guildEmojisUpdate: (payload: Camelize<DiscordGuildEmojisUpdate>, shard: DiscordenoShard) => unknown
  guildStickersUpdate: (payload: Camelize<DiscordGuildStickersUpdate>, shard: DiscordenoShard) => unknown
  guildIntegrationsUpdate: (payload: Camelize<DiscordIntegrationCreateUpdate>, shard: DiscordenoShard) => unknown
  guildMemberAdd: (payload: Camelize<DiscordGuildMemberAdd>, shard: DiscordenoShard) => unknown
  guildMemberRemove: (payload: Camelize<DiscordGuildMemberRemove>, shard: DiscordenoShard) => unknown
  guildMemberUpdate: (payload: Camelize<DiscordGuildMemberUpdate>, shard: DiscordenoShard) => unknown
  guildMembersChunk: (payload: Camelize<DiscordGuildMembersChunk>, shard: DiscordenoShard) => unknown
  guildRoleCreate: (payload: Camelize<DiscordGuildRoleCreate>, shard: DiscordenoShard) => unknown
  guildRoleUpdate: (payload: Camelize<DiscordGuildRoleUpdate>, shard: DiscordenoShard) => unknown
  guildRoleDelete: (payload: Camelize<DiscordGuildRoleDelete>, shard: DiscordenoShard) => unknown
  guildScheduledEventCreate: (payload: Camelize<DiscordScheduledEvent>, shard: DiscordenoShard) => unknown
  guildScheduledEventUpdate: (payload: Camelize<DiscordScheduledEvent>, shard: DiscordenoShard) => unknown
  guildScheduledEventDelete: (payload: Camelize<DiscordScheduledEvent>, shard: DiscordenoShard) => unknown
  guildScheduledEventUserAdd: (payload: Camelize<DiscordScheduledEventUserAdd>, shard: DiscordenoShard) => unknown
  guildScheduledEventUserRemove: (payload: Camelize<DiscordScheduledEventUserRemove>, shard: DiscordenoShard) => unknown
  integrationCreate: (payload: Camelize<DiscordIntegrationCreateUpdate>, shard: DiscordenoShard) => unknown
  integrationUpdate: (payload: Camelize<DiscordIntegrationCreateUpdate>, shard: DiscordenoShard) => unknown
  integrationDelete: (payload: Camelize<DiscordIntegrationDelete>, shard: DiscordenoShard) => unknown
  interactionCreate: (payload: Camelize<DiscordInteraction>, shard: DiscordenoShard) => unknown
  inviteCreate: (payload: Camelize<DiscordInviteCreate>, shard: DiscordenoShard) => unknown
  inviteDelete: (payload: Camelize<DiscordInviteDelete>, shard: DiscordenoShard) => unknown
  messageCreate: (payload: Camelize<DiscordMessage>, shard: DiscordenoShard) => unknown
  messageUpdate: (payload: Camelize<DiscordMessage>, shard: DiscordenoShard) => unknown
  messageDelete: (payload: Camelize<DiscordMessageDelete>, shard: DiscordenoShard) => unknown
  messageDeleteBulk: (payload: Camelize<DiscordMessageDeleteBulk>, shard: DiscordenoShard) => unknown
  messageReactionAdd: (payload: Camelize<DiscordMessageReactionAdd>, shard: DiscordenoShard) => unknown
  messageReactionRemove: (payload: Camelize<DiscordMessageReactionRemove>, shard: DiscordenoShard) => unknown
  messageReactionRemoveAll: (payload: Camelize<DiscordMessageReactionRemoveAll>, shard: DiscordenoShard) => unknown
  messageReactionRemoveEmoji: (payload: Camelize<DiscordMessageReactionRemoveEmoji>, shard: DiscordenoShard) => unknown
  presenceUpdate: (payload: Camelize<DiscordPresenceUpdate>, shard: DiscordenoShard) => unknown
  ready: (payload: Camelize<DiscordReady>, shard: DiscordenoShard) => unknown
  stageInstanceCreate: (payload: Camelize<DiscordStageInstance>, shard: DiscordenoShard) => unknown
  stageInstanceUpdate: (payload: Camelize<DiscordStageInstance>, shard: DiscordenoShard) => unknown
  stageInstanceDelete: (payload: Camelize<DiscordStageInstance>, shard: DiscordenoShard) => unknown
  typingStart: (payload: Camelize<DiscordTypingStart>, shard: DiscordenoShard) => unknown
  userUpdate: (payload: Camelize<DiscordUser>, shard: DiscordenoShard) => unknown
  voiceStateUpdate: (payload: Camelize<DiscordVoiceState>, shard: DiscordenoShard) => unknown
  voiceServerUpdate: (payload: Camelize<DiscordVoiceServerUpdate>, shard: DiscordenoShard) => unknown
  webhooksUpdate: (payload: Camelize<DiscordWebhookUpdate>, shard: DiscordenoShard) => unknown
}
