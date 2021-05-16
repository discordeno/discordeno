import type { DiscordenoChannel } from "../../structures/channel.ts";
import type { DiscordenoGuild } from "../../structures/guild.ts";

// TODO: add resource link
export interface StageInstance {
  /** The id of this Stage instance */
  id: string;
  /** The guild id of the associated Stage channel */
  guildId: string;
  /** The id of the associated Stage channel */
  channelId: string;
  /** The topic of the Stage instance (1-120 characters) */
  topic: string;
}

export interface DiscordenoStageInstance
  extends Omit<StageInstance, "guildId" | "channelId"> {
  /** The guild of the associated Stage channel */
  guild: DiscordenoGuild;
  /** The Stage channel associated with the Stage instance */
  channel: DiscordenoChannel;
}
