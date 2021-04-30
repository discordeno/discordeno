/** https://discord.com/developers/docs/resources/channel#embed-object-embed-video-structure */
export interface EmbedVideo {
  /** Source url of video */
  url?: string;
  /** A proxied url of the video */
  proxyUrl?: string;
  /** Height of video */
  height?: number;
  /** Width of video */
  width?: number;
}
