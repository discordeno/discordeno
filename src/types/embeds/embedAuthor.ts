/** https://discord.com/developers/docs/resources/channel#embed-object-embed-author-structure */
export interface EmbedAuthor {
  /** Name of author */
  name: string;
  /** Url of author */
  url?: string;
  /** Url of author icon (only supports http(s) and attachments) */
  iconUrl?: string;
  /** A proxied url of author icon */
  proxyIconUrl?: string;
}
