import { Collection, LogDepth, createBot, type Bot, type logger } from '@discordeno/bot'
import { DISCORD_TOKEN, GATEWAY_AUTHORIZATION, GATEWAY_INTENTS, GATEWAY_URL, REST_AUTHORIZATION, REST_URL } from '../config.js'
import type { ManagerGetShardInfoFromGuildId, ShardInfo, WorkerPresencesUpdate, WorkerShardPayload } from '../gateway/worker/types.js'
import type { Command } from './commands.js'

export const bot = createCustomBot(
  createBot({
    token: DISCORD_TOKEN,
    intents: GATEWAY_INTENTS,
    rest: {
      token: DISCORD_TOKEN,
      proxy: {
        baseUrl: REST_URL,
        authorization: REST_AUTHORIZATION,
      },
    },
  }),
)

overrideGatewayImplementations(bot)

// TEMPLATE-SETUP: Add/Remove the desired proprieties that you don't need
const props = bot.transformers.desiredProperties

props.interaction.id = true
props.interaction.data = true
props.interaction.type = true
props.interaction.user = true
props.interaction.token = true
props.interaction.guildId = true

props.user.id = true
props.user.username = true

props.message.id = true

// TEMPLATE-SETUP: If you want/need to add any custom proprieties on the Bot type, you can do it in this function and the `CustomBot` type below. Make sure to do it in both or else you will get an error by TypeScript
function createCustomBot<TBot extends Bot = Bot>(rawBot: TBot): CustomBot<TBot> {
  const bot = rawBot as CustomBot<TBot>

  // We need to set the log depth for the default discordeno logger or else only the first param will be logged
  ;(bot.logger as typeof logger).setDepth(LogDepth.Full)

  bot.commands = new Collection()

  return bot
}

export type CustomBot<TBot extends Bot = Bot> = TBot & {
  commands: Collection<string, Command>
}

// Override the default gateway functions to allow the methods on the gateway object to proxy the requests to the gateway proxy
function overrideGatewayImplementations(bot: CustomBot): void {
  bot.gateway.sendPayload = async (shardId, payload) => {
    await fetch(GATEWAY_URL, {
      method: 'POST',
      body: JSON.stringify({
        type: 'ShardPayload',
        shardId,
        payload,
      } satisfies WorkerShardPayload),
      headers: {
        'Content-Type': 'application/json',
        Authorization: GATEWAY_AUTHORIZATION,
      },
    })
  }

  bot.gateway.editBotStatus = async (payload) => {
    await fetch(GATEWAY_URL, {
      method: 'POST',
      body: JSON.stringify({
        type: 'EditShardsPresence',
        payload,
      } satisfies WorkerPresencesUpdate),
      headers: {
        'Content-Type': 'application/json',
        Authorization: GATEWAY_AUTHORIZATION,
      },
    })
  }
}

export async function getShardInfoFromGuild(guildId?: bigint): Promise<Omit<ShardInfo, 'nonce'>> {
  const req = await fetch(GATEWAY_URL, {
    method: 'POST',
    body: JSON.stringify({
      type: 'ShardInfoFromGuild',
      guildId: guildId?.toString(),
    } as ManagerGetShardInfoFromGuildId),
    headers: {
      'Content-Type': 'application/json',
      Authorization: GATEWAY_AUTHORIZATION,
    },
  })

  const res = await req.json()

  if (req.ok) return res

  throw new Error(`There was an issue getting the shard info: ${res.error}`)
}
