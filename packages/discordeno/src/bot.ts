// TODO: LIST
/**
 * 1. Trigger Gateway handlers
 * 2. Trigger Event callback
 */
import type { CreateGatewayManagerOptions, GatewayManager, Shard } from '@discordeno/gateway'
import { createGatewayManager, ShardSocketCloseCodes } from '@discordeno/gateway'
import type { CreateRestManagerOptions, RestManager } from '@discordeno/rest'
import { createRestManager } from '@discordeno/rest'
import type {
  CamelCase,
  Camelize,
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
  GatewayEventNames,
} from '@discordeno/types'

/**
 * Create a bot object that will maintain the rest and gateway connection.
 *
 * @param options Configurations options used to manage this bot.
 * @returns Bot
 */
export function createBot(options: CreateBotOptions): Bot {
  const foo: CamelCase<Lowercase<GatewayEventNames>> = 'ready'
  console.log(foo)

  if (!options.rest) options.rest = { token: options.token }
  if (!options.gateway)
    options.gateway = {
      token: options.token,
      events: {
        message: async (shard, data) => {
          // TRIGGER RAW EVENT
          bot.events.raw?.(data, shard)

          if (!data.t) return

          // RUN DISPATCH CHECK
          await bot.events.dispatchRequirements?.(data, shard)
          // @ts-expect-error dynamic handling
          bot.events[
            data.t.toLowerCase().replace(/_([a-z])/g, function (g) {
              return g[1].toUpperCase()
            }) as CamelCase<Lowercase<GatewayEventNames>>
          ]?.(data.d, shard)
        },
      },
    }

  options.rest.token = options.token
  options.gateway.token = options.token

  const bot: Bot = {
    rest: createRestManager(options.rest),
    gateway: createGatewayManager(options.gateway),
    events: options.events ?? {},

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
  /** Start the bot connection to the gateway. */
  start: () => Promise<void>
  /** Shuts down all the bot connections to the gateway. */
  shutdown: () => Promise<void>
}

export interface EventHandlers {
  // Custom events here
  dispatchRequirements: (payload: Camelize<DiscordGatewayPayload>, shard: Shard) => unknown
  raw: (payload: Camelize<DiscordGatewayPayload>, shard: Shard) => unknown

  // Gateway events below this
  ready: (payload: Camelize<DiscordReady>, shard: Shard) => unknown
  applicationCommandPermissionsUpdate: (payload: Camelize<DiscordGuildApplicationCommandPermissions>, shard: Shard) => unknown
  autoModerationRuleCreate: (payload: Camelize<DiscordAutoModerationRule>, shard: Shard) => unknown
  autoModerationRuleUpdate: (payload: Camelize<DiscordAutoModerationRule>, shard: Shard) => unknown
  autoModerationRuleDelete: (payload: Camelize<DiscordAutoModerationRule>, shard: Shard) => unknown
  autoModerationActionExecution: (payload: Camelize<DiscordAutoModerationActionExecution>, shard: Shard) => unknown
  channelCreate: (payload: Camelize<DiscordChannel>, shard: Shard) => unknown
  channelUpdate: (payload: Camelize<DiscordChannel>, shard: Shard) => unknown
  channelDelete: (payload: Camelize<DiscordChannel>, shard: Shard) => unknown
  channelPinsUpdate: (payload: Camelize<DiscordChannelPinsUpdate>, shard: Shard) => unknown
  threadCreate: (payload: Camelize<DiscordChannel>, shard: Shard) => unknown
  threadUpdate: (payload: Camelize<DiscordChannel>, shard: Shard) => unknown
  threadDelete: (payload: Camelize<DiscordChannel>, shard: Shard) => unknown
  threadListSync: (payload: Camelize<DiscordThreadListSync>, shard: Shard) => unknown
  threadMemberUpdate: (payload: Camelize<DiscordThreadMemberUpdate>, shard: Shard) => unknown
  threadMembersUpdate: (payload: Camelize<DiscordThreadMembersUpdate>, shard: Shard) => unknown
  guildCreate: (payload: Camelize<DiscordGuild>, shard: Shard) => unknown
  guildUpdate: (payload: Camelize<DiscordGuild>, shard: Shard) => unknown
  guildDelete: (payload: Camelize<DiscordUnavailableGuild>, shard: Shard) => unknown
  guildBanAdd: (payload: Camelize<DiscordGuildBanAddRemove>, shard: Shard) => unknown
  guildBanRemove: (payload: Camelize<DiscordGuildBanAddRemove>, shard: Shard) => unknown
  guildEmojisUpdate: (payload: Camelize<DiscordGuildEmojisUpdate>, shard: Shard) => unknown
  guildStickersUpdate: (payload: Camelize<DiscordGuildStickersUpdate>, shard: Shard) => unknown
  guildIntegrationsUpdate: (payload: Camelize<DiscordIntegrationCreateUpdate>, shard: Shard) => unknown
  guildMemberAdd: (payload: Camelize<DiscordGuildMemberAdd>, shard: Shard) => unknown
  guildMemberRemove: (payload: Camelize<DiscordGuildMemberRemove>, shard: Shard) => unknown
  guildMemberUpdate: (payload: Camelize<DiscordGuildMemberUpdate>, shard: Shard) => unknown
  guildMembersChunk: (payload: Camelize<DiscordGuildMembersChunk>, shard: Shard) => unknown
  guildRoleCreate: (payload: Camelize<DiscordGuildRoleCreate>, shard: Shard) => unknown
  guildRoleUpdate: (payload: Camelize<DiscordGuildRoleUpdate>, shard: Shard) => unknown
  guildRoleDelete: (payload: Camelize<DiscordGuildRoleDelete>, shard: Shard) => unknown
  guildScheduledEventCreate: (payload: Camelize<DiscordScheduledEvent>, shard: Shard) => unknown
  guildScheduledEventUpdate: (payload: Camelize<DiscordScheduledEvent>, shard: Shard) => unknown
  guildScheduledEventDelete: (payload: Camelize<DiscordScheduledEvent>, shard: Shard) => unknown
  guildScheduledEventUserAdd: (payload: Camelize<DiscordScheduledEventUserAdd>, shard: Shard) => unknown
  guildScheduledEventUserRemove: (payload: Camelize<DiscordScheduledEventUserRemove>, shard: Shard) => unknown
  integrationCreate: (payload: Camelize<DiscordIntegrationCreateUpdate>, shard: Shard) => unknown
  integrationUpdate: (payload: Camelize<DiscordIntegrationCreateUpdate>, shard: Shard) => unknown
  integrationDelete: (payload: Camelize<DiscordIntegrationDelete>, shard: Shard) => unknown
  interactionCreate: (payload: Camelize<DiscordInteraction>, shard: Shard) => unknown
  inviteCreate: (payload: Camelize<DiscordInviteCreate>, shard: Shard) => unknown
  inviteDelete: (payload: Camelize<DiscordInviteDelete>, shard: Shard) => unknown
  messageCreate: (payload: Camelize<DiscordMessage>, shard: Shard) => unknown
  messageUpdate: (payload: Camelize<DiscordMessage>, shard: Shard) => unknown
  messageDelete: (payload: Camelize<DiscordMessageDelete>, shard: Shard) => unknown
  messageDeleteBulk: (payload: Camelize<DiscordMessageDeleteBulk>, shard: Shard) => unknown
  messageReactionAdd: (payload: Camelize<DiscordMessageReactionAdd>, shard: Shard) => unknown
  messageReactionRemove: (payload: Camelize<DiscordMessageReactionRemove>, shard: Shard) => unknown
  messageReactionRemoveAll: (payload: Camelize<DiscordMessageReactionRemoveAll>, shard: Shard) => unknown
  messageReactionRemoveEmoji: (payload: Camelize<DiscordMessageReactionRemoveEmoji>, shard: Shard) => unknown
  presenceUpdate: (payload: Camelize<DiscordPresenceUpdate>, shard: Shard) => unknown
  stageInstanceCreate: (payload: Camelize<DiscordStageInstance>, shard: Shard) => unknown
  stageInstanceUpdate: (payload: Camelize<DiscordStageInstance>, shard: Shard) => unknown
  stageInstanceDelete: (payload: Camelize<DiscordStageInstance>, shard: Shard) => unknown
  typingStart: (payload: Camelize<DiscordTypingStart>, shard: Shard) => unknown
  userUpdate: (payload: Camelize<DiscordUser>, shard: Shard) => unknown
  voiceStateUpdate: (payload: Camelize<DiscordVoiceState>, shard: Shard) => unknown
  voiceServerUpdate: (payload: Camelize<DiscordVoiceServerUpdate>, shard: Shard) => unknown
  webhooksUpdate: (payload: Camelize<DiscordWebhookUpdate>, shard: Shard) => unknown
}
