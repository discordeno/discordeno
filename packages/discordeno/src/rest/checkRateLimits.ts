import { RestManager } from './restManager.js'

/** Check the rate limits for a url or a bucket. */
export function checkRateLimits(rest: RestManager, url: string) {
  const ratelimited = rest.rateLimitedPaths.get(url)
  const global = rest.rateLimitedPaths.get('global')
  const now = Date.now()

  if ((ratelimited != null) && now < ratelimited.resetTimestamp) {
    return ratelimited.resetTimestamp - now
  }
  if ((global != null) && now < global.resetTimestamp) {
    return global.resetTimestamp - now
  }

  return false
}
