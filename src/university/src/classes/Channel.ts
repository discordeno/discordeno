import Base from "./Base.ts";
import { Channel as ChannelPayload } from "../../../types/channels/channel.ts";
import Client from "./Client.ts";
import { snowflakeToBigint } from "../../../util/bigint.ts";
import { Collection } from "../../../util/collection.ts";

export class Channel extends Base {
  /** The guild id where this channel is located. If in a DM this is undefined. */
  guildId?: bigint;

  constructor(client: Client, payload: ChannelPayload) {
    super(client, snowflakeToBigint(payload.id));

    this.guildId = payload.guildId ? snowflakeToBigint(payload.guildId) : undefined;
  }
}

export default Channel;
