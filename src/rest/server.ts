// SERVERLESS REST CLIENT THAT CAN WORK ACROSS SHARDS/WORKERS TO COMMUNICATE GLOBAL RATE LIMITS EASILY
import { restCache } from "./cache.ts";
import { serve, ServerRequest } from "./deps.ts";
import { processRequest } from "./request.ts";
import { RestServerOptions } from "./types/mod.ts";

/** Begins an http server that will handle incoming requests. */
export async function startRESTServer(options: RestServerOptions) {
  const server = serve({ port: options.port });

  for await (const request of server) {
    handlePayload(request, options).catch((error) => {
      restCache.eventHandlers.error("processRequest", error);
    });
  }
}

/** Handler function for every request. Converts to json, verified authorization & requirements and begins processing the request */
async function handlePayload(
  request: ServerRequest,
  options: RestServerOptions,
) {
  // INSTANTLY IGNORE ANY REQUESTS THAT DON'T HAVE THE SECRET AUTHORIZATION KEY
  const authorization = request.headers.get("authorization");
  if (authorization !== options.authorization) return;
  // READ BUFFER AFTER AUTH CHECK
  const buffer = await Deno.readAll(request.body);
  try {
    // CONVERT THE BODY TO JSON
    const data = JSON.parse(new TextDecoder().decode(buffer));
    if (
      !["GET", "POST", "PUT", "PATCH", "HEAD", "DELETE"].includes(
        request.method,
      )
    ) {
      return request.respond(
        {
          status: 400,
          body: JSON.stringify({ error: "Invalid METHOD." }),
        },
      );
    }

    // PROCESS THE REQUEST
    processRequest(request, { body: data, retryCount: 0 }, options);
  } catch (error) {
    restCache.eventHandlers.error("serverRequest", error);
  }
}
