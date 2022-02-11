/** https://discord.com/developers/docs/resources/channel#embed-object-embed-image-structure */
export interface EmbedImage {
  /** Source url of image (only supports http(s) and attachments) */
  url: string;
  /** A proxied url of the image */
  proxyUrl?: string;
  /** Height of image */
  height?: number;
  /** Width of image */
  width?: number;
}
