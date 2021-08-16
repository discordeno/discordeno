import { CreateGuildRole } from "../../../types/guilds/create_guild_role.ts";
import { Role as RolePayload } from "../../../types/permissions/role.ts";
import { snowflakeToBigint } from "../../../util/bigint.ts";
import { endpoints } from "../../../util/constants.ts";
import Base from "./Base.ts";
import Client from "./Client.ts";
import { Guild } from "./Guild.ts";
import { calculateBits } from "../../../util/permissions.ts";

export class Role extends Base {
  /** The guild where this role exists. */
  guild: Guild;

  constructor(client: Client, payload: RolePayload, guild: Guild) {
    super(client, snowflakeToBigint(payload.id));

    this.guild = guild;
  }

  /** Delete a guild role. Requires the MANAGE_ROLES permission. */
  async delete() {
    return await this.client.rest.delete(endpoints.GUILD_ROLE(this.guild.id, this.id));
  }

  /** Edit a guild role. Requires the MANAGE_ROLES permission. */
  async edit(options: CreateGuildRole) {
    const result = (await this.client.rest.patch(endpoints.GUILD_ROLE(this.guild.id, this.id), {
      ...options,
      permissions: options.permissions ? calculateBits(options.permissions) : undefined,
    })) as RolePayload;

    const role = new Role(this.client, result, this.guild);
    this.guild.roles.set(role.id, role);

    return role;
  }
}

export default Role;
