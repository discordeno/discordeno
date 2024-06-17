import fastifyMultipart, { type MultipartFile, type MultipartValue } from '@fastify/multipart'
import fastify, { type FastifyInstance } from 'fastify'
import { REST_AUTHORIZATION } from '../config.js'

export function buildFastifyApp(): FastifyInstance {
  const app = fastify()

  app.register(fastifyMultipart, { attachFieldsToBody: true })

  // Authorization check
  app.addHook('onRequest', async (request, reply) => {
    if (request.headers.authorization !== REST_AUTHORIZATION) {
      reply.status(401).send({
        message: 'Credentials not valid.',
      })
    }
  })

  return app
}

export async function parseMultiformBody(body: unknown): Promise<FormData> {
  const form = new FormData()

  if (typeof body !== 'object' || !body) return form

  for (const objectValue of Object.values(body)) {
    const value = objectValue as MultipartFile | MultipartValue

    if (value.type === 'file') {
      form.append(value.fieldname, new Blob([await value.toBuffer()]), value.filename)
    }
    if (value.type === 'field' && typeof value.value === 'string') {
      form.append(value.fieldname, value.value)
    }
  }

  return form
}
