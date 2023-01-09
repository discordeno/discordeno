import { encode } from './base64.js'

/** Converts a url to base 64. Useful for example, uploading/creating server emojis. */
export async function urlToBase64(url: string): Promise<string> {
  const buffer = await fetch(url).then(async (res) => await res.arrayBuffer())
  const imageStr = encode(buffer)
  const type = url.substring(url.lastIndexOf('.') + 1)
  return `data:image/${type};base64,${imageStr}`
}
