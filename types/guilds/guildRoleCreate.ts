import { Role } from "../permissions/role.ts";

/** https://discord.com/developers/docs/topics/gateway#guild-role-create */
export interface GuildRoleCreate {
  /** The id of the guild */
  guildId: string;
  /** The role created */
  role: Role;
}
