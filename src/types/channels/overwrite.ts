import { PermissionStrings } from "../permissions/permission_strings.ts";
import { DiscordOverwriteTypes } from "./overwrite_types.ts";

export interface Overwrite {
  /** Role or user id */
  id: bigint;
  /** Either 0 (role) or 1 (member) */
  type: DiscordOverwriteTypes;
  /** Permission bit set */
  allow: PermissionStrings[];
  /** Permission bit set */
  deny: PermissionStrings[];
}

/** https://discord.com/developers/docs/resources/channel#overwrite-object */
export interface DiscordOverwrite extends Omit<Overwrite, "allow" | "deny" | "id"> {
  id: string;
  allow: string;
  deny: string;
}
