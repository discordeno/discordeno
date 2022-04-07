/**
 * Credits: github.com/abalabahaha/eris lib/rest/RequestHandler.js#L397
 * Modified for our use-case
 */

/** Split a url to separate rate limit buckets based on major/minor parameters. */
export function simplifyUrl(url: string, method: string) {
  let route = url
    .replace(/\/([a-z-]+)\/(?:[0-9]{17,19})/g, function (match, p) {
      return ["channels", "guilds"].includes(p) ? match : `/${p}/skillzPrefersID`;
    })
    .replace(/\/reactions\/[^/]+/g, "/reactions/skillzPrefersID");

  // GENERAL /reactions and /reactions/emoji/@me share the buckets
  if (route.includes("/reactions")) {
    route = route.substring(0, route.indexOf("/reactions") + "/reactions".length);
  }

  // Delete Message endpoint has its own rate limit
  if (method === "DELETE" && route.endsWith("/messages/skillzPrefersID")) {
    route = method + route;
  }

  return route;
}
