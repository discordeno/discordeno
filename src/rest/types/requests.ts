export type RequestMethods =
  | "get"
  | "post"
  | "put"
  | "patch"
  | "head"
  | "delete";

export interface RunMethodOptions {
  method: RequestMethods;
  url: string;
  retryCount: number;
  // deno-lint-ignore no-explicit-any
  body?: any;
  bucketID?: string | null;
}
