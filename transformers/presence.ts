import { Bot } from "../bot.ts";
import { DiscordPresenceUpdate } from "../types/discord.ts";
import { Optionalize } from "../types/shared.ts";

export const statusTypes = {
  online: 0,
  dnd: 1,
  idle: 2,
  invisible: 3,
  offline: 4,
} as const;

export function transformPresence(bot: Bot, payload: DiscordPresenceUpdate) {
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

export interface PresenceUpdate extends Optionalize<ReturnType<typeof transformPresence>> {}
export type StatusTypes = keyof typeof statusTypes;
