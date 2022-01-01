import { RestManager } from "../bot.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";
import { API_VERSION, BASE_URL, IMAGE_BASE_URL } from "../util/constants.ts";

export async function runMethod<T = any>(
  rest: RestManager,
  method: "get" | "post" | "put" | "delete" | "patch",
  url: string,
  body?: unknown,
  retryCount = 0,
  bucketId?: string
): Promise<SnakeCasedPropertiesDeep<T>> {
  rest.debug(
    `[REST - RequestCreate] Method: ${method} | URL: ${url} | Retry Count: ${retryCount} | Bucket ID: ${bucketId} | Body: ${JSON.stringify(
      body
    )}`
  );

  const errorStack = new Error("Location:");
  // @ts-ignore Breaks deno deploy. Luca said add tsignore until it's fixed
  Error.captureStackTrace(errorStack);

  // For proxies we don't need to do any of the legwork so we just forward the request
  if (!url.startsWith(`${BASE_URL}/v${API_VERSION}`) && !url.startsWith(IMAGE_BASE_URL)) {
    const result = await fetch(url, {
      body: JSON.stringify(body || {}),
      headers: {
        "Authorization": rest.secretKey,
        "Content-Type": "application/json"
      },
      method: method.toUpperCase(),
    }).catch((error) => {
      errorStack.message = (error as Error)?.message;
      console.error(error);
      throw errorStack;
    });

    return result.status !== 204 ? await result.json() : undefined;
  }

  // No proxy so we need to handle all rate limiting and such
  return new Promise((resolve, reject) => {
    rest.processRequest(
      rest,
      {
        url,
        method,
        reject: (error: unknown) => {
          errorStack.message = (error as Error)?.message;
          reject(errorStack);
        },
        respond: (data: { status: number; body?: string }) =>
          resolve(data.status !== 204 ? JSON.parse(data.body ?? "{}") : (undefined as unknown as T)),
      },
      {
        bucketId,
        body: body as Record<string, unknown> | undefined,
        retryCount,
      }
    );
  });
}
