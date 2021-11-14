import { Bot } from "../bot.ts";
import { PresenceUpdate } from "../types/activity/presenceUpdate.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";
import { DiscordenoActivity } from "./activity.ts";
import { DiscordenoUser } from "./member.ts";

export const statusTypes = {
  online: 0,
  dnd: 1,
  idle: 2,
  invisible: 3,
  offline: 4,
} as const;

export function transformPresence(bot: Bot, payload: SnakeCasedPropertiesDeep<PresenceUpdate>): DiscordenoPresence {
  return {
    user: bot.transformers.user(bot, payload.user),
    guildId: bot.transformers.snowflake(payload.guild_id),
    status: statusTypes[payload.status],
    activities: payload.activities.map((activity) => bot.transformers.activity(bot, activity)),
    desktop: payload.client_status.desktop,
    mobile: payload.client_status.mobile,
    web: payload.client_status.web,
  };
}

export interface DiscordenoPresence {
  /** The user presence is being updated for */
  user: DiscordenoUser;
  /** id of the guild */
  guildId: bigint;
  /** Either online: 0, dnd: 1, idle: 2, invisible: 3, offline: 4 */
  status: 0 | 1 | 2 | 3 | 4;
  /** User's current activities */
  activities: DiscordenoActivity[];
  /** The user's status set for an active desktop (Windows, Linux, Mac) application session */
  desktop?: string;
  /** The user's status set for an active mobile (iOS, Android) application session */
  mobile?: string;
  /** The user's status set for an active web (browser, bot account) application session */
  web?: string;
}
