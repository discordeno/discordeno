import { API_VERSION, BASE_URL, IMAGE_BASE_URL } from "../util/constants.ts";
import { rest } from "./rest.ts";

export function runMethod<T = any>(
  method: "get" | "post" | "put" | "delete" | "patch",
  url: string,
  body?: unknown,
  retryCount = 0,
  bucketId?: string | null,
): Promise<T | undefined> {
  rest.eventHandlers.debug?.("requestCreate", {
    method,
    url,
    body,
    retryCount,
    bucketId,
  });

  const errorStack = new Error("Location:");
  Error.captureStackTrace(errorStack);

  // For proxies we don't need to do any of the legwork so we just forward the request
  if (
    !url.startsWith(`${BASE_URL}/v${API_VERSION}`) &&
    !url.startsWith(IMAGE_BASE_URL)
  ) {
    return fetch(url, {
      body: JSON.stringify(body || {}),
      headers: {
        authorization: rest.authorization,
      },
      method: method.toUpperCase(),
    })
      .then((res) => {
        if (res.status === 204) return undefined;

        return (res.json() as unknown) as T;
      })
      .catch((error) => {
        console.error(error);
        throw errorStack;
      });
  }

  // No proxy so we need to handle all rate limiting and such
  return new Promise((resolve, reject) => {
    rest.processRequest(
      {
        url,
        method,
        reject,
        respond: (data: { status: number; body?: string }) =>
          resolve(JSON.parse(data.body || "{}")),
      },
      {
        bucketId,
        url,
        method,
        body,
        retryCount,
      },
    );
  });
}
