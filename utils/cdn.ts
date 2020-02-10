import { ImageSize, ImageFormats } from "../structures/guild";

export const formatImageURL = (
  url: string,
  size: ImageSize = 128,
  format?: ImageFormats
) => {
  return `${url}.${format || url.includes("/a_") ? "gif" : "jpg"}/?size=${size
    }`;
};
