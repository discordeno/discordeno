import { FileContent } from "../mod.ts";
import { API_VERSION, BASE_URL, baseEndpoints } from "../util/constants.ts";
import { encode } from "../util/urlToBase64.ts";
import { RequestMethod, RestRequestRejection, RestRequestResponse } from "./rest.ts";
import { RestManager } from "./restManager.ts";

export async function runMethod<T = any>(
  rest: RestManager,
  method: RequestMethod,
  route: string,
  body?: any,
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
    // Special handling for sending blobs across http to proxy
    if (body?.file) {
      if (!Array.isArray(body.file)) {
        body.file = [body.file];
      }
      // convert blobs to string before sending to proxy
      body.file = await Promise.all(
        body.file.map(async (f: FileContent) => {
          const url = encode(await (f.blob).arrayBuffer());

          return { name: f.name, blob: `data:${f.blob.type};base64,${url}` };
        }),
      );
    }

    const headers: HeadersInit = {
      Authorization: rest.secretKey,
    };
    if (body) {
      headers["Content-Type"] = "application/json";
    }
    const result = await fetch(`${baseEndpoints.BASE_URL}${route}`, {
      body: body ? JSON.stringify(body) : undefined,
      headers,
      method,
    });

    if (!result.ok) {
      const err = await result.json().catch(() => {});
      // Legacy Handling to not break old code or when body is missing
      if (!err?.body) throw new Error(`Error: ${err.message ?? result.statusText}`);
      throw rest.convertRestError(errorStack, err);
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
          const restError = rest.convertRestError(
            errorStack,
            data,
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
