import { RoleData } from "../types/role.ts";

export const createRole = (data: RoleData) => ({
  ...data,
  /** The @ mention of the role in a string. */
  mention: `<@&${data.id}>`,
});

export interface Role extends ReturnType<typeof createRole> {}
