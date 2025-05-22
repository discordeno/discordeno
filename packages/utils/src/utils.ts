/** Convert `JSON.stringify`-unserializable record values for debugging purposes. */
export function jsonSafe<T extends object>(value: T): object {
  if (value == null) return value
  const shallowCopy = Array.isArray(value) ? Array.from(value) : Object.assign(Object.create(value), value)
  for (const key in shallowCopy) {
    const prop = key as keyof typeof value
    switch (typeof shallowCopy[prop]) {
      case 'object':
        // Recursive traverse.
        if (shallowCopy[prop] !== null) shallowCopy[prop] = jsonSafe(shallowCopy[prop])
        break
      case 'bigint':
        // Bigints are unserializable by `JSON.stringify`.
        shallowCopy[prop] = String(shallowCopy[prop])
        break
      default: // Any other unhandled type that isn't supposed to require conversion.
        break
    }
  }
  return shallowCopy
}

/** Pause the execution for a given amount of milliseconds. */
export async function delay(ms: number): Promise<void> {
  return new Promise(
    (resolve): NodeJS.Timeout =>
      setTimeout((): void => {
        resolve()
      }, ms),
  )
}

// Typescript is not so good as we developers so we need this little utility function to help it out
// Taken from https://fettblog.eu/typescript-hasownproperty/
/** TS save way to check if a property exists in an object */
export function hasProperty<T extends {}, Y extends PropertyKey = string>(obj: T, prop: Y): obj is T & Record<Y, unknown> {
  return obj.hasOwnProperty(prop)
}
