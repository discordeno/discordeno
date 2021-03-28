/** https://discord.com/developers/docs/resources/channel#embed-object-embed-video-structure */
export interface DiscordEmbedVideo {
  /** Source url of video */
  url?: string;
  /** A proxied url of the video */
  proxy_url?: string;
  /** Height of video */
  height?: number;
  /** Width of video */
  width?: number;
}
