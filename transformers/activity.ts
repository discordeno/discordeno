import { Bot } from "../bot.ts";
import { DiscordActivity } from "../types/discord.ts";
import { Optionalize } from "../types/shared.ts";

export function transformActivity(bot: Bot, payload: DiscordActivity) {
  const activity = {
    name: payload.name,
    type: payload.type,
    url: payload.url ?? undefined,
    createdAt: payload.created_at,
    startedAt: payload.timestamps?.start,
    endedAt: payload.timestamps?.end,
    applicationId: payload.application_id ? bot.transformers.snowflake(payload.application_id) : undefined,
    details: payload.details ?? undefined,
    state: payload.state ?? undefined,
    emoji: payload.emoji
      ? {
        name: payload.emoji.name,
        animated: payload.emoji.animated,
        id: payload.emoji.id ? bot.transformers.snowflake(payload.emoji.id) : undefined,
      }
      : undefined,
    partyId: payload.party?.id ? bot.transformers.snowflake(payload.party.id) : undefined,
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
    buttons: payload.buttons,
  };

  return activity as Optionalize<typeof activity>;
}

export interface Activity extends ReturnType<typeof transformActivity> {}
