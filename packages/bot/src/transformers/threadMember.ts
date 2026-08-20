import type { BigString, DiscordThreadMember, DiscordThreadMemberGuildCreate } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { ThreadMember, ThreadMemberGuildCreate } from './types.js';

export function transformThreadMember(bot: Bot, payload: Partial<DiscordThreadMember>, extra?: ThreadMemberTransformerExtra & { partial?: boolean }) {
  const threadMember = {} as SetupDesiredProps<ThreadMember, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.id) threadMember.id = bot.transformers.snowflake(payload.id);
  if (payload.user_id) threadMember.userId = bot.transformers.snowflake(payload.user_id);
  if (payload.join_timestamp) threadMember.joinTimestamp = Date.parse(payload.join_timestamp);
  if (payload.flags !== undefined) threadMember.flags = payload.flags;
  if (payload.member) {
    threadMember.member = bot.transformers.member(bot, payload.member, {
      guildId: extra?.guildId,
      userId: payload.user_id,
    });
  }

  return callCustomizer('threadMember', bot, payload, threadMember, {
    guildId: extra?.guildId ? bot.transformers.snowflake(extra?.guildId) : undefined,
    partial: extra?.partial ?? false,
  });
}

export interface ThreadMemberTransformerExtra {
  /**
   * Provide this parameter if you want it to be passed down to the `threadMember.member` object (when `withMembers` is set to `true`),
   * since Discord does not include a `guildId` in that payload.
   *
   * This allows you to cache member objects in the member customizer.
   */
  guildId?: BigString;
}

export function transformThreadMemberGuildCreate(bot: Bot, payload: DiscordThreadMemberGuildCreate) {
  const threadMember = {
    joinTimestamp: Date.parse(payload.join_timestamp),
  } as ThreadMemberGuildCreate;

  return bot.transformers.customizers.threadMemberGuildCreate(bot, payload, threadMember);
}
