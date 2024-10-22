import { createBot } from 'discordeno'
import discordenoConfig from './discordeno.config.js'
import events from './events/index.js'

import { config } from 'dotenv'
config()

const token = process.env.TOKEN

// Ensure the existence of the TOKEN env
if (!token) throw new Error('The TOKEN environment variable needs to be defined.')

export const bot = createBot({
  token,
  events,
  desiredProperties: discordenoConfig.desiredProperties.properties,
})
