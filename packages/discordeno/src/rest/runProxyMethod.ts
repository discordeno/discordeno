import { RestManager } from "./restManager.ts";
import { RestRequestRejection, RestRequestResponse } from "./rest.ts";

export type ProxyMethodResponse<T> = Omit<RestRequestResponse | RestRequestRejection, "body"> & { body?: T };

// Left out proxy request, because it's not needed here
// this file could also be moved to a plugin.
export async function runProxyMethod<T = any>(
  rest: RestManager,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  body?: unknown,
  retryCount = 0,
  bucketId?: string,
): Promise<ProxyMethodResponse<T>> {
  rest.debug(
    `[REST - RequestCreate] Method: ${method} | URL: ${url} | Retry Count: ${retryCount} | Bucket ID: ${bucketId} | Body: ${
      JSON.stringify(
        body,
      )
    }`,
  );

  // No proxy so we need to handle all rate limiting and such
  return new Promise((resolve, reject) => {
    rest.processRequest(
      rest,
      {
        url,
        method,
        reject: (data: RestRequestRejection) => {
          const { body: b, ...r } = data;
          reject({ body: data.status !== 204 ? JSON.parse(b ?? "{}") : (undefined as unknown as T), ...r });
        },
        respond: (data: RestRequestResponse) => {
          const { body: b, ...r } = data;
          resolve({ body: data.status !== 204 ? JSON.parse(b ?? "{}") : (undefined as unknown as T), ...r });
        },
      },
      {
        bucketId,
        body: body as Record<string, unknown> | undefined,
        retryCount,
      },
    );
  });
}
