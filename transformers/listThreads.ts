import { DiscordListThreads } from "../types/discord.ts";
import { Collection } from "../util/collection.ts";
import { Bot } from "../bot.ts";
import { Optionalize } from "../types/shared.ts";

export function transformListThreads(bot: Bot, payload: DiscordListThreads) {
  const listThreads = {
    threads: new Collection(
      payload.threads.map((channel) => {
        const thread = bot.transformers.channel(bot, { channel });
        return [thread.id, thread];
      }),
    ),
    members: new Collection(
      payload.members.map((m) => {
        const member = bot.transformers.threadMember(bot, m);
        return [member.id, member];
      }),
    ),
  };
  return listThreads as Optionalize<typeof listThreads>;
}

export interface ListThreads extends ReturnType<typeof transformListThreads> {}
