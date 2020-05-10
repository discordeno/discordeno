import { RoleData } from "../types/role.ts";

export const createRole = (data: RoleData) => ({
  ...data,
  /** The entire raw Role data */
  raw: data,
  /** The @ mention of the role in a string. */
  mention: `<@&${data.id}>`,
});

export type Role = ReturnType<typeof createRole>;
