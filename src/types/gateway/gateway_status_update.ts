import { Activity } from "./activity.ts";
import { SnakeCaseProps } from "../util.ts";
import { DiscordStatusTypes } from "./status_types.ts";

export interface GatewayStatusUpdate {
  /** Unix time (in milliseconds) of when the client went idle, or null if the client is not idle */
  since: number | null;
  /** Null, or the user's activities */
  activities: Activity[] | null;
  /** The user's new status */
  status: DiscordStatusTypes;
  /** Whether or not the client is afk */
  afk: boolean;
}

/** https://discord.com/developers/docs/topics/gateway#update-status-gateway-status-update-structure */
export type DiscordGatewayStatusUpdate = SnakeCaseProps<GatewayStatusUpdate>;
