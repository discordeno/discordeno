import type { DiscordGuildWidget } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { GuildWidget } from './types.js';

export function transformGuildWidget(bot: Bot, payload: Partial<DiscordGuildWidget>, extra?: { partial?: boolean }) {
  const guildWidget = {} as SetupDesiredProps<GuildWidget, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.id) guildWidget.id = bot.transformers.snowflake(payload.id);
  if (payload.name) guildWidget.name = payload.name;
  if (payload.instant_invite) guildWidget.instantInvite = payload.instant_invite;
  if (payload.presence_count !== undefined) guildWidget.presenceCount = payload.presence_count;
  if (payload.channels) guildWidget.channels = payload.channels.map((channel) => bot.transformers.channel(bot, channel, { partial: true }));
  if (payload.members) guildWidget.members = payload.members.map((user) => bot.transformers.user(bot, user, { partial: true }));

  return callCustomizer('guildWidget', bot, payload, guildWidget, {
    partial: extra?.partial ?? false,
  });
}
