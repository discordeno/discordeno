import { RestManager } from "./restManager.ts";
import { API_VERSION, BASE_URL, baseEndpoints } from "../util/constants.ts";
import { RequestMethod, RestRequestRejection, RestRequestResponse } from "./rest.ts";

export async function runMethod<T = any>(
  rest: RestManager,
  method: RequestMethod,
  route: string,
  body?: unknown,
  options?: {
    retryCount?: number;
    bucketId?: string;
    headers?: Record<string, string>;
  },
): Promise<T> {
  rest.debug(
    `[REST - RequestCreate] Method: ${method} | URL: ${route} | Retry Count: ${
      options?.retryCount ?? 0
    } | Bucket ID: ${options?.bucketId} | Body: ${
      JSON.stringify(
        body,
      )
    }`,
  );

  const errorStack = new Error("Location:");
  // @ts-ignore Breaks deno deploy. Luca said add ts-ignore until it's fixed
  Error.captureStackTrace(errorStack);

  // For proxies we don't need to do any of the legwork so we just forward the request
  if (!baseEndpoints.BASE_URL.startsWith(BASE_URL) && route[0] === "/") {
    const result = await fetch(`${baseEndpoints.BASE_URL}${route}`, {
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        Authorization: rest.secretKey,
        "Content-Type": "application/json",
      },
      method,
    }).catch((error) => {
      errorStack.message = (error as Error)?.message;
      console.error(error);
      throw errorStack;
    });

    if (!result.ok) {
      const err = await result.json().catch(() => {});
      errorStack.message = err.message ?? result.statusText as Error["message"];
      console.error(`Error: ${errorStack.message}`);
      throw errorStack;
    }

    return result.status !== 204 ? await result.json() : undefined;
  }

  // No proxy so we need to handle all rate limiting and such
  return new Promise((resolve, reject) => {
    rest.processRequest(
      rest,
      {
        url: route[0] === "/" ? `${BASE_URL}/v${API_VERSION}${route}` : route,
        method,
        reject: (data: RestRequestRejection) => {
          const newError = new Error("Location:");
          newError.stack = errorStack.stack as Error["stack"];
          const restError = rest.convertRestError(
            newError,
            data
          );
          reject(restError);
        },
        respond: (data: RestRequestResponse) =>
          resolve(data.status !== 204 ? JSON.parse(data.body ?? "{}") : (undefined as unknown as T)),
      },
      {
        bucketId: options?.bucketId,
        body: body as Record<string, unknown> | undefined,
        retryCount: options?.retryCount ?? 0,
        headers: options?.headers,
      },
    );
  });
}
