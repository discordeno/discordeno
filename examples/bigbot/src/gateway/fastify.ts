import fastify, { type FastifyInstance } from 'fastify'
import { GATEWAY_AUTHORIZATION } from '../config.js'

export function buildFastifyApp(): FastifyInstance {
  const app = fastify()

  // Authorization check
  app.addHook('onRequest', async (req, res) => {
    if (req.headers.authorization !== GATEWAY_AUTHORIZATION) {
      res.status(401).send({
        message: 'Credentials not valid.',
      })
    }
  })

  return app
}
