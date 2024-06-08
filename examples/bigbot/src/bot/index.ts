import dotenv from 'dotenv'

import type { DiscordGatewayPayload } from 'discordeno'
// ReferenceError: publishMessage is not defined
// import Embeds from "discordeno/embeds";
import amqplib from 'amqplib'
import express from 'express'
import { BOT_ID, EVENT_HANDLER_URL } from '../configs.js'
import { bot } from './bot.js'
import { updateDevCommands } from './utils/slash/updateCommands.js'
import { webhookURLToIDAndToken } from './utils/webhook.js'
dotenv.config()

const BUGS_ERRORS_REPORT_WEBHOOK = process.env.BUGS_ERRORS_REPORT_WEBHOOK
const EVENT_HANDLER_AUTHORIZATION = process.env.EVENT_HANDLER_AUTHORIZATION!
const EVENT_HANDLER_PORT = process.env.EVENT_HANDLER_PORT!

process
  .on('unhandledRejection', (error) => {
    if (!BUGS_ERRORS_REPORT_WEBHOOK) return
    const { id, token } = webhookURLToIDAndToken(BUGS_ERRORS_REPORT_WEBHOOK)
    if (!id || !token) return

    // DO NOT SEND ERRORS FROM NON PRODUCTION
    if (BOT_ID !== 270010330782892032n) {
      return console.error(error)
    }

    // An unhandled error occurred on the bot in production
    console.error(error ?? `An unhandled rejection error occurred but error was null or undefined`)

    // eslint-disable-next-line no-useless-return
    if (!error) return

    // ReferenceError: publishMessage is not defined
    /*
    const embeds = new Embeds()
      .setDescription(["```js", error, "```"].join(`\n`))
      .setTimestamp()
      .setFooter("Unhandled Rejection Error Occurred");

    // SEND ERROR TO THE LOG CHANNEL ON THE DEV SERVER
    return bot.helpers.sendWebhookMessage(bot.transformers.snowflake(id), token, { embeds }).catch(console.error);
    */
  })
  .on('uncaughtException', async (error) => {
    if (!BUGS_ERRORS_REPORT_WEBHOOK) return
    const { id, token } = webhookURLToIDAndToken(BUGS_ERRORS_REPORT_WEBHOOK)
    if (!id || !token) return

    // DO NOT SEND ERRORS FROM NON PRODUCTION
    if (BOT_ID !== 270010330782892032n) {
      return console.error(error)
    }

    // An unhandled error occurred on the bot in production
    console.error(error ?? `An unhandled exception occurred but error was null or undefined`)

    if (!error) process.exit(1)

    /*
    const embeds = new Embeds()
      .setDescription(["```js", error.stack, "```"].join(`\n`))
      .setTimestamp()
      .setFooter("Unhandled Exception Error Occurred");
      // SEND ERROR TO THE LOG CHANNEL ON THE DEV SERVER
      await bot.helpers.sendWebhookMessage(bot.transformers.snowflake(id), token, { embeds }).catch(console.error);
      */

    process.exit(1)
  })

if (process.env.DEVELOPMENT === 'true') {
  bot.logger.info(`[DEV MODE] Updating slash commands for dev server.`)
  updateDevCommands(bot)
}

// Handle events from the gateway
const handleEvent = async (message: DiscordGatewayPayload, shardId: number): Promise<void> => {
  // EMITS RAW EVENT
  bot.events.raw(bot, message, shardId)

  if (message.t && message.t !== 'RESUMED') {
    // When a guild or something isnt in cache this will fetch it before doing anything else
    if (!['READY', 'GUILD_LOADED_DD'].includes(message.t)) {
      await bot.events.dispatchRequirements(bot, message, shardId)
    }

    bot.handlers[message.t]?.(bot, message, shardId)
  }
}

const app = express()

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.all('/', async (req, res) => {
  try {
    if (!EVENT_HANDLER_AUTHORIZATION || EVENT_HANDLER_AUTHORIZATION !== req.headers.authorization) {
      return res.status(401).json({ error: 'Invalid authorization key.' })
    }

    const json = req.body as {
      message: DiscordGatewayPayload
      shardId: number
    }

    await handleEvent(json.message, json.shardId)

    res.status(200).json({ success: true })
  } catch (error: any) {
    bot.logger.error(error)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    res.status(error.code).json(error)
  }
})

app.listen(EVENT_HANDLER_PORT, () => {
  console.log(`Bot is listening at ${EVENT_HANDLER_URL};`)
})

const connectRabbitmq = async (): Promise<void> => {
  let connection: amqplib.Connection | undefined

  try {
    connection = await amqplib.connect(
      `amqp://${process.env.MESSAGEQUEUE_USERNAME}:${process.env.MESSAGEQUEUE_PASSWORD}@${process.env.MESSAGEQUEUE_URL}`,
    )
  } catch (error) {
    console.error(error)
    setTimeout(connectRabbitmq, 1000)
  }

  if (!connection) return
  connection.on('error', (err) => {
    console.error(err)
    setTimeout(connectRabbitmq, 1000)
  })

  connection.on('close', () => {
    setTimeout(connectRabbitmq, 1000)
  })

  try {
    const channel = await connection.createChannel()

    await channel.assertExchange('gatewayMessage', 'x-message-deduplication', {
      durable: true,
      arguments: {
        'x-cache-size': 1000,
        'x-cache-ttl': 500,
      },
    })

    await channel.assertQueue('gatewayMessageQueue')
    await channel.bindQueue('gatewayMessageQueue', 'gatewayMessage', '')
    await channel.consume(
      'gatewayMessageQueue',
      async (msg) => {
        if (!msg) return
        const json = JSON.parse(msg.content.toString()) as {
          message: DiscordGatewayPayload
          shardId: number
        }

        await handleEvent(json.message, json.shardId)

        channel.ack(msg)
      },
      {
        noAck: false,
      },
    )
  } catch (error) {
    console.error(error)
  }
}

if (process.env.MESSAGEQUEUE_ENABLE === 'true') {
  connectRabbitmq()
}
