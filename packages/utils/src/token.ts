import { Buffer } from 'node:buffer'

/** Removes the Bot before the token. */
export function removeTokenPrefix(token?: string, type: 'GATEWAY' | 'REST' = 'REST'): string {
  // If no token is provided, throw an error
  if (token === undefined) {
    throw new Error(`The ${type} was not given a token. Please provide a token and try again.`)
  }

  const splittedToken = token.split(' ')

  // If the token does not have a prefix just return token
  if (splittedToken.length < 2) return token
  // Remove the prefix and return only the token.
  return splittedToken[1]
}

/** Get the bot id from the bot token. WARNING: Discord staff has mentioned this may not be stable forever. Use at your own risk. However, note for over 5 years this has never broken. */
export function getBotIdFromToken(token: string): bigint {
  return BigInt(Buffer.from(token.split('.')[0], 'base64').toString())
}
