// SERVERLESS REST CLIENT THAT CAN WORK ACROSS SHARDS/WORKERS TO COMMUNICATE GLOBAL RATE LIMITS EASILY
import { rest } from "./rest.ts";

/** Handler function for every request. Converts to json, verified authorization & requirements and begins processing the request */
export async function handlePayload(
  request: Request,
) {
  // INSTANTLY IGNORE ANY REQUESTS THAT DON'T HAVE THE SECRET AUTHORIZATION KEY
  const authorization = request.headers.get("authorization");
  if (authorization !== rest.authorization) return;
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
    rest.processRequest(request, { body: data, retryCount: 0 });
  } catch (error) {
    rest.eventHandlers.error("serverRequest", error);
  }
}
