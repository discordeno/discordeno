import { ImageSize, ImageFormats } from '../structures/guild'

export const format_image_url = (url: string, size: ImageSize = 128, format?: ImageFormats) => {
  return `${url}.${format || url.includes('/a_') ? 'gif' : 'jpg'}/?size=${size}`
}
