import { Bot } from "../bot.ts";
import { DiscordThreadMember, DiscordThreadMemberGuildCreate } from "../types/discord.ts";
import { Optionalize } from "../types/shared.ts";

export function transformThreadMember(bot: Bot, payload: DiscordThreadMember) {
  const threadMember = {
    id: payload.user_id ? bot.transformers.snowflake(payload.user_id) : undefined,
    threadId: payload.id ? bot.transformers.snowflake(payload.id) : undefined,
    joinTimestamp: Date.parse(payload.join_timestamp),
  };

  return threadMember as Optionalize<typeof threadMember>;
}

export function transformThreadMemberGuildCreate(bot: Bot, payload: DiscordThreadMemberGuildCreate) {
  const threadMember = {
    joinTimestamp: Date.parse(payload.join_timestamp),
  };

  return threadMember as Optionalize<typeof threadMember>;
}

export interface ThreadMember extends ReturnType<typeof transformThreadMember> {}
export interface ThreadMemberGuildCreate extends ReturnType<typeof transformThreadMemberGuildCreate> {}
