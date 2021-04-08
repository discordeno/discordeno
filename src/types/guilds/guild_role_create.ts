import { Role } from "../permissions/role.ts";
import { SnakeCasedPropertiesDeep } from "../util.ts";

export interface GuildRoleCreate {
  /** The id of the guild */
  guildId: string;
  /** The role created */
  role: Role;
}

/** https://discord.com/developers/docs/topics/gateway#guild-role-create */
export type DiscordGuildRoleCreate = SnakeCasedPropertiesDeep<GuildRoleCreate>;
