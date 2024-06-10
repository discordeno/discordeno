import fastify, { type FastifyInstance } from 'fastify'
import { GATEWAY_AUTHORIZATION } from '../config.js'

export function buildFastifyApp(): FastifyInstance {
  const app = fastify()

  // Authorization check
  app.addHook('onRequest', async (request, reply) => {
    if (request.headers.authorization !== GATEWAY_AUTHORIZATION) {
      reply.status(401).send({
        message: 'Credentials not valid.',
      })
    }
  })

  return app
}
