import { RoleData } from "../types/role.ts";

export function createRole(data: RoleData) {
  return {
    ...data,
    /** The @ mention of the role in a string. */
    mention: `<@&${data.id}>`,
  };
}

export interface Role extends ReturnType<typeof createRole> {}
