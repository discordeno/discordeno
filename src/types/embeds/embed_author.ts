/** https://discord.com/developers/docs/resources/channel#embed-object-embed-author-structure */
export interface DiscordEmbedAuthor {
  /** Name of author */
  name?: string;
  /** Url of author */
  url?: string;
  /** Url of author icon (only supports http(s) and attachments) */
  icon_url?: string;
  /** A proxied url of author icon */
  proxy_icon_url?: string;
}
