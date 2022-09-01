import { ImageFormat, ImageSize } from "../helpers/members/getAvatarUrl.ts";

/** Pause the execution for a given amount of milliseconds. */
export function delay(ms: number): Promise<void> {
  return new Promise((res): number =>
    setTimeout((): void => {
      res();
    }, ms)
  );
}

/** Help format an image url. */
export function formatImageURL(url: string, size: ImageSize = 128, format?: ImageFormat) {
  return `${url}.${format || (url.includes("/a_") ? "gif" : "jpg")}?size=${size}`;
}

// Typescript is not so good as we developers so we need this little utility function to help it out
// Taken from https://fettblog.eu/typescript-hasownproperty/
/** TS save way to check if a property exists in an object */
export function hasProperty<T extends {}, Y extends PropertyKey = string>(
  obj: T,
  prop: Y,
): obj is T & Record<Y, unknown> {
  return obj.hasOwnProperty(prop);
}
