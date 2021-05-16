import type { DiscordenoChannel } from "../../structures/channel.ts";
import type { DiscordenoGuild } from "../../structures/guild.ts";
import { StageInstance } from "../channels/stage_instance.ts";

export interface DiscordenoStageInstance
  extends Omit<StageInstance, "guildId" | "channelId"> {
  /** The guild of the associated Stage channel */
  guild: DiscordenoGuild;
  /** The Stage channel associated with the Stage instance */
  channel: DiscordenoChannel;
}
