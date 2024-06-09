import { type RequestMethods } from '@discordeno/bot'
import { REST_AUTHORIZATION, REST_HOST, REST_PORT } from '../config.js'
import { buildFastifyApp, parseMultiformBody } from './fastify.js'
import restManager, { logger } from './restManager.js'

if (!REST_AUTHORIZATION) throw new Error('The REST_AUTHORIZATION environment variable is missing')
if (!REST_HOST) throw new Error('The REST_HOST environment variable is missing')
if (!REST_PORT) throw new Error('The REST_PORT environment variable is missing')

const portNumber = Number.parseInt(REST_PORT)

if (Number.isNaN(portNumber)) throw new Error('The REST_PORT environment variable should be a valid number')

const app = buildFastifyApp()

app.get('/timecheck', async (_req, res) => {
  res.status(200).send({ message: Date.now() })
})

app.all('/*', async (req, res) => {
  let url = req.originalUrl

  if (url.startsWith('/v')) {
    url = url.slice(url.indexOf('/', 2))
  }

  const isMultipart = req.headers['content-type']?.startsWith('multipart/form-data')
  const hasBody = req.method !== 'GET' && req.method !== 'DELETE'
  const body = hasBody ? (isMultipart ? await parseMultiformBody(req.body) : req.body) : undefined

  try {
    const result = await restManager.makeRequest(req.method as RequestMethods, url, {
      body,
    })

    if (result) {
      res.status(200).send(result)
      return
    }

    res.status(204).send({})
  } catch (error) {
    logger.error(error)

    res.status(500).send({
      message: error,
    })
  }
})

await app.listen({
  host: REST_HOST,
  port: portNumber,
})

logger.info(`REST Proxy listening on port ${portNumber}`)
