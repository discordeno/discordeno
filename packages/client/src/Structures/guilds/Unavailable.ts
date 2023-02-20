import type { DiscordUnavailableGuild } from "@discordeno/types"
import Base from "../../Base.js"
import type Client from "../../Client.js"


export class UnavailableGuild extends Base {
  /** Whether or not the guild is unavailable. */
  unavailable: boolean

  constructor(data: DiscordUnavailableGuild, client: Client) {
    super(data.id)

    // TODO: gateway
    // this.shard = client.shards.get(client.guildShardMap[this.id]);
    this.unavailable = !!data.unavailable
  }

  toJSON(props: string[] = []): Record<string, any> {
    return super.toJSON(['unavailable', ...props])
  }
}

export default UnavailableGuild
