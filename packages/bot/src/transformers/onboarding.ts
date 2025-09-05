import type { DiscordGuildOnboarding, DiscordGuildOnboardingPrompt, DiscordGuildOnboardingPromptOption } from '@discordeno/types'
import type { Bot } from '../bot.js'
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js'
import { callCustomizer } from '../transformers.js'
import type { GuildOnboarding, GuildOnboardingPrompt, GuildOnboardingPromptOption } from './types.js'

export function transformGuildOnboarding(bot: Bot, payload: Partial<DiscordGuildOnboarding>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.guildOnboarding
  const guildOnboarding = {} as SetupDesiredProps<GuildOnboarding, TransformersDesiredProperties, DesiredPropertiesBehavior>

  if (props.guildId && payload.guild_id) guildOnboarding.guildId = bot.transformers.snowflake(payload.guild_id)
  if (props.defaultChannelIds && payload.default_channel_ids)
    guildOnboarding.defaultChannelIds = payload.default_channel_ids.map(bot.transformers.snowflake)
  if (props.enabled && payload.enabled !== undefined) guildOnboarding.enabled = payload.enabled
  if (props.mode && payload.mode !== undefined) guildOnboarding.mode = payload.mode
  if (props.prompts && payload.prompts) guildOnboarding.prompts = payload.prompts.map((prompt) => bot.transformers.guildOnboardingPrompt(bot, prompt))

  return callCustomizer('guildOnboarding', bot, payload, guildOnboarding, {
    partial: extra?.partial ?? false,
  })
}

export function transformGuildOnboardingPrompt(bot: Bot, payload: Partial<DiscordGuildOnboardingPrompt>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.guildOnboardingPrompt
  const prompt = {} as SetupDesiredProps<GuildOnboardingPrompt, TransformersDesiredProperties, DesiredPropertiesBehavior>

  if (props.id && payload.id) prompt.id = bot.transformers.snowflake(payload.id)
  if (props.inOnboarding && payload.in_onboarding) prompt.inOnboarding = payload.in_onboarding
  if (props.required && payload.required) prompt.required = payload.required
  if (props.singleSelect && payload.single_select) prompt.singleSelect = payload.single_select
  if (props.title && payload.title) prompt.title = payload.title
  if (props.type && payload.type !== undefined) prompt.type = payload.type
  if (props.options && payload.options) prompt.options = payload.options.map((option) => bot.transformers.guildOnboardingPromptOption(bot, option))

  return callCustomizer('guildOnboardingPrompt', bot, payload, prompt, {
    partial: extra?.partial ?? false,
  })
}

export function transformGuildOnboardingPromptOption(bot: Bot, payload: Partial<DiscordGuildOnboardingPromptOption>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.guildOnboardingPromptOption
  const option = {} as SetupDesiredProps<GuildOnboardingPromptOption, TransformersDesiredProperties, DesiredPropertiesBehavior>

  if (props.id && payload.id) option.id = bot.transformers.snowflake(payload.id)
  if (props.channelIds && payload.channel_ids) option.channelIds = payload.channel_ids.map(bot.transformers.snowflake)
  if (props.roleIds && payload.role_ids) option.roleIds = payload.role_ids.map(bot.transformers.snowflake)
  if (props.emoji && payload.emoji) option.emoji = bot.transformers.emoji(bot, payload.emoji)
  if (props.title && payload.title) option.title = payload.title
  if (props.description && payload.description) option.description = payload.description

  return callCustomizer('guildOnboardingPromptOption', bot, payload, option, {
    partial: extra?.partial ?? false,
  })
}
