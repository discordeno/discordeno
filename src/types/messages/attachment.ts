/** https://discord.com/developers/docs/resources/channel#attachment-object */
export interface DiscordAttachment {
  /** Attachment id */
  id: string;
  /** Name of file attached */
  filename: string;
  /** Size of file in bytes */
  size: number;
  /** Source url of file */
  url: string;
  /** A proxied url of file */
  proxy_url: string;
  /** Height of file (if image) */
  height: number | null;
  /** Width of file (if image) */
  width: number | null;
}
