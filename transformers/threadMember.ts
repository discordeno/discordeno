import { Bot } from "../bot.ts";
import { DiscordThreadMember, DiscordThreadMemberGuildCreate } from "../types/discord.ts";

export function transformThreadMember(
  bot: Bot,
  payload: DiscordThreadMember,
) {
  return {
    id: payload.user_id ? bot.transformers.snowflake(payload.user_id) : undefined,
    threadId: payload.id ? bot.transformers.snowflake(payload.id) : undefined,
    joinTimestamp: Date.parse(payload.join_timestamp),
  };
}

export function transformThreadMemberGuildCreate(
  bot: Bot,
  payload: DiscordThreadMemberGuildCreate,
) {
  return {
    joinTimestamp: Date.parse(payload.join_timestamp),
  };
}

export interface ThreadMember extends ReturnType<typeof transformThreadMember> {}
export interface ThreadMemberGuildCreate extends ReturnType<typeof transformThreadMemberGuildCreate> {}
