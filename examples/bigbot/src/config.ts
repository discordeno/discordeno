import { Intents } from '@discordeno/bot'
import 'dotenv/config'

// #region Mapping of environment variables to javascript variables with some minimal parsing

// General Configurations

export const DEVELOPMENT = process.env.DEVELOPMENT ?? false
export const DEV_SERVER_ID = process.env.DEV_SERVER_ID
export const DISCORD_TOKEN = assertEnv('DISCORD_TOKEN')

// Bot Configuration

export const EVENT_HANDLER_AUTHORIZATION = assertEnv('EVENT_HANDLER_AUTHORIZATION')

export const EVENT_HANDLER_HOST = assertEnv('EVENT_HANDLER_HOST')
export const EVENT_HANDLER_PORT = parseNumber(assertEnv('EVENT_HANDLER_PORT'), 'EVENT_HANDLER_PORT')

export const BUGS_ERRORS_REPORT_WEBHOOK = process.env.BUGS_ERRORS_REPORT_WEBHOOK

// Rest Proxy Configurations

export const REST_AUTHORIZATION = assertEnv('REST_AUTHORIZATION')
export const REST_HOST = assertEnv('REST_HOST')
export const REST_PORT = parseNumber(assertEnv('REST_PORT'), 'REST_PORT')

// Gateway Proxy Configurations

export const TOTAL_SHARDS = process.env.TOTAL_SHARDS ? parseNumber(process.env.TOTAL_SHARDS, 'TOTAL_SHARDS') : undefined
export const SHARDS_PER_WORKER = parseNumber(process.env.SHARDS_PER_WORKER ?? '16', 'SHARDS_PER_WORKER')
export const TOTAL_WORKERS = parseNumber(process.env.TOTAL_WORKERS ?? '4', 'TOTAL_WORKERS')

export const GATEWAY_AUTHORIZATION = assertEnv('GATEWAY_AUTHORIZATION')
export const GATEWAY_HOST = assertEnv('GATEWAY_HOST')
export const GATEWAY_PORT = parseNumber(assertEnv('GATEWAY_PORT'), 'GATEWAY_PORT')

// Message queue (RabbitMQ configuration)

export const MESSAGEQUEUE_ENABLE = process.env.MESSAGEQUEUE_ENABLE === "true"

export const MESSAGEQUEUE_URL = process.env.MESSAGEQUEUE_URL
export const MESSAGEQUEUE_USERNAME = process.env.MESSAGEQUEUE_USERNAME
export const MESSAGEQUEUE_PASSWORD = process.env.MESSAGEQUEUE_PASSWORD

// Analytics (InfluxDB configuration)

export const INFLUX_ORG = process.env.INFLUX_ORG
export const INFLUX_BUCKET = process.env.INFLUX_BUCKET
export const INFLUX_TOKEN = process.env.INFLUX_TOKEN
export const INFLUX_URL = process.env.INFLUX_URL

export const INFLUX_ENABLED = INFLUX_URL && INFLUX_TOKEN && INFLUX_ORG && INFLUX_BUCKET

// #endregion

export const EVENT_HANDLER_URL = `http://${EVENT_HANDLER_HOST}:${EVENT_HANDLER_PORT}`
export const REST_URL = `http://${REST_HOST}:${REST_PORT}`
export const GATEWAY_URL = `http://${GATEWAY_HOST}:${GATEWAY_PORT}`

// TEMPLATE-SETUP: Add/Remove the intents you need/don't need
export const GATEWAY_INTENTS = Intents.Guilds | Intents.GuildMessages

// Helper functions

function assertEnv(env: string): string {
  if (process.env[env]) return process.env[env]

  throw new TypeError(`The '${env}' environment variable must be set`)
}

function parseNumber(envValue: string, env: string): number {
  const parsed = Number.parseInt(envValue)

  if (Number.isFinite(parsed)) return parsed

  throw new TypeError(`The '${env}' environment variable must be a number`)
}
