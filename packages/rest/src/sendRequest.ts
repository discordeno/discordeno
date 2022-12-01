import { HTTPResponseCodes } from '@discordeno/types'
import { BASE_URL, delay } from '@discordeno/utils'
import { RequestMethod } from './rest.js'
import { RestManager } from './restManager.js'

export interface RestSendRequestOptions {
  url: string
  method: RequestMethod
  bucketId?: string
  reject?: Function
  respond?: Function
  retryRequest?: Function
  retryCount?: number
  payload?: {
    headers: Record<string, string>
    body: string | FormData
  }
}

export async function sendRequest<T> (rest: RestManager, options: RestSendRequestOptions): Promise<T> {
  try {
    // CUSTOM HANDLER FOR USER TO LOG OR WHATEVER WHENEVER A FETCH IS MADE
    rest.fetching(options)

    const response = await fetch(
      options.url.startsWith(BASE_URL) ? options.url : `${BASE_URL}/v${rest.version}/${options.url}`,
      {
        method: options.method,
        headers: options.payload?.headers,
        body: options.payload?.body
      }
    )
    rest.fetched(options, response)

    const bucketIdFromHeaders = rest.processRequestHeaders(
      rest,
      rest.simplifyUrl(options.url, options.method),
      response.headers
    )
    // SET THE BUCKET Id IF IT WAS PRESENT
    if (bucketIdFromHeaders !== undefined) {
      options.bucketId = bucketIdFromHeaders
    }

    if (response.status < 200 || response.status >= 400) {
      rest.debug(
        `[REST - httpError] Payload: ${JSON.stringify(options)} | Response: ${JSON.stringify(response)}`
      )

      let error = 'REQUEST_UNKNOWN_ERROR'
      switch (response.status) {
        case HTTPResponseCodes.BadRequest:
          error = "The options was improperly formatted, or the server couldn't understand it."
          break
        case HTTPResponseCodes.Unauthorized:
          error = 'The Authorization header was missing or invalid.'
          break
        case HTTPResponseCodes.Forbidden:
          error = 'The Authorization token you passed did not have permission to the resource.'
          break
        case HTTPResponseCodes.NotFound:
          error = "The resource at the location specified doesn't exist."
          break
        case HTTPResponseCodes.MethodNotAllowed:
          error = 'The HTTP method used is not valid for the location specified.'
          break
        case HTTPResponseCodes.GatewayUnavailable:
          error = 'There was not a gateway available to process your options. Wait a bit and retry.'
          break
      }

      // If NOT rate limited remove from queue
      if (response.status !== 429) {
        rest.invalidBucket.handleCompletedRequest(response.status, false)

        // need revise, old code: const body = response.type ? JSON.stringify(await response.json()) : undefined
        const body = JSON.stringify(await response.json())
        return options.reject?.({
          ok: false,
          status: response.status,
          error,
          body
        })
      } else {
        const json = await response.json()

        // TOO MANY ATTEMPTS, GET RID OF REQUEST FROM QUEUE.
        if (options.retryCount !== undefined && options.retryCount++ >= rest.maxRetryCount) {
          rest.debug(`[REST - RetriesMaxed] ${JSON.stringify(options)}`)
          // REMOVE ITEM FROM QUEUE TO PREVENT RETRY
          options.reject?.({
            ok: false,
            status: response.status,
            error: 'The options was rate limited and it maxed out the retries limit.'
          })

          // @ts-expect-error Code should never reach here
          return
        } else {
          // RATE LIMITED, ADD BACK TO QUEUE

          rest.invalidBucket.handleCompletedRequest(
            response.status,
            response.headers.get('X-RateLimit-Scope') === 'shared'
          )
          await delay(json.retry_after * 1000)
          return options.retryRequest?.()
        }
      }
    }

    // SOMETIMES DISCORD RETURNS AN EMPTY 204 RESPONSE THAT CAN'T BE MADE TO JSON
    if (response.status === 204) {
      rest.debug(`[REST - FetchSuccess] URL: ${options.url} | ${JSON.stringify(options)}`)
      options.respond?.({
        ok: true,
        status: 204
      })
      // @ts-expect-error 204 will be void
      return
    } else {
      // CONVERT THE RESPONSE TO JSON
      const json = JSON.stringify(await response.json())

      rest.debug(`[REST - fetchSuccess] ${JSON.stringify(options)}`)
      options.respond?.({
        ok: true,
        status: 200,
        body: json
      })

      return JSON.parse(json)
    }
  } catch (error) {
    const stringifiedError = (error as Error).toString?.()
    // SOMETHING WENT WRONG, LOG AND RESPOND WITH ERROR
    rest.debug(`[REST - fetchFailed] Payload: ${JSON.stringify(options)} | Error: ${stringifiedError}`)
    options.reject?.({
      ok: false,
      status: 599,
      error: `Internal Proxy Error\n${stringifiedError}`
    })

    throw new Error(`Something went wrong in sendRequest\n${stringifiedError}`)
  }
}
