import fastifyEnv from '@fastify/env'
import fastifyHelmet from '@fastify/helmet'
import fastify, { type FastifyInstance } from 'fastify'

export const buildFastifyApp = (): FastifyInstance => {
  const app = fastify()

  app.register(fastifyEnv, {
    schema: {
      type: 'object',
      properties: {
        PORT: {
          type: 'number',
          default: 8000,
        },
        DISCORD_TOKEN: {
          type: 'string',
          minLength: 1,
        },
        AUTHORIZATION_TOKEN: {
          type: 'string',
          minLength: 1,
        },
      },
      required: ['DISCORD_TOKEN', 'AUTHORIZATION_TOKEN'],
    },
  })

  app.register(fastifyHelmet)

  return app
}

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: number
      DISCORD_TOKEN: string
      AUTHORIZATION_TOKEN: string
    }
  }
}
