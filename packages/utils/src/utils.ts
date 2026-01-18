/** Pause the execution for a given amount of milliseconds. */
export async function delay(ms: number): Promise<void> {
  return new Promise(
    (resolve): NodeJS.Timeout =>
      setTimeout((): void => {
        resolve();
      }, ms),
  );
}

// Typescript is not so good as we developers so we need this little utility function to help it out
// Taken from https://fettblog.eu/typescript-hasownproperty/
/** TS save way to check if a property exists in an object */
export function hasProperty<T extends {}, Y extends PropertyKey = string>(obj: T, prop: Y): obj is T & Record<Y, unknown> {
  return obj.hasOwnProperty(prop);
}

/** Convert `JSON.stringify`-unserializable record values for debugging purposes. */
export function jsonSafeReplacer(_key: string, value: unknown): unknown {
  switch (typeof value) {
    case 'bigint':
      // Bigints are unserializable by `JSON.stringify`.
      return String(value);
    default: // Any other unhandled type that isn't supposed to require conversion.
      return value;
  }
}
