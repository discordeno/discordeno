import { Bot } from "../../bot.ts";
import { DiscordActivity } from "../../types/discord.ts";
import { Activity } from "../activity.ts";

export function transformActivityToDiscordActivity(bot: Bot, payload: Activity): DiscordActivity {
  return {
    name: payload.name,
    type: payload.type,
    url: payload.url ?? undefined,
    created_at: payload.createdAt,
    timestamps: {
      start: payload.startedAt,
      end: payload.endedAt,
    },
    application_id: payload.applicationId ? bot.utils.bigintToSnowflake(payload.applicationId) : undefined,
    details: payload.details ?? undefined,
    state: payload.state ?? undefined,
    emoji: payload.emoji
      ? {
        name: payload.emoji.name,
        animated: payload.emoji.animated,
        id: payload.emoji.id ? bot.utils.bigintToSnowflake(payload.emoji.id) : undefined,
      }
      : undefined,
    party: {
      id: payload.partyId,
      size: payload.partyCurrentSize && payload.partyMaxSize
        ? [payload.partyCurrentSize, payload.partyMaxSize]
        : undefined,
    },
    assets: {
      large_image: payload.largeImage,
      large_text: payload.largeText,
      small_image: payload.largeImage,
      small_text: payload.largeText,
    },
    secrets: {
      join: payload.join,
      spectate: payload.spectate,
      match: payload.match,
    },
    instance: payload.instance,
    flags: payload.flags,
    buttons: payload.buttons,
  };
}
