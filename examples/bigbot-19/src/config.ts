import { Intents } from '@discordeno/bot'
import 'dotenv/config'

// #region Mapping of environment variables to javascript variables

// General Configurations

export const DATABASE_URL = process.env.DATABASE_URL
export const DEVELOPMENT = process.env.DEVELOPMENT ?? false
export const DEV_SERVER_ID = process.env.DEV_SERVER_ID
export const DISCORD_TOKEN = process.env.DISCORD_TOKEN

// Bot Configuration

export const EVENT_HANDLER_AUTHORIZATION = process.env.EVENT_HANDLER_AUTHORIZATION
export const EVENT_HANDLER_HOST = process.env.EVENT_HANDLER_HOST
export const EVENT_HANDLER_PORT = process.env.EVENT_HANDLER_PORT

export const MISSING_TRANSLATION_WEBHOOK = process.env.MISSING_TRANSLATION_WEBHOOK
export const BUGS_ERRORS_REPORT_WEBHOOK = process.env.BUGS_ERRORS_REPORT_WEBHOOK

// Rest Proxy Configurations

export const REST_AUTHORIZATION = process.env.REST_AUTHORIZATION
export const REST_HOST = process.env.REST_HOST
export const REST_PORT = process.env.REST_PORT

// Gateway Proxy Configurations

export const TOTAL_SHARDS = process.env.TOTAL_SHARDS
export const SHARDS_PER_WORKER = process.env.SHARDS_PER_WORKER
export const TOTAL_WORKERS = process.env.TOTAL_WORKERS

export const GATEWAY_AUTHORIZATION = process.env.GATEWAY_AUTHORIZATION
export const GATEWAY_HOST = process.env.GATEWAY_HOST
export const GATEWAY_PORT = process.env.GATEWAY_PORT

// Message queue (RabbitMQ configuration)

export const MESSAGEQUEUE_ENABLE = process.env.MESSAGEQUEUE_ENABLE

export const MESSAGEQUEUE_URL = process.env.MESSAGEQUEUE_URL
export const MESSAGEQUEUE_USERNAME = process.env.MESSAGEQUEUE_USERNAME
export const MESSAGEQUEUE_PASSWORD = process.env.MESSAGEQUEUE_PASSWORD

// Analytics (InfluxDB configuration)

export const INFLUX_ORG = process.env.INFLUX_ORG
export const INFLUX_BUCKET = process.env.INFLUX_BUCKET
export const INFLUX_TOKEN = process.env.INFLUX_TOKEN
export const INFLUX_URL = process.env.INFLUX_URL

// #endregion

export const EVENT_HANDLER_URL = `http://${EVENT_HANDLER_HOST}:${EVENT_HANDLER_PORT}`
export const REST_URL = `http://${REST_HOST}:${REST_PORT}`
export const GATEWAY_URL = `http://${GATEWAY_HOST}:${GATEWAY_PORT}`

// TEMPLATE-SETUP: Add/Remove the intents you need/don't need
export const GATEWAY_INTENTS = Intents.Guilds | Intents.GuildMessages
