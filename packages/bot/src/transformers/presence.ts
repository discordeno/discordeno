import { type DiscordPresenceUpdate, PresenceStatus } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { PresenceUpdate, User } from './types.js';

export function transformPresence(bot: Bot, payload: Partial<DiscordPresenceUpdate>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.presence;
  const presence = {} as SetupDesiredProps<PresenceUpdate, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.user && payload.user) presence.user = bot.transformers.user(bot, payload.user) as User;
  if (props.guildId && payload.guild_id) presence.guildId = bot.transformers.snowflake(payload.guild_id);
  if (props.status && payload.status) presence.status = PresenceStatus[payload.status];
  if (props.activities && payload.activities) presence.activities = payload.activities.map((activity) => bot.transformers.activity(bot, activity));
  if (props.desktop && payload.client_status?.desktop) presence.desktop = payload.client_status.desktop;
  if (props.mobile && payload.client_status?.mobile) presence.mobile = payload.client_status.mobile;
  if (props.web && payload.client_status?.web) presence.web = payload.client_status.web;
  if (props.vr && payload.client_status?.vr) presence.vr = payload.client_status.vr;

  return callCustomizer('presence', bot, payload, presence, {
    partial: extra?.partial ?? false,
  });
}
