import type {
  DiscordGuildOnboarding,
  DiscordGuildOnboardingMode,
  DiscordGuildOnboardingPrompt,
  DiscordGuildOnboardingPromptOption,
  DiscordGuildOnboardingPromptType,
} from '@discordeno/types'
import { type Bot, type Emoji } from '../index.js'

export function transformGuildOnboarding(bot: Bot, payload: DiscordGuildOnboarding): GuildOnboarding {
  const props = bot.transformers.desiredProperties.guildOnboarding
  const guildOnboarding = {} as GuildOnboarding

  if (props.guildId && payload.guild_id) guildOnboarding.guildId = bot.transformers.snowflake(payload.guild_id)
  if (props.defaultChannelIds && payload.default_channel_ids)
    guildOnboarding.defaultChannelIds = payload.default_channel_ids.map(bot.transformers.snowflake)
  if (props.enabled) guildOnboarding.enabled = payload.enabled
  if (props.mode) guildOnboarding.mode = payload.mode
  if (payload.prompts) guildOnboarding.prompts = payload.prompts.map((prompt) => transformGuildOnboardingPrompt(bot, prompt))

  return bot.transformers.customizers.guildOnboarding(bot, payload, guildOnboarding)
}

export function transformGuildOnboardingPrompt(bot: Bot, payload: DiscordGuildOnboardingPrompt): GuildOnboardingPrompt {
  const props = bot.transformers.desiredProperties.guildOnboarding.prompts
  const prompt = {} as GuildOnboardingPrompt

  if (props.id && payload.id) prompt.id = bot.transformers.snowflake(prompt.id)
  if (props.inOnboarding && payload.in_onboarding) prompt.inOnboarding = payload.in_onboarding
  if (props.required && payload.required) prompt.required = payload.required
  if (props.singleSelect && payload.single_select) prompt.singleSelect = payload.single_select
  if (props.title && payload.title) prompt.title = payload.title
  if (props.type) prompt.type = payload.type
  if (payload.options) prompt.options = payload.options.map((option) => transformGuildOnboardingPromptOption(bot, option))

  return prompt
}

export function transformGuildOnboardingPromptOption(bot: Bot, payload: DiscordGuildOnboardingPromptOption): GuildOnboardingPromptOption {
  const props = bot.transformers.desiredProperties.guildOnboarding.prompts.options
  const option = {} as GuildOnboardingPromptOption

  if (props.id && payload.id) option.id = bot.transformers.snowflake(payload.id)
  if (props.channelIds && payload.channel_ids) option.channelIds = payload.channel_ids.map(bot.transformers.snowflake)
  if (props.roleIds && payload.role_ids) option.roleIds = payload.role_ids.map(bot.transformers.snowflake)
  if (props.emoji && payload.emoji) option.emoji = bot.transformers.emoji(bot, payload.emoji)
  if (props.title && payload.title) option.title = payload.title
  if (props.description && payload.description) option.description = payload.description

  return option
}

export interface GuildOnboarding {
  /** ID of the guild this onboarding is part of */
  guildId: bigint
  /** Prompts shown during onboarding and in customize community */
  prompts: GuildOnboardingPrompt[]
  /** Channel IDs that members get opted into automatically */
  defaultChannelIds: bigint[]
  /** Whether onboarding is enabled in the guild */
  enabled: boolean
  /** Current mode of onboarding */
  mode: DiscordGuildOnboardingMode
}

export interface GuildOnboardingPrompt {
  /** ID of the prompt */
  id: bigint
  /** Type of prompt */
  type: DiscordGuildOnboardingPromptType
  /** Options available within the prompt */
  options: GuildOnboardingPromptOption[]
  /** Title of the prompt */
  title: string
  /** Indicates whether users are limited to selecting one option for the prompt */
  singleSelect: boolean
  /** Indicates whether the prompt is required before a user completes the onboarding flow */
  required: boolean
  /** Indicates whether the prompt is present in the onboarding flow. If `false`, the prompt will only appear in the Channels & Roles tab */
  inOnboarding: boolean
}

export interface GuildOnboardingPromptOption {
  /** ID of the prompt option */
  id: bigint
  /** IDs for channels a member is added to when the option is selected */
  channelIds: bigint[]
  /** IDs for roles assigned to a member when the option is selected */
  roleIds: bigint[]
  /** Emoji of the option */
  emoji: Emoji
  /** Title of the option */
  title: string
  /** Description of the option */
  description: string | undefined
}
