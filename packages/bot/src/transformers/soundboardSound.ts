import type { DiscordSoundboardSound } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { SoundboardSound } from './types.js';

export function transformSoundboardSound(bot: Bot, payload: Partial<DiscordSoundboardSound>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.soundboardSound;
  const soundboardSound = {} as SetupDesiredProps<SoundboardSound, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.name && payload.name) soundboardSound.name = payload.name;
  if (props.soundId && payload.sound_id) soundboardSound.soundId = bot.transformers.snowflake(payload.sound_id);
  if (props.volume && payload.volume) soundboardSound.volume = payload.volume;
  if (props.emojiId && payload.emoji_id) soundboardSound.emojiId = bot.transformers.snowflake(payload.emoji_id);
  if (props.emojiName && payload.emoji_name) soundboardSound.emojiName = payload.emoji_name;
  if (props.guildId && payload.guild_id) soundboardSound.guildId = bot.transformers.snowflake(payload.guild_id);
  if (props.available && payload.available) soundboardSound.available = payload.available;
  if (props.user && payload.user) soundboardSound.user = bot.transformers.user(bot, payload.user);

  return callCustomizer('soundboardSound', bot, payload, soundboardSound, {
    partial: extra?.partial ?? false,
  });
}
