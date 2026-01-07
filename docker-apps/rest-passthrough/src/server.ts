import { createRestManager, type RequestMethods } from '@discordeno/rest'
import type { MultipartFile, MultipartValue } from '@fastify/multipart'
import { buildFastifyApp } from './fastify.js'

const app = await buildFastifyApp()

if (!app.config.DISCORD_TOKEN || !app.config.AUTHORIZATION_TOKEN) {
  console.error('Missing environment variables. Both DISCORD_TOKEN and AUTHORIZATION_TOKEN are required.')
  process.exit(1)
}

const discordRestManager = createRestManager({
  token: app.config.DISCORD_TOKEN,
})

app.get('/timecheck', async (_request, reply) => {
  reply.status(200).send({
    message: Date.now(),
  })
})

app.all('/*', async (request, reply) => {
  let url = request.originalUrl

  if (url.startsWith('/v')) {
    url = url.slice(url.indexOf('/', 2))
  }

  const isMultipart = request.headers['content-type']?.startsWith('multipart/form-data')
  const body = request.method !== 'GET' && request.method !== 'DELETE' ? request.body : undefined

  try {
    const result = await discordRestManager.makeRequest(request.method as RequestMethods, url, {
      body: isMultipart && body ? await parseMultiformBody(body) : body,
    })

    if (result) {
      reply.status(200).send(result)
    } else {
      reply.status(204).send({})
    }
  } catch (error) {
    app.log.error(error)

    reply.status(500).send({
      message: error,
    })
  }
})

try {
  await app.listen({
    host: app.config.HOST,
    port: 8000,
  })
  console.log(`Proxy listening on port 8000`)
} catch (error) {
  app.log.error(error)
  process.exit(1)
}

async function parseMultiformBody(body: unknown): Promise<FormData> {
  const form = new FormData()

  if (typeof body !== 'object' || !body) return form

  for (const objectValue of Object.values(body)) {
    const value = objectValue as MultipartFile | MultipartValue

    if (value.type === 'file') {
      form.append(value.fieldname, new Blob([Uint8Array.from(await value.toBuffer())]), value.filename)
    }
    if (value.type === 'field' && typeof value.value === 'string') {
      form.append(value.fieldname, value.value)
    }
  }

  return form
}
