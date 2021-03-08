/** https://discord.com/developers/docs/resources/channel#embed-object-embed-image-structure */
export interface DiscordEmbedImage {
  /** source url of image (only supports http(s) and attachments) */
  url?: string;
  /** a proxied url of the image */
  // deno-lint-ignore camelcase
  proxy_url?: string;
  /** height of image */
  height?: number;
  /** width of image */
  width?: number;
}
