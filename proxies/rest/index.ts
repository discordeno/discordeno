import type { RequestMethods } from '@discordeno/rest'
import express from 'express'
import { REST } from './rest.js'

const AUTHORIZATION = process.env.AUTHORIZATION as string

const app = express()

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.all('/*', async (req, res) => {
  if (!AUTHORIZATION || AUTHORIZATION !== req.headers.authorization) {
    return res.status(401).json({ error: 'Invalid authorization key.' })
  }

  try {
    let url = req.originalUrl
    if (url.startsWith('/v')) {
      url = url.slice(url.indexOf('/', 2))
    }

    const result = await REST.makeRequest(req.method as RequestMethods, url, req.body)

    if (result) {
      res.status(200).json(result)
    } else {
      res.status(204).json()
    }
  } catch (error: any) {
    console.log(error)
    res.status(500).json(error)
  }
})

app.listen(process.env.REST_PORT, () => {
  console.log(`REST listening on port #${process.env.REST_PORT!}`)
})
