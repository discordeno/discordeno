import Base from "./Base.ts";
import Client from "./Client.ts";

import { snowflakeToBigint } from "../../../util/bigint.ts";
import { Guild as GuildPayload } from "../../../types/guilds/guild.ts";
import { Collection } from "../../../util/collection.ts";
import Channel from "./Channel.ts";
import Member from "./Member.ts";

export class Guild extends Base {
  /** The channels available in this guild. */
  channels: Collection<bigint, Channel>;
  /** All of the member objects that have been cached since the bot acquired `READY` state, mapped by their Ids */
  members: Collection<bigint, Member>;

  constructor(client: Client, payload: GuildPayload) {
    super(client, snowflakeToBigint(payload.id));

    this.channels = new Collection<bigint, Channel>([], {
      sweeper: { filter: client.channelSweeper, interval: 3660000 },
    });

    this.members = new Collection<bigint, Member>([], { sweeper: { filter: client.memberSweeper, interval: 300000 } })
  }
}
