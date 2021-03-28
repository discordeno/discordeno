import { DiscordOverwriteTypes } from "./overwrite_types.ts";

/** https://discord.com/developers/docs/resources/channel#overwrite-object */
export interface DiscordOverwrite {
  /** Role or user id */
  id: string;
  /** Either 0 (role) or 1 (member) */
  type: DiscordOverwriteTypes;
  /** Permission bit set */
  allow: string;
  /** Permission bit set */
  deny: string;
}
