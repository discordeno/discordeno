import { RestManager } from "../bot.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";
import { RestRequestRejection, RestRequestResponse } from "./rest.ts";

export type ProxyMethodResponse<T> = Omit<RestRequestResponse | RestRequestRejection, "body"> & { body?: T };

// Left out proxy request, because it's not needed here
// this file could also be moved to a plugin.
export async function runProxyMethod<T = any>(
  rest: RestManager,
  method: "get" | "post" | "put" | "delete" | "patch",
  url: string,
  body?: unknown,
  retryCount = 0,
  bucketId?: string,
): Promise<ProxyMethodResponse<SnakeCasedPropertiesDeep<T>>> {
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
        reject: (data) => {
          //TODO: if OK gets removed, set it here to false;
          const { body: b, ...r } = data;
          return { body: b ? JSON.parse(b) : undefined, ...r };
        },
        respond: (data) => {
          //TODO: if OK gets removed, set it here to true;
          const { body: b, ...r } = data;
          return { body: b ? JSON.parse(b) : undefined, ...r };
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
