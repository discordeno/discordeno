import { RestManager } from "../bot.ts";
import { FileContent } from "../types/discordeno.ts";
import { USER_AGENT } from "../util/constants.ts";
import { RestPayload, RestRequest } from "./rest.ts";

/** Creates the request body and headers that are necessary to send a request. Will handle different types of methods and everything necessary for discord. */
export function createRequestBody(rest: RestManager, queuedRequest: { request: RestRequest; payload: RestPayload }) {
  const headers: Record<string, string> = {
    authorization: `Bot ${rest.token}`,
    "user-agent": USER_AGENT,
  };

  // SOMETIMES SPECIAL HEADERS (E.G. CUSTOM AUTHORIZATION) NEED TO BE USED
  if (queuedRequest.payload.headers) {
    for (const key in queuedRequest.payload.headers) {
      headers[key] = queuedRequest.payload.headers[key];
    }
  }

  // GET METHODS SHOULD NOT HAVE A BODY
  if (queuedRequest.request.method === "GET") {
    queuedRequest.payload.body = undefined;
  }

  // IF A REASON IS PROVIDED ENCODE IT IN HEADERS
  if (queuedRequest.payload.body?.reason) {
    headers["X-Audit-Log-Reason"] = encodeURIComponent(queuedRequest.payload.body.reason as string);
    queuedRequest.payload.body.reason = undefined;
  }

  // IF A FILE/ATTACHMENT IS PRESENT WE NEED SPECIAL HANDLING
  if (queuedRequest.payload.body?.file) {
    if (!Array.isArray(queuedRequest.payload.body.file)) {
      queuedRequest.payload.body.file = [queuedRequest.payload.body.file];
    }

    const form = new FormData();

    for (let i = 0; i < (queuedRequest.payload.body.file as FileContent[]).length; i++) {
      form.append(
        `file${i}`,
        (queuedRequest.payload.body.file as FileContent[])[i].blob,
        (queuedRequest.payload.body.file as FileContent[])[i].name,
      );
    }

    form.append("payload_json", JSON.stringify({ ...queuedRequest.payload.body, file: undefined }));
    queuedRequest.payload.body.file = form;
  } else if (queuedRequest.payload.body && !["GET", "DELETE"].includes(queuedRequest.request.method)) {
    headers["Content-Type"] = "application/json";
  }

  return {
    headers,
    body: (queuedRequest.payload.body?.file ?? JSON.stringify(queuedRequest.payload.body)) as FormData | string,
    method: queuedRequest.request.method,
  };
}
