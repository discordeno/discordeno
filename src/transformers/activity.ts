import { Bot } from "../bot.ts";
import { Activity } from "../types/activity/activity.ts";
import { DiscordActivityTypes } from "../types/activity/activity_types.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";
import { DiscordenoEmoji } from "./emoji.ts";

export function transformActivity(bot: Bot, payload: SnakeCasedPropertiesDeep<Activity>): DiscordenoActivity {
  return {
    name: payload.name,
    type: payload.type,
    url: payload.url ?? undefined,
    createdAt: payload.created_at,
    startedAt: payload.timestamps?.start,
    endedAt: payload.timestamps?.end,
    applicationId: payload.application_id ? bot.transformers.snowflake(payload.application_id) : undefined,
    details: payload.details ?? undefined,
    state: payload.state ?? undefined,
    emoji: payload.emoji ? bot.transformers.emoji(bot, payload.emoji) : undefined,
    partyId: payload.party?.id,
    partyCurrentSize: payload.party?.size?.[0],
    partyMaxSize: payload.party?.size?.[1],
    largeImage: payload.assets?.large_image,
    largeText: payload.assets?.large_text,
    smallImage: payload.assets?.small_image,
    smallText: payload.assets?.small_text,
    join: payload.secrets?.join,
    spectate: payload.secrets?.spectate,
    match: payload.secrets?.match,
    instance: payload.instance,
    flags: payload.flags,
    buttonLabels: payload.buttons?.map((button) => button.label),
  };
}

export interface DiscordenoActivity {
  /** The activity's name */
  name: string;
  /** Activity type */
  type: DiscordActivityTypes;
  /** Stream url, is validated when type is 1 */
  url?: string;
  /** Unix timestamp of when the activity was added to the user's session */
  createdAt: number;
  /** Unix time (in milliseconds) of when the activity started */
  startedAt?: number;
  /** Unix time (in milliseconds) of when the activity ends */
  endedAt?: number;
  /** Application id for the game */
  applicationId?: bigint;
  /** What the player is currently doing */
  details?: string;
  /** The user's current party status */
  state?: string;
  /** The emoji used for a custom status */
  emoji?: DiscordenoEmoji;
  /** the id of the party */
  partyId?: string;
  /** The current size of the party if one exists */
  partyCurrentSize?: number;
  /** The max size of the party if one exists */
  partyMaxSize?: number;
  /** The id for a large asset of the activity, usually a snowflake */
  largeImage?: string;
  /** Text displayed when hovering over the large image of the activity */
  largeText?: string;
  /** The id for a small asset of the activity, usually a snowflake */
  smallImage?: string;
  /** Text displayed when hovering over the small image of the activity */
  smallText?: string;
  /** The secret for joining a party */
  join?: string;
  /** The secret for spectating a game */
  spectate?: string;
  /** The secret for a specific instanced match */
  match?: string;
  /** Whether or not the activity is an instanced game session */
  instance?: boolean;
  /** Activity flags `OR`d together, describes what the payload includes */
  flags?: number;
  /** The custom button's labels shown in the Rich Presence */
  buttonLabels?: string[];
}
