import type { DiscordGuildOnboarding, DiscordGuildOnboardingPrompt, DiscordGuildOnboardingPromptOption } from '@discordeno/types'
import type { GuildOnboarding, GuildOnboardingPrompt, GuildOnboardingPromptOption, InternalBot } from '../index.js'

export function transformGuildOnboarding(bot: InternalBot, payload: DiscordGuildOnboarding): typeof bot.transformers.$inferredTypes.guildOnboarding {
  const props = bot.transformers.desiredProperties.guildOnboarding
  const guildOnboarding = {} as GuildOnboarding

  if (props.guildId && payload.guild_id) guildOnboarding.guildId = bot.transformers.snowflake(payload.guild_id)
  if (props.defaultChannelIds && payload.default_channel_ids)
    guildOnboarding.defaultChannelIds = payload.default_channel_ids.map(bot.transformers.snowflake)
  if (props.enabled) guildOnboarding.enabled = payload.enabled
  if (props.mode) guildOnboarding.mode = payload.mode
  if (props.prompts && payload.prompts) guildOnboarding.prompts = payload.prompts.map((prompt) => bot.transformers.guildOnboardingPrompt(bot, prompt))

  return bot.transformers.customizers.guildOnboarding(bot, payload, guildOnboarding)
}

export function transformGuildOnboardingPrompt(
  bot: InternalBot,
  payload: DiscordGuildOnboardingPrompt,
): typeof bot.transformers.$inferredTypes.guildOnboardingPrompt {
  const props = bot.transformers.desiredProperties.guildOnboardingPrompt
  const prompt = {} as GuildOnboardingPrompt

  if (props.id && payload.id) prompt.id = bot.transformers.snowflake(prompt.id)
  if (props.inOnboarding && payload.in_onboarding) prompt.inOnboarding = payload.in_onboarding
  if (props.required && payload.required) prompt.required = payload.required
  if (props.singleSelect && payload.single_select) prompt.singleSelect = payload.single_select
  if (props.title && payload.title) prompt.title = payload.title
  if (props.type) prompt.type = payload.type
  if (props.options && payload.options) prompt.options = payload.options.map((option) => bot.transformers.guildOnboardingPromptOption(bot, option))

  return bot.transformers.customizers.guildOnboardingPrompt(bot, payload, prompt)
}

export function transformGuildOnboardingPromptOption(
  bot: InternalBot,
  payload: DiscordGuildOnboardingPromptOption,
): typeof bot.transformers.$inferredTypes.guildOnboardingPromptOption {
  const props = bot.transformers.desiredProperties.guildOnboardingPromptOption
  const option = {} as GuildOnboardingPromptOption

  if (props.id && payload.id) option.id = bot.transformers.snowflake(payload.id)
  if (props.channelIds && payload.channel_ids) option.channelIds = payload.channel_ids.map(bot.transformers.snowflake)
  if (props.roleIds && payload.role_ids) option.roleIds = payload.role_ids.map(bot.transformers.snowflake)
  if (props.emoji && payload.emoji) option.emoji = bot.transformers.emoji(bot, payload.emoji)
  if (props.title && payload.title) option.title = payload.title
  if (props.description && payload.description) option.description = payload.description

  return bot.transformers.customizers.guildOnboardingPromptOption(bot, payload, option)
}
