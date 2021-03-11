import { Permission } from "../../../discord/perms/permission.ts";

export interface CreateRoleOptions {
  /** The name of the role you wish for. By default this will be `new role` */
  name?: string;
  /** The permissions you would like to provide for this role. In order to set a permission, the bot must have the permission as well. */
  permissions?: Permission[];
  /** The color of the role. */
  color?: number;
  /** Whether or not the role is hoisted. */
  hoist?: boolean;
  /** Whether or not the role is mentionable by all users */
  mentionable?: boolean;
}
