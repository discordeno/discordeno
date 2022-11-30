// START FILE FOR REST PROCESS
import { config as dotenv } from 'https://deno.land/x/dotenv@v3.2.0/mod.js'

import { BASE_URL, Collection, createRestManager } from './mod.js'

dotenv({ export: true, path: `${Deno.cwd()}/.env` })

const col = new Collection<string, number>()

const token = Deno.env.get('GAMER_TOKEN')
if (!token) throw new Error('Token was not provided.')

const REST_AUTHORIZATION_KEY = Deno.env.get('PROXY_REST_SECRET')
const PROXY_REST_URL = Deno.env.get('PROXY_REST_URL')
const REST_PORT = Number(PROXY_REST_URL?.substring(PROXY_REST_URL.lastIndexOf(':') + 1)) ?? 8080

// CREATES THE FUNCTIONALITY FOR MANAGING THE REST REQUESTS
const rest = createRestManager({
  token,
  secretKey: REST_AUTHORIZATION_KEY,
  customUrl: PROXY_REST_URL,
  debug(text) {
    if (text.startsWith('[REST - RequestCreate]')) {
      const aaa = text.split(' ')
      const method = aaa[4]
      const url = aaa[7]

      col.set(method + url, Date.now())

      // console.log("[DEBUG]", method, url);
    }

    if (text.startsWith('[REST - processGlobalQueue] rate limited, running setTimeout.')) {
      console.log('[POSSIBLE BUCKET ISSUE]')
    }
  },
  fetching(options) {
    // console.log("[FETCHING]", options.method, options.url, Date.now() - col.get(options.method + options.url)!);
  }
})

// START LISTENING TO THE URL(localhost)
const server = Deno.listen({ port: REST_PORT })
console.log(
  `HTTP webserver running.  Access it at: ${PROXY_REST_URL}`
)

// Connections to the server will be yielded up as an async iterable.
for await (const conn of server) {
  // In order to not be blocking, we need to handle each connection individually
  // in its own async function.
  handleRequest(conn)
}

async function handleRequest(conn: Deno.Conn) {
  // This "upgrades" a network connection into an HTTP connection.
  const httpConn = Deno.serveHttp(conn)
  // Each request sent over the HTTP connection will be yielded as an async
  // iterator from the HTTP connection.
  for await (const requestEvent of httpConn) {
    if (
      !REST_AUTHORIZATION_KEY ||
      REST_AUTHORIZATION_KEY !==
      requestEvent.request.headers.get('AUTHORIZATION')
    ) {
      return requestEvent.respondWith(
        new Response(JSON.stringify({ error: 'Invalid authorization key.' }), {
          status: 401
        })
      )
    }

    try {
      const text = await requestEvent.request.text()
      const json = text ? JSON.parse(text) : undefined

      if (json?.file) {
        json.file = await Promise.all(json.file.map(async (f: any) => ({
          name: f.name,
          blob: await (await fetch(f.blob)).blob()
        })))
      }

      const result = await rest.runMethod(
        rest,
        requestEvent.request.method as RequestMethod,
        `${BASE_URL}${requestEvent.request.url.substring(
          `http://localhost:${REST_PORT}`.length
        )
        }`,
        json
      )

      if (result) {
        requestEvent.respondWith(
          new Response(JSON.stringify(result), {
            status: 200
          })
        )
      } else {
        requestEvent.respondWith(
          new Response(undefined, {
            status: 204
          })
        )
      }
    } catch (error) {
      console.log(
        'CATCH',
        requestEvent.request.url,
        requestEvent.request.method,
        requestEvent.request.body,
        error.code,
        error
      )
      requestEvent.respondWith(
        new Response(
          JSON.stringify({
            message: error.message
          }),
          {
            status: error.code ?? 469
          }
        )
      )
    }
  }
}

type RequestMethod = 'POST' | 'PUT' | 'DELETE' | 'PATCH'

// // @ts-ignore
// rest.convertRestError = (errorStack, data) => {
//   return data;
// };

// console.log(`Giveaway Boat REST Started At: ${new Date().toUTCString()}`);
