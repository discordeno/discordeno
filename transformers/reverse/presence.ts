import { Bot } from "../../bot.ts";
import { DiscordPresenceUpdate } from "../../types/discord.ts";
import { PresenceStatus } from "../../types/shared.ts";
import { PresenceUpdate } from "../presence.ts";

export const reverseStatusTypes = Object.freeze(
  {
    0: "online",
    1: "dnd",
    2: "idle",
    4: "offline",
  } as const,
);

export function transformPresenceToDiscordPresence(bot: Bot, payload: PresenceUpdate): DiscordPresenceUpdate {
  return {
    user: bot.transformers.reverse.user(bot, payload.user),
    guild_id: bot.transformers.reverse.snowflake(payload.guildId),
    // TODO: find better way
    status: (PresenceStatus[payload.status] ?? "offline") as "offline",
    activities: payload.activities.map((activity) => bot.transformers.reverse.activity(bot, activity)),
    client_status: {
      desktop: payload.desktop,
      mobile: payload.mobile,
      web: payload.web,
    },
  };
}
