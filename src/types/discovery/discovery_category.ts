import { DiscoveryName } from "./discovery_name.ts";

//TODO: add docs link
export interface DiscoveryCategory {
  /** Numeric id of the category */
  id: number;
  /** The name of this category, in multiple languages */
  name: DiscoveryName;
  /** Whether this category can be set as a guild's primary category */
  isPrimary: boolean;
}
