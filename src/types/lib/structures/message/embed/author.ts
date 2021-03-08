/** https://discord.com/developers/docs/resources/channel#embed-object-embed-author-structure */
export interface DiscordEmbedAuthor {
  /** name of author */
  name?: string;
  /** url of author */
  url?: string;
  /** url of author icon (only supports http(s) and attachments) */
  // deno-lint-ignore camelcase
  icon_url?: string;
  /** a proxied url of author icon */
  // deno-lint-ignore camelcase
  proxy_icon_url?: string;
}
