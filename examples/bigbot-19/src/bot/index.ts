import type { DiscordGatewayPayload, GatewayDispatchEventNames } from '@discordeno/bot'
import { connect as connectAmqp } from 'amqplib'
import { join as joinPath } from 'node:path'
import {
  EVENT_HANDLER_HOST,
  EVENT_HANDLER_PORT,
  MESSAGEQUEUE_ENABLE,
  MESSAGEQUEUE_PASSWORD,
  MESSAGEQUEUE_URL,
  MESSAGEQUEUE_USERNAME,
} from '../config.js'
import { getDirnameFromFileUrl } from '../util.js'
import { bot } from './bot.js'
import { buildFastifyApp } from './fastify.js'
import importDirectory from './utils/loader.js'
import { updateCommands } from './utils/updateCommands.js'

// The importDirectory function uses 'readdir' that requires either a relative path compared to the process CWD or an absolute one, so to get one relative we need to use import.meta.url
const currentDirectory = getDirnameFromFileUrl(import.meta.url)

await importDirectory(joinPath(currentDirectory, './commands'))
await importDirectory(joinPath(currentDirectory, './events'))

await updateCommands()

if (MESSAGEQUEUE_ENABLE) {
  await connectToRabbitMQ()
}

const app = buildFastifyApp()

app.get('/timecheck', async (_req, res) => {
  res.status(200).send({ message: Date.now() })
})

app.post('/', async (req, res) => {
  const body = req.body as GatewayEvent

  try {
    handleGatewayEvent(body.payload, body.shardId)

    res.status(200).send()
  } catch (error) {
    bot.logger.error('There was an error handling the incoming gateway command', error)
    res.status(500).send()
  }
})

await app.listen({
  host: EVENT_HANDLER_HOST,
  port: EVENT_HANDLER_PORT,
})

bot.logger.info(`Bot event handler is listening on port ${EVENT_HANDLER_PORT}`)

async function handleGatewayEvent(payload: DiscordGatewayPayload, shardId: number): Promise<void> {
  bot.events.raw?.(payload, shardId)

  // If we don't have the event type we don't process it further
  if (!payload.t) return

  // Run the dispatch check
  await bot.events.dispatchRequirements?.(payload, shardId)

  bot.handlers[payload.t as GatewayDispatchEventNames]?.(bot, payload, shardId)
}

async function connectToRabbitMQ(): Promise<void> {
  const connection = await connectAmqp(`amqp://${MESSAGEQUEUE_USERNAME}:${MESSAGEQUEUE_PASSWORD}@${MESSAGEQUEUE_URL}`).catch((error) => {
    bot.logger.error('Failed to connect to RabbitMQ, retrying in 1s.', error)
    setTimeout(connectToRabbitMQ, 1000)
  })

  if (!connection) return

  connection.on('close', () => {
    setTimeout(connectToRabbitMQ, 1000)
  })
  connection.on('error', (error) => {
    bot.logger.error('There was an error in the connection with RabbitMQ, reconnecting in 1s.', error)
    setTimeout(connectToRabbitMQ, 1000)
  })

  const channel = await connection.createChannel().catch((error) => {
    bot.logger.error('There was an error creating the RabbitMQ channel', error)
  })

  if (!channel) return

  const exchange = await channel
    .assertExchange('gatewayMessage', 'x-message-deduplication', {
      durable: true,
      arguments: {
        'x-cache-size': 1000, // maximum number of entries
        'x-cache-ttl': 500, // 500ms
      },
    })
    .catch((error) => {
      bot.logger.error('There was an error asserting the exchange', error)
    })

  if (!exchange) return

  await channel.assertQueue('gatewayMessageQueue').catch(console.log)
  await channel.bindQueue('gatewayMessageQueue', 'gatewayMessage', '').catch(console.log)
  await channel
    .consume('gatewayMessageQueue', async (message) => {
      if (!message) return

      try {
        const messageBody = JSON.parse(message.content.toString()) as GatewayEvent

        await handleGatewayEvent(messageBody.payload, messageBody.shardId)

        channel.ack(message)
      } catch (error) {
        bot.logger.error('There was an error handling events received from RabbitMQ', error)
      }
    })
    .catch(console.log)
}

interface GatewayEvent {
  payload: DiscordGatewayPayload
  shardId: number
}
