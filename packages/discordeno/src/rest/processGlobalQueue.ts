import { RestPayload, RestRequest } from './rest.js'
import { RestManager } from './restManager.js'

export async function processGlobalQueue(rest: RestManager, request: {
  request: RestRequest
  payload: RestPayload
  basicURL: string
  urlToUse: string
}) {
  // Check if this request is able to be made globally
  await rest.invalidBucket.waitUntilRequestAvailable()

  // Check if this request is able to be made for it's specific bucket
  // await rest.buckets.get()

  await rest.sendRequest(rest, {
    url: request.urlToUse,
    method: request.request.method,
    bucketId: request.payload.bucketId,
    reject: request.request.reject,
    respond: request.request.respond,
    retryRequest: function () {
      rest.processGlobalQueue(rest, request)
    },
    retryCount: request.payload.retryCount ?? 0,
    payload: rest.createRequestBody(rest, {
      method: request.request.method,
      body: request.payload.body,
      url: request.urlToUse
    })
  })
    // Should be handled in sendRequest, this catch just prevents bots from dying
    .catch(() => null)
}
