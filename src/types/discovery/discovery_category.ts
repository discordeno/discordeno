import { SnakeCasedPropertiesDeep } from "../util.ts";
import { DiscoveryName } from "./discovery_name.ts";

export interface DiscoveryCategory {
  /** Numeric id of the category */
  id: number;
  /** The name of this category, in mutliple languages */
  name: DiscoveryName;
  /** Whether this category can be set as a guild's primary category */
  isPrimary: boolean;
}

//TODO: add docs link
export type DiscordDiscoveryCategory = SnakeCasedPropertiesDeep<
  DiscoveryCategory
>;
