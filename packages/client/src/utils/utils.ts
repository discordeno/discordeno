import { ImageFormat, ImageSize } from '@discordeno/types'

/** Help format an image url. */
export function formatImageURL (
  url: string,
  size: ImageSize = 128,
  format?: ImageFormat
): string {
  return `${url}.${
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    format ?? (url.includes('/a_') ? 'gif' : 'jpg')
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  }?size=${size}`
}

// Typescript is not so good as we developers so we need this little utility function to help it out
// Taken from https://fettblog.eu/typescript-hasownproperty/
/** TS save way to check if a property exists in an object */
export function hasProperty<T extends {}, Y extends PropertyKey = string> (
  obj: T,
  prop: Y
): obj is T & Record<Y, unknown> {
  // eslint-disable-next-line no-prototype-builtins
  return obj.hasOwnProperty(prop)
}
