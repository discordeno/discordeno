import { UnavailableGuild } from "../guilds/unavailable_guild.ts";
import { Application } from "../oauth2/application.ts";
import { User } from "../users/user.ts";
import { SnakeCaseProps } from "../util.ts";

export interface Ready {
  /** Gateway version */
  v: number;
  /** Information about the user including email */
  user: User;
  /** Empty array */
  privateChannels: [];
  /** The guilds the user is in */
  guilds: UnavailableGuild[];
  /** Used for resuming connections */
  sessionId: string;
  /** The shard information associated with this session, if sent when identifying */
  shard?: [number, number];
  /** Contains id and flags */
  application:
    & Partial<Application>
    & Pick<Application, "id" | "flags">;
}

/** https://discord.com/developers/docs/topics/gateway#ready */
export type DiscordReady = SnakeCaseProps<Ready>;
