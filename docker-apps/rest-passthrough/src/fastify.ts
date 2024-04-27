import fastifyMultipart from '@fastify/multipart'
import fastifyEnv from '@fastify/env'
import fastifyHelmet from '@fastify/helmet'
import fastify, { type FastifyInstance } from 'fastify'

export const buildFastifyApp = async (): Promise<FastifyInstance> => {
  const app = await fastify()

  await app.register(fastifyEnv, {
    schema: {
      type: 'object',
      properties: {
        HOST: {
          type: 'string',
          default: 'localhost',
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

  await app.register(fastifyHelmet)
  app.register(fastifyMultipart, { attachFieldsToBody: true })

  app.addHook('onRequest', async (request, reply) => {
    if (request.headers.authorization !== request.server.config.AUTHORIZATION_TOKEN) {
      reply.status(401).send({
        message: 'Credentials not valid.',
      })
    }
  })

  return app
}

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      HOST: string
      DISCORD_TOKEN: string
      AUTHORIZATION_TOKEN: string
    }
  }
}
