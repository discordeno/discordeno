export interface RestRequest {
  url: string;
  method: RequestMethod;
  respond: (payload: RestRequestResponse) => unknown;
  reject: (payload: RestRequestRejection) => unknown;
}

export interface RestRequestResponse {
  ok: boolean;
  status: number;
  body?: string;
}

export interface RestRequestRejection extends RestRequestResponse {
  error: string;
}

export interface RestPayload {
  bucketId?: string;
  body?: Record<string, unknown>;
  retryCount: number;
  headers?: Record<string, string>;
}

export interface RestRateLimitedPath {
  url: string;
  resetTimestamp: number;
  bucketId?: string;
}

export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
