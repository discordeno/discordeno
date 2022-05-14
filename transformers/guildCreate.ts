import { Bot } from "../bot.ts";
import { Collection } from "../util/collection.ts";
import { DiscordGuildCreate } from "../types/discord.ts";
import { Optionalize } from "../types/shared.ts";
import { GuildCreateToggles } from "./toggles/GuildCreate.ts";

export function transformGuildCreate(bot: Bot, payload: { guild: DiscordGuildCreate } & { shardId: number }) {
  const guildId = bot.transformers.snowflake(payload.guild.id);

  const guild = {
    ...bot.transformers.guild(bot, payload),
    toggles: new GuildCreateToggles(payload.guild),
    stageInstances: payload.guild.stage_instances?.map((si) => ({
      /** The id of this Stage instance */
      id: bot.transformers.snowflake(si.id),
      /** The guild id of the associated Stage channel */
      guildId,
      /** The id of the associated Stage channel */
      channelId: bot.transformers.snowflake(si.channel_id),
      /** The topic of the Stage instance (1-120 characters) */
      topic: si.topic,
    })),
    joinedAt: payload.guild.joined_at ? Date.parse(payload.guild.joined_at) : undefined,
    memberCount: payload.guild.member_count ?? 0,
    channels: new Collection(
      payload.guild.channels?.map((channel) => {
        const result = bot.transformers.channel(bot, { channel, guildId });
        return [result.id, result];
      }),
    ),
    voiceStates: new Collection(
      (payload.guild.voice_states || [])
        .map((vs) => bot.transformers.voiceState(bot, { voiceState: vs, guildId }))
        .map((vs) => [vs.userId, vs]),
    ),
  };

  return guild as Optionalize<typeof guild>;
}

export interface GuildCreate extends ReturnType<typeof transformGuildCreate> {}
