import { createBot } from '@discordeno/bot'
import events from './events/index.js'

import { config } from 'dotenv'
config()

const token = process.env.TOKEN

// Ensure the existence of the TOKEN env
if (!token) throw new Error('The TOKEN environment variable needs to be defined.')

export const bot = createBot({
  token,
  desiredProperties: {
    user: {
      id: true,
    },
    message: {
      id: true,
    },
    member: {
      roles: true,
    },
    interaction: {
      id: true,
      data: true,
      type: true,
      user: true,
      token: true,
      member: true,
      message: true,
      guildId: true,
      channelId: true,
    },
    interactionCallbackResponse: {
      resource: true,
    },
    interactionResource: {
      message: true,
    },
    role: {
      id: true,
    },
  },
})

bot.events = events
