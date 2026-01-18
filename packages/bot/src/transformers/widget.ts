import type { DiscordGuildWidget } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { GuildWidget } from './types.js';

export function transformWidget(bot: Bot, payload: DiscordGuildWidget): GuildWidget {
  const widget = {
    id: bot.transformers.snowflake(payload.id),
    name: payload.name,
    instantInvite: payload.instant_invite ?? undefined,
    // @ts-expect-error TODO: Deal with partials
    channels: payload.channels.map((channel) => bot.transformers.channel(bot, channel)),
    // @ts-expect-error TODO: Deal with partials
    members: payload.members.map((user) => bot.transformers.user(bot, user)),
    presenceCount: payload.presence_count,
  } as GuildWidget;

  return bot.transformers.customizers.widget(bot, payload, widget);
}
