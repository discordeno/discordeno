/** https://discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure */
export interface DiscordEmbedFooter {
  /** Footer text */
  text: string;
  /** Url of footer icon (only supports http(s) and attachments) */
  icon_url?: string;
  /** A proxied url of footer icon */
  proxy_icon_url?: string;
}
