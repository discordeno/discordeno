export type RequestMethods =
  | "get"
  | "post"
  | "put"
  | "patch"
  | "head"
  | "delete";

export interface RunMethodOptions {
  retryCount: number;
  // deno-lint-ignore no-explicit-any
  body?: any;
  bucketID?: string | null;
}
