import { DiscordMember, DiscordMemberWithUser } from "../../deps.ts";
import { Base } from "../Base.ts";
import Client, { BigString } from "../Client.ts";
import Guild from "./Guild.ts";

export class Member extends Base {
  roles: BigString[];

  constructor(data: (DiscordMember & { id: BigString }) | DiscordMemberWithUser, guild: Guild, client: Client) {
    super(client.isDiscordMemberWithUser(data) ? data.user.id : data.id);

    this.roles = data.roles;
  }
}

export default Member;
