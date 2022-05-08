/** Removes the Bot before the token. */
export function removeTokenPrefix(token?: string, type: "GATEWAY" | "REST" = "REST"): string {
  // If no token is provided, throw an error
  if (!token) throw new Error(`The ${type} was not given a token. Please provide a token and try again.`);
  // If the token does not have a prefix just return token
  if (!token.startsWith("Bot ")) return token;
  // Remove the prefix and return only the token.
  return token.substring(token.indexOf(" ") + 1);
}
