/** Validates the length of a string in JS. Certain characters in JS can have multiple numbers in length in unicode and discords api is in python which treats length differently. */
export function validateLength (text: string, options: { max?: number, min?: number }): boolean {
  const length = [...text].length

  // Text is too long
  if (options.max !== undefined && length > options.max) return false
  // Text is too short
  if (options.min !== undefined && length < options.min) return false

  return true
}
