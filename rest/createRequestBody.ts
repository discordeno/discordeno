import { RestManager } from "./restManager.ts";
import { FileContent } from "../types/shared.ts";
import { USER_AGENT } from "../util/constants.ts";
import { RequestMethod, RestPayload, RestRequest } from "./rest.ts";

/** Creates the request body and headers that are necessary to send a request. Will handle different types of methods and everything necessary for discord. */
// export function createRequestBody(rest: RestManager, queuedRequest: { request: RestRequest; payload: RestPayload }) {
export function createRequestBody(rest: RestManager, options: CreateRequestBodyOptions) {
  const headers: Record<string, string> = {
    "user-agent": USER_AGENT,
  };

  if (!options.unauthorized) headers["authorization"] = `Bot ${rest.token}`;

  // SOMETIMES SPECIAL HEADERS (E.G. CUSTOM AUTHORIZATION) NEED TO BE USED
  if (options.headers) {
    for (const key in options.headers) {
      headers[key.toLowerCase()] = options.headers[key];
    }
  }

  // GET METHODS SHOULD NOT HAVE A BODY
  if (options.method === "GET") {
    options.body = undefined;
  }

  // IF A REASON IS PROVIDED ENCODE IT IN HEADERS
  if (options.body?.reason) {
    headers["X-Audit-Log-Reason"] = encodeURIComponent(options.body.reason as string);
    options.body.reason = undefined;
  }

  // IF A FILE/ATTACHMENT IS PRESENT WE NEED SPECIAL HANDLING
  if (options.body?.file) {
    if (!Array.isArray(options.body.file)) {
      options.body.file = [options.body.file];
    }

    const form = new FormData();

    for (let i = 0; i < (options.body.file as FileContent[]).length; i++) {
      form.append(
        `file${i}`,
        (options.body.file as FileContent[])[i].blob,
        (options.body.file as FileContent[])[i].name,
      );
    }

    form.append("payload_json", JSON.stringify({ ...options.body, file: undefined }));
    options.body.file = form;
  } else if (options.body && !["GET", "DELETE"].includes(options.method)) {
    headers["Content-Type"] = "application/json";
  }

  return {
    headers,
    body: (options.body?.file ?? JSON.stringify(options.body)) as FormData | string,
    method: options.method,
  };
}

export interface CreateRequestBodyOptions {
  headers?: Record<string, string>;
  method: RequestMethod;
  body?: Record<string, unknown>;
  unauthorized?: boolean;
}
