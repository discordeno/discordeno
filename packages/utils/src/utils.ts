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
