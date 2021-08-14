import Base from "./Base.ts";
import Client from "./Client.ts";
import { snowflakeToBigint } from "../../../util/bigint.ts";
import { VoiceState as VoiceStatePayload } from "../../../types/voice/voice_state.ts";

export class VoiceState extends Base {
  /** The guild id where this voice connection is in. */
  guildId: bigint;
  /** The channel id where this voice connection is */
  channelId: bigint;

  constructor(client: Client, payload: VoiceStatePayload) {
    super(client, snowflakeToBigint(payload.userId));

    this.guildId = snowflakeToBigint(payload.guildId!);
    this.channelId = snowflakeToBigint(payload.channelId!);
  }

  /** The member that is associated with this voice connection. */
  get member() {
    return this.guild?.members.get(this.id);
  }

  /** The guild that is associated with this voice connection. */
  get guild() {
    return this.client.guilds.get(this.guildId);
  }
}

export default VoiceState;
