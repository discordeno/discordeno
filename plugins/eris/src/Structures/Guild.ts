import { DiscordGuild } from "../../deps.ts";
import { Base } from "../Base.ts";
import Client, { BigString } from "../Client.ts";
import { Collection } from "../Collection.ts";
import GuildChannel from "./GuildChannel.ts";
import PublicThreadChannel from "./PublicThreadChannel.ts";
import Role from "./Role.ts";

export class Guild extends Base {
  roles = new Collection<BigString, Role>();
  // TODO: check type for this
  channels = new Collection<BigString, GuildChannel>();
  // TODO: check type for this
  threads = new Collection<BigString, PublicThreadChannel>();


  constructor(data: DiscordGuild, client: Client) {
    super(data.id);
  }
}

export default Guild;
