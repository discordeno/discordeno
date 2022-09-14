import { RestRequestRejection } from "./rest.ts";

export function convertRestError(errorStack: Error, data: RestRequestRejection): Error {
  return new DiscordRestError({
    status: data.status,
    details: data.error,
    body: data.body ? JSON.parse(data.body) : undefined,
    stack: data.body,
  });
}

export class DiscordRestError extends Error {
  code: number;
  message: string;
  status: number;
  details: string;

  constructor(
    err: { body: { code: number; message: string }; status: number; details: string; stack?: any },
  ) {
    super();
    console.log(err);

    this.code = err.body?.code ?? -1;
    this.message = `[${err.status} - (${err.body?.code ?? -1})] ${err.body.message ?? err.details}`;
    this.status = err.status;
    this.details = err.details;
    if (err.stack) this.stack = err.stack;
  }
}
