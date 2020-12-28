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
  body?: any;
  bucketID?: string | null;
}
