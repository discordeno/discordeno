import Base from "./Base.ts";
import { Channel as ChannelPayload } from "../../../types/channels/channel.ts";
import Client from "./Client.ts";
import { snowflakeToBigint } from "../../../util/bigint.ts";
import { DiscordChannelTypes } from "../../../types/channels/channel_types.ts";
import { Collection } from "../../../util/collection.ts";
import Message from "./Message.ts";

export class Channel extends Base {
  /** The guild id where this channel is located. If in a DM this is undefined. */
  guildId?: bigint;
  /** The type of the channel. */
  type: DiscordChannelTypes;
  /** All of the messages sent in this channel. */
  messages: Collection<bigint, Message>;
  /** The id of the last message that was sent in this channel, if any was sent. */
  lastMessageId?: bigint;
  /** The member count if this channel is a thread, otherwise it is 0. Counter maxes at 50 but discord allows more members. */
  memberCount: number;

  constructor(client: Client, payload: ChannelPayload) {
    super(client, snowflakeToBigint(payload.id));

    this.lastMessageId = payload.lastMessageId ? snowflakeToBigint(payload.lastMessageId) : undefined;
    this.guildId = payload.guildId ? snowflakeToBigint(payload.guildId) : undefined;
    this.type = payload.type;
    this.memberCount = payload.memberCount || 0;

    this.messages = new Collection([], { sweeper: { filter: client.messageSweeper, interval: 300000 } })
  }
}

export default Channel;
