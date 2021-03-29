import { rest } from "./rest.ts";

export const RequestManager = {
  get: (url: string, body?: unknown) => {
    return rest.runMethod("get", url, body);
  },
  post: (url: string, body?: unknown) => {
    return rest.runMethod("post", url, body);
  },
  delete: (url: string, body?: unknown) => {
    return rest.runMethod("delete", url, body);
  },
  patch: (url: string, body?: unknown) => {
    return rest.runMethod("patch", url, body);
  },
  put: (url: string, body?: unknown) => {
    return rest.runMethod("put", url, body);
  },
};
