import { Client, createClient, CreateClientOptions } from '@discordeno/client'
import {
  createGatewayManager,
  ShardSocketCloseCodes
} from '@discordeno/gateway'
import { createRestManager, CreateRestManagerOptions } from '@discordeno/rest'
import {
  DiscordGatewayPayload,
  Errors,
  GatewayDispatchEventNames,
  GetGatewayBot
} from '@discordeno/types'

import {
  baseEndpoints,
  CHANNEL_MENTION_REGEX,
  CONTEXT_MENU_COMMANDS_NAME_REGEX,
  DISCORDENO_VERSION,
  DISCORD_SNOWFLAKE_REGEX,
  SLASH_COMMANDS_NAME_REGEX,
  USER_AGENT
} from '@discordeno/utils'

export function createBot (options: CreateBotOptions): Bot {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const bot = {
    ...createClient(options),
    botGatewayData: options.botGatewayData,
    rest: createRestManager({
      token: options.token,
      debug: options.events?.debug,
      secretKey: options.secretKey ?? undefined
    })
  } as Bot

  bot.gateway = createGatewayManager({
    gatewayBot: bot.botGatewayData ?? ({} as any),
    gatewayConfig: {
      token: options.token,
      intents: options.intents
    },

    debug: bot.events.debug,

    handleDiscordPayload:
      bot.handleDiscordPayload ??
      async function (shard, data: DiscordGatewayPayload) {
        // TRIGGER RAW EVENT
        bot.events.raw(bot, data, shard.id)

        if (!data.t) return

        // RUN DISPATCH CHECK
        await bot.events.dispatchRequirements(bot, data, shard.id)
        bot.handlers[data.t as GatewayDispatchEventNames]?.(
          bot,
          data,
          shard.id
        )
      }
  })

  return bot
}

export async function startBot (bot: Bot): Promise<void> {
  if (Object.keys(bot.botGatewayData ?? {}).length === 0) {
    bot.gateway.gatewayBot = await bot.rest.helpers.getGatewayBot()
    bot.gateway.lastShardId = bot.gateway.gatewayBot.shards - 1
    bot.gateway.manager.totalShards = bot.gateway.gatewayBot.shards
  }

  bot.gateway.spawnShards()
}

export async function stopBot (bot: Bot): Promise<Bot> {
  await bot.gateway.stop(
    ShardSocketCloseCodes.Shutdown,
    'User requested bot stop'
  )

  return bot
}

export interface CreateBotOptions extends CreateClientOptions {
  botGatewayData?: GetGatewayBot
  rest?: Omit<CreateRestManagerOptions, 'token'>
}

export interface Bot extends Client {
  botGatewayData?: GetGatewayBot
  rest: ReturnType<typeof createRestManager>
  gateway: ReturnType<typeof createGatewayManager>
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createBotConstants () {
  return {
    DISCORDENO_VERSION,
    USER_AGENT,
    BASE_URL: baseEndpoints.BASE_URL,
    CDN_URL: baseEndpoints.CDN_URL,
    regexes: {
      SLASH_COMMANDS_NAME_REGEX,
      CONTEXT_MENU_COMMANDS_NAME_REGEX,
      CHANNEL_MENTION_REGEX,
      DISCORD_SNOWFLAKE_REGEX
    },
    Errors
  }
}
