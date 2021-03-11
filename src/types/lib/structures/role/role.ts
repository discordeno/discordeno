import { deleteRole, editRole } from "../../../../helpers/guild.ts";
import { Collection } from "../../../../util/collection.ts";
import { CreateRoleOptions } from "./create.ts";

export interface Role {
  /** role id */
  id: string;
  /** role name */
  name: string;
  /** integer representation of hexadecimal color code */
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
  /** The bot id that is associated with this role. */
  botID?: string;
  /** If this role is the nitro boost role. */
  isNitroBoostRole: boolean;
  /** The integration id that is associated with this role */
  integrationID: string;

  // GETTERS

  /** The guild where this role is. If undefined, the guild is not cached */
  guild?: Guild;
  /** The hex color for this role. */
  hexColor: string;
  /** The cached members that have this role */
  members: Collection<string, Member>;
  /** The @ mention of the role in a string. */
  mention: string;

  // METHODS

  /** Delete the role */
  delete(guildID?: string): ReturnType<typeof deleteRole>;
  /** Edits the role */
  edit(options: CreateRoleOptions): ReturnType<typeof editRole>;
  /** Checks if this role is higher than another role. */
  higherThanRoleID(roleID: string, position?: number): boolean;
}
