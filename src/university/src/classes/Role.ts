import { Role as RolePayload } from "../../../types/permissions/role.ts";
import { snowflakeToBigint } from "../../../util/bigint.ts";
import Base from "./Base.ts";
import Client from "./Client.ts";

export class Role extends Base {
  constructor(client: Client, payload: RolePayload) {
    super(client, snowflakeToBigint(payload.id));
  }
}

export default Role;
