import { Activity } from "../discordeno.ts";
import { DiscordStatusTypes } from "./statusTypes.ts";

/** https://discord.com/developers/docs/topics/gateway#update-status */
export interface StatusUpdate {
  /** Unix time (in milliseconds) of when the client went idle, or null if the client is not idle */
  since: number | null;
  /** The user's activities */
  activities: Activity[];
  /** The user's new status */
  status: DiscordStatusTypes;
  /** Whether or not the client is afk */
  afk: boolean;
}
