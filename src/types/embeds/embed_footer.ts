/** https://discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure */
export interface EmbedFooter {
  /** Footer text */
  text: string;
  /** Url of footer icon (only supports http(s) and attachments) */
  iconUrl?: string;
  /** A proxied url of footer icon */
  proxyIconUrl?: string;
}
