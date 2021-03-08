export interface DiscordAttachment {
  /** attachment id */
  id: string;
  /** name of file attached */
  filename: string;
  /** size of file in bytes */
  size: number;
  /** source url of file */
  url: string;
  /** a proxied url of file */
  // deno-lint-ignore camelcase
  proxy_url: string;
  /** height of file (if image) */
  height?: number | null;
  /** width of file (if image) */
  width?: number | null;
}
