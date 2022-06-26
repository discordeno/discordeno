import { BitwisePermissionFlags, DiscordGuild } from "../../deps.ts";
import { Base } from "../Base.ts";
import Client, { BigString } from "../Client.ts";
import { Collection } from "../Collection.ts";
import GuildChannel from "./GuildChannel.ts";
import Member from "./Member.ts";
import Permission from "./Permission.ts";
import PublicThreadChannel from "./PublicThreadChannel.ts";
import Role from "./Role.ts";

export class Guild extends Base {
  client: Client;
  ownerID: BigString;

  members = new Collection<BigString, Member>();
  roles = new Collection<BigString, Role>();
  // TODO: check type for this
  channels = new Collection<BigString, GuildChannel>();
  // TODO: check type for this
  threads = new Collection<BigString, PublicThreadChannel>();

  constructor(data: DiscordGuild, client: Client) {
    super(data.id);
    this.client = client;
    this.ownerID = data.owner_id;
  }

  /** Get the guild permissions of a member */
  permissionsOf(memberID: BigString | Member): Permission {
    const member = ["string", "bigint"].includes(typeof memberID) ? this.members.get(memberID as BigString)! : memberID as Member;
    if (member.id === this.ownerID) {
      return new Permission(BitwisePermissionFlags.ADMINISTRATOR);
    } else {
      let permissions = this.roles.get(this.id)!.permissions.allow;
      if (permissions & BigInt(BitwisePermissionFlags.ADMINISTRATOR)) {
        return new Permission(BitwisePermissionFlags.ADMINISTRATOR);
      }
      for (let id of member.roles) {
        const role = this.roles.get(id);
        if (!role) {
          continue;
        }

        const { allow: perm } = role.permissions;
        if (perm & BigInt(BitwisePermissionFlags.ADMINISTRATOR)) {
          permissions = BigInt(BitwisePermissionFlags.ADMINISTRATOR);
          break;
        } else {
          permissions |= perm;
        }
      }
      return new Permission(permissions);
    }
  }
}

export default Guild;
