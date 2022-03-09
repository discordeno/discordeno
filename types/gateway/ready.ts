import { UnavailableGuild } from "../guilds/unavailableGuild.ts";
import { SnakeCasedPropertiesDeep } from "../util.ts";
import { DiscordApplication, DiscordUser } from "../discord.ts";

/** https://discord.com/developers/docs/topics/gateway#ready */
export interface Ready {
  /** Gateway version */
  v: number;
  /** Information about the user including email */
  user: DiscordUser;
  /** The guilds the user is in */
  guilds: UnavailableGuild[];
  /** Used for resuming connections */
  sessionId: string;
  /** The shard information associated with this session, if sent when identifying */
  shard?: [number, number];
  /** Contains id and flags */
  application: Partial<DiscordApplication> & Pick<DiscordApplication, "id" | "flags">;
}

export type DiscordReady = SnakeCasedPropertiesDeep<Ready>;
