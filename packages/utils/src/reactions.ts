/** Converts an reaction emoji unicode string to the discord required form of name:id */
export function processReactionString(reaction: string): string {
  if (reaction.startsWith('<:')) {
    return reaction.substring(2, reaction.length - 1)
  }

  if (reaction.startsWith('<a:')) {
    return reaction.substring(3, reaction.length - 1)
  }

  return reaction
}
