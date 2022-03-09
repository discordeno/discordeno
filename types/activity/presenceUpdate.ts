import { DiscordUser } from "../discord.ts";
import { Activity } from "./activity.ts";
import { ClientStatus } from "./clientStatus.ts";

/** https://discord.com/developers/docs/topics/gateway#presence-update */
export interface PresenceUpdate {
  /** The user presence is being updated for */
  user: DiscordUser;
  /** id of the guild */
  guildId: string;
  /** Either "idle", "dnd", "online", or "offline" */
  status: "idle" | "dnd" | "online" | "offline";
  /** User's current activities */
  activities: Activity[];
  /** User's platform-dependent status */
  clientStatus: ClientStatus;
}
