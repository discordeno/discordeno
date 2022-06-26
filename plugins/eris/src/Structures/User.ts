import { DiscordUser } from "../../deps.ts";
import { Base } from "../Base.ts";
import Client from "../Client.ts";

export class User extends Base {
  constructor(data: DiscordUser, client: Client) {
    super(data.id);
    
  }
}

export default User;
