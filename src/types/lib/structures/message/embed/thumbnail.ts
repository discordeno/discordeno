/** https://discord.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure */
export interface DiscordEmbedThumbnail {
  /** source url of thumbnail (only supports http(s) and attachments) */
  url?: string;
  /** a proxied url of the thumbnail */
  // deno-lint-ignore camelcase
  proxy_url?: string;
  /** height of thumbnail */
  height?: number;
  /** width of thumbnail */
  width?: number;
}
