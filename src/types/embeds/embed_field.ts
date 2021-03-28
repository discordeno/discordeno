import { SnakeCaseProps } from "../util.ts";

export interface EmbedField {
  /** Name of the field */
  name: string;
  /** Value of the field */
  value: string;
  /** Whether or not this field should display inline */
  inline?: boolean;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure */
export type DiscordEmbedField = SnakeCaseProps<EmbedField>;
