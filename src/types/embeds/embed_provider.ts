import { SnakeCaseProps } from "../util.ts";

export interface EmbedProvider {
  /** Name of provider */
  name?: string;
  /** Url of provider */
  url?: string;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-provider-structure */
export type DiscordEmbedProvider = SnakeCaseProps<EmbedProvider>;
