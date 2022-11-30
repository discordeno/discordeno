import { FileContent } from '../types/discordeno.js'
import { decode } from '../util/base64.js'
import { USER_AGENT } from '../util/constants.js'
import { RequestMethod } from './rest.js'
import { RestManager } from './restManager.js'

/** Creates the request body and headers that are necessary to send a request. Will handle different types of methods and everything necessary for discord. */
export function createRequestBody(rest: RestManager, options: CreateRequestBodyOptions) {
  const headers: Record<string, string> = {
    'user-agent': USER_AGENT
  }

  if (!options.unauthorized) headers.authorization = `Bot ${rest.token}`

  // SOMETIMES SPECIAL HEADERS (E.G. CUSTOM AUTHORIZATION) NEED TO BE USED
  if (options.headers != null) {
    for (const key in options.headers) {
      headers[key.toLowerCase()] = options.headers[key]
    }
  }

  // GET METHODS SHOULD NOT HAVE A BODY
  if (options.method === 'GET') {
    options.body = undefined
  }

  // IF A REASON IS PROVIDED ENCODE IT IN HEADERS
  if (options.body?.reason) {
    headers['X-Audit-Log-Reason'] = encodeURIComponent(options.body.reason as string)
    options.body.reason = undefined
  }

  // IF A FILE/ATTACHMENT IS PRESENT WE NEED SPECIAL HANDLING
  if (options.body?.file) {
    const files = findFiles(options.body.file)

    const form = new FormData()

    // WHEN CREATING A STICKER, DISCORD WANTS FORM DATA ONLY
    if (options.url?.endsWith('/stickers') && options.method === 'POST') {
      form.append('file', files[0].blob, files[0].name)
      form.append('name', options.body.name as string)
      form.append('description', options.body.description as string)
      form.append('tags', options.body.tags as string)
    } else {
      for (let i = 0; i < files.length; i++) {
        form.append(`file${i}`, files[i].blob, files[i].name)
      }

      form.append('payload_json', JSON.stringify({ ...options.body, file: undefined }))
    }

    options.body.file = form
  } else if ((options.body != null) && !['GET', 'DELETE'].includes(options.method)) {
    headers['Content-Type'] = 'application/json'
  }

  return {
    headers,
    body: (options.body?.file ?? JSON.stringify(options.body)) as FormData | string,
    method: options.method
  }
}

export interface CreateRequestBodyOptions {
  headers?: Record<string, string>
  method: RequestMethod
  body?: Record<string, unknown>
  unauthorized?: boolean
  url?: string
}

function findFiles(file: unknown): FileContent[] {
  if (!file) {
    return []
  }

  const files: unknown[] = Array.isArray(file) ? file : [file]
  return files.filter(coerceToFileContent)
}

function coerceToFileContent(value: unknown): value is FileContent {
  if (!value || typeof value !== 'object') {
    return false
  }

  const file = value as Record<string, unknown>
  if (typeof file.name !== 'string') {
    return false
  }

  switch (typeof file.blob) {
    case 'string': {
      const match = file.blob.match(/^data:(?<mimeType>[a-zA-Z0-9\/]*);base64,(?<content>.*)$/)
      if (match?.groups === undefined) {
        return false
      }
      const { mimeType, content } = match.groups
      file.blob = new Blob([decode(content)], { type: mimeType })
      return true
    }
    case 'object':
      return file.blob instanceof Blob
    default:
      return false
  }
}
