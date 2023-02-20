import type { FileContent } from "@discordeno/types"
import { decode } from "./base64.js"

export function findFiles(file: unknown): FileContent[] {
  if (!file) {
    return []
  }

  const files: unknown[] = Array.isArray(file) ? file : [file]
  return files.filter(coerceToFileContent)
}

export function coerceToFileContent(value: unknown): value is FileContent {
  if (!value || typeof value !== 'object') {
    return false
  }

  const file = value as Record<string, unknown>
  if (typeof file.name !== 'string') {
    return false
  }

  switch (typeof file.blob) {
    case 'string': {
      const match = file.blob.match(/^data:(?<mimeType>[a-zA-Z0-9/]*);base64,(?<content>.*)$/)
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
