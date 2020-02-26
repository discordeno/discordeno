import { Image_Size, Image_Formats } from "../types/cdn.ts"

export const format_image_url = (url: string, size: Image_Size = 128, format?: Image_Formats) => {
  return `${url}.${format || url.includes('/a_') ? 'gif' : 'jpg'}/?size=${size}`
}
