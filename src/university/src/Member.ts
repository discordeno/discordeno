import Base from "./Base.ts";
import Client from "./Client.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";
import { GuildMemberWithUser } from "../../types/members/guild_member.ts";
import User from "./User.ts";

export class Member extends Base {
  /** The guild id for this member */
  guildId: bigint;
  /** The last timestamp when this member was active. USED for cleaning out inactive members from cache. */
  cachedAt: number;
  /** The timestamp when this member joined the guild. */
  joinedAt: number;
  /** Whether or not this member is deaf. */
  deaf: boolean;
  /** Whether or not this member is mute. */
  mute: boolean;
  /** The nickname of this member in this guild, if no nickname is set it will be an empty string. */
  nick: string;
  /** Whether or not this member is still pending verification to join the guild. */
  pending?: boolean;
  /** The ids of the roles that this member has. */
  roleIds: bigint[];
  /** The user data for this member */
  user: User;

  constructor(client: Client, payload: GuildMemberWithUser, guildId: bigint) {
    super(client, snowflakeToBigint(payload.user.id));

    this.guildId = guildId;
    this.cachedAt = Date.now();
    this.joinedAt = Date.parse(payload.joinedAt);
    this.deaf = payload.deaf;
    this.mute = payload.mute;
    this.nick = payload.nick || "";
    this.pending = payload.pending;
    this.roleIds = payload.roles.map((id) => snowflakeToBigint(id));

    this.user = new User(client, payload.user);
  }
}

export default Member;
