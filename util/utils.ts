import { ImageFormat, ImageSize } from "../helpers/members/avatarUrl.ts";

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
