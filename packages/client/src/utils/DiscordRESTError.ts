import type { ClientRequest, IncomingHttpHeaders, IncomingMessage } from 'http'
import type { HTTPResponse } from '../typings.js'

export class DiscordRESTError extends Error {
  code: number = -1
  req!: ClientRequest
  res!: IncomingMessage
  response!: HTTPResponse

  constructor(req: ClientRequest, res: IncomingMessage, response: HTTPResponse, stack: string) {
    super()

    Object.defineProperty(this, 'req', {
      enumerable: false,
      value: req,
    })
    Object.defineProperty(this, 'res', {
      enumerable: false,
      value: res,
    })
    Object.defineProperty(this, 'response', {
      enumerable: false,
      value: response,
    })

    Object.defineProperty(this, 'code', {
      enumerable: false,
      value: +response.code || -1,
    })
    let message = response.message || 'Unknown error'
    if (response.errors) {
      message += '\n  ' + this.flattenErrors(response.errors).join('\n  ')
    } else {
      const errors = this.flattenErrors(response)
      if (errors.length > 0) {
        message += '\n  ' + errors.join('\n  ')
      }
    }
    Object.defineProperty(this, 'message', {
      enumerable: false,
      value: message,
    })

    if (stack) {
      this.stack = this.name + ': ' + this.message + '\n' + stack
    } else {
      Error.captureStackTrace(this, DiscordRESTError)
    }
  }

  get headers(): IncomingHttpHeaders {
    return this.response.headers
  }

  get name(): string {
    return `${this.constructor.name} [${this.code}]`
  }

  flattenErrors(errors: HTTPResponse, keyPrefix?: string): string[] {
    let messages: string[] = []
    for (const fieldName of Object.keys(errors)) {
      if (fieldName === 'message' || fieldName === 'code') {
        continue
      }
      
      const prefix = `${keyPrefix ?? ""}${fieldName}`;

      // @ts-expect-error js hack from eris
      if (errors[fieldName]._errors) {
        // @ts-expect-error js hack from eris
        messages = messages.concat(errors[fieldName]._errors.map((obj: any) => `${prefix}: ${obj.message as string}`))
        // @ts-expect-error js hack from eris
      } else if (Array.isArray(errors[fieldName])) {
        // @ts-expect-error js hack from eris
        messages = messages.concat(errors[fieldName].map((str: string) => `${prefix}: ${str}`))
        // @ts-expect-error js hack from eris
      } else if (typeof errors[fieldName] === 'object') {
        // @ts-expect-error js hack from eris
        messages = messages.concat(this.flattenErrors(errors[fieldName], `${prefix}.`))
      }
    }
    return messages
  }
}

export default DiscordRESTError
