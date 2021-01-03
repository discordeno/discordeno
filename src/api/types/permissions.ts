import { BitwisePermissionFlags } from "../../types/mod.ts";
export type { BitwisePermissionFlags };

/** https://discord.com/developers/docs/topics/permissions#role-object-role-structure */
export interface Role {
  /** role id */
  id: string;
  /** role name */
  name: string;
  /** number representation of hexadecimal color code */
  color: number;
  /** if this role is pinned in the user listing */
  hoist: boolean;
  /** position of this role */
  position: number;
  /** permission bit set */
  permissions: string;
  /** whether this role is managed by an integration */
  managed: boolean;
  /** whether this role is mentionable */
  mentionable: boolean;
  /** the tags this role has */
  tags?: RoleTags;
}

/** https://discord.com/developers/docs/topics/permissions#role-object-role-tags-structure */
export interface RoleTags {
  /** the id of the bot this role belongs to */
  botID?: string;
  /** the id of the integration this role belongs to */
  integrationID?: string;
  /** whether this is the guild's premium subscriber role */
  premiumSubscriber?: null;
}
