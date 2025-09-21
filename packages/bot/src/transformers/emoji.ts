import type { DiscordDefaultReactionEmoji, DiscordEmoji } from '@discordeno/types'
import type { Bot } from '../bot.js'
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js'
import { callCustomizer } from '../transformers.js'
import { EmojiToggles } from './toggles/emoji.js'
import type { DefaultReactionEmoji, Emoji } from './types.js'

export const baseEmoji: Emoji = {
  // This allows typescript to still check for type errors on functions below
  ...(undefined as unknown as Emoji),

  get animated() {
    return this.toggles?.animated
  },
  get requireColons() {
    return this.toggles?.requireColons
  },
  get managed() {
    return this.toggles?.managed
  },
  get available() {
    return this.toggles.available
  },
}

export function transformEmoji(bot: Bot, payload: Partial<DiscordEmoji>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.emoji
  const emoji = Object.create(baseEmoji) as SetupDesiredProps<Emoji, TransformersDesiredProperties, DesiredPropertiesBehavior>

  if (props.id && payload.id) emoji.id = bot.transformers.snowflake(payload.id)
  if (props.name && payload.name) emoji.name = payload.name
  if (props.roles && payload.roles) emoji.roles = payload.roles.map((id) => bot.transformers.snowflake(id))
  if (props.user && payload.user) emoji.user = bot.transformers.user(bot, payload.user)

  emoji.toggles = new EmojiToggles(payload)

  return callCustomizer('emoji', bot, payload, emoji, {
    partial: extra?.partial ?? false,
  })
}

export function transformDefaultReactionEmoji(bot: Bot, payload: Partial<DiscordDefaultReactionEmoji>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.defaultReactionEmoji
  const defaultReactionEmoji = {} as SetupDesiredProps<DefaultReactionEmoji, TransformersDesiredProperties, DesiredPropertiesBehavior>

  if (props.emojiId && payload.emoji_id) defaultReactionEmoji.emojiId = bot.transformers.snowflake(payload.emoji_id)
  if (props.emojiName && payload.emoji_name) defaultReactionEmoji.emojiName = payload.emoji_name

  return callCustomizer('defaultReactionEmoji', bot, payload, defaultReactionEmoji, {
    partial: extra?.partial ?? false,
  })
}
