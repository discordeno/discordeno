import { createRestManager, type RequestMethods } from '@discordeno/rest'
import { buildFastifyApp } from './fastify.js'

const app = buildFastifyApp()

if (!app.config.DISCORD_TOKEN || !app.config.AUTHORIZATION_TOKEN) {
  console.error('Missing environment variables. Both DISCORD_TOKEN and AUTHORIZATION_TOKEN are required.')
  process.exit(1)
}

const discordRestManager = createRestManager({
  token: app.config.DISCORD_TOKEN,
})

app.addHook('onRequest', async (request, reply) => {
  if (request.headers.authorization !== app.config.AUTHORIZATION_TOKEN) {
    reply.status(401).send({
      message: 'Credentials not valid.',
    })
  }
})

app.all('/*', async (request, reply) => {
  const url = request.originalUrl

  try {
    const result = await discordRestManager.makeRequest(request.method as RequestMethods, url, {
      body: request.body,
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
  await app.listen({ port: 8000 })
  console.log(`Proxy listening on port 8000`)
} catch (error) {
  app.log.error(error)
  process.exit(1)
}
