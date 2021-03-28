/** https://discord.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure */
export interface DiscordEmbedThumbnail {
  /** Source url of thumbnail (only supports http(s) and attachments) */
  url?: string;
  /** A proxied url of the thumbnail */
  proxy_url?: string;
  /** Height of thumbnail */
  height?: number;
  /** Width of thumbnail */
  width?: number;
}
