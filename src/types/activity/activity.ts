import { ActivityAssets } from "./activityAssets.ts";
import { ActivityButton } from "./activityButton.ts";
import { ActivityEmoji } from "./activityEmoji.ts";
import { ActivityParty } from "./activityParty.ts";
import { ActivitySecrets } from "./activitySecrets.ts";
import { ActivityTimestamps } from "./activityTimestamps.ts";
import { ActivityTypes } from "./activityTypes.ts";

/** https://discord.com/developers/docs/topics/gateway#activity-object */
export interface Activity {
  /** The activity's name */
  name: string;
  /** Activity type */
  type: ActivityTypes;
  /** Stream url, is validated when type is 1 */
  url?: string | null;
  /** Unix timestamp of when the activity was added to the user's session */
  createdAt: number;
  /** Unix timestamps for start and/or end of the game */
  timestamps?: ActivityTimestamps;
  /** Application id for the game */
  applicationId?: string;
  /** What the player is currently doing */
  details?: string | null;
  /** The user's current party status */
  state?: string | null;
  /** The emoji used for a custom status */
  emoji?: ActivityEmoji | null;
  /** Information for the current party of the player */
  party?: ActivityParty;
  /** Images for the presence and their hover texts */
  assets?: ActivityAssets;
  /** Secrets for Rich Presence joining and spectating */
  secrets?: ActivitySecrets;
  /** Whether or not the activity is an instanced game session */
  instance?: boolean;
  /** Activity flags `OR`d together, describes what the payload includes */
  flags?: number;
  /** The custom buttons shown in the Rich Presence (max 2) */
  buttons?: ActivityButton[];
}
