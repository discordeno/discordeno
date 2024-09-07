const validTokenPrefixes = ['Bot', 'Bearer']

/** Removes the Bot/Bearer before the token. */
export function removeTokenPrefix(token?: string, type: 'GATEWAY' | 'REST' = 'REST'): string {
  // If no token is provided, throw an error
  if (token === undefined) {
    throw new Error(`The ${type} was not given a token. Please provide a token and try again.`)
  }

  const splittedToken = token.split(' ')

  // If the token does not have a prefix just return token
  if (splittedToken.length < 2 || !validTokenPrefixes.includes(splittedToken[0])) return token
  // Remove the prefix and return only the token.
  return splittedToken.splice(1).join(' ')
}

/** Get the bot id from the bot token. WARNING: Discord staff has mentioned this may not be stable forever. Use at your own risk. However, note for over 5 years this has never broken. */
export function getBotIdFromToken(token: string): bigint {
  return BigInt(atob(token.split('.')[0]))
}
