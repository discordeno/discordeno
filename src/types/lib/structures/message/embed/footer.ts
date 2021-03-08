/** https://discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure */
export interface DiscordEmbedFooter {
  /** footer text */
  text: string;
  /** url of footer icon (only supports http(s) and attachments) */
  // deno-lint-ignore camelcase
  icon_url?: string;
  /** a proxied url of footer icon */
  // deno-lint-ignore camelcase
  proxy_icon_url?: string;
}
