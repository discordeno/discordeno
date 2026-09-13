import { encode } from './base64.js';

/** Converts a url to base 64. Useful for example, uploading/creating server emojis. */
export async function urlToBase64(url: string): Promise<string> {
  const response = await fetch(url);

  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);

  const imageStr = encode(await response.arrayBuffer());
  const type = url.substring(url.lastIndexOf('.') + 1);

  return `data:image/${type};base64,${imageStr}`;
}
