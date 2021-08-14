import Base from "./Base.ts";
import Client from "./Client.ts";

import { snowflakeToBigint } from "../../../util/bigint.ts";
import { Guild as GuildPayload } from "../../../types/guilds/guild.ts";
import { Collection } from "../../../util/collection.ts";
import Channel from "./Channel.ts";
import Member from "./Member.ts";
import VoiceState from "./VoiceState.ts";
import { Emoji } from "../../../types/emojis/emoji.ts";
import Role from "./Role.ts";

export class Guild extends Base {
  /** The channels available in this guild. */
  channels: Collection<bigint, Channel>;
  /** All of the member objects that have been cached since the bot acquired `READY` state, mapped by their Ids */
  members: Collection<bigint, Member>;
  /** All of the voice connections that are in this guild at the moment. Mapped by the user id. */
  voiceStates: Collection<bigint, VoiceState>;

  /** The shard in which this guild is connected. */
  shardId: number;

  /** The amount of members in this guild. If it is 0 which is impossible, it means discord did not tell us the amount of members. */
  memberCount: number;

  /** The cached emojis that are in this guild. */
  emojis: Collection<bigint, Emoji>;

  /** The roles that are cached in this guild. */
  roles: Collection<bigint, Role>;

  constructor(client: Client, payload: GuildPayload, shardId: number) {
    super(client, snowflakeToBigint(payload.id));

    this.shardId = shardId;
    this.memberCount = payload.memberCount || 0;

    this.emojis = new Collection(payload.emojis.map((emoji) => [snowflakeToBigint(emoji.id!), emoji]));

    this.channels = new Collection<bigint, Channel>([], {
      sweeper: { filter: client.channelSweeper, interval: 3660000 },
    });

    this.members = new Collection<bigint, Member>([], { sweeper: { filter: client.memberSweeper, interval: 300000 } });

    this.voiceStates = new Collection(
      payload.voiceStates?.map((vs) => [snowflakeToBigint(vs.userId), new VoiceState(client, vs)]) || []
    );

    this.roles = new Collection(payload.roles?.map((r) => [snowflakeToBigint(r.id), new Role(client, r)]) || []);
  }
}
