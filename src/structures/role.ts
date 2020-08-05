import { RoleData } from "../types/role.ts";
import { calculatePermissions } from "../utils/permissions.ts";

export const createRole = (data: RoleData) => ({
  ...data,
  permissions: calculatePermissions(BigInt(data.permissions_new)),
  /** The @ mention of the role in a string. */
  mention: `<@&${data.id}>`,
});

export interface Role extends ReturnType<typeof createRole> {}
