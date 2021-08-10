import Base from "./Base.ts";
import Client from "./Client.ts";
import { snowflakeToBigint } from "../../../util/bigint.ts";
import { GuildMemberWithUser } from "../../../types/members/guild_member.ts";

export class Member extends Base {
  /** The guild id for this member */
  guildId: bigint;

  constructor(client: Client, payload: GuildMemberWithUser, guildId: bigint) {
    super(client, snowflakeToBigint(payload.user.id));

    this.guildId = guildId;
  }
}

export default Member;
