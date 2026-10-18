import type { DiscordWelcomeScreen, DiscordWelcomeScreenChannel } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { WelcomeScreen, WelcomeScreenChannel } from './types.js';

export function transformWelcomeScreen(bot: Bot, payload: Partial<DiscordWelcomeScreen>, extra?: { partial?: boolean }) {
  const welcomeScreen = {} as SetupDesiredProps<WelcomeScreen, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.description) welcomeScreen.description = payload.description;
  if (payload.welcome_channels) welcomeScreen.welcomeChannels = payload.welcome_channels.map((x) => bot.transformers.welcomeScreenChannel(bot, x));

  return callCustomizer('welcomeScreen', bot, payload, welcomeScreen, {
    partial: extra?.partial ?? false,
  });
}

export function transformWelcomeScreenChannel(bot: Bot, payload: Partial<DiscordWelcomeScreenChannel>, extra?: { partial?: boolean }) {
  const welcomeScreenChannel = {} as SetupDesiredProps<WelcomeScreenChannel, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.channel_id) welcomeScreenChannel.channelId = bot.transformers.snowflake(payload.channel_id);
  if (payload.description) welcomeScreenChannel.description = payload.description;
  if (payload.emoji_id) welcomeScreenChannel.emojiId = bot.transformers.snowflake(payload.emoji_id);
  if (payload.emoji_name) welcomeScreenChannel.emojiName = payload.emoji_name;

  return callCustomizer('welcomeScreenChannel', bot, payload, welcomeScreenChannel, {
    partial: extra?.partial ?? false,
  });
}
